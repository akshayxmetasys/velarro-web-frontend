import { MEMBERSHIP_ASSETS } from "@/components/m09-membership/membership-assets";
import type { MembershipTier } from "@/components/m09-membership/membership-data";

function InfoIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 18 18"
      className="h-[18px] w-[18px] text-icon-default"
      fill="none"
    >
      <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M9 8V12.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <circle cx="9" cy="5.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

function DeferredTierEmblem({
  tier,
}: {
  tier: MembershipTier;
}) {
  const asset = MEMBERSHIP_ASSETS[tier.assetKey];

  return (
    <div
      aria-hidden="true"
      className="absolute left-1/2 top-[81px] z-10 h-[206px] w-[124px] -translate-x-1/2 overflow-hidden rounded-[8px] border border-border-default/40 bg-[linear-gradient(145deg,rgba(216,201,180,0.28)_0%,rgba(246,242,235,0.92)_48%,rgba(138,121,96,0.18)_100%)]"
      data-testid={tier.testId}
      data-asset-slot={asset.slot}
      data-asset-status={asset.status}
      data-figma-node={asset.figmaNodeId}
    >
      <div className="absolute inset-[12px] rounded-[inherit] border border-border-default/50" />
      <div className="absolute left-1/2 top-1/2 h-[58%] w-px -translate-x-1/2 -translate-y-1/2 bg-border-default/30" />
      <div className="absolute left-1/2 top-1/2 h-px w-[58%] -translate-x-1/2 -translate-y-1/2 bg-border-default/30" />
    </div>
  );
}

export function MembershipTierCard({ tier }: { tier: MembershipTier }) {
  return (
    <article
      aria-label={tier.accessibleTierName}
      className="relative w-[248px] shrink-0"
      data-membership-tier-card
      data-membership-tier-id={tier.id}
      data-figma-node={tier.figmaGroupNode}
    >
      <div className="relative h-[624px] w-[248px]">
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 h-[222px] w-full rounded-t-[12px] border border-border-default bg-[rgba(239,231,220,0.4)]"
        />
        <DeferredTierEmblem tier={tier} />
        <div className="absolute left-0 top-[206px] flex h-[418px] w-full flex-col items-center overflow-hidden rounded-[12px] border border-border-default bg-background-card px-[16px] pb-[24px] pt-[86px] text-center">
          <div className="flex flex-col items-center gap-[4px]">
            <p className="font-[family-name:var(--velarro-ui-elements-primary-font-family)] text-[16px] font-normal uppercase leading-none tracking-[0] text-text-heading">
              {tier.brand}
            </p>
            <h2 className="font-[family-name:var(--velarro-heading-page-font-family)] text-[24px] font-normal leading-none tracking-[0] text-text-heading">
              {tier.tier}
            </h2>
            <p className="font-[family-name:var(--velarro-ui-elements-form-font-family)] text-[14px] font-normal leading-none text-text-body-text">
              {tier.subtitle}
            </p>
          </div>

          <div
            aria-hidden="true"
            className="my-[16px] h-px w-full max-w-[216px] bg-border-default"
          />

          <p className="min-h-[40px] max-w-[216px] font-[family-name:var(--velarro-ui-elements-form-font-family)] text-[14px] font-normal leading-[20px] text-text-body-text">
            {tier.description}
          </p>

          <div
            aria-hidden="true"
            className="my-[24px] h-px w-full max-w-[248px] bg-border-default"
          />

          <div className="flex flex-col items-center gap-[4px]">
            <p className="font-[family-name:var(--velarro-heading-page-font-family)] text-[24px] font-normal leading-none tracking-[0] text-text-heading">
              {tier.threshold}
            </p>
            <p className="font-[family-name:var(--velarro-body-small-font-family)] text-[12px] font-light leading-none text-text-body-text">
              {tier.thresholdLabel}
            </p>
          </div>

          <div className="mt-[24px]">
            <InfoIcon />
          </div>
        </div>
      </div>
    </article>
  );
}
