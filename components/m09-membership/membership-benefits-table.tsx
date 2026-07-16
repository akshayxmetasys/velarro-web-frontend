import {
  MEMBERSHIP_BENEFITS_COPY,
  MEMBERSHIP_BENEFIT_ROWS,
  MEMBERSHIP_BENEFIT_TIER_COLUMNS,
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

export function MembershipBenefitsTable() {
  return (
    <section
      aria-labelledby="membership-benefits-heading"
      className="flex w-full min-w-0 max-w-full justify-center px-[24px] pb-[48px] desktop:px-[45px]"
      data-section="membership-benefits"
      data-figma-node="15008:38412"
    >
      <div className="flex w-full max-w-[1350px] min-w-0 flex-col gap-[24px]">
        <h2
          id="membership-benefits-heading"
          className="text-center font-[family-name:var(--velarro-heading-page-font-family)] text-[28px] font-normal leading-none tracking-[0] text-text-heading desktop:text-[32px]"
          data-figma-node="15008:38413"
        >
          {MEMBERSHIP_BENEFITS_COPY.heading}
        </h2>

        <div
          role="region"
          aria-label="Membership tier benefits comparison. Scroll horizontally to view all columns."
          tabIndex={0}
          className="w-full min-w-0 max-w-full overflow-x-auto rounded-[12px] bg-background-section px-[24px] py-[24px] desktop:px-[40px]"
          data-figma-node="15008:38417"
          data-membership-scroll-region="benefits"
        >
          <p className="mb-[12px] font-[family-name:var(--velarro-body-label-font-family)] text-[14px] font-light leading-none text-text-secondary-body-text desktop:sr-only">
            Scroll horizontally to view the full benefits comparison.
          </p>
          <table className="w-full min-w-[980px] border-collapse">
            <caption className="sr-only">
              Comparison of Velarro membership tier benefits
            </caption>
            <thead>
              <tr className="border-b border-border-default">
                <th
                  scope="col"
                  className="w-[286px] pb-[16px] text-left align-bottom font-[family-name:var(--velarro-body-default-font-family)] text-[20px] font-medium leading-none text-text-heading"
                >
                  {MEMBERSHIP_BENEFITS_COPY.columnLabel}
                </th>
                {MEMBERSHIP_BENEFIT_TIER_COLUMNS.map((column) => (
                  <th
                    key={column.id}
                    scope="col"
                    className="min-w-[88px] pb-[16px] text-center align-bottom font-[family-name:var(--velarro-body-label-font-family)] text-[18px] font-light leading-none text-text-body-text"
                  >
                    <span className="sr-only">{column.accessibleName}</span>
                    <span aria-hidden="true">{column.label}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
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
                      included={benefit.availability[column.id as MembershipBenefitTierId]}
                      tierAccessibleName={column.accessibleName}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
