import { CigarCarouselSection } from "@/components/m01-home/cigar-carousel-section";
import { CigarKnowledgeSection } from "@/components/m01-home/cigar-knowledge-section";
import { ClothierSection } from "@/components/m01-home/clothier-section";
import { EstateCollectionSection } from "@/components/m01-home/estate-collection-section";
import { CollectorHeroSection } from "@/components/m01-home/collector-hero-section";
import { GiftingSection } from "@/components/m01-home/gifting-section";
import { MainNavbar } from "@/components/m01-home/main-navbar";
import { RoasteryHeroSection } from "@/components/m01-home/roastery-hero-section";

export function Over21HomePage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background-page">
      <MainNavbar />
      <main className="w-full">
        <CollectorHeroSection />
        <CigarCarouselSection />
        <RoasteryHeroSection />
        <CigarKnowledgeSection />
        <GiftingSection />
        <ClothierSection />
        <EstateCollectionSection />
      </main>
    </div>
  );
}
