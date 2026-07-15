import Link from "next/link";
import { MEMBERSHIP_ASSETS } from "@/components/m09-membership/membership-assets";
import { MEMBERSHIP_CTA_COPY } from "@/components/m09-membership/membership-data";
import type { AgeState } from "@/lib/age/age-state";

interface MembershipCtaProps {
  ageState: AgeState;
}

export function MembershipCta({ ageState }: MembershipCtaProps) {
  const asset = MEMBERSHIP_ASSETS.ctaBanner;

  const buttonClassName =
    "inline-flex h-[48px] min-w-[297px] items-center justify-center rounded-radius-md border border-border-default bg-button-fill px-[24px] font-[family-name:var(--velarro-ui-elements-primary-font-family)] text-[16px] font-normal uppercase leading-none text-text-heading outline-none focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-2";

  return (
    <section
      aria-labelledby="membership-cta-heading"
      className="flex w-full justify-center px-[24px] pb-[64px] desktop:px-[56px]"
      data-section="membership-cta"
      data-figma-node="15008:38590"
    >
      <div className="relative h-[339px] w-full max-w-[1328px] overflow-hidden rounded-[24px]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(135deg,#1f1a17_0%,#2f2924_42%,#14100d_100%)]"
          data-testid="membership-cta-banner-deferred"
          data-asset-slot={asset.slot}
          data-asset-status={asset.status}
          data-figma-node={asset.figmaNodeId}
        />
        <div className="relative z-10 flex h-full flex-col justify-center gap-[16px] px-[24px] py-[32px] desktop:px-[520px]">
          <h2
            id="membership-cta-heading"
            className="max-w-[545px] font-[family-name:var(--velarro-ui-elements-primary-font-family)] text-[18px] font-normal leading-[24px] text-text-text-white"
          >
            {MEMBERSHIP_CTA_COPY.heading}
          </h2>
          <p className="max-w-[545px] font-[family-name:var(--velarro-ui-elements-form-font-family)] text-[14px] font-normal leading-[20px] text-text-text-white">
            {MEMBERSHIP_CTA_COPY.body}
          </p>
          {ageState === "over21" || ageState === "unknown" ? (
            <Link href={MEMBERSHIP_CTA_COPY.estateHref} className={buttonClassName}>
              {MEMBERSHIP_CTA_COPY.button}
            </Link>
          ) : (
            <button
              type="button"
              disabled
              aria-disabled="true"
              aria-label={`${MEMBERSHIP_CTA_COPY.button} (unavailable: The Estate is restricted for visitors under 21)`}
              className={`${buttonClassName} cursor-not-allowed opacity-100`}
            >
              {MEMBERSHIP_CTA_COPY.button}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
