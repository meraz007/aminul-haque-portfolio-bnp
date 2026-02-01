import PressReleaseDetailClient from './PressReleaseDetailClient';

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getNewsBySlug(slug: string) {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin.aminul-haque.com/api/v1';
    
    // Try different endpoint patterns
    const endpoints = [
      `${apiBaseUrl}/news/${slug}`,
      `${apiBaseUrl}/news/slug/${slug}`,
      `${apiBaseUrl}/news/show/${slug}`,
    ];
    
    let response: Response | null = null;
    for (const endpoint of endpoints) {
      try {
        response = await fetch(endpoint, {
          cache: 'no-store',
        });
        
        if (response.ok) {
          break;
        }
      } catch (err) {
        continue;
      }
    }
    
    if (!response || !response.ok) {
      return null;
    }

    const data = await response.json();
    
    // Handle the API response structure
    if (data.success && data.data) {
      return data.data;
    } else if (data.id) {
      // If data is directly the news object
      return data;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching news:', error);
    return null;
  }
}

export default async function PressReleaseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const newsData = await getNewsBySlug(slug);
  console.log(newsData);
  if (!newsData) {
    return <PressReleaseDetailClient pressRelease={null} />;
  }

  // Map API data to component format
  const firstDetail = newsData.details && newsData.details.length > 0 ? newsData.details[0] : null;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin.aminul-haque.com/api/v1';
  
  // Build image URLs
  const images: string[] = [];
  if (firstDetail) {
    if (firstDetail.image_large) {
      images.push(firstDetail.image_large.startsWith('http') 
        ? firstDetail.image_large 
        : `${apiBaseUrl}/${firstDetail.image_large}`);
    }
    if (firstDetail.image_medium && !images.includes(firstDetail.image_medium)) {
      images.push(firstDetail.image_medium.startsWith('http')
        ? firstDetail.image_medium
        : `${apiBaseUrl}/${firstDetail.image_medium}`);
    }
    if (firstDetail.image_original && !images.includes(firstDetail.image_original)) {
      images.push(firstDetail.image_original.startsWith('http')
        ? firstDetail.image_original
        : `${apiBaseUrl}/${firstDetail.image_original}`);
    }
  }
  
  // Extract summary from short_description or description
  const summary = newsData.short_description || 
    (firstDetail?.description 
      ? firstDetail.description.replace(/<[^>]*>/g, '').trim().substring(0, 200) + '...'
      : '');
  
  // Build videos array if news_type is audio/video
  const videos: any[] = [];
  if (newsData.news_type === 'audio' || newsData.news_type === 'video') {
    if (newsData.file) {
      const fileUrl = newsData.file.startsWith('http') 
        ? newsData.file 
        : `${apiBaseUrl}/${newsData.file}`;
      videos.push({
        title: newsData.name,
        url: fileUrl,
        type: newsData.news_type,
      });
    }
  }
  
  const pressRelease = {
    title: newsData.name,
    summary: summary,
    date: newsData.news_datetime || '',
    fullDescription: firstDetail?.description || '',
    images: images.length > 0 ? images : ['/aminul_haque.jpg'],
    videos: videos,
    newsLink: newsData.news_link,
    reporterName: newsData.reporter_name,
    categories: newsData.categories || [],
  };

  return <PressReleaseDetailClient pressRelease={pressRelease} />;
}

