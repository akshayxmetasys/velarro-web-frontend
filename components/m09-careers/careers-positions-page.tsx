import Link from "next/link";
import { FooterSection } from "@/components/layout/main-footer";
import { MainNavbar } from "@/components/layout/main-navbar";
import { CareersPositionsSearch } from "@/components/m09-careers/careers-positions-search";
import {
  CAREERS_POSITIONS_FIGMA_NODE,
  CAREERS_POSITIONS_FIGMA_NODES,
} from "@/components/m09-careers/careers-positions-data";
import type { AgeState } from "@/lib/age/age-state";

interface CareersPositionsPageProps {
  ageState: AgeState;
  initialQuery?: string;
}

function Breadcrumbs() {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex min-h-[29px] w-full max-w-[1280px] items-center gap-[6px] px-[24px] font-[family-name:var(--velarro-heading-button-font-family)] text-[14px] leading-none desktop:px-[80px]"
      data-section="careers-positions-breadcrumbs"
      data-figma-node={CAREERS_POSITIONS_FIGMA_NODES.breadcrumb}
    >
      <Link
        href="/"
        className="rounded-[5px] px-[12px] py-[6px] font-light text-text-heading"
      >
        Home
      </Link>
      <span aria-hidden="true" className="text-border-strong">
        |
      </span>
      <Link
        href="/careers"
        className="rounded-[5px] px-[12px] py-[6px] font-light text-text-heading"
      >
        Careers
      </Link>
      <span aria-hidden="true" className="text-border-strong">
        |
      </span>
      <span
        aria-current="page"
        className="border-b border-border-strong py-[4px] font-normal text-text-display"
      >
        Positions
      </span>
    </nav>
  );
}

export function CareersPositionsPage({
  ageState,
  initialQuery = "",
}: CareersPositionsPageProps) {
  return (
    <div
      className="min-h-screen w-full overflow-x-hidden bg-background-page"
      data-figma-node={CAREERS_POSITIONS_FIGMA_NODE}
      data-route="/careers/positions"
      data-route-audience="review"
      data-age-state={ageState}
    >
      <MainNavbar />
      <main className="w-full pt-[12px]">
        <Breadcrumbs />
        <section
          aria-labelledby="careers-positions-page-heading"
          className="flex w-full justify-center px-[24px] pb-[64px] pt-[24px] desktop:px-[80px] desktop:pb-[80px] desktop:pt-[32px]"
          data-section="careers-positions"
        >
          <h1 id="careers-positions-page-heading" className="sr-only">
            Careers positions
          </h1>
          <CareersPositionsSearch initialQuery={initialQuery} />
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
