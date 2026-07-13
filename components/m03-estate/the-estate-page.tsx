import Image from "next/image";
import Link from "next/link";
import { FooterSection } from "@/components/m01-home/footer-section";
import { MainNavbar } from "@/components/m01-home/main-navbar";
import { THE_ESTATE_APPROVED_IMAGES } from "@/components/m03-estate/the-estate-assets";
import {
  THE_ESTATE_CATEGORY_LABELS,
  THE_ESTATE_FILTERS,
  THE_ESTATE_PRODUCTS,
  type EstateProduct,
} from "@/components/m03-estate/the-estate-data";

const CARD_INTERACTION_CLASS =
  "transition-[transform,box-shadow] duration-300 ease-out [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-[0_14px_28px_rgba(47,41,36,0.12)]" as const;

function HeroSection() {
  return (
    <section
      aria-labelledby="the-estate-heading"
      className="relative h-[420px] w-full overflow-hidden bg-background-navbar desktop:h-[471px]"
      data-figma-node="16576:98466"
      data-section="the-estate-hero"
    >
      <Image
        src={THE_ESTATE_APPROVED_IMAGES.collectorSeriesHeroBackground}
        alt="Collector Series cigars arranged with estate accessories"
        fill
        priority
        sizes="100vw"
        className="pointer-events-none object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[rgba(21,20,20,0.4)]"
      />
      <div className="absolute inset-x-0 bottom-[58px] flex justify-center px-[24px] text-center desktop:bottom-[45px]">
        <h1
          id="the-estate-heading"
          className="font-[family-name:var(--velarro-display-light-font-family)] text-[44px] font-light uppercase leading-none text-text-text-white tablet:text-[58px] desktop:text-[72px]"
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
      className="flex min-h-[44px] items-center gap-[6px] px-[24px] text-[12px] desktop:px-[35px]"
      data-section="the-estate-breadcrumbs"
    >
      <Link
        href="/"
        className="rounded-[5px] px-[12px] py-[6px] font-[family-name:var(--velarro-heading-button-font-family)] text-text-heading"
      >
        Home
      </Link>
      <span
        aria-hidden="true"
        className="font-[family-name:var(--velarro-heading-product-cards-font-family)] text-border-strong"
      >
        |
      </span>
      <span className="px-[8px] py-[6px] font-[family-name:var(--velarro-heading-product-cards-font-family)] text-text-heading">
        The Estate
      </span>
      <span
        aria-current="page"
        className="border-b border-border-strong px-[8px] py-[6px] font-[family-name:var(--velarro-heading-product-cards-font-family)] text-text-heading"
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
      className="w-full border-b border-border-default bg-background-section px-[15px] py-[24px] desktop:min-h-[1493px] desktop:w-[350px] desktop:shrink-0 desktop:border-b-0 desktop:border-r"
      data-figma-node="11337:51053"
    >
      <div className="flex items-center justify-between">
        <p className="font-[family-name:var(--velarro-ui-elements-secondary-font-family)] text-[14px] font-normal uppercase leading-none text-text-heading">
          FILTERS
        </p>
        <span
          aria-hidden="true"
          className="grid size-[15px] place-items-center text-text-heading"
        >
          <span className="size-[9px] border-l border-t border-text-heading" />
        </span>
      </div>
      <div className="mt-[16px] flex justify-end">
        <button
          type="button"
          disabled
          aria-label="Clear filter (deferred: filtering is not approved for this scope)"
          className="cursor-not-allowed border-b border-border-strong pb-[4px] font-[family-name:var(--velarro-heading-button-font-family)] text-[14px] font-light leading-[20px] text-text-heading"
        >
          Clear filter
        </button>
      </div>
      <div className="mt-[20px] grid gap-[12px] tablet:grid-cols-2 desktop:grid-cols-1">
        {THE_ESTATE_FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            disabled
            aria-label={`${filter} filter (deferred: filtering is not approved for this scope)`}
            className="flex h-[32px] cursor-not-allowed items-center justify-between border-b border-border-default px-[12px] pb-[12px] text-left font-[family-name:var(--velarro-ui-elements-secondary-font-family)] text-[14px] font-normal uppercase leading-none text-text-heading disabled:opacity-100"
          >
            <span>{filter}</span>
            <span aria-hidden="true">-</span>
          </button>
        ))}
      </div>
    </aside>
  );
}

function CategoryTabs() {
  return (
    <section
      aria-labelledby="estate-category-heading"
      className="flex w-full flex-col items-center gap-[24px]"
      data-figma-node="16604:97510"
    >
      <h2 id="estate-category-heading" className="sr-only">
        The Estate categories
      </h2>
      <div
        aria-label="Estate collection tabs"
        className="flex items-center justify-center gap-[100px] font-[family-name:var(--velarro-heading-button-font-family)] text-[14px] font-light uppercase text-text-heading"
        role="tablist"
      >
        <button
          type="button"
          disabled
          role="tab"
          aria-selected="true"
          className="cursor-not-allowed border-b border-border-strong pb-[10px] disabled:opacity-100"
        >
          THE HUMIDOR
        </button>
        <Link
          href="/the-estate/the-house"
          aria-selected="false"
          className="pb-[10px]"
        >
          THE HOUSE
        </Link>
      </div>
      <div className="flex w-full max-w-[936px] items-center gap-[13px]">
        <div className="flex min-w-0 flex-1 gap-[40px] overflow-x-auto pb-[8px] desktop:gap-[40px]">
          {THE_ESTATE_CATEGORY_LABELS.map((category) => (
            <article
              key={category.id}
              className="flex w-[120px] shrink-0 flex-col items-center gap-[15px]"
              data-category-id={category.id}
            >
              <div
                aria-label={`${category.label} category image deferred`}
                className="grid size-[111px] place-items-center rounded-[12px] border border-border-default bg-background-section"
                data-image-status="deferred"
              >
                <span
                  aria-hidden="true"
                  className="size-[32px] rounded-full border border-border-light"
                />
              </div>
              <h3 className="whitespace-nowrap text-center font-[family-name:var(--velarro-heading-button-font-family)] text-[14px] font-light uppercase leading-none text-text-heading">
                {category.label}
              </h3>
            </article>
          ))}
        </div>
        <button
          type="button"
          disabled
          aria-label="Next category set (deferred)"
          className="grid size-[24px] shrink-0 cursor-not-allowed place-items-center text-text-heading disabled:opacity-70"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </section>
  );
}

function IntensityDots() {
  return (
    <span aria-hidden="true" className="inline-flex items-center gap-[4px]">
      <span className="size-[6px] rounded-full bg-border-strong" />
      <span className="size-[6px] rounded-full bg-border-strong" />
      <span className="size-[6px] rounded-full bg-border-strong" />
      <span className="size-[6px] rounded-full border border-border-strong" />
    </span>
  );
}

function ProductCard({ product }: { product: EstateProduct }) {
  return (
    <article
      className={`relative flex min-h-[471px] w-full max-w-[292px] flex-col rounded-[8px] border border-border-light bg-background-card p-[12px] shadow-card-subtle ${CARD_INTERACTION_CLASS}`}
      data-product-id={product.id}
      data-figma-node="MAIN PRODUCT CARD"
    >
      <span className="absolute left-[18px] top-[17px] z-10 rounded-[4px] bg-background-navbar px-[8px] py-[4px] font-[family-name:var(--velarro-ui-elements-secondary-font-family)] text-[12px] font-normal leading-none text-text-text-white">
        {product.badge}
      </span>
      <div className="relative h-[265px] w-full overflow-hidden rounded-[4px] bg-background-section">
        <Image
          src={product.imageUrl}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1440px) 264px, (min-width: 768px) 30vw, 80vw"
          className="object-cover object-center"
        />
      </div>
      <div className="mt-[14px] flex flex-1 flex-col">
        <h3 className="font-[family-name:var(--velarro-heading-product-cards-font-family)] text-[16px] font-normal leading-[20px] text-text-heading">
          {product.name}
        </h3>
        <p className="mt-[2px] font-[family-name:var(--velarro-ui-elements-secondary-font-family)] text-[12px] font-normal leading-[16px] text-text-body-text">
          {product.vitola}
        </p>
        <p className="mt-[8px] flex flex-wrap items-center gap-x-[6px] gap-y-[2px] font-[family-name:var(--velarro-ui-elements-secondary-font-family)] text-[12px] font-normal leading-[16px] text-text-heading">
          <span>⌀ {product.ringGauge}</span>
          <span aria-hidden="true">|</span>
          <span>{product.length}</span>
          <span aria-hidden="true">|</span>
          <span>{product.enjoymentTime}</span>
        </p>
        <div className="mt-[8px] flex items-center gap-[8px]">
          <span className="font-[family-name:var(--velarro-ui-elements-secondary-font-family)] text-[12px] font-normal leading-[16px] text-text-body-text">
            {product.intensityLabel}
          </span>
          <IntensityDots />
        </div>
        <p className="mt-[8px] min-h-[36px] font-[family-name:var(--velarro-ui-elements-secondary-font-family)] text-[12px] font-normal leading-[16px] text-text-body-text">
          {product.notes}
        </p>
        <button
          type="button"
          disabled
          aria-label={`Explore ${product.name} (deferred: product detail page is not approved for this scope)`}
          className="mt-auto h-[30px] w-full cursor-not-allowed rounded-[4px] border border-border-default bg-button-fill font-[family-name:var(--velarro-heading-button-font-family)] text-[14px] font-light uppercase leading-none text-text-heading disabled:opacity-100"
        >
          EXPLORE
        </button>
      </div>
    </article>
  );
}

function Pagination() {
  return (
    <nav aria-label="The Estate pagination" className="mt-[36px]">
      <div className="flex items-center justify-center gap-[16px]">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5, 6, 7].map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              disabled
              aria-label={`Page ${pageNumber} (deferred: pagination is not approved for this scope)`}
              aria-current={pageNumber === 1 ? "page" : undefined}
              className={`grid h-[30px] w-[27px] cursor-not-allowed place-items-center border-y border-r border-text-body-text font-[family-name:var(--velarro-display-light-font-family)] text-[20px] font-light leading-none text-text-heading disabled:opacity-100 ${
                pageNumber === 1
                  ? "border-l bg-labels-active-selected"
                  : "opacity-65 first:border-l"
              }`}
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
      className="w-full px-[24px] pb-[70px] pt-[22px] desktop:px-[52px]"
      data-section="the-estate-product-listing"
    >
      <h2 id="estate-products-heading" className="sr-only">
        Collector Series cigars
      </h2>
      <CategoryTabs />
      <div className="mx-auto mt-[28px] grid w-full max-w-[966px] justify-items-center gap-x-[45px] gap-y-[49px] tablet:grid-cols-2 desktop:grid-cols-3">
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
    <div className="min-h-screen w-full overflow-x-hidden bg-background-page">
      <MainNavbar />
      <main className="-mt-[73px] w-full">
        <HeroSection />
        <div className="flex w-full flex-col desktop:flex-row">
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
