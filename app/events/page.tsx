import EventsClient from './EventsClient';

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

// Convert Bengali numerals to English numerals
function convertBengaliToEnglish(bengaliStr: string): string {
  const bengaliToEnglish: { [key: string]: string } = {
    '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
    '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'
  };
  
  return bengaliStr.split('').map(char => bengaliToEnglish[char] || char).join('');
}

// Parse date string that may contain Bengali numerals
function parseBengaliDate(dateStr: string): Date {
  // Convert Bengali numerals to English
  const englishDateStr = convertBengaliToEnglish(dateStr);
  
  // Parse the date - format: "YYYY-MM-DD HH:mm:ss"
  // Replace any non-standard separators and parse
  const cleaned = englishDateStr.replace(/\s+/g, ' ').trim();
  return new Date(cleaned);
}

async function getEvents(): Promise<{ upcomingEvents: Event[]; pastEvents: Event[] }> {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin.arsonconsultancy.org/api/v1';
    // Fetch all events (remove range=current to get both past and future events)
    const response = await fetch(`${apiBaseUrl}/events`, {
      next: { revalidate: 60 }, // Revalidate every 5 seconds
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch events: ${response.statusText}`);
      return { upcomingEvents: [], pastEvents: [] };
    }
    
    const data = await response.json();
    
    // Handle different response formats
    let eventsData: any[] = [];
    if (Array.isArray(data)) {
      eventsData = data;
    } else if (data.data && Array.isArray(data.data)) {
      eventsData = data.data;
    } else if (data.data && data.data.data && Array.isArray(data.data.data)) {
      // Handle nested structure: data.data.data
      eventsData = data.data.data;
    } else if (data.events && Array.isArray(data.events)) {
      eventsData = data.events;
    } else {
      console.error('Invalid API response format:', data);
      return { upcomingEvents: [], pastEvents: [] };
    }
    
    // Filter only active events
    const activeEvents = eventsData.filter((event: any) => event.status === 'active' || !event.status);
    
    // Get current date/time for comparison
    const now = new Date();
    
    // Separate upcoming and past events based on event_date_time
    const upcoming: Event[] = [];
    const past: Event[] = [];
    
    activeEvents.forEach((event: any) => {
      if (!event.event_date_time) {
        console.warn('Event missing event_date_time:', event.title || event.id);
        return;
      }
      
      const eventDateTime = parseBengaliDate(event.event_date_time);
      
      // Check if date is valid
      if (isNaN(eventDateTime.getTime())) {
        console.error('Invalid date for event:', event.event_date_time, event.title || event.id);
        return;
      }
      
      const mappedEvent: Event = {
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
      };
      
      // Compare datetime: if event datetime is now or in the future, it's upcoming
      // Use getTime() for accurate comparison
      const eventTime = eventDateTime.getTime();
      const nowTime = now.getTime();
      
      if (eventTime >= nowTime) {
        upcoming.push(mappedEvent);
      } else {
        past.push(mappedEvent);
      }
    });
    
    // Sort upcoming events by date (ascending - earliest first)
    upcoming.sort((a, b) => {
      const dateA = parseBengaliDate(a.event_date_time).getTime();
      const dateB = parseBengaliDate(b.event_date_time).getTime();
      return dateA - dateB;
    });
    
    // Sort past events by date (descending - most recent first)
    past.sort((a, b) => {
      const dateA = parseBengaliDate(a.event_date_time).getTime();
      const dateB = parseBengaliDate(b.event_date_time).getTime();
      return dateB - dateA;
    });
    
    return { upcomingEvents: upcoming, pastEvents: past };
  } catch (err) {
    console.error('Error fetching events:', err);
    return { upcomingEvents: [], pastEvents: [] };
  }
}

export default async function EventsPage() {
  const { upcomingEvents, pastEvents } = await getEvents();
  
  return <EventsClient upcomingEvents={upcomingEvents} pastEvents={pastEvents} />;
}


