import Image from "next/image";
import Link from "next/link";
import { FooterSection } from "@/components/layout/main-footer";
import { MainNavbar } from "@/components/layout/main-navbar";
import {
  CHRONICLE_APPROVED_IMAGES,
  CHRONICLE_CARD_IMAGE_STATUS,
} from "@/components/m08-chronicle/chronicle-assets";
import {
  CHRONICLE_CARDS,
  CHRONICLE_FIGMA_NODE,
  CHRONICLE_HERO_COPY,
  CHRONICLE_NEWS_TICKER,
  type ChronicleCard as ChronicleCardData,
} from "@/components/m08-chronicle/chronicle-data";

function HeroSection() {
  return (
    <section
      aria-labelledby="chronicle-heading"
      className="relative h-[520px] w-full overflow-hidden bg-background-navbar desktop:h-[655px]"
      data-section="chronicle-hero"
      data-figma-node="14284:63192"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden"
        data-chronicle-hero-crop="figma-node-14284-63192"
        data-chronicle-hero-crop-width="99.99%"
        data-chronicle-hero-crop-height="141.04%"
        data-chronicle-hero-crop-top="-22.29%"
        data-chronicle-hero-crop-left="0"
      >
        <Image
          src={CHRONICLE_APPROVED_IMAGES.hero}
          alt=""
          width={1440}
          height={924}
          preload
          sizes="100vw"
          className="absolute max-w-none"
          style={{
            height: "141.04%",
            left: 0,
            objectFit: "fill",
            top: "-22.29%",
            width: "99.99%",
          }}
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(0deg,rgba(21,20,20,0.5),rgba(123,117,117,0.5))]"
      />
      <div
        className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 justify-center px-[24px] pt-[73px] text-center desktop:top-[264px] desktop:translate-y-0 desktop:pt-0"
      >
        <div
          className="flex w-full max-w-[777px] flex-col items-center gap-[20px]"
          data-section="chronicle-hero-content"
        >
          <h1
            id="chronicle-heading"
            className="font-[family-name:var(--velarro-display-light-font-family)] text-[44px] font-light uppercase leading-[var(--velarro-display-light-line-height)] tracking-[var(--velarro-display-light-letter-spacing)] text-text-text-white tablet:text-[58px] desktop:text-[length:var(--velarro-display-light-font-size)]"
            data-chronicle-typography="hero-title"
          >
            {CHRONICLE_HERO_COPY.title}
          </h1>
          <p
            className="max-w-[777px] font-[family-name:var(--velarro-body-default-font-family)] text-[18px] font-light leading-[28px] tracking-[var(--velarro-body-default-letter-spacing)] text-text-text-white tablet:text-[length:var(--velarro-body-default-font-size)]"
            data-chronicle-typography="hero-body"
          >
            {CHRONICLE_HERO_COPY.body}
          </p>
        </div>
      </div>
    </section>
  );
}

function Breadcrumbs() {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto flex min-h-[29px] w-full max-w-[1374px] items-center gap-[6px] px-[24px] font-[family-name:var(--velarro-heading-button-font-family)] text-[14px] leading-none desktop:px-0"
      data-section="chronicle-breadcrumbs"
      data-figma-node="14284:63198"
    >
      <Link
        href="/"
        className="rounded-[5px] px-[12px] py-[6px] font-light text-text-heading outline-none focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-2"
      >
        Home
      </Link>
      <span aria-hidden="true" className="text-border-strong">
        |
      </span>
      <span
        aria-current="page"
        className="border-b border-border-strong py-[4px] font-normal text-text-display"
      >
        The Chronicle
      </span>
    </nav>
  );
}

function NewsTicker() {
  return (
    <section
      aria-label="Live News and Events"
      className="mt-[48px] w-full border-y border-border-default"
      data-section="chronicle-news-ticker"
      data-figma-node="13505:52708"
    >
      <div className="mx-auto flex h-[39px] w-full max-w-[1440px] items-center justify-start gap-[8px] overflow-hidden px-[24px] font-[family-name:var(--velarro-heading-product-cards-font-family)] text-[length:var(--velarro-heading-product-cards-font-size)] font-normal leading-[24px] text-text-body-text desktop:justify-center desktop:px-[50px]">
        {CHRONICLE_NEWS_TICKER.map((item, index) => (
          <span
            key={item}
            className={
              index === CHRONICLE_NEWS_TICKER.length - 1
                ? "max-w-[132px] shrink-0 truncate whitespace-nowrap"
                : "shrink-0 whitespace-nowrap"
            }
          >
            {index === 1 ? (
              <span
                aria-hidden="true"
                className="mr-[8px] text-[24px] leading-none text-border-default"
              >
                |
              </span>
            ) : null}
            {index > 1 ? (
              <span aria-hidden="true" className="mr-[8px] text-text-display">
                -
              </span>
            ) : null}
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

function DeferredCardImage({ card }: { card: ChronicleCardData }) {
  const isFirstCard = card.id === "international-cigar-day";

  return (
    <div
      className={`relative h-[300px] w-full shrink-0 overflow-hidden rounded-[12px] desktop:w-[534px] ${
        isFirstCard ? "desktop:h-[469px]" : "desktop:h-[479px]"
      }`}
      data-chronicle-card-image
      data-chronicle-card-image-id={card.id}
      data-chronicle-card-image-status={CHRONICLE_CARD_IMAGE_STATUS}
      data-chronicle-card-image-width={String(card.imageRegionWidth)}
      data-chronicle-card-image-height={String(card.imageRegionHeight)}
      data-chronicle-layout-image-width={String(card.imageRegionWidth)}
      data-chronicle-layout-image-height={String(card.imageRegionHeight)}
      data-deferred-image-key={card.deferredImageKey}
      data-asset-status={CHRONICLE_CARD_IMAGE_STATUS}
      data-asset-url-status="none"
      data-figma-node={card.imageNodeId}
    >
      <span className="sr-only">
        Artwork for {card.title} is deferred pending approved production imagery.
      </span>
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[12px] border border-border-default bg-background-section"
      />
    </div>
  );
}

function ChronicleCard({ card }: { card: ChronicleCardData }) {
  const isFirstCard = card.id === "international-cigar-day";

  return (
    <article
      className={`flex w-full flex-col gap-[24px] rounded-[24px] border border-border-default bg-background-section p-[24px] desktop:max-w-[1054px] desktop:flex-row desktop:items-center desktop:gap-[80px] desktop:p-[40px] ${
        isFirstCard ? "desktop:min-h-[549px]" : "desktop:min-h-[559px]"
      }`}
      data-chronicle-card
      data-chronicle-card-id={card.id}
      data-chronicle-layout-card-width="1054"
      data-chronicle-layout-card-gap="80"
      data-chronicle-layout-card-padding="40"
      data-chronicle-layout-card-height={String(card.outerHeightPx)}
      data-figma-node={card.figmaNodeId}
    >
      <div
        className="flex w-full flex-col items-start gap-[20px] desktop:w-[360px] desktop:shrink-0"
        data-chronicle-card-content
        data-chronicle-layout-content-width="360"
      >
        <p
          className="font-[family-name:var(--velarro-heading-product-cards-font-family)] text-[length:var(--velarro-heading-product-cards-font-size)] font-normal leading-[24px] text-text-heading"
          data-chronicle-typography="card-date"
        >
          {card.date}
        </p>
        <h2
          className="font-[family-name:var(--velarro-heading-page-font-family)] text-[length:var(--velarro-heading-page-font-size)] font-normal leading-[var(--velarro-heading-page-line-height)] tracking-[var(--velarro-heading-page-letter-spacing)] text-text-display"
          data-chronicle-typography="card-title"
        >
          {card.title}
        </h2>
        <div
          className={`flex w-full flex-col gap-[10px] font-[family-name:var(--velarro-body-label-font-family)] text-[length:var(--velarro-body-label-font-size)] font-light leading-[var(--velarro-body-label-line-height)] tracking-[var(--velarro-body-label-letter-spacing)] text-text-body-text ${
            card.id === "international-cigar-day"
              ? "desktop:min-h-[236px]"
              : card.id === "international-tea-day"
                ? "desktop:min-h-[242px]"
                : card.id === "founders-reserve-month"
                  ? "desktop:min-h-[264px]"
                  : "desktop:min-h-[317px]"
          }`}
          data-chronicle-typography="card-body"
          data-chronicle-body-min-height={String(card.bodyRegionMinHeightPx)}
        >
          {card.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <button
          type="button"
          disabled
          aria-label={`View event details for ${card.title} (deferred: article detail behavior is not approved for this scope)`}
          className="h-[35px] w-full cursor-not-allowed rounded-[4px] border border-border-default bg-button-fill font-[family-name:var(--velarro-ui-elements-primary-font-family)] text-[length:var(--velarro-ui-elements-primary-font-size)] font-normal uppercase leading-[var(--velarro-ui-elements-primary-line-height)] tracking-[var(--velarro-ui-elements-primary-letter-spacing)] text-text-heading disabled:opacity-100"
          data-chronicle-typography="button-text"
          data-chronicle-event-details="deferred"
        >
          VIEW EVENT DETAILS
        </button>
      </div>
      <DeferredCardImage card={card} />
    </article>
  );
}

function ChronicleCards() {
  return (
    <section
      aria-label="Chronicle events"
      className="mt-[48px] flex w-full justify-center px-[24px] pb-[48px]"
      data-section="chronicle-cards"
      data-figma-node="14284:63208"
      data-chronicle-layout-stack-gap="80"
    >
      <div
        className="flex w-full max-w-[1054px] flex-col gap-[80px]"
        data-chronicle-card-stack
      >
        {CHRONICLE_CARDS.map((card) => (
          <ChronicleCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}

export function ChroniclePage() {
  return (
    <div
      className="min-h-screen w-full bg-background-page"
      data-figma-node={CHRONICLE_FIGMA_NODE}
      data-route="/the-chronicle"
    >
      <MainNavbar />
      <main className="-mt-[73px] w-full">
        <div
          className="flex w-full flex-col gap-[12px]"
          data-section="chronicle-hero-breadcrumb-group"
        >
          <HeroSection />
          <Breadcrumbs />
        </div>
        <NewsTicker />
        <ChronicleCards />
      </main>
      <FooterSection />
    </div>
  );
}
