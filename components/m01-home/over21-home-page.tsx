import { CollectorHeroSection } from "@/components/m01-home/collector-hero-section";
import { MainNavbar } from "@/components/m01-home/main-navbar";

export function Over21HomePage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background-page">
      <MainNavbar />
      <main className="w-full">
        <CollectorHeroSection />
      </main>
    </div>
  );
}
