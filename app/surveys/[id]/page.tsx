import SurveyDetailClient from './SurveyDetailClient';

interface SurveyQuestion {
  id: number;
  survey_id: number;
  question_type: string;
  question_text: string;
  options: Array<{
    id: number;
    question_id: number;
    option_text: string;
  }>;
  formatted_options: string[];
}

interface SurveyData {
  id: number;
  uuid: string;
  status: string;
  image?: string;
  title: string;
  description: string;
  questions: SurveyQuestion[];
}

// Fetch all surveys to generate static params
async function getAllSurveys(): Promise<Array<{ uuid: string; id: number }>> {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api-protfolio.trusttous.com/api/v1';
    const response = await fetch(`${apiBaseUrl}/surveys`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error(`Failed to fetch surveys: ${response.statusText}`);
      return [];
    }

    const data = await response.json();
    
    let surveysData: any[] = [];
    if (data.success && data.data && Array.isArray(data.data)) {
      surveysData = data.data;
    } else if (Array.isArray(data)) {
      surveysData = data;
    } else if (data.data && Array.isArray(data.data)) {
      surveysData = data.data;
    }

    return surveysData
      .filter((survey: any) => survey.status === 'active')
      .map((survey: any) => ({
        uuid: survey.uuid,
        id: survey.id,
      }));
  } catch (err) {
    console.error('Error fetching surveys:', err);
    return [];
  }
}

export async function generateStaticParams() {
  const surveys = await getAllSurveys();
  return surveys.map((survey) => ({
    id: survey.uuid || survey.id.toString(),
  }));
}

// Fetch individual survey by UUID or ID
async function getSurvey(id: string): Promise<SurveyData | null> {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api-protfolio.trusttous.com/api/v1';
    const response = await fetch(`${apiBaseUrl}/survey/${id}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error(`Failed to fetch survey: ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    
    if (data.success && data.data) {
      return data.data;
    }
    
    return null;
  } catch (err) {
    console.error('Error fetching survey:', err);
    return null;
  }
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SurveyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const survey = await getSurvey(id);
  return <SurveyDetailClient survey={survey} />;
}

