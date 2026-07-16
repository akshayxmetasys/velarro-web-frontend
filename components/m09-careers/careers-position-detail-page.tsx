import Link from "next/link";
import { FooterSection } from "@/components/layout/main-footer";
import { MainNavbar } from "@/components/layout/main-navbar";
import { CareersPositionDetailSearch } from "@/components/m09-careers/careers-position-detail-search";
import { CareersPositionDetailSections } from "@/components/m09-careers/careers-position-detail-sections";
import {
  CAREERS_POSITION_DETAIL_FIGMA_NODE,
  CAREERS_POSITION_DETAIL_FIGMA_NODES,
  type CareerPositionDetail,
} from "@/components/m09-careers/careers-position-details-data";
import type { CareerPosition } from "@/components/m09-careers/careers-positions-data";
import type { AgeState } from "@/lib/age/age-state";

interface CareersPositionDetailPageProps {
  ageState: AgeState;
  position: CareerPosition;
  detail: CareerPositionDetail;
}

function Breadcrumbs() {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex min-h-[29px] w-full max-w-[1280px] flex-wrap items-center gap-[6px] px-[24px] font-[family-name:var(--velarro-heading-button-font-family)] text-[14px] leading-none desktop:px-[80px]"
      data-section="careers-position-detail-breadcrumbs"
      data-figma-node={CAREERS_POSITION_DETAIL_FIGMA_NODES.breadcrumb}
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
      <Link
        href="/careers/positions"
        className="rounded-[5px] px-[12px] py-[6px] font-light text-text-heading"
      >
        Positions
      </Link>
      <span aria-hidden="true" className="text-border-strong">
        |
      </span>
      <span
        aria-current="page"
        className="border-b border-border-strong py-[4px] font-normal text-text-display"
      >
        Job description
      </span>
    </nav>
  );
}

function PositionMetadata({ detail }: { detail: CareerPositionDetail }) {
  const metadata = [
    { label: "Publication Date", value: detail.publicationDate },
    { label: "Address", value: detail.address },
    { label: "Employment", value: detail.employment },
    { label: "Employment Degree", value: detail.employmentDegree },
  ] as const;

  return (
    <dl
      className="flex w-full max-w-[332px] flex-col gap-[12px]"
      data-figma-node={CAREERS_POSITION_DETAIL_FIGMA_NODES.metadata}
    >
      {metadata.map((item) => (
        <div key={item.label} className="flex flex-col gap-[4px]">
          <dt className="font-[family-name:var(--velarro-body-default-font-family)] text-[20px] font-medium leading-[28px] text-text-heading">
            {item.label}
          </dt>
          <dd className="font-[family-name:var(--velarro-body-default-font-family)] text-[20px] font-light leading-[28px] text-text-body-text">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function HrContactPanel({ detail }: { detail: CareerPositionDetail }) {
  const { hrContact } = detail;

  return (
    <aside
      aria-labelledby="careers-position-hr-heading"
      className="w-full px-0 py-[16px] drop-shadow-[0px_20px_20px_rgba(28,28,25,0.04)] desktop:w-[345px] desktop:shrink-0"
      data-contact-verification-status={hrContact.verificationStatus}
      data-figma-node={CAREERS_POSITION_DETAIL_FIGMA_NODES.hrContact}
    >
      <div
        className="flex w-full flex-col gap-[16px]"
        data-figma-node="13148:15978"
      >
        <h2
          id="careers-position-hr-heading"
          className="text-left font-[family-name:var(--velarro-heading-page-font-family)] text-[length:var(--velarro-heading-page-font-size)] font-normal leading-[normal] tracking-[0] text-text-display"
          data-careers-typography="hr-contact-title"
          data-figma-node="13148:15979"
        >
          HR Contact
        </h2>
        <div
          className="flex flex-col text-left font-[family-name:var(--velarro-body-default-font-family)] text-[length:var(--velarro-body-default-font-size)] font-light leading-[var(--velarro-body-default-line-height)] text-text-heading"
          data-figma-node="13148:15981"
        >
          <p>{hrContact.name}</p>
          <p>{hrContact.role}</p>
        </div>
        <div
          className="flex flex-col gap-[8px] text-left font-[family-name:var(--velarro-body-default-font-family)] text-[length:var(--velarro-body-default-font-size)] font-light leading-[var(--velarro-body-default-line-height)] text-color-info-links"
          data-figma-node="13148:15982"
        >
          <p>{hrContact.email}</p>
          <p>{hrContact.phone}</p>
        </div>
      </div>
    </aside>
  );
}

export function CareersPositionDetailPage({
  ageState,
  position,
  detail,
}: CareersPositionDetailPageProps) {
  return (
    <div
      className="min-h-screen w-full overflow-x-hidden bg-background-page"
      data-figma-node={CAREERS_POSITION_DETAIL_FIGMA_NODE}
      data-route="/careers/positions/[jobId]"
      data-route-audience="review"
      data-age-state={ageState}
      data-position-slug={position.slug}
    >
      <MainNavbar />
      <main className="w-full pt-[12px]">
        <Breadcrumbs />
        <section
          className="flex w-full justify-center px-[24px] pb-[64px] pt-[24px] desktop:px-[80px] desktop:pb-[80px] desktop:pt-[32px]"
          data-section="careers-position-detail"
          data-figma-node={CAREERS_POSITION_DETAIL_FIGMA_NODES.mainLayout}
        >
          <div
            className="flex w-full max-w-[1280px] flex-col gap-[48px]"
            data-figma-node={CAREERS_POSITION_DETAIL_FIGMA_NODES.innerContent}
          >
            <CareersPositionDetailSearch />

            <div
              className="flex w-full flex-col gap-[24px]"
              data-figma-node={CAREERS_POSITION_DETAIL_FIGMA_NODES.detailWrapper}
            >
              <div
                className="flex w-full flex-col gap-[32px]"
                data-figma-node={CAREERS_POSITION_DETAIL_FIGMA_NODES.headingWrapper}
              >
                <h1
                  className="font-[family-name:var(--velarro-heading-page-font-family)] text-[32px] font-normal leading-none tracking-[0] text-text-display"
                  data-figma-node={CAREERS_POSITION_DETAIL_FIGMA_NODES.title}
                >
                  {position.title}
                </h1>
                <PositionMetadata detail={detail} />
              </div>

              <div
                className="flex w-full flex-col gap-[32px] desktop:flex-row desktop:gap-[48px] xl:gap-[200px]"
                data-figma-node={CAREERS_POSITION_DETAIL_FIGMA_NODES.mainColumns}
              >
                <div
                  className="min-w-0 flex-1 desktop:max-w-[738px]"
                  data-figma-node={CAREERS_POSITION_DETAIL_FIGMA_NODES.descriptionColumn}
                >
                  <CareersPositionDetailSections detail={detail} />
                </div>
                <HrContactPanel detail={detail} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
