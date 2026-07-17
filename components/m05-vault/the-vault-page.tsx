import Image from "next/image";
import Link from "next/link";
import { FooterSection } from "@/components/layout/main-footer";
import { MainNavbar } from "@/components/layout/main-navbar";
import { THE_VAULT_COMING_SOON_BACKGROUND } from "@/components/m05-vault/the-vault-assets";
import { THE_VAULT_COMING_SOON_COPY } from "@/components/m05-vault/the-vault-data";
import { cn } from "@/lib/cn";

const ACTION_CLASS =
  "inline-flex w-[108px] items-center justify-center border-b border-border-strong pb-[4px] font-[family-name:var(--velarro-ui-elements-primary-font-family)] text-[16px] font-normal uppercase leading-none text-text-heading";

const HOMEPAGE_LINK_CLASS = cn(
  ACTION_CLASS,
  "outline-none focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-2",
);

/**
 * Figma 12339:55474 applies the Mystique raster via a -90° rotated container
 * (772×1440) with percentage crop. Reproduce that composition inside the
 * 1440×772 visual region; clip oversized decorative content to this region only.
 */
function ComingSoonVisual() {
  return (
    <section
      aria-labelledby="the-vault-heading"
      data-slot="the-vault-visual"
      data-figma-node="12339:55474"
      className="relative h-[560px] w-full overflow-hidden bg-background-page desktop:h-[772px]"
    >
      <div
        aria-hidden="true"
        data-slot="the-vault-background"
        className="pointer-events-none absolute inset-0"
      >
        {/*
          Rotated composition: outer flex centers a -rotate-90 frame of
          h-[1440] w-[772] so the raster fills the 1440×772 visual region.
        */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="-rotate-90">
            <div className="relative h-[1440px] w-[772px] overflow-hidden opacity-[0.29]">
              {/*
                Exact Figma crop percentages on the rotated Mystique raster
                (natural 640×800 JPEG stored locally).
              */}
              <div data-slot="the-vault-background-image" className="contents">
                {/*
                  Local static JPEG with Figma crop percentages. unoptimized
                  avoids optimizer interference with the oversized crop box.
                */}
                <Image
                  src={THE_VAULT_COMING_SOON_BACKGROUND}
                  alt=""
                  width={640}
                  height={800}
                  priority
                  unoptimized
                  sizes="100vw"
                  className="pointer-events-none absolute left-[-50.79%] top-[-1.88%] h-[101.87%] w-[152.1%] max-w-none"
                />
              </div>            </div>
          </div>
        </div>
        <div
          data-slot="the-vault-background-overlay"
          className="absolute inset-0 bg-[rgba(216,201,180,0.22)]"
        />
      </div>

      <p
        aria-hidden="true"
        data-slot="the-vault-oops"
        data-figma-node="12339:55473"
        className="pointer-events-none absolute left-[calc(50%+7px)] top-[-120px] w-[min(1330px,200vw)] -translate-x-1/2 text-center font-[family-name:var(--velarro-heading-card-font-family)] text-[clamp(160px,35vw,502px)] font-medium leading-none tracking-[-5.02px] text-brand-logo opacity-[0.48] desktop:top-[-177px]"
      >
        {THE_VAULT_COMING_SOON_COPY.decorativeOops}
      </p>

      <div
        data-slot="the-vault-content"
        data-figma-node="12379:13365"
        className="absolute inset-x-0 top-[58%] z-10 flex -translate-y-1/2 flex-col items-center gap-[40px] px-[24px] desktop:top-[469px] desktop:translate-y-0 desktop:flex-row desktop:justify-center desktop:gap-[120px]"
      >
        <div
          data-slot="the-vault-title"
          data-figma-node="12379:13366"
          className="w-full max-w-[249px] text-center desktop:h-[146px] desktop:shrink-0 desktop:text-left"
        >
          <h1
            id="the-vault-heading"
            aria-label="Unveiling soon"
            className="font-[family-name:var(--velarro-heading-card-font-family)] text-[clamp(40px,5vw,58px)] font-medium leading-none tracking-[-0.57px] text-brand-logo"
          >
            <span aria-hidden="true" className="block">
              {THE_VAULT_COMING_SOON_COPY.title}
            </span>
            <span
              aria-hidden="true"
              className="mt-[4px] block font-[family-name:var(--velarro-heading-section-font-family)] text-[clamp(24px,3vw,32px)] font-light leading-none text-brand-logo"
            >
              {THE_VAULT_COMING_SOON_COPY.subtitle}
            </span>
          </h1>
        </div>

        <div
          data-slot="the-vault-copy-actions"
          data-figma-node="12379:13368"
          className="flex w-full max-w-[588px] flex-col items-center gap-[32px] desktop:items-start desktop:gap-[48px]"
        >
          <p
            data-slot="the-vault-description"
            data-figma-node="12379:13369"
            className="max-w-[588px] text-center font-[family-name:var(--velarro-body-default-font-family)] text-[18px] font-light leading-[28px] text-text-body-text desktop:text-left desktop:text-[20px]"
          >
            {THE_VAULT_COMING_SOON_COPY.description}
          </p>

          <div
            data-slot="the-vault-actions"
            data-figma-node="12379:13370"
            className="flex items-center gap-[41px]"
          >
            <Link
              href="/"
              data-slot="the-vault-homepage-link"
              className={HOMEPAGE_LINK_CLASS}
            >
              {THE_VAULT_COMING_SOON_COPY.homepageLabel}
            </Link>
            <button
              type="button"
              disabled
              aria-label={THE_VAULT_COMING_SOON_COPY.productsDeferredLabel}
              data-slot="the-vault-products-deferred"
              className={cn(
                ACTION_CLASS,
                "cursor-not-allowed disabled:opacity-100",
              )}
            >
              {THE_VAULT_COMING_SOON_COPY.productsLabel}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TheVaultPage() {
  return (
    <div
      data-slot="the-vault-page"
      data-figma-node="12339:55472"
      className="min-h-screen w-full bg-background-page"
    >
      <MainNavbar />
      <main data-slot="the-vault-main" className="-mt-[73px] w-full">
        <ComingSoonVisual />
      </main>
      <FooterSection />
    </div>
  );
}
