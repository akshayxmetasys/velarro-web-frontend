import {
  CAREER_POSITION_FILTERS,
  CAREERS_POSITIONS_COPY,
  CAREERS_POSITIONS_FIGMA_NODES,
} from "@/components/m09-careers/careers-positions-data";

function FilterChevronIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-[16px] w-[16px] shrink-0 text-icon-default"
      fill="none"
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CareersPositionFilterPanel() {
  return (
    <aside
      aria-labelledby="careers-positions-filter-heading"
      className="w-full rounded-[8px] bg-background-section desktop:w-[298px] desktop:shrink-0"
      data-section="careers-positions-filters"
      data-figma-node={CAREERS_POSITIONS_FIGMA_NODES.filterPanel}
    >
      <div className="flex h-[49px] items-center border-b border-border-default px-[12px]">
        <h2
          id="careers-positions-filter-heading"
          className="font-[family-name:var(--velarro-heading-page-font-family)] text-[18px] font-normal leading-none tracking-[0] text-text-heading"
          data-figma-node={CAREERS_POSITIONS_FIGMA_NODES.filterHeading}
        >
          {CAREERS_POSITIONS_COPY.filterHeading}
        </h2>
      </div>
      <div
        className="flex flex-col gap-[23px] px-[12px] py-[20px]"
        data-figma-node={CAREERS_POSITIONS_FIGMA_NODES.filterControls}
      >
        {CAREER_POSITION_FILTERS.map((filter) => (
          <button
            key={filter.key}
            type="button"
            disabled
            aria-disabled="true"
            aria-label={`${filter.label} filter (unavailable: filter options are not approved for this scope)`}
            data-filter-status="deferred"
            data-filter-key={filter.key}
            className="flex h-[40px] w-full cursor-not-allowed items-center justify-between rounded-[4px] border border-border-default bg-background-card px-[12px] text-left font-[family-name:var(--velarro-body-label-font-family)] text-[length:var(--velarro-body-label-font-size)] font-light leading-none text-text-heading disabled:opacity-100"
          >
            <span>{filter.label}</span>
            <FilterChevronIcon />
          </button>
        ))}
      </div>
    </aside>
  );
}
