import Image from "next/image";
import Link from "next/link";
import { FooterSection } from "@/components/layout/main-footer";
import { MainNavbar } from "@/components/layout/main-navbar";
import { THE_HOUSE_APPROVED_IMAGES } from "@/components/m04-house/the-house-assets";
import {
  THE_HOUSE_CATEGORIES,
  THE_HOUSE_PRODUCTS,
  type HouseProduct,
} from "@/components/m04-house/the-house-data";
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
  "rounded-[5px] px-[12px] py-0 font-[family-name:var(--velarro-heading-button-font-family)] text-[14px] leading-[17px] text-text-heading outline-none focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-2";

const COLLECTION_LINK_CLASS =
  "px-[2px] py-[4px] outline-none focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-2";

function HeroSection() {
  return (
    <section
      aria-labelledby="the-house-heading"
      data-slot="the-house-hero"
      className="relative h-[420px] w-full overflow-hidden bg-background-navbar desktop:h-[471px]"
      data-figma-node="16576:96097"
    >
      <Image
        src={THE_HOUSE_APPROVED_IMAGES.houseHeroAllHouse}
        alt="Velarro House hero product arrangement"
        fill
        priority
        sizes="100vw"
        data-slot="the-house-hero-image"
        className="pointer-events-none object-cover object-center"
      />
      <div
        aria-hidden="true"
        data-slot="the-house-hero-overlay"
        className="absolute inset-0 bg-[rgba(21,20,20,0.4)]"
      />
      {/*
        Figma 16576:96100: title box x307 y333 w830 h86; visual center ≈ y376
        within the 471px hero frame (16576:96097).
      */}
      <div className="absolute inset-x-0 top-[calc(50%+40px)] flex -translate-y-1/2 justify-center px-[24px] text-center desktop:top-[376px] desktop:translate-y-[-50%]">
        <h1
          id="the-house-heading"
          className="max-w-[830px] font-[family-name:var(--velarro-display-light-font-family)] text-[44px] font-light uppercase leading-none text-text-text-white tablet:text-[58px] desktop:text-[72px]"
        >
          THE HOUSE
        </h1>
      </div>
    </section>
  );
}

function Breadcrumbs() {
  return (
    <nav
      aria-label="Breadcrumb"
      data-slot="the-house-breadcrumbs"
      className="mt-[12px] flex h-[17px] items-center gap-[6px] px-[24px] text-[14px] desktop:pl-[25px] desktop:pr-[24px]"
      data-figma-node="16576:96116"
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
        Unlike Humidor listing, The Estate is a real parent destination here.
      */}
      <Link href="/the-estate" className={BREADCRUMB_LINK_CLASS}>
        The Estate
      </Link>
      <span
        aria-hidden="true"
        className="font-[family-name:var(--velarro-heading-product-cards-font-family)] text-border-strong"
      >
        |
      </span>
      <span
        aria-current="page"
        className="border-b border-border-strong py-[4px] font-[family-name:var(--velarro-heading-product-cards-font-family)] text-[14px] text-text-heading"
      >
        The House
      </span>
    </nav>
  );
}

function CollectionNav() {
  return (
    <nav
      aria-label="Estate collection"
      data-slot="the-house-collection-nav"
      className="flex w-full max-w-[360px] items-center justify-center gap-[80px] font-[family-name:var(--velarro-heading-button-font-family)] text-[16px] font-normal uppercase text-text-heading"
      data-figma-node="16576:96106"
    >
      <Link href="/the-estate" className={COLLECTION_LINK_CLASS}>
        THE HUMIDOR
      </Link>
      <span
        aria-current="page"
        className="border-b-2 border-border-strong px-[2px] py-[4px]"
      >
        THE HOUSE
      </span>
    </nav>
  );
}

function CategoryRail() {
  return (
    <section
      aria-labelledby="the-house-categories-heading"
      data-slot="the-house-categories"
      className="flex w-full flex-col items-center gap-[24px]"
      data-figma-node="16576:96105"
    >
      <h2 id="the-house-categories-heading" className="sr-only">
        The House categories
      </h2>
      <CollectionNav />
      {/*
        Local horizontal scroll for narrow viewports only. Must not expand
        document width. Category routes remain deferred (no hrefs).
      */}
      <div
        role="region"
        aria-label="House categories"
        data-slot="the-house-category-rail"
        className="flex w-full max-w-[930px] gap-[42px] overflow-x-auto pb-[8px]"
        data-figma-node="16576:96107"
      >
        {THE_HOUSE_CATEGORIES.map((category) => {
          const isCurrentCategory =
            "current" in category && category.current === true;

          return (
            <article
              key={category.id}
              data-slot="the-house-category-tile"
              data-category-id={category.id}
              className="flex w-[120px] shrink-0 flex-col items-center gap-[15px]"
              aria-current={isCurrentCategory ? "true" : undefined}
            >
              <div
                className={cn(
                  "relative overflow-hidden rounded-[12px] bg-background-section",
                  isCurrentCategory
                    ? "h-[136px] w-[135px] border-2 border-border-default"
                    : "mt-[12px] size-[111px] border border-border-strong opacity-90",
                )}
              >
                <Image
                  src={category.imageUrl}
                  alt={category.imageAlt}
                  fill
                  sizes="136px"
                  className="object-cover object-center"
                />
              </div>
              <h3
                className={cn(
                  "whitespace-nowrap text-center font-[family-name:var(--velarro-heading-button-font-family)] uppercase leading-none text-text-heading",
                  isCurrentCategory
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
    </section>
  );
}

function Swatches({ product }: { product: HouseProduct }) {
  if (product.swatches.length === 0) {
    return null;
  }
  const swatches = product.swatches;

  return (
    <div
      aria-label={`${product.name} color options`}
      data-slot="the-house-product-swatches"
      className="flex items-center gap-[8px]"
    >
      {swatches.map((swatch) => (
        <span
          key={swatch}
          aria-hidden="true"
          className="size-[16px] rounded-full border border-[rgba(116,120,120,0.2)]"
          style={{ backgroundColor: swatch }}
        />
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: HouseProduct }) {
  return (
    <article
      data-slot="the-house-product-card"
      data-product-id={product.id}
      className={cn(
        "relative flex w-full max-w-[292px] flex-col gap-[12px] rounded-[8px] border border-border-light bg-background-section p-[14px]",
        CARD_INTERACTION_CLASS,
      )}
    >
      <div
        data-slot="the-house-product-image-frame"
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
        <h3 className="font-[family-name:var(--velarro-heading-product-cards-font-family)] text-[16px] font-normal leading-[24px] text-text-display">
          {product.name}
        </h3>
        <p className="min-h-[17px] font-[family-name:var(--velarro-ui-elements-secondary-font-family)] text-[10px] font-normal italic leading-[17px] tracking-[0.1px] text-text-body-text">
          {product.description}
        </p>
        <Swatches product={product} />
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
      aria-label="The House pagination"
      data-slot="the-house-pagination"
      className="mt-[34px]"
      data-figma-node="16576:96117"
    >
      <div className="mx-auto flex w-[229px] items-center justify-center gap-[16px]">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5, 6, 7].map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              disabled
              aria-label={`Page ${pageNumber} (deferred: pagination is not approved for this scope)`}
              aria-current={pageNumber === 1 ? "page" : undefined}
              className={cn(
                "grid h-[28px] w-[27px] cursor-not-allowed place-items-center font-[family-name:var(--velarro-display-light-font-family)] text-[20px] font-light leading-[28px] text-text-heading disabled:opacity-100",
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
      aria-labelledby="the-house-products-heading"
      data-slot="the-house-product-listing"
      className="mx-auto w-full max-w-[966px] px-[24px] pb-[48px] pt-[24px] desktop:px-0"
      data-figma-node="16576:96104"
    >
      <h2 id="the-house-products-heading" className="sr-only">
        The House products
      </h2>
      <CategoryRail />
      {/*
        Figma 16576:96108 / 16576:96112: card rows gap 34; cards vertically
        centered within each row (items-center). Variable card heights retained.
      */}
      <div
        data-slot="the-house-product-grid"
        className="mx-auto mt-[34px] grid w-full max-w-[966px] items-center justify-items-center gap-x-[45px] gap-y-[34px] tablet:grid-cols-2 desktop:grid-cols-3"
      >
        {THE_HOUSE_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination />
    </section>
  );
}

export function TheHousePage() {
  return (
    <div
      data-slot="the-house-page"
      className="min-h-screen w-full bg-background-page"
    >
      <MainNavbar />
      <main data-slot="the-house-main" className="-mt-[73px] w-full">
        <HeroSection />
        <Breadcrumbs />
        <ProductListing />
      </main>
      <FooterSection />
    </div>
  );
}
