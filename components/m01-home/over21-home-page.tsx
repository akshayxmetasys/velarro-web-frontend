import { CigarCarouselSection } from "@/components/m01-home/cigar-carousel-section";
import { CollectorHeroSection } from "@/components/m01-home/collector-hero-section";
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
      </main>
    </div>
  );
}
