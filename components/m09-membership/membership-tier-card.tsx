import Image from "next/image";
import type { CSSProperties } from "react";
import {
  MEMBERSHIP_ASSETS,
  type MembershipEmblemCrop,
} from "@/components/m09-membership/membership-assets";
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

function emblemImageStyle(crop: MembershipEmblemCrop): {
  className: string;
  style?: CSSProperties;
} {
  if (crop.mode === "cover") {
    return {
      className: "object-cover",
      style: { objectPosition: crop.objectPosition },
    };
  }

  return {
    className: "max-w-none",
    style: {
      width: crop.width,
      height: crop.height,
      left: crop.left,
      top: crop.top,
      maxWidth: "none",
    },
  };
}

function TierEmblem({ tier }: { tier: MembershipTier }) {
  const asset = MEMBERSHIP_ASSETS[tier.assetKey];
  const imageProps = emblemImageStyle(asset.cardCrop);

  return (
    <div
      aria-hidden="true"
      className="absolute left-1/2 z-10 w-[124px] -translate-x-1/2 overflow-hidden rounded-[8px]"
      style={{
        top: asset.cardEmblemTopPx,
        height: asset.cardEmblemHeightPx,
      }}
      data-testid={tier.testId}
      data-asset-slot={asset.slot}
      data-asset-status={asset.status}
      data-figma-node={asset.figmaNodeId}
      data-membership-emblem-width="124"
      data-membership-emblem-height={String(asset.cardEmblemHeightPx)}
    >
      {asset.cardCrop.mode === "cover" ? (
        <Image
          src={asset.path}
          alt=""
          fill
          unoptimized
          className={imageProps.className}
          style={imageProps.style}
          sizes="124px"
        />
      ) : (
        <Image
          src={asset.path}
          alt=""
          width={asset.naturalWidth}
          height={asset.naturalHeight}
          unoptimized
          className={`absolute ${imageProps.className}`}
          style={imageProps.style}
          sizes="124px"
        />
      )}
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
      data-membership-card-width="248"
      data-membership-card-height="624"
    >
      <div className="relative h-[624px] w-[248px]">
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 h-[222px] w-full rounded-t-[12px] border border-border-default bg-[rgba(239,231,220,0.4)]"
        />
        <TierEmblem tier={tier} />
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
