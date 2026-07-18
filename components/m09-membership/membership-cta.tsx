import Image from "next/image";
import Link from "next/link";
import { MEMBERSHIP_ASSETS } from "@/components/m09-membership/membership-assets";
import {
  MEMBERSHIP_CTA_COPY,
  MEMBERSHIP_FIGMA_NODES,
} from "@/components/m09-membership/membership-data";
import {
  assertApprovedImageUrl,
  M01_HOME_APPROVED_IMAGES,
} from "@/lib/assets/approved-image-hosts";
import type { AgeState } from "@/lib/age/age-state";

interface MembershipCtaProps {
  ageState: AgeState;
}

const CTA_BRAND_LOGO_URL = assertApprovedImageUrl(
  M01_HOME_APPROVED_IMAGES.navbarLogoScript,
);

export function MembershipCta({ ageState }: MembershipCtaProps) {
  const asset = MEMBERSHIP_ASSETS.ctaBanner;

  const buttonClassName =
    "inline-flex h-[48px] min-w-[297px] items-center justify-center rounded-radius-md border border-border-default bg-button-fill px-[24px] font-[family-name:var(--velarro-ui-elements-primary-font-family)] text-[16px] font-normal uppercase leading-none text-text-heading outline-none focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-2";

  return (
    <section
      aria-labelledby="membership-cta-heading"
      className="flex w-full justify-center px-[24px] pb-[64px] desktop:px-[56px]"
      data-section="membership-cta"
      data-figma-node={MEMBERSHIP_FIGMA_NODES.ctaSection}
    >
      <div
        className="relative h-[339px] w-full max-w-[1328px] overflow-hidden rounded-[24px]"
        data-membership-cta-panel
      >
        <div
          className="absolute inset-0"
          data-testid="membership-cta-banner"
          data-asset-slot={asset.slot}
          data-asset-status={asset.status}
          data-figma-node={asset.figmaNodeId}
        >
          <Image
            src={asset.path}
            alt=""
            fill
            unoptimized
            className="object-cover"
            style={{ objectPosition: "50% 50%" }}
            sizes="(min-width: 1328px) 1328px, 100vw"
          />
        </div>
        <div className="relative z-10 flex h-full flex-col justify-center gap-[16px] px-[24px] py-[32px] desktop:absolute desktop:left-[520px] desktop:top-0 desktop:w-[545px] desktop:justify-start desktop:px-0 desktop:pt-[79px]">
          <h2
            id="membership-cta-heading"
            className="max-w-[545px] font-[family-name:var(--velarro-ui-elements-primary-font-family)] text-[18px] font-normal leading-[24px] text-text-text-white desktop:text-center"
            data-figma-node={MEMBERSHIP_FIGMA_NODES.ctaHeading}
          >
            {MEMBERSHIP_CTA_COPY.heading}
          </h2>
          <p
            className="max-w-[545px] font-[family-name:var(--velarro-ui-elements-form-font-family)] text-[14px] font-normal leading-[20px] text-text-text-white"
            data-figma-node={MEMBERSHIP_FIGMA_NODES.ctaBody}
          >
            {MEMBERSHIP_CTA_COPY.body}
          </p>
          <div
            className="desktop:pt-[48px]"
            data-figma-node={MEMBERSHIP_FIGMA_NODES.ctaControl}
          >
            {ageState === "over21" || ageState === "unknown" ? (
              <Link
                href={MEMBERSHIP_CTA_COPY.estateHref}
                className={buttonClassName}
              >
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

        <div
          className="pointer-events-none absolute bottom-[48px] right-[46px] hidden w-[173px] desktop:block"
          data-figma-node={MEMBERSHIP_FIGMA_NODES.ctaLogoGroup}
          data-membership-cta-brand
        >
          <Image
            src={CTA_BRAND_LOGO_URL}
            alt="Velarro Estate since 1919"
            width={173}
            height={54}
            className="h-auto w-[173px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}
