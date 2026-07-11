"use client";

import { CigarCategoryCard } from "@/components/m01-home/cigar-category-card";
import {
  ESTATE_COLLECTION_ARROW_LEFT_URL,
  ESTATE_COLLECTION_CARDS,
  ESTATE_COLLECTION_INITIAL_ACTIVE_INDEX,
} from "@/lib/m01-home/estate-collection-data";
import Image from "next/image";
import { useMemo, useState } from "react";

function CarouselArrowButton({
  direction,
  label,
  onClick,
  disabled,
}: {
  direction: "previous" | "next";
  label: string;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="inline-flex size-[44px] shrink-0 items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Image
        src={ESTATE_COLLECTION_ARROW_LEFT_URL}
        alt=""
        width={44}
        height={44}
        unoptimized
        className={direction === "next" ? "rotate-180" : undefined}
      />
    </button>
  );
}

function getVisibleCardIndexes(activeIndex: number): number[] {
  const indexes: number[] = [];

  for (let index = activeIndex - 1; index <= activeIndex + 1; index += 1) {
    if (index >= 0 && index < ESTATE_COLLECTION_CARDS.length) {
      indexes.push(index);
    }
  }

  return indexes;
}

export function EstateCollectionSection() {
  const [activeIndex, setActiveIndex] = useState(
    ESTATE_COLLECTION_INITIAL_ACTIVE_INDEX,
  );

  const visibleIndexes = useMemo(
    () => getVisibleCardIndexes(activeIndex),
    [activeIndex],
  );

  const canGoPrevious = activeIndex > 0;
  const canGoNext = activeIndex < ESTATE_COLLECTION_CARDS.length - 1;

  return (
    <section
      aria-labelledby="estate-collection-heading"
      className="w-full bg-background-section py-8"
      data-figma-node="13148:15145"
    >
      <div className="mx-auto flex w-full max-w-[1314px] flex-col items-center gap-16 px-4 min-[1346px]:px-0">
        <header className="flex w-full max-w-[1318px] flex-col items-center gap-5">
          <div className="flex w-[526px] max-w-full items-center justify-center border-b border-border-strong pb-1">
            <p className="w-[808px] max-w-full text-center font-[family-name:var(--velarro-heading-sectionsmall-font-family)] text-[length:var(--velarro-heading-sectionsmall-font-size)] font-light uppercase leading-normal tracking-[var(--velarro-heading-sectionsmall-letter-spacing)] text-text-display">
              Discover Timeless Luxury
            </p>
          </div>
          <h2
            id="estate-collection-heading"
            className="w-full text-center font-[family-name:var(--velarro-heading-section-font-family)] text-[length:var(--velarro-heading-section-font-size)] font-light leading-normal tracking-[var(--velarro-heading-section-letter-spacing)] text-text-heading"
          >
            Velarro Estate collection
          </h2>
        </header>

        <div
          className="flex w-[1303px] max-w-full items-center justify-center gap-10"
          data-slot="estate-collection-carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label="Velarro Estate collection carousel"
        >
          <CarouselArrowButton
            direction="previous"
            label="Previous estate collection item"
            disabled={!canGoPrevious}
            onClick={() => {
              if (canGoPrevious) {
                setActiveIndex((current) => current - 1);
              }
            }}
          />

          <div className="h-[455px] w-[1135px] max-w-[calc(100%-104px)] overflow-hidden">
            <div className="flex h-full items-end justify-start gap-[15px] motion-reduce:transition-none">
              {visibleIndexes.map((cardIndex) => {
                const card = ESTATE_COLLECTION_CARDS[cardIndex];

                return (
                  <CigarCategoryCard
                    key={card.id}
                    cardId={card.id}
                    label={card.label}
                    imageUrl={card.imageUrl}
                    imageAlt={card.imageAlt}
                    isActive={cardIndex === activeIndex}
                  />
                );
              })}
            </div>
          </div>

          <CarouselArrowButton
            direction="next"
            label="Next estate collection item"
            disabled={!canGoNext}
            onClick={() => {
              if (canGoNext) {
                setActiveIndex((current) => current + 1);
              }
            }}
          />
        </div>
      </div>
    </section>
  );
}
