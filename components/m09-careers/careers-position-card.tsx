import {
  formatCareerPositionLocation,
  type CareerPosition,
} from "@/components/m09-careers/careers-positions-data";

export function CareersPositionCard({ position }: { position: CareerPosition }) {
  return (
    <article
      className="flex min-h-[96px] w-full flex-col justify-between gap-[12px] rounded-[12px] border border-border-default bg-background-section px-[24px] py-[16px] desktop:flex-row desktop:items-center desktop:gap-[24px]"
      data-careers-position-card
      data-position-slug={position.slug}
      data-position-detail-status="deferred"
      data-figma-node={position.figmaNodeId}
    >
      <div className="flex min-w-0 flex-col gap-[8px]">
        <h3 className="font-[family-name:var(--velarro-heading-product-cards-font-family)] text-[22px] font-normal leading-[30px] tracking-[0] text-text-display">
          {position.title}
        </h3>
        <p className="font-[family-name:var(--velarro-body-label-font-family)] text-[length:var(--velarro-body-label-font-size)] font-light leading-[var(--velarro-body-label-line-height)] tracking-[0] text-text-body-text">
          {formatCareerPositionLocation(position)}
        </p>
      </div>
      <span className="inline-flex h-[34px] w-fit shrink-0 items-center rounded-[4px] border border-border-default px-[14px] font-[family-name:var(--velarro-body-label-font-family)] text-[14px] font-light leading-none text-text-heading">
        {position.employmentType}
      </span>
    </article>
  );
}
