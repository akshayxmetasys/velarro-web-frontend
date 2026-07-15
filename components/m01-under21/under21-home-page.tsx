import { UNDER21_HOME_PAGE_FIGMA_NODE } from "@/components/m01-under21/under21-data";
import { Under21Navbar } from "@/components/m01-under21/under21-navbar";
import { Under21RoasteryHero } from "@/components/m01-under21/under21-roastery-hero";

export function Under21HomePage() {
  return (
    <div
      className="min-h-screen w-full overflow-x-hidden bg-background-page"
      data-figma-node={UNDER21_HOME_PAGE_FIGMA_NODE}
    >
      <Under21Navbar />
      <main className="w-full">
        <Under21RoasteryHero />
      </main>
    </div>
  );
}
