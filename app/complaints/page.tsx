import ComplaintsClient from './ComplaintsClient';

interface Category {
  id: number;
  name: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Category[];
}

async function getComplaintCategories(): Promise<Category[]> {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin.aminul-haque.com/api/v1';
    const response = await fetch(`${apiBaseUrl}/complains-category`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error(`Failed to fetch complaint categories: ${response.statusText}`);
      return [];
    }

    const data: ApiResponse = await response.json();

    if (data.success && Array.isArray(data.data)) {
      return data.data;
    }

    console.error('Invalid API response format:', data);
    return [];
  } catch (err) {
    console.error('Error fetching complaint categories:', err);
    return [];
  }
}

export default async function ComplaintsPage() {
  const categories = await getComplaintCategories();
  return <ComplaintsClient categories={categories} />;
}
