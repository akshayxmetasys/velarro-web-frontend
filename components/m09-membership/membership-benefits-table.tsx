import Image from "next/image";
import type { CSSProperties } from "react";
import {
  MEMBERSHIP_ASSETS,
  type MembershipEmblemCrop,
} from "@/components/m09-membership/membership-assets";
import {
  MEMBERSHIP_BENEFITS_COPY,
  MEMBERSHIP_BENEFIT_ROWS,
  MEMBERSHIP_BENEFIT_TIER_COLUMNS,
  MEMBERSHIP_FIGMA_NODES,
  type MembershipBenefitTierId,
} from "@/components/m09-membership/membership-data";

function IncludedIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 37"
      className="h-[28px] w-[28px] text-text-heading"
      fill="none"
    >
      <path
        d="M8 18.5L16.5 27L32 11"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UnavailableIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 31 31"
      className="h-[24px] w-[24px] text-text-secondary-body-text"
      fill="none"
    >
      <path
        d="M8 15.5H23"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
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

function AvailabilityCell({
  included,
  tierAccessibleName,
}: {
  included: boolean;
  tierAccessibleName: string;
}) {
  const label = included
    ? `Included in ${tierAccessibleName}`
    : `Not included in ${tierAccessibleName}`;

  return (
    <td className="px-[12px] py-[16px] text-center align-middle">
      <span className="inline-flex min-h-[37px] min-w-[40px] items-center justify-center">
        {included ? <IncludedIcon /> : <UnavailableIcon />}
        <span className="sr-only">{label}</span>
      </span>
    </td>
  );
}

function TableHeaderEmblem({
  assetKey,
  figmaNodeId,
}: {
  assetKey: (typeof MEMBERSHIP_BENEFIT_TIER_COLUMNS)[number]["assetKey"];
  figmaNodeId: string;
}) {
  const asset = MEMBERSHIP_ASSETS[assetKey];
  const imageProps = emblemImageStyle(asset.tableCrop);

  return (
    <div
      aria-hidden="true"
      className="relative h-[90px] w-[62px] overflow-hidden rounded-[8px]"
      data-membership-table-emblem={assetKey}
      data-asset-slot={asset.slot}
      data-asset-status={asset.status}
      data-figma-node={figmaNodeId}
    >
      {asset.tableCrop.mode === "cover" ? (
        <Image
          src={asset.path}
          alt=""
          fill
          unoptimized
          className={imageProps.className}
          style={imageProps.style}
          sizes="62px"
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
          sizes="62px"
        />
      )}
    </div>
  );
}

export function MembershipBenefitsTable() {
  return (
    <section
      aria-labelledby="membership-benefits-heading"
      className="flex w-full min-w-0 max-w-full justify-center px-[24px] pb-[48px] desktop:px-[45px]"
      data-section="membership-benefits"
      data-figma-node={MEMBERSHIP_FIGMA_NODES.benefitsSection}
    >
      <div className="flex w-full max-w-[1350px] min-w-0 flex-col gap-[24px]">
        <h2
          id="membership-benefits-heading"
          className="text-center font-[family-name:var(--velarro-heading-page-font-family)] text-[28px] font-normal leading-none tracking-[0] text-text-heading desktop:text-[32px]"
          data-figma-node={MEMBERSHIP_FIGMA_NODES.benefitsTitle}
          data-membership-benefits-heading
        >
          {MEMBERSHIP_BENEFITS_COPY.heading}
        </h2>

        <div className="w-full min-w-0 max-w-full overflow-x-clip">
          <div
            role="region"
            aria-label="Membership tier benefits comparison. Scroll horizontally to view all columns."
            tabIndex={0}
            className="w-full min-w-0 max-w-full overflow-x-auto rounded-[12px] bg-background-section px-[24px] py-[24px] [contain:inline-size] [transform:translateZ(0)] desktop:px-[40px]"
            data-figma-node={MEMBERSHIP_FIGMA_NODES.comparisonTable}
            data-membership-scroll-region="benefits"
          >
          <p className="mb-[12px] font-[family-name:var(--velarro-body-label-font-family)] text-[14px] font-light leading-none text-text-secondary-body-text desktop:sr-only">
            Scroll horizontally to view the full benefits comparison.
          </p>
          <table className="w-full min-w-[980px] table-fixed border-collapse">
            <caption className="sr-only">
              Comparison of Velarro membership tier benefits
            </caption>
            <colgroup>
              <col className="w-[286px]" />
              {MEMBERSHIP_BENEFIT_TIER_COLUMNS.map((column) => (
                <col key={column.id} />
              ))}
            </colgroup>
            <thead data-figma-node={MEMBERSHIP_FIGMA_NODES.tableHeadingRegion}>
              <tr className="border-b border-border-default">
                <th
                  scope="col"
                  className="pb-[16px] text-left align-bottom font-[family-name:var(--velarro-body-default-font-family)] text-[20px] font-medium leading-none text-text-heading"
                >
                  {MEMBERSHIP_BENEFITS_COPY.columnLabel}
                </th>
                {MEMBERSHIP_BENEFIT_TIER_COLUMNS.map((column) => (
                  <th
                    key={column.id}
                    scope="col"
                    className="pb-[16px] text-center align-bottom font-[family-name:var(--velarro-body-label-font-family)] text-[18px] font-light leading-none text-text-body-text"
                  >
                    <span className="sr-only">{column.accessibleName}</span>
                    <span
                      aria-hidden="true"
                      className="inline-flex flex-col items-center gap-[12px]"
                    >
                      <TableHeaderEmblem
                        assetKey={column.assetKey}
                        figmaNodeId={column.figmaEmblemNode}
                      />
                      <span className="whitespace-nowrap">{column.label}</span>
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody data-figma-node={MEMBERSHIP_FIGMA_NODES.benefitRows}>
              {MEMBERSHIP_BENEFIT_ROWS.map((benefit) => (
                <tr
                  key={benefit.id}
                  className="border-b border-border-default last:border-b-0"
                  data-membership-benefit-row={benefit.id}
                >
                  <th
                    scope="row"
                    className="py-[16px] pr-[24px] text-left align-middle"
                  >
                    <div className="flex min-h-[85px] flex-col justify-center gap-[6px]">
                      <span className="font-[family-name:var(--velarro-body-default-font-family)] text-[20px] font-medium leading-none text-text-heading">
                        {benefit.title}
                      </span>
                      <span className="font-[family-name:var(--velarro-body-label-font-family)] text-[18px] font-light leading-none text-text-body-text">
                        {benefit.description}
                      </span>
                    </div>
                  </th>
                  {MEMBERSHIP_BENEFIT_TIER_COLUMNS.map((column) => (
                    <AvailabilityCell
                      key={`${benefit.id}-${column.id}`}
                      included={
                        benefit.availability[
                          column.id as MembershipBenefitTierId
                        ]
                      }
                      tierAccessibleName={column.accessibleName}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </section>
  );
}
