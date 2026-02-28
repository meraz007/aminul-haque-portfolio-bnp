/**
 * Language sync coordination module.
 *
 * Ensures the backend API language setting is synced with the client's
 * chosen language before any language-dependent API calls are made.
 * This prevents mixed-language content on first page load.
 *
 * Flow:
 *  1. I18nProvider mounts and determines the correct language.
 *  2. I18nProvider calls the backend /settings/change-language endpoint.
 *  3. Once the backend responds, markLanguageSynced() is called.
 *  4. All API functions (fetchCmsPage, fetchSettings, etc.) await
 *     waitForLanguageSync() before making their HTTP requests,
 *     ensuring the backend serves content in the correct language.
 */

let _resolve: (() => void) | undefined;
let _synced = false;
let _timeoutId: ReturnType<typeof setTimeout> | null = null;

// On the server, language sync is not needed — resolve immediately.
// On the client, create a promise that gates API calls until sync completes.
const _promise: Promise<void> =
  typeof window === 'undefined'
    ? Promise.resolve()
    : new Promise<void>((resolve) => {
        _resolve = resolve;
      });

// Safety timeout: if the sync POST doesn't complete within 3 seconds,
// unblock API calls anyway to avoid a permanent deadlock.
if (typeof window !== 'undefined') {
  _timeoutId = setTimeout(() => markLanguageSynced(), 3000);
}

/**
 * Mark the backend language sync as complete.
 * Called by I18nProvider after the POST to /settings/change-language
 * finishes (success or failure).
 */
export function markLanguageSynced(): void {
  if (!_synced) {
    _synced = true;
    if (_timeoutId) {
      clearTimeout(_timeoutId);
      _timeoutId = null;
    }
    _resolve?.();
  }
}

/**
 * Wait for the backend language sync to complete.
 * Returns immediately on the server, or after sync is already done.
 * API functions should call this before making requests.
 */
export async function waitForLanguageSync(): Promise<void> {
  if (typeof window === 'undefined' || _synced) return;
  return _promise;
}

/**
 * A drop-in replacement for window.fetch that waits for language sync
 * before making the request. Use this for direct API calls in components
 * that don't go through lib/api.ts.
 */
export async function syncedFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  await waitForLanguageSync();
  return fetch(input, init);
}
