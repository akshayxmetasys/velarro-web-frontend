import Image from "next/image";
import {
  M01_CONTAINED_SECTION_IMAGE_SIZES,
  M01_CONTAINED_SECTION_WIDTH_CLASS,
} from "@/components/m01-home/m01-section-layout";
import { cn } from "@/lib/cn";

export const STORE_LOUNGE_BACKGROUND_SRC =
  "/images/m01-home/store-lounge-background.png" as const;

/**
 * Figma 13148:15176 image fill uses absolute height 174.34% and top -5.82%.
 * With object-cover that maps the visible window center to ~32% of the source.
 */
const STORE_LOUNGE_OBJECT_POSITION = "object-[center_32%]" as const;

export function StoreLoungeSection() {
  return (
    <section
      aria-labelledby="store-lounge-heading"
      className="w-full px-4 py-0"
      data-figma-node="13148:15176"
      data-slot="store-lounge"
    >
      <div
        className={cn(
          "relative mx-auto h-[760px] w-full",
          M01_CONTAINED_SECTION_WIDTH_CLASS,
          "overflow-hidden rounded-[12px] bg-background-navbar desktop:h-[1065px]",
        )}
        data-slot="store-lounge-contained-section"
      >
        <Image
          src={STORE_LOUNGE_BACKGROUND_SRC}
          alt=""
          fill
          sizes={M01_CONTAINED_SECTION_IMAGE_SIZES}
          priority={false}
          className={cn(
            "pointer-events-none object-cover",
            STORE_LOUNGE_OBJECT_POSITION,
          )}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[rgba(21,20,20,0.4)]"
          data-slot="store-lounge-overlay"
        />

        <div
          className="absolute left-1/2 top-[44.13%] flex w-[1159px] max-w-[calc(100%-32px)] -translate-x-1/2 flex-col items-center gap-[20px] rounded-[24px] bg-[rgba(29,28,26,0.6)] py-[24px]"
          data-slot="store-lounge-content"
        >
          <h2
            id="store-lounge-heading"
            className="w-full max-w-full text-center font-[family-name:var(--velarro-display-light-font-family)] text-[40px] font-light uppercase leading-[var(--velarro-display-light-line-height)] tracking-[var(--velarro-display-light-letter-spacing)] text-text-text-white tablet:text-[56px] desktop:text-[length:var(--velarro-display-light-font-size)]"
          >
            FIND A STORE &amp; LOUNGE
          </h2>

          <button
            type="button"
            disabled
            aria-disabled="true"
            aria-label="Explore Store/Lounge (deferred: destination not approved for this scope)"
            title="Explore Store/Lounge - destination not approved for this scope"
            className="h-[43px] w-[355px] max-w-[calc(100%-48px)] shrink-0 cursor-not-allowed rounded-radius-md border border-border-default bg-button-fill font-[family-name:var(--velarro-ui-elements-primary-font-family)] text-[length:var(--velarro-ui-elements-primary-font-size)] font-normal uppercase leading-[var(--velarro-ui-elements-primary-line-height)] text-text-heading"
            data-slot="store-lounge-cta"
          >
            EXPLORE
          </button>
        </div>
      </div>
    </section>
  );
}
