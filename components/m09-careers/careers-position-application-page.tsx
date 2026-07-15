import Link from "next/link";
import { FooterSection } from "@/components/m01-home/footer-section";
import { MainNavbar } from "@/components/m01-home/main-navbar";
import {
  CAREERS_POSITION_APPLICATION_COPY,
  CAREERS_POSITION_APPLICATION_FIGMA_NODE,
  CAREERS_POSITION_APPLICATION_FIGMA_NODES,
  type CareerPositionApplicationConfig,
} from "@/components/m09-careers/careers-position-application-data";
import { CareersPositionApplicationForm } from "@/components/m09-careers/careers-position-application-form";
import { getCareerPositionDetailHref } from "@/components/m09-careers/careers-position-details-data";
import type { CareerPosition } from "@/components/m09-careers/careers-positions-data";
import type { AgeState } from "@/lib/age/age-state";

interface CareersPositionApplicationPageProps {
  ageState: AgeState;
  position: CareerPosition;
  application: CareerPositionApplicationConfig;
}

function Breadcrumbs({
  position,
}: {
  position: CareerPosition;
}) {
  const detailHref = getCareerPositionDetailHref(position) ?? `/careers/positions/${position.slug}`;

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex min-h-[29px] w-full max-w-[1280px] flex-wrap items-center gap-[6px] px-[24px] font-[family-name:var(--velarro-heading-button-font-family)] text-[14px] leading-none desktop:px-[80px]"
      data-section="careers-position-application-breadcrumbs"
      data-figma-node={CAREERS_POSITION_APPLICATION_FIGMA_NODES.breadcrumb}
    >
      <Link
        href="/"
        className="rounded-[5px] px-[12px] py-[6px] font-light text-text-heading"
      >
        Home
      </Link>
      <span aria-hidden="true" className="font-normal text-border-strong">
        |
      </span>
      <Link
        href="/careers"
        className="rounded-[5px] px-[12px] py-[6px] font-light text-text-heading"
      >
        Careers
      </Link>
      <span aria-hidden="true" className="font-normal text-border-strong">
        |
      </span>
      <Link
        href="/careers/positions"
        className="rounded-[5px] px-[12px] py-[6px] font-light text-text-heading"
      >
        Positions
      </Link>
      <span aria-hidden="true" className="font-normal text-border-strong">
        |
      </span>
      <Link
        href={detailHref}
        className="rounded-[5px] px-[12px] py-[6px] font-light text-text-heading"
      >
        Job description
      </Link>
      <span aria-hidden="true" className="font-normal text-border-strong">
        |
      </span>
      <span
        aria-current="page"
        className="border-b border-border-strong py-[4px] font-normal text-text-display"
      >
        Application
      </span>
    </nav>
  );
}

export function CareersPositionApplicationPage({
  ageState,
  position,
  application,
}: CareersPositionApplicationPageProps) {
  const detailHref = getCareerPositionDetailHref(position) ?? `/careers/positions/${position.slug}`;

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden bg-background-page"
      data-figma-node={CAREERS_POSITION_APPLICATION_FIGMA_NODE}
      data-route="/careers/positions/[jobId]/apply"
      data-route-audience="review"
      data-age-state={ageState}
      data-position-slug={position.slug}
    >
      <MainNavbar />
      <main className="w-full pt-[12px]">
        <Breadcrumbs position={position} />
        <section
          className="flex w-full justify-center px-[24px] pb-[80px] pt-[24px] desktop:px-[80px] desktop:pt-[32px]"
          data-section="careers-position-application"
          data-figma-node={CAREERS_POSITION_APPLICATION_FIGMA_NODES.mainContent}
        >
          <div
            className="flex w-full max-w-[1340px] flex-col items-center px-[10px]"
            data-figma-node={CAREERS_POSITION_APPLICATION_FIGMA_NODES.outerFrame}
          >
            <div
              className="flex w-full max-w-[1320px] flex-col gap-[36px]"
              data-figma-node={CAREERS_POSITION_APPLICATION_FIGMA_NODES.innerFrame}
            >
              <div
                className="flex w-full flex-col gap-[20px]"
                data-figma-node={CAREERS_POSITION_APPLICATION_FIGMA_NODES.headingGroup}
              >
                <h1
                  className="font-[family-name:var(--velarro-heading-page-font-family)] text-[length:var(--velarro-heading-page-font-size)] font-normal leading-[normal] tracking-[0] text-text-heading"
                  data-figma-node={CAREERS_POSITION_APPLICATION_FIGMA_NODES.heading}
                >
                  {CAREERS_POSITION_APPLICATION_COPY.heading}
                </h1>
                <p
                  className="font-[family-name:var(--velarro-body-default-font-family)] text-[length:var(--velarro-body-default-font-size)] font-light leading-[var(--velarro-body-default-line-height)] tracking-[0] text-text-body-text"
                  data-figma-node={CAREERS_POSITION_APPLICATION_FIGMA_NODES.description}
                >
                  {CAREERS_POSITION_APPLICATION_COPY.description}
                </p>
              </div>

              <CareersPositionApplicationForm
                config={application}
                detailHref={detailHref}
              />
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
