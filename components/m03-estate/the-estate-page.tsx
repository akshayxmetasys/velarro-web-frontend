import Image from "next/image";
import Link from "next/link";
import { FooterSection } from "@/components/layout/main-footer";
import { MainNavbar } from "@/components/layout/main-navbar";
import { THE_ESTATE_APPROVED_IMAGES } from "@/components/m03-estate/the-estate-assets";
import {
  THE_ESTATE_CATEGORY_LABELS,
  THE_ESTATE_FILTERS,
  THE_ESTATE_PRODUCTS,
  type EstateProduct,
} from "@/components/m03-estate/the-estate-data";
import { cn } from "@/lib/cn";

/**
 * Hover-device-only card lift. Reduced-motion disables transform/shadow.
 * Cards remain non-interactive (Explore stays a deferred control).
 */
const CARD_INTERACTION_CLASS = cn(
  "transition-[transform,box-shadow] duration-300 ease-out",
  "[@media(hover:hover)]:hover:-translate-y-1",
  "[@media(hover:hover)]:hover:shadow-[0_14px_28px_rgba(47,41,36,0.12)]",
  "motion-reduce:transition-none",
  "motion-reduce:[@media(hover:hover)]:hover:translate-y-0",
  "motion-reduce:[@media(hover:hover)]:hover:shadow-none",
);

const BREADCRUMB_LINK_CLASS =
  "rounded-[5px] px-[12px] py-[6px] font-[family-name:var(--velarro-heading-button-font-family)] text-[14px] text-text-heading outline-none focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-2";

function HeroSection() {
  return (
    <section
      aria-labelledby="the-estate-heading"
      data-slot="the-estate-hero"
      className="relative h-[420px] w-full overflow-hidden bg-background-navbar desktop:h-[471px]"
      data-figma-node="16576:98466"
    >
      <Image
        src={THE_ESTATE_APPROVED_IMAGES.collectorSeriesHeroBackground}
        alt="Collector Series cigars arranged with estate accessories"
        fill
        priority
        sizes="100vw"
        data-slot="the-estate-hero-image"
        className="pointer-events-none object-cover object-center"
      />
      <div
        aria-hidden="true"
        data-slot="the-estate-hero-overlay"
        className="absolute inset-0 bg-[rgba(21,20,20,0.4)]"
      />
      {/*
        Figma 16576:98466: title center at top≈376px within the 471px hero frame.
      */}
      <div className="absolute inset-x-0 top-[calc(50%+40px)] flex -translate-y-1/2 justify-center px-[24px] text-center desktop:top-[376px] desktop:translate-y-[-50%]">
        <h1
          id="the-estate-heading"
          className="max-w-[830px] font-[family-name:var(--velarro-display-light-font-family)] text-[44px] font-light uppercase leading-none text-text-text-white tablet:text-[58px] desktop:text-[72px]"
        >
          COLLECTOR SERIES
        </h1>
      </div>
    </section>
  );
}

function Breadcrumbs() {
  return (
    <nav
      aria-label="Breadcrumb"
      data-slot="the-estate-breadcrumbs"
      className="flex min-h-[44px] items-center gap-[6px] px-[24px] text-[14px] desktop:pl-[25px] desktop:pr-[24px]"
      data-figma-node="16576:98462"
    >
      <Link href="/" className={BREADCRUMB_LINK_CLASS}>
        Home
      </Link>
      <span
        aria-hidden="true"
        className="font-[family-name:var(--velarro-heading-product-cards-font-family)] text-border-strong"
      >
        |
      </span>
      {/*
        Figma 16576:98462 shows "The Estate" as hierarchy text. /the-estate is
        already this route (Humidor listing); no distinct supported parent URL.
      */}
      <span className="px-[12px] py-[3px] font-[family-name:var(--velarro-heading-button-font-family)] text-[14px] text-text-heading">
        The Estate
      </span>
      <span
        aria-hidden="true"
        className="font-[family-name:var(--velarro-heading-product-cards-font-family)] text-border-strong"
      >
        |
      </span>
      <span
        aria-current="page"
        className="border-b border-border-strong py-[4px] font-[family-name:var(--velarro-heading-product-cards-font-family)] text-text-heading"
      >
        The Humidor
      </span>
    </nav>
  );
}

function FilterPanel() {
  return (
    <aside
      aria-label="Product filters (deferred)"
      data-slot="the-estate-filters"
      className="flex w-full flex-col gap-[20px] border-b border-border-default bg-background-section px-[15px] pb-[41px] pt-[24px] desktop:min-h-[1493px] desktop:w-[350px] desktop:shrink-0 desktop:border-b-0 desktop:border-r"
      data-figma-node="16576:98465"
    >
      <div className="flex w-full max-w-[308px] items-center justify-between">
        <p className="font-[family-name:var(--velarro-ui-elements-secondary-font-family)] text-[14px] font-medium uppercase leading-none text-text-heading">
          FILTERS
        </p>
        <span
          aria-hidden="true"
          className="grid size-[15px] place-items-center text-text-heading"
        >
          <span className="size-[9px] border-l border-t border-text-heading" />
        </span>
      </div>
      <div className="flex w-full justify-end">
        <button
          type="button"
          disabled
          aria-label="Clear filter (deferred: filtering is not approved for this scope)"
          className="cursor-not-allowed border-b border-border-strong pb-[4px] font-[family-name:var(--velarro-heading-button-font-family)] text-[14px] font-light leading-[20px] text-text-heading"
        >
          Clear filter
        </button>
      </div>
      <div className="flex w-full flex-col gap-[20px] tablet:grid tablet:grid-cols-2 tablet:gap-[12px] desktop:flex desktop:grid-cols-none desktop:flex-col desktop:gap-[20px]">
        {THE_ESTATE_FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            disabled
            aria-label={`${filter} filter (deferred: filtering is not approved for this scope)`}
            className="flex w-full cursor-not-allowed items-center justify-between border-b border-border-default px-[12px] pb-[12px] text-left font-[family-name:var(--velarro-ui-elements-secondary-font-family)] text-[14px] font-medium uppercase leading-none text-text-heading disabled:opacity-100"
          >
            <span>{filter}</span>
            <span aria-hidden="true">-</span>
          </button>
        ))}
      </div>
    </aside>
  );
}

function CollectionNav() {
  return (
    <nav
      aria-label="Estate collection"
      data-slot="the-estate-collection-nav"
      className="flex items-center justify-center gap-[40px] font-[family-name:var(--velarro-heading-button-font-family)] text-[16px] font-normal uppercase text-text-heading desktop:gap-[80px]"
      data-figma-node="16576:98452"
    >
      <span
        aria-current="page"
        className="border-b-2 border-border-strong px-[30px] py-[4px]"
      >
        THE HUMIDOR
      </span>
      <Link
        href="/the-estate/the-house"
        className="px-[2px] py-[4px] outline-none focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-2"
      >
        THE HOUSE
      </Link>
    </nav>
  );
}

function CategoryRail() {
  return (
    <section
      aria-labelledby="estate-category-heading"
      data-slot="the-estate-categories"
      className="flex w-full flex-col items-center gap-[24px]"
      data-figma-node="16604:97510"
    >
      <h2 id="estate-category-heading" className="sr-only">
        The Estate categories
      </h2>
      <CollectionNav />
      <div className="flex w-full max-w-[973px] items-center gap-[13px]">
        {/*
          Local horizontal scroll for narrow viewports only. Must not expand
          document width. Category imagery remains deferred (neutral surfaces).
        */}
        <div
          role="region"
          aria-label="Collector Series categories"
          data-slot="the-estate-category-rail"
          className="flex min-w-0 flex-1 gap-[40px] overflow-x-auto pb-[8px]"
        >
          {THE_ESTATE_CATEGORY_LABELS.map((category, index) => {
            const isSelected = index === 0;
            return (
              <article
                key={category.id}
                data-slot="the-estate-category-tile"
                data-category-id={category.id}
                data-category-selected={isSelected ? "true" : "false"}
                className="flex w-[120px] shrink-0 flex-col items-center gap-[15px]"
              >
                <div
                  aria-label={`${category.label} category image deferred`}
                  data-image-status="deferred"
                  className={cn(
                    "grid place-items-center rounded-[12px] border bg-background-section",
                    isSelected
                      ? "size-[136px] border-2 border-border-strong"
                      : "size-[111px] border-border-default",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="size-[32px] rounded-full border border-border-light"
                  />
                </div>
                <h3
                  className={cn(
                    "whitespace-nowrap text-center font-[family-name:var(--velarro-heading-button-font-family)] uppercase leading-none text-text-heading",
                    isSelected
                      ? "text-[16px] font-normal"
                      : "text-[14px] font-light",
                  )}
                >
                  {category.label}
                </h3>
              </article>
            );
          })}
        </div>
        <button
          type="button"
          disabled
          aria-label="Next category set (deferred: category navigation is not approved for this scope)"
          className="grid size-[24px] shrink-0 cursor-not-allowed place-items-center text-text-heading disabled:opacity-70"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </section>
  );
}

function IntensityDots({ filled }: { filled: EstateProduct["intensityFilled"] }) {
  return (
    <span
      aria-hidden="true"
      data-slot="the-estate-intensity-dots"
      className="inline-flex h-[10px] items-center gap-[4px]"
    >
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          className={cn(
            "size-[6px] rounded-full",
            index < filled
              ? "bg-border-strong"
              : "border border-border-strong bg-transparent",
          )}
        />
      ))}
    </span>
  );
}

function ProductCard({ product }: { product: EstateProduct }) {
  return (
    <article
      data-slot="the-estate-product-card"
      data-product-id={product.id}
      className={cn(
        "relative flex min-h-[471px] w-full max-w-[292px] flex-col gap-[12px] rounded-[8px] border border-border-light bg-background-section p-[14px]",
        CARD_INTERACTION_CLASS,
      )}
    >
      <div
        data-slot="the-estate-product-image-frame"
        className="relative h-[265px] w-full overflow-hidden rounded-[8px] bg-background-section"
      >
        <Image
          src={product.imageUrl}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1440px) 264px, (min-width: 768px) 30vw, 80vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-[8px] bg-[rgba(21,20,20,0.4)]"
        />
        <span className="absolute left-0 top-0 z-10 rounded-[8px] bg-text-heading px-[6px] py-[4px] font-[family-name:var(--velarro-ui-elements-secondary-font-family)] text-[12px] font-light leading-[17px] tracking-[0.12px] text-background-section">
          {product.badge}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-[12px]">
        <h3 className="font-[family-name:var(--velarro-heading-product-cards-font-family)] text-[16px] font-normal leading-[24px] text-text-heading">
          {product.name}
        </h3>
        <div className="flex flex-col gap-[8px]">
          <p className="font-[family-name:var(--velarro-ui-elements-secondary-font-family)] text-[12px] font-normal leading-none text-text-heading">
            {product.vitola}
          </p>
          <p className="flex flex-wrap items-center gap-x-[6px] gap-y-[2px] font-[family-name:var(--velarro-ui-elements-secondary-font-family)] text-[12px] font-normal leading-none text-text-heading">
            <span>⌀ {product.ringGauge}</span>
            <span aria-hidden="true" className="text-text-body-text">
              |
            </span>
            <span>{product.length}</span>
            <span aria-hidden="true" className="text-text-body-text">
              |
            </span>
            <span>{product.enjoymentTime}</span>
          </p>
          <div className="flex items-center gap-[13px]">
            <span className="font-[family-name:var(--velarro-ui-elements-secondary-font-family)] text-[12px] font-normal leading-none text-text-body-text">
              {product.intensityLabel}
            </span>
            <IntensityDots filled={product.intensityFilled} />
          </div>
          <p className="min-h-[36px] font-[family-name:var(--velarro-ui-elements-secondary-font-family)] text-[10px] font-light leading-none text-text-body-text">
            {product.notes}
          </p>
        </div>
        <button
          type="button"
          disabled
          aria-label={`Explore ${product.name} (deferred: product detail page is not approved for this scope)`}
          className="mt-auto flex h-auto w-full cursor-not-allowed items-center justify-center rounded-radius-md border border-border-default bg-button-fill px-[10px] py-[8px] font-[family-name:var(--velarro-heading-button-font-family)] text-[16px] font-normal uppercase leading-none text-text-heading disabled:opacity-100"
        >
          EXPLORE
        </button>
      </div>
    </article>
  );
}

function Pagination() {
  return (
    <nav
      aria-label="The Estate pagination"
      data-slot="the-estate-pagination"
      className="mt-[36px]"
      data-figma-node="16576:98463"
    >
      <div className="flex items-center justify-center gap-[16px]">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5, 6, 7].map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              disabled
              aria-label={`Page ${pageNumber} (deferred: pagination is not approved for this scope)`}
              aria-current={pageNumber === 1 ? "page" : undefined}
              className={cn(
                "grid h-[30px] w-[27px] cursor-not-allowed place-items-center font-[family-name:var(--velarro-display-light-font-family)] text-[20px] font-light leading-[28px] text-text-heading disabled:opacity-100",
                pageNumber === 1
                  ? "border border-text-body-text bg-labels-active-selected"
                  : "border-y border-r border-text-body-text opacity-65 first:border-l",
                pageNumber === 7 && "border",
              )}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        <button
          type="button"
          disabled
          aria-label="Next page (deferred: pagination is not approved for this scope)"
          className="grid size-[24px] cursor-not-allowed place-items-center text-text-heading disabled:opacity-70"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </nav>
  );
}

function ProductListing() {
  return (
    <section
      aria-labelledby="estate-products-heading"
      data-slot="the-estate-product-listing"
      className="w-full px-[24px] pb-[70px] pt-[22px] desktop:px-[52px]"
    >
      <h2 id="estate-products-heading" className="sr-only">
        Collector Series cigars
      </h2>
      <CategoryRail />
      {/*
        Figma cards: 292×471, column gap 45 (337−292), row gap ≈49 between rows.
      */}
      <div
        data-slot="the-estate-product-grid"
        className="mx-auto mt-[28px] grid w-full max-w-[966px] justify-items-center gap-x-[45px] gap-y-[49px] tablet:grid-cols-2 desktop:grid-cols-3"
      >
        {THE_ESTATE_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination />
    </section>
  );
}

export function TheEstatePage() {
  return (
    <div
      data-slot="the-estate-page"
      className="min-h-screen w-full bg-background-page"
    >
      <MainNavbar />
      <main data-slot="the-estate-main" className="-mt-[73px] w-full">
        <HeroSection />
        <div
          data-slot="the-estate-content"
          className="flex w-full flex-col desktop:flex-row"
        >
          <FilterPanel />
          <div className="min-w-0 flex-1">
            <Breadcrumbs />
            <ProductListing />
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
