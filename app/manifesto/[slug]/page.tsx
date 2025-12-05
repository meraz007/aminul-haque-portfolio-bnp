import ProposalDetailClient from './ProposalDetailClient';

interface Proposal {
  id: number;
  uuid: string;
  pdf: string;
  bang_title: string;
  bang_description: string;
  serial: string;
}

// Fetch all proposals to generate static params
async function getAllProposals(): Promise<Proposal[]> {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api-protfolio.trusttous.com/api/v1';
    const response = await fetch(`${apiBaseUrl}/proposal`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error(`Failed to fetch proposals: ${response.statusText}`);
      return [];
    }

    const data = await response.json();

    // Handle the API response structure: { success: true, data: { data: [...] } }
    let proposalsData: Proposal[] = [];
    if (data.success && data.data) {
      if (Array.isArray(data.data)) {
        proposalsData = data.data;
      } else if (data.data.data && Array.isArray(data.data.data)) {
        proposalsData = data.data.data;
      }
    } else if (Array.isArray(data)) {
      proposalsData = data;
    } else if (data.data && Array.isArray(data.data)) {
      proposalsData = data.data;
    }

    return proposalsData;
  } catch (err) {
    console.error('Error fetching proposals:', err);
    return [];
  }
}

// Fetch individual proposal by UUID or ID
async function getProposal(slug: string): Promise<Proposal | null> {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api-protfolio.trusttous.com/api/v1';
    
    // First, fetch all proposals and find the one matching the slug
    const proposals = await getAllProposals();
    
    // Try to find by UUID first, then by ID
    const proposal = proposals.find(
      (p) => p.uuid === slug || p.id.toString() === slug
    );

    return proposal || null;
  } catch (err) {
    console.error('Error fetching proposal:', err);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const proposals = await getAllProposals();
    // Return both UUID and ID as slugs to support both formats
    const params = proposals.flatMap(proposal => [
      { slug: proposal.uuid },
      { slug: proposal.id.toString() },
    ]);
    return params;
  } catch (error) {
    console.error('Error generating static params:', error);
    // Return empty array to prevent build failure
    return [];
  }
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProposalDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const proposal = await getProposal(slug);
  return <ProposalDetailClient proposal={proposal} />;
}

