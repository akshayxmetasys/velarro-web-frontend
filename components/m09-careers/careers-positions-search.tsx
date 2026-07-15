"use client";

import { FormEvent, useId, useState } from "react";
import { CareersPositionCard } from "@/components/m09-careers/careers-position-card";
import { CareersPositionFilterPanel } from "@/components/m09-careers/careers-position-filter-panel";
import {
  CAREER_POSITIONS,
  CAREERS_POSITIONS_COPY,
  CAREERS_POSITIONS_FIGMA_NODES,
  filterCareerPositions,
  getCareerPositionResultsStatus,
} from "@/components/m09-careers/careers-positions-data";

export function CareersPositionsSearch({
  initialQuery = "",
}: {
  initialQuery?: string;
}) {
  const searchFieldId = useId();
  const resultsStatusId = useId();
  const [query, setQuery] = useState(initialQuery);
  const [submittedQuery, setSubmittedQuery] = useState(initialQuery);
  const visiblePositions = filterCareerPositions(CAREER_POSITIONS, submittedQuery);
  const hasActiveQuery = submittedQuery.trim().length > 0;
  const resultsStatus = getCareerPositionResultsStatus(
    visiblePositions.length,
    hasActiveQuery,
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedQuery(query.trim());
  }

  return (
    <div
      className="flex w-full flex-col gap-[32px] desktop:gap-[46px]"
      data-section="careers-positions-content"
      data-figma-node={CAREERS_POSITIONS_FIGMA_NODES.mainContent}
    >
      <section
        aria-labelledby={searchFieldId}
        className="w-full"
        data-figma-node={CAREERS_POSITIONS_FIGMA_NODES.searchSection}
      >
        <form
          className="flex w-full flex-col gap-[16px] desktop:flex-row desktop:items-center desktop:gap-[20px]"
          data-careers-positions-search-form
          onSubmit={handleSubmit}
          data-figma-node={CAREERS_POSITIONS_FIGMA_NODES.searchRow}
        >
          <label htmlFor={searchFieldId} className="sr-only">
            {CAREERS_POSITIONS_COPY.searchLabel}
          </label>
          <input
            id={searchFieldId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={CAREERS_POSITIONS_COPY.searchPlaceholder}
            className="h-[47px] w-full rounded-[12px] border border-border-default bg-background-input px-[16px] font-[family-name:var(--velarro-body-default-font-family)] text-[length:var(--velarro-body-default-font-size)] font-light leading-normal text-text-heading placeholder:text-text-secondary-body-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-2 desktop:max-w-[1025px] desktop:flex-1"
            data-figma-node={CAREERS_POSITIONS_FIGMA_NODES.searchField}
          />
          <button
            type="submit"
            className="inline-flex h-[47px] min-h-[44px] items-center justify-center rounded-[8px] border border-border-default bg-button-fill px-[24px] font-[family-name:var(--velarro-ui-elements-primary-font-family)] text-[length:var(--velarro-ui-elements-primary-font-size)] font-normal uppercase leading-[var(--velarro-ui-elements-primary-line-height)] tracking-[0] text-text-heading outline-none focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-2 desktop:shrink-0"
            data-figma-node={CAREERS_POSITIONS_FIGMA_NODES.searchButton}
          >
            {CAREERS_POSITIONS_COPY.searchButton}
          </button>
        </form>
      </section>

      <p id={resultsStatusId} className="sr-only" aria-live="polite">
        {resultsStatus}
      </p>

      <div
        className="flex w-full flex-col gap-[32px] desktop:flex-row desktop:gap-[60px]"
        data-figma-node={CAREERS_POSITIONS_FIGMA_NODES.contentColumns}
      >
        <CareersPositionFilterPanel />
        <section
          aria-labelledby="careers-positions-results-heading"
          className="min-w-0 flex-1 desktop:max-w-[925px]"
          data-figma-node={CAREERS_POSITIONS_FIGMA_NODES.jobList}
        >
          <h2 id="careers-positions-results-heading" className="sr-only">
            Open positions
          </h2>
          {visiblePositions.length === 0 ? (
            <p
              className="rounded-[12px] border border-border-default bg-background-section px-[24px] py-[20px] font-[family-name:var(--velarro-body-default-font-family)] text-[length:var(--velarro-body-default-font-size)] font-light leading-normal text-text-body-text"
              data-careers-positions-empty
            >
              No positions match your search.
            </p>
          ) : (
            <ul className="flex list-none flex-col gap-[20px] p-0">
              {visiblePositions.map((position) => (
                <li key={position.id}>
                  <CareersPositionCard position={position} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
