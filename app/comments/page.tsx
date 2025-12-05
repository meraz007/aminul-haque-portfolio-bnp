import CommentsClient from './CommentsClient';

interface Comment {
  id: number;
  uuid?: string;
  name: string;
  text: string;
  message?: string;
  date?: string;
  created_at?: string;
  likes?: number;
  status?: string;
}

async function getComments(): Promise<Comment[]> {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api-protfolio.trusttous.com/api/v1';
    const response = await fetch(`${apiBaseUrl}/comments`, {
      next: { revalidate: 10 }, // Revalidate every 30 seconds
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch comments: ${response.statusText}`);
      return [];
    }
    
    const data = await response.json();
    
    // Handle different response formats
    let commentsData: any[] = [];
    if (Array.isArray(data)) {
      commentsData = data;
    } else if (data.data && Array.isArray(data.data)) {
      commentsData = data.data;
    } else if (data.data && data.data.data && Array.isArray(data.data.data)) {
      // Handle nested structure: data.data.data
      commentsData = data.data.data;
    } else if (data.comments && Array.isArray(data.comments)) {
      commentsData = data.comments;
    } else {
      console.error('Invalid API response format:', data);
      return [];
    }
    
    // Map API data to expected format
    const formatDate = (dateString?: string) => {
      if (!dateString) return '';
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString('bn-BD', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
      } catch {
        return dateString;
      }
    };
    
    const mappedComments: Comment[] = commentsData
      .filter((comment: any) => comment.status === 'active' || !comment.status) // Only show active comments
      .map((comment: any) => ({
        id: comment.id,
        uuid: comment.uuid,
        name: comment.name || 'আনোনিমাস',
        text: comment.text || comment.message || '',
        message: comment.text || comment.message || '', // For backward compatibility
        created_at: comment.created_at,
        date: formatDate(comment.created_at),
        likes: comment.likes || 0,
        status: comment.status,
      }))
      .sort((a, b) => {
        // Sort by created_at descending (newest first)
        if (a.created_at && b.created_at) {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
        return 0;
      });
    
    return mappedComments;
  } catch (err) {
    console.error('Error fetching comments:', err);
    return [];
  }
}

export default async function CommentsPage() {
  const comments = await getComments();
  
  return <CommentsClient initialComments={comments} />;
}
