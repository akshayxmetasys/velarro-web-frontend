import {
  M01_BEFORE_FOOTER_GAP_CLASS,
  M01_NAVBAR_OVERLAP_PULL_CLASS,
  M01_SECTION_STACK_GAP_CLASS,
} from "@/components/m01-home/m01-section-layout";
import { CigarCarouselSection } from "@/components/m01-home/cigar-carousel-section";
import { CigarKnowledgeSection } from "@/components/m01-home/cigar-knowledge-section";
import { ClothierSection } from "@/components/m01-home/clothier-section";
import { EstateCollectionSection } from "@/components/m01-home/estate-collection-section";
import { FooterSection } from "@/components/layout/main-footer";
import { CollectorHeroSection } from "@/components/m01-home/collector-hero-section";
import { GiftingSection } from "@/components/m01-home/gifting-section";
import { MainNavbar } from "@/components/layout/main-navbar";
import { RoasteryHeroSection } from "@/components/m01-home/roastery-hero-section";
import { StoreLoungeSection } from "@/components/m01-home/store-lounge-section";

/**
 * Over-21 homepage composition (V-01 shell rhythm).
 * Section-internal fidelity belongs to V-02 through V-05.
 * MainFooter internals are owned by V-05 - consumed only here.
 */
export function Over21HomePage() {
  return (
    <div
      className="min-h-screen w-full bg-background-page"
      data-m01-shell="over21"
    >
      <MainNavbar />
      <main
        className={`flex w-full flex-col ${M01_SECTION_STACK_GAP_CLASS} ${M01_NAVBAR_OVERLAP_PULL_CLASS} ${M01_BEFORE_FOOTER_GAP_CLASS}`}
        data-m01-section-stack="over21"
      >
        <CollectorHeroSection />
        <CigarCarouselSection />
        <RoasteryHeroSection />
        <CigarKnowledgeSection />
        <GiftingSection />
        <ClothierSection />
        <EstateCollectionSection />
        <StoreLoungeSection />
      </main>
      <FooterSection />
    </div>
  );
}
