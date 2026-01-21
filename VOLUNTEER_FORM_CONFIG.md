# Volunteer Form Configuration

## Overview

The volunteer registration form (`/volunteer`) is configured to submit data to your existing backend API.

## API Configuration

**Endpoint**: `POST /volunteers/store`

**Base URL**: `https://admin.aminul-haque.com/api/v1`

You can override this by setting the environment variable:
```env
NEXT_PUBLIC_API_BASE_URL="https://your-api-url.com/api/v1"
```

## Request Payload

The form submits the following JSON payload:

```json
{
  "full_name": "String",
  "mobile": "String (01XXXXXXXXX)",
  "email": "String",
  "password": "String",
  "password_confirmation": "String",
  "district": "String (in Bengali)",
  "upazila": "String (in Bengali)",
  "ward": "String (in Bengali)",
  "skills": ["Array of strings"],
  "preferred_tasks": ["Array of strings"],
  "availability": ["Array of strings"]
}
```

## Example Request

```json
{
  "full_name": "Ashad Faruque",
  "mobile": "01712345678",
  "email": "ashad@vol.com",
  "password": "password",
  "password_confirmation": "password",
  "district": "সিলেট",
  "upazila": "সিলেট সদর",
  "ward": "ওয়ার্ড 7",
  "skills": [
    "কম্পিউটার/প্রযুক্তি",
    "শিক্ষা/প্রশিক্ষণ"
  ],
  "preferred_tasks": [
    "ক্যাম্পেইন সহায়তা",
    "ইভেন্ট আয়োজন"
  ],
  "availability": [
    "সপ্তাহের দিন (সকাল ৯টা-১২টা)",
    "সপ্তাহান্তে (দুপুর ১২টা-৫টা)"
  ]
}
```

## Expected API Response

### Success (Status: 200 or 201)
```json
{
  "success": true,
  "message": "Success message",
  "data": { ... }
}
```

### Error (Status: 4xx or 5xx)
```json
{
  "success": false,
  "message": "Error message"
}
```

## Form Validation

The form includes client-side validation for:

- ✅ **Required fields**: All fields must be filled
- ✅ **Mobile format**: Must match Bangladesh format `01[3-9]XXXXXXXX`
- ✅ **Email format**: Must be a valid email address
- ✅ **Password length**: Minimum 6 characters
- ✅ **Password confirmation**: Must match the password field
- ✅ **At least one selection**: For skills, tasks, and availability

## How to Test

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Navigate to the volunteer page**:
   ```
   http://localhost:3000/volunteer
   ```

3. **Fill out the form** with all required information

4. **Click "আবেদন জমা দিন"** to submit

5. **Check the response**:
   - Success: You'll see a success message
   - Error: You'll see the error message from your backend API

## Environment Variables

Create a `.env.local` file (optional) to override the default API URL:

```env
NEXT_PUBLIC_API_BASE_URL="https://your-custom-api-url.com/api/v1"
```

If not set, the form will use: `https://admin.aminul-haque.com/api/v1`

## Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure your backend API allows requests from your frontend domain.

### Network Errors
Check the browser console for detailed error messages.

### API Response Format
The form expects a JSON response with a `success` boolean field. Make sure your API returns this format.

---

**Form Location**: `/app/volunteer/page.tsx`

**Form Submission Logic**: Lines 184-245 in the `handleSubmit` function


