import Image from "next/image";
import Link from "next/link";
import { FooterSection } from "@/components/m01-home/footer-section";
import { MainNavbar } from "@/components/m01-home/main-navbar";
import { THE_HOUSE_APPROVED_IMAGES } from "@/components/m04-house/the-house-assets";
import {
  THE_HOUSE_CATEGORIES,
  THE_HOUSE_PRODUCTS,
  type HouseProduct,
} from "@/components/m04-house/the-house-data";

const CARD_INTERACTION_CLASS =
  "transition-[transform,box-shadow] duration-300 ease-out [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-[0_14px_28px_rgba(47,41,36,0.12)]" as const;

function HeroSection() {
  return (
    <section
      aria-labelledby="the-house-heading"
      className="relative h-[420px] w-full overflow-hidden bg-background-navbar desktop:h-[471px]"
      data-figma-node="16576:97879"
      data-section="the-house-hero"
    >
      <Image
        src={THE_HOUSE_APPROVED_IMAGES.houseHeroAllHouse}
        alt="Velarro House hero product arrangement"
        fill
        priority
        sizes="100vw"
        className="pointer-events-none object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[rgba(21,20,20,0.4)]"
      />
      <div className="absolute inset-x-0 bottom-[52px] flex justify-center px-[24px] text-center">
        <h1
          id="the-house-heading"
          className="font-[family-name:var(--velarro-display-light-font-family)] text-[44px] font-light uppercase leading-none text-text-text-white tablet:text-[58px] desktop:text-[72px]"
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
      className="flex min-h-[53px] items-center gap-[6px] px-[24px] text-[12px] desktop:px-[25px]"
      data-section="the-house-breadcrumbs"
      data-figma-node="16576:96116"
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
      <Link
        href="/the-estate"
        className="rounded-[5px] px-[12px] py-[6px] font-[family-name:var(--velarro-heading-button-font-family)] text-text-heading"
      >
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
        className="border-b border-border-strong py-[4px] font-[family-name:var(--velarro-heading-product-cards-font-family)] text-text-display"
      >
        The House
      </span>
    </nav>
  );
}

function EstateTabs() {
  return (
    <div
      aria-label="Estate collection tabs"
      className="flex items-center justify-center gap-[80px] font-[family-name:var(--velarro-heading-button-font-family)] text-[16px] font-normal uppercase text-text-heading"
    >
      <Link
        href="/the-estate"
        className="px-[30px] py-[4px]"
      >
        THE HUMIDOR
      </Link>
      <span
        aria-current="page"
        className="border-b-2 border-border-strong px-[2px] py-[4px]"
      >
        THE HOUSE
      </span>
    </div>
  );
}

function CategoryStrip() {
  return (
    <section
      aria-labelledby="the-house-categories-heading"
      className="flex w-full flex-col items-center gap-[24px]"
      data-figma-node="16576:96105"
    >
      <h2 id="the-house-categories-heading" className="sr-only">
        The House categories
      </h2>
      <EstateTabs />
      <div className="flex w-full max-w-[930px] gap-[42px] overflow-x-auto pb-[8px]">
        {THE_HOUSE_CATEGORIES.map((category) => {
          const isCurrentCategory =
            "current" in category && category.current === true;

          return (
            <article
              key={category.id}
              className="flex w-[120px] shrink-0 flex-col items-center gap-[15px]"
              data-category-id={category.id}
              aria-current={isCurrentCategory ? "true" : undefined}
            >
              <div
                className={`relative overflow-hidden rounded-[12px] bg-background-section ${
                  isCurrentCategory
                    ? "size-[135px] border-2 border-border-default"
                    : "mt-[12px] size-[111px] border border-border-strong opacity-90"
                }`}
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
                className={`whitespace-nowrap text-center font-[family-name:var(--velarro-heading-button-font-family)] uppercase leading-none text-text-heading ${
                  isCurrentCategory
                    ? "text-[16px] font-normal"
                    : "text-[14px] font-light"
                }`}
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
  return (
    <div
      aria-label={`${product.name} color options`}
      className="flex items-center gap-[8px]"
    >
      {product.swatches.map((swatch) => (
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
      className={`relative flex min-h-[398px] w-full max-w-[292px] flex-col rounded-[8px] border border-border-light bg-background-card p-[14px] shadow-card-subtle ${CARD_INTERACTION_CLASS}`}
      data-product-id={product.id}
      data-figma-node="MAIN PRODUCT CARD"
    >
      <div className="relative h-[265px] w-full overflow-hidden rounded-[8px] bg-background-section">
        <Image
          src={product.imageUrl}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1440px) 264px, (min-width: 768px) 30vw, 80vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[rgba(21,20,20,0.18)]"
        />
        <span className="absolute left-0 top-0 rounded-[8px] bg-background-navbar px-[6px] py-[4px] font-[family-name:var(--velarro-ui-elements-secondary-font-family)] text-[12px] font-light leading-[17px] tracking-[0.12px] text-background-section">
          {product.badge}
        </span>
      </div>
      <div className="mt-[12px] flex flex-1 flex-col gap-[12px]">
        <h3 className="font-[family-name:var(--velarro-heading-product-cards-font-family)] text-[16px] font-normal leading-[20px] text-text-display">
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
    <nav aria-label="The House pagination" className="mt-[36px]">
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
          <span aria-hidden="true">{">"}</span>
        </button>
      </div>
    </nav>
  );
}

function ProductListing() {
  return (
    <section
      aria-labelledby="the-house-products-heading"
      className="mx-auto w-full max-w-[1014px] px-[24px] pb-[70px] pt-[24px]"
      data-section="the-house-product-listing"
      data-figma-node="16576:96104"
    >
      <h2 id="the-house-products-heading" className="sr-only">
        The House products
      </h2>
      <CategoryStrip />
      <div className="mx-auto mt-[34px] grid w-full max-w-[966px] justify-items-center gap-x-[45px] gap-y-[49px] tablet:grid-cols-2 desktop:grid-cols-3">
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
    <div className="min-h-screen w-full overflow-x-hidden bg-background-page">
      <MainNavbar />
      <main className="-mt-[73px] w-full">
        <HeroSection />
        <Breadcrumbs />
        <ProductListing />
      </main>
      <FooterSection />
    </div>
  );
}
