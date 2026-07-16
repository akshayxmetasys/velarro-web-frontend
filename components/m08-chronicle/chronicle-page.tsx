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
  type ChronicleCard,
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
      <div className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 justify-center px-[24px] pt-[73px] text-center desktop:top-[264px] desktop:translate-y-0 desktop:pt-0">
        <div className="flex w-full max-w-[777px] flex-col items-center gap-[20px]">
          <h1
            id="chronicle-heading"
            className="font-[family-name:var(--velarro-display-light-font-family)] text-[44px] font-light uppercase leading-[var(--velarro-display-light-line-height)] tracking-[var(--velarro-display-light-letter-spacing)] text-text-text-white tablet:text-[58px] desktop:text-[length:var(--velarro-display-light-font-size)]"
            data-chronicle-typography="hero-title"
          >
            {CHRONICLE_HERO_COPY.title}
          </h1>
          <p
            className="max-w-[777px] font-[family-name:var(--velarro-body-default-font-family)] text-[18px] font-light leading-[var(--velarro-body-default-line-height)] tracking-[var(--velarro-body-default-letter-spacing)] text-text-text-white tablet:text-[length:var(--velarro-body-default-font-size)]"
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
      className="flex min-h-[29px] items-center gap-[6px] px-[24px] font-[family-name:var(--velarro-heading-button-font-family)] text-[14px] leading-none desktop:px-[33px]"
      data-section="chronicle-breadcrumbs"
      data-figma-node="14284:63198"
    >
      <Link
        href="/"
        className="rounded-[5px] px-[12px] py-[6px] font-light text-text-heading"
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
      className="w-full overflow-hidden border-y border-border-default"
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

function DeferredCardImage({ card }: { card: ChronicleCard }) {
  const isFirstCard = card.id === "international-cigar-day";

  return (
    <div
      aria-hidden="true"
      className={`relative h-[300px] w-full shrink-0 overflow-hidden rounded-[12px] border border-border-default bg-background-page desktop:w-[534px] ${
        isFirstCard ? "desktop:h-[469px]" : "desktop:h-[479px]"
      }`}
      data-chronicle-card-image-status={CHRONICLE_CARD_IMAGE_STATUS}
      data-chronicle-layout-image-width="534"
      data-chronicle-layout-image-height={isFirstCard ? "469" : "479"}
      data-deferred-image-key={card.deferredImageKey}
      data-figma-node={card.imageNodeId}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(216,201,180,0.34)_0%,rgba(246,242,235,0.96)_44%,rgba(198,180,157,0.28)_100%)]" />
      <div className="absolute inset-[22px] rounded-[10px] border border-border-default/70" />
      <div className="absolute left-1/2 top-1/2 h-[68%] w-px -translate-x-1/2 -translate-y-1/2 rotate-45 bg-border-default/45" />
      <div className="absolute left-1/2 top-1/2 h-px w-[68%] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-border-default/45" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,rgba(252,251,248,0.82),transparent_34%),radial-gradient(circle_at_76%_78%,rgba(198,180,157,0.22),transparent_36%)]" />
    </div>
  );
}

function ChronicleCard({ card }: { card: ChronicleCard }) {
  const isFirstCard = card.id === "international-cigar-day";

  return (
    <article
      className={`flex w-full flex-col gap-[24px] rounded-[24px] border border-border-default bg-background-card p-[24px] shadow-card-subtle desktop:max-w-[1054px] desktop:flex-row desktop:items-center desktop:gap-[80px] desktop:p-[40px] ${
        isFirstCard ? "desktop:min-h-[549px]" : "desktop:min-h-[559px]"
      }`}
      data-chronicle-card
      data-chronicle-card-id={card.id}
      data-chronicle-layout-card-width="1054"
      data-chronicle-layout-card-gap="80"
      data-chronicle-layout-card-padding="40"
      data-figma-node={card.figmaNodeId}
    >
      <div
        className="flex w-full flex-col items-start desktop:w-[360px] desktop:shrink-0"
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
          className="mt-[20px] font-[family-name:var(--velarro-heading-page-font-family)] text-[length:var(--velarro-heading-page-font-size)] font-normal leading-[var(--velarro-heading-page-line-height)] tracking-[var(--velarro-heading-page-letter-spacing)] text-text-display desktop:mt-[20px]"
          data-chronicle-typography="card-title"
        >
          {card.title}
        </h2>
        <div
          className="mt-[20px] flex flex-col gap-[10px] font-[family-name:var(--velarro-body-label-font-family)] text-[length:var(--velarro-body-label-font-size)] font-light leading-[var(--velarro-body-label-line-height)] tracking-[var(--velarro-body-label-letter-spacing)] text-text-body-text desktop:min-h-[236px]"
          data-chronicle-typography="card-body"
        >
          {card.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <button
          type="button"
          disabled
          aria-label={`View event details for ${card.title} (deferred: article detail behavior is not approved for this scope)`}
          className="mt-[20px] h-[35px] w-full cursor-not-allowed rounded-[4px] border border-border-default bg-button-fill font-[family-name:var(--velarro-ui-elements-primary-font-family)] text-[length:var(--velarro-ui-elements-primary-font-size)] font-normal uppercase leading-[var(--velarro-ui-elements-primary-line-height)] tracking-[var(--velarro-ui-elements-primary-letter-spacing)] text-text-heading disabled:opacity-100"
          data-chronicle-typography="button-text"
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
      className="flex w-full justify-center px-[24px] pb-[48px] pt-[48px] desktop:pb-[48px]"
      data-section="chronicle-cards"
      data-figma-node="14284:63208"
    >
      <div className="grid w-full max-w-[1054px] gap-[80px]">
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
      className="min-h-screen w-full overflow-x-hidden bg-background-page"
      data-figma-node={CHRONICLE_FIGMA_NODE}
      data-route="/the-chronicle"
    >
      <MainNavbar />
      <main className="-mt-[73px] w-full">
        <HeroSection />
        <Breadcrumbs />
        <NewsTicker />
        <ChronicleCards />
      </main>
      <FooterSection />
    </div>
  );
}
