import Link from "next/link";
import { FooterSection } from "@/components/layout/main-footer";
import { MainNavbar } from "@/components/layout/main-navbar";
import { PARTNER_ASSETS } from "@/components/m09-partner/partner-assets";
import { PartnerForm } from "@/components/m09-partner/partner-form";
import {
  PARTNER_COPY,
  PARTNER_FIGMA_NODE,
} from "@/components/m09-partner/partner-data";
import type { AgeState } from "@/lib/age/age-state";

interface PartnerPageProps {
  ageState: AgeState;
}

function Breadcrumbs() {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex min-h-[29px] items-center gap-[6px] px-[24px] font-[family-name:var(--velarro-heading-button-font-family)] text-[14px] leading-none desktop:px-[47px]"
      data-section="partner-breadcrumbs"
      data-figma-node="15010:23114"
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
      <span
        aria-current="page"
        className="border-b border-border-strong py-[4px] font-normal text-text-display"
      >
        Partner
      </span>
    </nav>
  );
}

function DeferredPartnerImage() {
  const asset = PARTNER_ASSETS.partnerMainImage;

  return (
    <div
      aria-hidden="true"
      className="relative aspect-[638/885] w-full overflow-hidden rounded-[31px] border border-border-default bg-[linear-gradient(145deg,#211a16_0%,#3a312a_44%,#14100d_100%)] desktop:h-[885px] desktop:w-[638px] desktop:shrink-0"
      data-asset-status={asset.status}
      data-asset-slot={asset.slot}
      data-asset-url-status="none"
      data-figma-node={asset.figmaNodeId}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(216,201,180,0.22),transparent_30%),linear-gradient(90deg,rgba(252,251,248,0.04),rgba(21,20,20,0.18))]" />
      <div className="absolute inset-0 bg-[rgba(154,151,151,0.25)]" />
      <div className="absolute inset-[28px] rounded-[24px] border border-border-default/25" />
      <div className="absolute left-[22%] top-0 h-full w-px bg-border-default/20" />
      <div className="absolute right-[24%] top-0 h-full w-px bg-border-default/15" />
      <div className="absolute bottom-[19%] left-[12%] h-px w-[76%] bg-border-default/15" />
    </div>
  );
}

function PartnerContent() {
  return (
    <section
      aria-labelledby="partner-heading"
      className="flex w-full justify-center px-[24px] pb-[80px] pt-[24px] desktop:px-[80px] desktop:pb-[80px]"
      data-section="partner-content"
      data-figma-node="14670:42189"
    >
      <div className="flex w-full max-w-[1279px] flex-col gap-[32px] rounded-[30px] border border-border-default bg-background-page p-[20px] desktop:h-[885px] desktop:flex-row desktop:items-center desktop:p-0 desktop:pr-[36px]">
        <DeferredPartnerImage />
        <div
          className="flex w-full flex-col items-center gap-[14px] desktop:w-[564px] desktop:shrink-0"
          data-figma-node="14670:42192"
        >
          <h1
            id="partner-heading"
            className="w-full text-center font-[family-name:var(--velarro-heading-page-font-family)] text-[32px] font-normal leading-none tracking-[0] text-text-display"
            data-figma-node="14670:42194"
          >
            {PARTNER_COPY.heading}
          </h1>
          <PartnerForm />
        </div>
      </div>
    </section>
  );
}

export function PartnerPage({ ageState }: PartnerPageProps) {
  return (
    <div
      className="min-h-screen w-full overflow-x-hidden bg-background-page"
      data-figma-node={PARTNER_FIGMA_NODE}
      data-route="/partner"
      data-route-audience="review"
      data-age-state={ageState}
    >
      <MainNavbar />
      <main className="w-full pt-[12px]">
        <Breadcrumbs />
        <PartnerContent />
      </main>
      <FooterSection />
    </div>
  );
}
