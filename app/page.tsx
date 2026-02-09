"use client";

import Hero from './components/Hero';
import InspirationSection from './components/InspirationSection';
import CampaignGallerySection from './components/CampaignGallerySection';
import ManifestoHighlightsSection from './components/ManifestoHighlightsSection';
import QuickServicesSection from './components/QuickServicesSection';
import CtaSection from './components/CtaSection';
import WelcomeModal from './components/WelcomeModal';

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <WelcomeModal />
      <Hero />

      {/* Manifesto Highlights */}
      <ManifestoHighlightsSection />

      {/* Gallery Preview */}
      <CampaignGallerySection />

      {/* Quotes Section */}
      <InspirationSection />

      {/* Quick Services Section */}
      <QuickServicesSection />

      {/* CTA Section */}
      <CtaSection />
    </main>
  );
}
