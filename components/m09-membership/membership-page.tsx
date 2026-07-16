import Link from "next/link";
import { FooterSection } from "@/components/m01-home/footer-section";
import { MainNavbar } from "@/components/m01-home/main-navbar";
import { MembershipBenefitsTable } from "@/components/m09-membership/membership-benefits-table";
import { MembershipCta } from "@/components/m09-membership/membership-cta";
import {
  MEMBERSHIP_FIGMA_NODE,
  MEMBERSHIP_FIGMA_NODES,
  MEMBERSHIP_TIERS,
} from "@/components/m09-membership/membership-data";
import { MembershipTierCard } from "@/components/m09-membership/membership-tier-card";
import type { AgeState } from "@/lib/age/age-state";

interface MembershipPageProps {
  ageState: AgeState;
}

function Breadcrumbs() {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex min-h-[29px] w-full max-w-[1328px] items-center gap-[6px] px-[24px] font-[family-name:var(--velarro-heading-button-font-family)] text-[14px] leading-none desktop:px-[56px]"
      data-section="membership-breadcrumbs"
      data-figma-node={MEMBERSHIP_FIGMA_NODES.breadcrumb}
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
        Membership
      </span>
    </nav>
  );
}

function TierSection() {
  return (
    <section
      aria-label="Velarro membership tiers"
      className="flex w-full justify-center px-[24px] pb-[24px] pt-[32px] desktop:px-[38px]"
      data-section="membership-tiers"
      data-figma-node={MEMBERSHIP_FIGMA_NODES.tierSection}
    >
      <div
        className="w-full max-w-[1364px] overflow-x-auto rounded-[12px] bg-background-section px-[24px] py-[24px] desktop:px-[46px]"
        data-figma-node={MEMBERSHIP_FIGMA_NODES.tierContainer}
      >
        <div className="flex min-w-max gap-[8px] desktop:min-w-0 desktop:justify-center">
          {MEMBERSHIP_TIERS.map((tier) => (
            <MembershipTierCard key={tier.id} tier={tier} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function MembershipPage({ ageState }: MembershipPageProps) {
  return (
    <div
      className="min-h-screen w-full overflow-x-hidden bg-background-page"
      data-figma-node={MEMBERSHIP_FIGMA_NODE}
      data-route="/membership"
      data-route-audience="review"
      data-age-state={ageState}
    >
      <MainNavbar />
      <main id="main-content" className="w-full pt-[12px]">
        <TierSection />
        <Breadcrumbs />
        <MembershipBenefitsTable />
        <MembershipCta ageState={ageState} />
      </main>
      <FooterSection />
    </div>
  );
}
