import ProgramsClient from './ProgramsClient';

export const dynamic = "force-dynamic";

interface Program {
  id?: string | number;
  title: string;
  tagline?: string;
  description: string;
  color?: string;
  image?: string;
}

// Default color gradients for fallback
const defaultColors = [
  'from-red-500 to-rose-600',
  'from-teal-500 to-cyan-600',
  'from-pink-500 to-rose-600',
  'from-indigo-500 to-purple-600',
  'from-emerald-500 to-green-600',
  'from-blue-500 to-cyan-600',
  'from-purple-500 to-pink-600',
  'from-orange-500 to-red-600',
];

async function getPrograms(): Promise<{ programs: Program[]; error: string | null }> {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin.aminul-haque.com/api/v1';
    const response = await fetch(`${apiBaseUrl}/programs`, {
      cache: 'no-store', // No caching - always fetch fresh data
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch programs: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Handle different response formats
    // API structure: { success: true, data: { data: [...] } }
    let programsData: any[] = [];
    if (Array.isArray(data)) {
      programsData = data;
    } else if (data.data && Array.isArray(data.data)) {
      programsData = data.data;
    } else if (data.data && data.data.data && Array.isArray(data.data.data)) {
      // Handle nested structure: data.data.data
      programsData = data.data.data;
    } else if (data.programs && Array.isArray(data.programs)) {
      programsData = data.programs;
    } else {
      console.error('API Response:', data);
      throw new Error('Invalid API response format');
    }
    
    // Map API data to expected format with fallbacks
    // API fields: main_title, second_title, description, bangla_description, image, icon
    const mappedPrograms: Program[] = programsData.map((program: any, index: number) => {
      // Handle image URL - prioritize API image, validate it's a complete URL
      let imageUrl = '/aminul_haque.jpg'; // default fallback only if no valid image
      
      if (program.image) {
        const image = program.image.trim();
        
        // Check if it's a complete HTTP/HTTPS URL
        if (image.startsWith('http://') || image.startsWith('https://')) {
          // Validate it's not just the base storage URL (must have additional path)
          const baseStorageUrl = 'https://admin.aminul-haque.com/storage';
          const baseStorageUrlHttp = 'http://admin.aminul-haque.com/storage';
          
          if (image !== baseStorageUrl && 
              image !== baseStorageUrlHttp &&
              image.length > baseStorageUrl.length) {
            // It's a valid full URL with a path
            imageUrl = image;
          }
        } else if (image.startsWith('/')) {
          // Relative path from API
          imageUrl = image;
        } else if (image) {
          // If it's a non-empty string but not a URL, try to construct full URL
          // This handles cases where API might return just the path
          imageUrl = image.startsWith('storage/') || image.startsWith('/storage/') 
            ? `https://admin.aminul-haque.com/${image.replace(/^\//, '')}`
            : image;
        }
      }
      
      // Use bangla_description if available, otherwise fall back to description
      const description = program.bangla_description || program.description || program.details || '';
      
      return {
        id: program.id || program.uuid,
        title: program.main_title || program.title || 'Untitled Program',
        tagline: program.second_title || program.tagline || program.subtitle || '',
        description: description,
        color: program.color || defaultColors[index % defaultColors.length],
        image: imageUrl,
      };
    });
    
    return { programs: mappedPrograms, error: null };
  } catch (err) {
    console.error('Error fetching programs:', err);
    return {
      programs: [],
      error: err instanceof Error ? err.message : 'Failed to load programs',
    };
  }
}

export default async function ProgramsPage() {
  const { programs, error } = await getPrograms();
  
  return <ProgramsClient programs={programs} error={error} />;
}
