import {
  M01_HOME_APPROVED_IMAGES,
  assertApprovedImageUrl,
} from "@/lib/assets/approved-image-hosts";
import Image from "next/image";

const ROASTERY_HERO_URL = assertApprovedImageUrl(
  M01_HOME_APPROVED_IMAGES.roasteryHero,
);

function RoasteryHeroArrowButton() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex size-[44px] shrink-0 items-center justify-center rounded-radius-md bg-button-fill"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-velarro-text"
      >
        <path
          d="M3 8H13M13 8L9 4M13 8L9 12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function RoasteryHeroSection() {
  return (
    <section
      aria-labelledby="roastery-hero-heading"
      className="relative w-full overflow-hidden bg-background-navbar"
      data-figma-node="15451:37609"
    >
      <div className="relative h-[851px] w-full">
        <Image
          src={ROASTERY_HERO_URL}
          alt="Roastery hero imagery"
          fill
          sizes="100vw"
          unoptimized
          className="pointer-events-none object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[rgba(21,20,20,0.4)]"
        />

        <div
          className="absolute left-1/2 top-[319px] flex w-[998px] max-w-[calc(100vw-80px)] -translate-x-1/2 flex-col items-center gap-[37px]"
          data-slot="roastery-hero-content"
        >
          <h2
            id="roastery-hero-heading"
            className="text-center font-[family-name:var(--velarro-display-light-font-family)] text-[length:var(--velarro-display-light-font-size)] font-light uppercase leading-normal tracking-[var(--velarro-display-light-letter-spacing)] text-text-text-white"
          >
            THE ROASTERY
          </h2>

          <div className="flex items-start gap-[24px]">
            <button
              type="button"
              disabled
              aria-disabled="true"
              aria-label="Shop now (deferred: destination not approved for this scope)"
              title="Shop now — destination not approved for this scope"
              className="cursor-not-allowed border-0 border-b-[1px] border-solid border-border-strong bg-transparent py-[9px] font-[family-name:var(--velarro-display-shop-now-font-family)] text-[length:var(--velarro-display-shop-now-font-size)] font-normal uppercase leading-normal text-text-hover-button"
            >
              SHOP NOW
            </button>
            <RoasteryHeroArrowButton />
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[546px] flex -translate-x-1/2 items-center gap-[12px] rounded-[16px] p-1"
          data-slot="roastery-slider-dots-static"
        >
          <span className="h-[14px] w-[89px] shrink-0 rounded-[40px] bg-background-section" />
          <span className="size-[14px] shrink-0 rounded-[40px] bg-background-section" />
          <span className="size-[14px] shrink-0 rounded-[40px] bg-background-section" />
          <span className="size-[14px] shrink-0 rounded-[40px] bg-background-section" />
          <span className="size-[14px] shrink-0 rounded-[40px] bg-background-section" />
        </div>
        <p className="sr-only">
          Slide indicators are decorative only. Carousel behavior is not yet
          approved.
        </p>
      </div>
    </section>
  );
}
