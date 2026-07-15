import { CAREERS_POSITIONS_COPY } from "@/components/m09-careers/careers-positions-data";
import { CAREERS_POSITION_DETAIL_FIGMA_NODES } from "@/components/m09-careers/careers-position-details-data";

export function CareersPositionDetailSearch({
  defaultQuery = "",
}: {
  defaultQuery?: string;
}) {
  return (
    <section
      aria-label="Search careers positions"
      className="w-full"
      data-figma-node={CAREERS_POSITION_DETAIL_FIGMA_NODES.searchRow}
    >
      <form
        method="get"
        action="/careers/positions"
        className="flex w-full flex-col gap-[16px] desktop:flex-row desktop:items-center desktop:gap-[20px]"
        data-careers-positions-search-form
      >
        <label htmlFor="careers-position-detail-search" className="sr-only">
          {CAREERS_POSITIONS_COPY.searchLabel}
        </label>
        <input
          id="careers-position-detail-search"
          name="q"
          type="search"
          defaultValue={defaultQuery}
          placeholder={CAREERS_POSITIONS_COPY.searchPlaceholder}
          className="h-[47px] w-full rounded-[12px] border border-border-default bg-background-input px-[16px] font-[family-name:var(--velarro-body-default-font-family)] text-[length:var(--velarro-body-default-font-size)] font-light leading-normal text-text-heading placeholder:text-text-secondary-body-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-2 desktop:max-w-[1025px] desktop:flex-1"
          data-figma-node={CAREERS_POSITION_DETAIL_FIGMA_NODES.searchField}
        />
        <button
          type="submit"
          className="inline-flex h-[47px] min-h-[44px] items-center justify-center rounded-[8px] border border-border-default bg-button-fill px-[24px] font-[family-name:var(--velarro-ui-elements-primary-font-family)] text-[length:var(--velarro-ui-elements-primary-font-size)] font-normal uppercase leading-[var(--velarro-ui-elements-primary-line-height)] tracking-[0] text-text-heading outline-none focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-2 desktop:shrink-0"
          data-figma-node={CAREERS_POSITION_DETAIL_FIGMA_NODES.searchButton}
        >
          {CAREERS_POSITIONS_COPY.searchButton}
        </button>
      </form>
    </section>
  );
}
