import { confirmAgeStateAction } from "@/lib/age/age-actions";
import {
  M01_HOME_APPROVED_IMAGES,
  assertApprovedImageUrl,
} from "@/lib/assets/approved-image-hosts";
import Image from "next/image";

const COLLECTOR_HERO_URL = assertApprovedImageUrl(
  M01_HOME_APPROVED_IMAGES.collectorHero,
);

export function AgeGate() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-[var(--container-padding-inline)] py-spacing-48">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        data-slot="age-gate-background"
      >
        <div className="absolute inset-0 scale-105">
          <Image
            src={COLLECTOR_HERO_URL}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-bottom blur-lg"
          />
        </div>
        <div className="absolute inset-0 bg-[rgba(29,28,26,0.22)]" />
      </div>

      <section
        aria-labelledby="age-gate-heading"
        className="relative z-10 w-full max-w-[674px] rounded-[12px] bg-background-page p-3 shadow-section"
        data-figma-node="15967:47161"
      >
        <div className="flex flex-col items-center gap-5">
          <div className="flex w-full max-w-[365px] flex-col items-center gap-2 text-center">
            <p className="font-[family-name:var(--velarro-heading-card-font-family)] text-[length:var(--velarro-heading-card-font-size)] font-normal leading-normal text-text-heading">
              21+ only
            </p>
            <h1
              id="age-gate-heading"
              className="font-[family-name:var(--velarro-heading-card-font-family)] text-[length:var(--velarro-heading-card-font-size)] font-normal leading-normal text-text-heading"
            >
              Age Verification Required
            </h1>
          </div>

          <div className="flex w-full max-w-[647px] flex-col gap-3">
            <p className="font-[family-name:var(--velarro-heading-product-cards-font-family)] text-[length:var(--velarro-heading-product-cards-font-size)] font-normal leading-[var(--velarro-heading-product-cards-line-height)] text-text-body-text">
              This website contains premium cigar and tobacco-related content
              intended only for adults of legal smoking age.
            </p>

            <div className="text-text-body-text">
              <p className="mb-0 font-[family-name:var(--font-family-primary)] text-[20px] font-medium leading-[30px] tracking-[-0.08px] text-text-heading">
                By entering this site, you confirm that:
              </p>
              <ul className="mt-0 list-disc pl-6 font-[family-name:var(--velarro-heading-product-cards-font-family)] text-[length:var(--velarro-heading-product-cards-font-size)] leading-[var(--velarro-heading-product-cards-line-height)]">
                <li>
                  You are 21 years of age or older (or the legal tobacco age in
                  your region)
                </li>
                <li>
                  You agree to our Terms &amp; Conditions and Privacy Policy
                </li>
              </ul>
            </div>
          </div>

          <div className="flex w-full max-w-[650px] flex-col gap-[14px] sm:flex-row">
            <form
              action={confirmAgeStateAction.bind(null, "over21")}
              className="flex-1"
            >
              <button
                type="submit"
                className="w-full rounded-radius-md border border-border-default bg-button-fill px-6 py-1 font-[family-name:var(--velarro-heading-button-font-family)] text-[length:var(--velarro-heading-button-font-size)] font-light uppercase leading-normal text-text-heading"
              >
                Yes, I&apos;m 21+
              </button>
            </form>
            <form
              action={confirmAgeStateAction.bind(null, "under21")}
              className="flex-1"
            >
              <button
                type="submit"
                className="w-full rounded-radius-md border border-border-default bg-button-fill px-6 py-1 font-[family-name:var(--velarro-heading-button-font-family)] text-[length:var(--velarro-heading-button-font-size)] font-light uppercase leading-normal text-text-heading"
              >
                No, I&apos;m not 21+
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
