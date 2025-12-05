import EventDetailClient from './EventDetailClient';

export const dynamic = "error";

interface Event {
  id: number;
  uuid: string;
  title: string;
  event_date_time: string;
  event_date_time_formatted: string;
  address: string;
  description: string;
  image: string | null;
  map_embed?: string;
  status: string;
}

// Fetch all events to generate static params
async function getAllEvents(): Promise<Event[]> {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api-protfolio.trusttous.com/api/v1';
    const response = await fetch(`${apiBaseUrl}/events`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error(`Failed to fetch events: ${response.statusText}`);
      return [];
    }

    const data = await response.json();

    let eventsData: any[] = [];
    if (Array.isArray(data)) {
      eventsData = data;
    } else if (data.data && Array.isArray(data.data)) {
      eventsData = data.data;
    } else if (data.data && data.data.data && Array.isArray(data.data.data)) {
      eventsData = data.data.data;
    } else if (data.events && Array.isArray(data.events)) {
      eventsData = data.events;
    } else {
      console.error('Invalid API response format:', data);
      return [];
    }

    const activeEvents = eventsData
      .filter((event: any) => event.status === 'active' || !event.status)
      .map((event: any) => ({
        id: event.id,
        uuid: event.uuid,
        title: event.title,
        event_date_time: event.event_date_time,
        event_date_time_formatted: event.event_date_time_formatted,
        address: event.address,
        description: event.description || '',
        image: event.image,
        map_embed: event.map_embed,
        status: event.status,
      }));

    return activeEvents;
  } catch (err) {
    console.error('Error fetching events:', err);
    return [];
  }
}

// Fetch individual event by ID or UUID
async function getEvent(slug: string): Promise<any | null> {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api-protfolio.trusttous.com/api/v1';
    
    // Try fetching by slug (could be ID or UUID)
    const response = await fetch(`${apiBaseUrl}/events/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error(`Failed to fetch event: ${response.statusText}`);
      return null;
    }

    const data = await response.json();

    // Handle different response formats
    let eventData: any = null;
    if (data.data) {
      eventData = data.data;
    } else if (data.event) {
      eventData = data.event;
    } else if (data.id || data.uuid) {
      eventData = data;
    } else {
      console.error('Invalid API response format:', data);
      return null;
    }

    if (!eventData || (eventData.status && eventData.status !== 'active')) {
      return null;
    }

    // Parse date and time from event_date_time_formatted
    const parseDateTime = (formatted: string) => {
      if (!formatted) return { date: '', time: '' };
      try {
        const parts = formatted.trim().split(' ');
        if (parts.length >= 5) {
          const date = `${parts[0]} ${parts[1]} ${parts[2]}`;
          const time = `${parts[3]} ${parts[4]}`;
          return { date, time };
        } else if (parts.length >= 3) {
          return { date: formatted, time: '' };
        }
      } catch (e) {
        console.error('Error parsing date:', e);
      }
      return { date: formatted, time: '' };
    };

    // Check if event is past
    const now = new Date();
    const eventDateTime = new Date(eventData.event_date_time);
    const isPast = eventDateTime < now;

    // Extract location from address
    const addressParts = (eventData.address || '').split(',').map((s: string) => s.trim());
    const location = addressParts[0] || '';
    const fullAddress = eventData.address || '';

    // Parse map embed URL
    let mapEmbedUrl = '';
    if (eventData.map_embed) {
      // Extract iframe src from map_embed HTML
      const iframeMatch = eventData.map_embed.match(/src=["']([^"']+)["']/);
      if (iframeMatch) {
        mapEmbedUrl = iframeMatch[1];
      } else if (eventData.map_embed.startsWith('http')) {
        mapEmbedUrl = eventData.map_embed;
      }
    }

    // Handle image URL
    let imageUrl = '/aminul_haque.jpg';
    if (eventData.image) {
      const image = eventData.image.trim();
      if (image.startsWith('http://') || image.startsWith('https://')) {
        const baseStorageUrl = 'https://api-protfolio.trusttous.com/storage';
        const baseStorageUrlHttp = 'http://api-protfolio.trusttous.com/storage';
        if (image !== baseStorageUrl && image !== baseStorageUrlHttp && image.length > baseStorageUrl.length) {
          imageUrl = image;
        }
      } else if (image.startsWith('/')) {
        imageUrl = image;
      } else if (image) {
        imageUrl = image.startsWith('storage/') || image.startsWith('/storage/')
          ? `https://api-protfolio.trusttous.com/${image.replace(/^\//, '')}`
          : image;
      }
    }

    const { date, time } = parseDateTime(eventData.event_date_time_formatted);

    // Map API response to component format
    return {
      title: eventData.title || 'Untitled Event',
      date: date,
      time: time,
      location: location,
      fullAddress: fullAddress,
      mapLocation: {
        embedUrl: mapEmbedUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.564!2d90.3795!3d23.8759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDUyJzMzLjIiTiA5MMKwMjInNDYuMiJF!5e0!3m2!1sen!2sbd!4v1234567890',
      },
      description: eventData.description || '',
      isPast: isPast,
      hasVideo: false, // API doesn't provide video info yet
      videos: [],
      image: imageUrl,
      confirmationMessage: 'নিবন্ধনের পর আপনি ইমেইল এবং এসএমএসের মাধ্যমে নিশ্চিতকরণ বার্তা পাবেন।',
    };
  } catch (err) {
    console.error('Error fetching event:', err);
    return null;
  }
}

export async function generateStaticParams() {
  const events = await getAllEvents();
  // Return both ID and UUID as slugs to support both formats
  const params = events.flatMap(event => [
    { slug: event.id.toString() },
    { slug: event.uuid },
  ]);
  return params;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEvent(slug);
  return <EventDetailClient event={event} />;
}


