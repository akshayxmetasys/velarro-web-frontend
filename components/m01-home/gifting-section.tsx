import {
  M01_HOME_APPROVED_IMAGES,
  assertApprovedImageUrl,
} from "@/lib/assets/approved-image-hosts";
import { cn } from "@/lib/cn";
import Image from "next/image";
import {
  M01_GIFTING_SECTION_IMAGE_SIZES,
  M01_GIFTING_SECTION_WIDTH_CLASS,
} from "@/components/m01-home/m01-section-layout";

const GIFTING_BACKGROUND_URL = assertApprovedImageUrl(
  M01_HOME_APPROVED_IMAGES.giftingBackground,
);

export function GiftingSection() {
  return (
    <section
      aria-labelledby="gifting-heading"
      className="w-full px-4 py-0"
      data-figma-node="13148:15113"
      data-slot="gifting"
    >
      <div
        className={cn(
          "relative mx-auto h-[696px] w-full",
          M01_GIFTING_SECTION_WIDTH_CLASS,
          "overflow-hidden rounded-[20px] bg-background-navbar",
        )}
        data-slot="gifting-band"
      >
        <Image
          src={GIFTING_BACKGROUND_URL}
          alt="Velarro gifting collection imagery"
          fill
          sizes={M01_GIFTING_SECTION_IMAGE_SIZES}
          unoptimized
          className="pointer-events-none object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[rgba(71,70,70,0.6)]"
          data-slot="gifting-overlay"
        />

        <div
          className="absolute left-1/2 top-[196px] flex w-[833px] max-w-[calc(100%-32px)] -translate-x-1/2 flex-col items-center gap-[64px]"
          data-slot="gifting-content"
        >
          <div
            className="flex w-[157px] max-w-full flex-col items-center gap-1"
            data-slot="gifting-eyebrow-group"
          >
            <p className="text-center font-[family-name:var(--velarro-heading-sectionsmall-font-family)] text-[length:var(--velarro-heading-sectionsmall-font-size)] font-light uppercase leading-[var(--velarro-heading-sectionsmall-line-height)] tracking-[var(--velarro-heading-sectionsmall-letter-spacing)] text-text-text-white">
              Gifting
            </p>
            <span
              aria-hidden="true"
              className="h-0 w-full border-t-2 border-border-strong"
              data-slot="gifting-divider"
            />
          </div>

          <h2
            id="gifting-heading"
            className="w-full text-center font-[family-name:var(--velarro-display-light-font-family)] text-[44px] font-light uppercase leading-[var(--velarro-display-light-line-height)] tracking-[var(--velarro-display-light-letter-spacing)] text-text-text-white desktop:whitespace-nowrap desktop:text-[length:var(--velarro-display-light-font-size)]"
          >
            Find the perfect gifts
          </h2>

          <button
            type="button"
            disabled
            aria-disabled="true"
            aria-label="Explore gifting (deferred: destination not approved for this scope)"
            title="Explore gifting - destination not approved for this scope"
            className="h-[43px] w-[217px] shrink-0 cursor-not-allowed rounded-radius-md border border-border-default bg-button-fill font-[family-name:var(--velarro-ui-elements-primary-font-family)] text-[length:var(--velarro-ui-elements-primary-font-size)] font-normal uppercase leading-[var(--velarro-ui-elements-primary-line-height)] text-text-heading"
            data-slot="gifting-cta"
          >
            EXPLORE
          </button>
        </div>
      </div>
    </section>
  );
}
