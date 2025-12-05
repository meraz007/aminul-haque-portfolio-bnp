import ComplaintsClient from './ComplaintsClient';

interface Category {
  id: number;
  eng_name: string;
  bang_name: string;
}

async function getComplaintCategories(): Promise<Category[]> {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api-protfolio.trusttous.com/api/v1';
    const response = await fetch(`${apiBaseUrl}/complains-category`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      console.error(`Failed to fetch complaint categories: ${response.statusText}`);
      return [];
    }

    const data = await response.json();

    // Handle different response formats
    let categoriesData: any[] = [];
    if (Array.isArray(data)) {
      categoriesData = data;
    } else if (data.data && Array.isArray(data.data)) {
      categoriesData = data.data;
    } else if (data.data && data.data.data && Array.isArray(data.data.data)) {
      categoriesData = data.data.data;
    } else if (data.categories && Array.isArray(data.categories)) {
      categoriesData = data.categories;
    } else {
      console.error('Invalid API response format:', data);
      return [];
    }

    // Map API data to Category interface
    const categories: Category[] = categoriesData.map((category: any) => ({
      id: category.id,
      eng_name: category.eng_name || '',
      bang_name: category.bang_name || '',
    }));

    return categories;
  } catch (err) {
    console.error('Error fetching complaint categories:', err);
    return [];
  }
}

export default async function ComplaintsPage() {
  const categories = await getComplaintCategories();
  return <ComplaintsClient categories={categories} />;
}
