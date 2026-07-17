"use client";

import { CigarCategoryCard } from "@/components/m01-home/cigar-category-card";
import { M01_CAROUSEL_SECTION_WIDTH_CLASS } from "@/components/m01-home/m01-section-layout";
import {
  CIGAR_CAROUSEL_ARROW_LEFT_URL,
  CIGAR_CAROUSEL_CARDS,
  CIGAR_CAROUSEL_INITIAL_ACTIVE_INDEX,
} from "@/lib/m01-home/cigar-carousel-data";
import { cn } from "@/lib/cn";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

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
      suppressHydrationWarning
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="inline-flex size-[44px] shrink-0 items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Image
        src={CIGAR_CAROUSEL_ARROW_LEFT_URL}
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
    if (index >= 0 && index < CIGAR_CAROUSEL_CARDS.length) {
      indexes.push(index);
    }
  }

  return indexes;
}

export function CigarCarouselSection() {
  const [activeIndex, setActiveIndex] = useState(
    CIGAR_CAROUSEL_INITIAL_ACTIVE_INDEX,
  );
  const viewportRef = useRef<HTMLDivElement>(null);

  const visibleIndexes = useMemo(
    () => getVisibleCardIndexes(activeIndex),
    [activeIndex],
  );

  const canGoPrevious = activeIndex > 0;
  const canGoNext = activeIndex < CIGAR_CAROUSEL_CARDS.length - 1;

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    const activeCard = viewport.querySelector('[aria-current="true"]');
    if (!(activeCard instanceof HTMLElement)) {
      return;
    }

    const viewportWidth = viewport.clientWidth;
    const target =
      activeCard.offsetLeft - (viewportWidth - activeCard.offsetWidth) / 2;
    const maxScroll = Math.max(0, viewport.scrollWidth - viewportWidth);
    const nextScrollLeft = Math.min(Math.max(0, target), maxScroll);

    if (Math.abs(viewport.scrollLeft - nextScrollLeft) < 1) {
      return;
    }

    viewport.scrollTo({
      left: nextScrollLeft,
      behavior: "instant",
    });
  }, [activeIndex, visibleIndexes]);

  return (
    <section
      aria-labelledby="cigar-carousel-heading"
      className={cn(
        "mx-auto min-h-[645px] w-full",
        M01_CAROUSEL_SECTION_WIDTH_CLASS,
        "bg-background-section",
        "px-4",
        "py-8",
        "min-[1346px]:px-0",
      )}
      data-figma-node="13148:15033"
      data-slot="cigar-carousel"
    >
      <div className="mx-auto flex w-full flex-col items-center gap-10">
        <header className="flex w-full flex-col items-center gap-5">
          <div className="flex w-full max-w-[526px] items-center justify-center border-b border-border-strong pb-[4px]">
            <p className="w-[808px] max-w-full text-center font-[family-name:var(--velarro-heading-sectionsmall-font-family)] text-[length:var(--velarro-heading-sectionsmall-font-size)] font-light uppercase leading-[var(--velarro-heading-sectionsmall-line-height)] tracking-[var(--velarro-heading-sectionsmall-letter-spacing)] text-text-display">
              DISCOVER TIMELESS LUXURY
            </p>
          </div>
          <h2
            id="cigar-carousel-heading"
            className="w-full text-center font-[family-name:var(--velarro-heading-section-font-family)] text-[length:var(--velarro-heading-section-font-size)] font-light leading-[var(--velarro-heading-section-line-height)] tracking-[var(--velarro-heading-section-letter-spacing)] text-text-heading"
          >
            Velarro cigars
          </h2>
        </header>

        <div
          className="flex w-[1303px] max-w-full items-center justify-center gap-10"
          role="region"
          aria-roledescription="carousel"
          aria-label="Velarro cigars category carousel"
        >
          <CarouselArrowButton
            direction="previous"
            label="Previous cigar category"
            disabled={!canGoPrevious}
            onClick={() => {
              if (canGoPrevious) {
                setActiveIndex((current) => current - 1);
              }
            }}
          />

          <div
            className="h-[455px] w-[1135px] max-w-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            data-slot="cigar-carousel-viewport"
            ref={viewportRef}
          >
            <div
              className="flex h-full w-max min-w-full items-end justify-start gap-[15px] motion-reduce:transition-none"
              data-slot="cigar-carousel-track"
            >
              {visibleIndexes.map((cardIndex) => {
                const card = CIGAR_CAROUSEL_CARDS[cardIndex];

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
            label="Next cigar category"
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
