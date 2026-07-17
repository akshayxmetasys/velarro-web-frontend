import Image from "next/image";
import Link from "next/link";
import { FooterSection } from "@/components/layout/main-footer";
import { MainNavbar } from "@/components/layout/main-navbar";
import { PAIRING_GUIDE_APPROVED_IMAGES } from "@/components/m08-pairing-guide/pairing-guide-assets";
import {
  PAIRING_GUIDE_CARDS,
  PAIRING_GUIDE_CTA_COPY,
  PAIRING_GUIDE_FIGMA_NODE,
  PAIRING_GUIDE_HERO_COPY,
  PAIRING_GUIDE_SECTION_COPY,
  type PairingGuideCard as PairingGuideCardData,
} from "@/components/m08-pairing-guide/pairing-guide-data";

function HeroSection() {
  return (
    <section
      aria-labelledby="pairing-guide-heading"
      className="relative h-[520px] w-full overflow-hidden bg-background-navbar desktop:h-[655px]"
      data-section="pairing-guide-hero"
      data-figma-node="14585:40485"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden"
        data-pairing-guide-hero-crop="exact-figma-node-14406-85076"
        data-figma-crop="pairing-guide-hero-exact-14406-85076"
        data-pairing-guide-hero-crop-width="100%"
        data-pairing-guide-hero-crop-height="960px"
        data-pairing-guide-hero-crop-top="-72px"
        data-pairing-guide-hero-crop-left="0"
        data-pairing-guide-hero-figma-source-node="14406:85076"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PAIRING_GUIDE_APPROVED_IMAGES.hero}
          alt=""
          width={1440}
          height={960}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="absolute left-0 top-[-72px] h-[960px] w-full max-w-none"
          data-figma-crop="pairing-guide-hero-exact-14406-85076"
          style={{
            height: "960px",
            left: 0,
            objectFit: "fill",
            position: "absolute",
            top: "-72px",
            width: "100%",
          }}
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[rgba(21,20,20,0.4)]"
        data-pairing-guide-hero-overlay="rgba(21,20,20,0.4)"
      />
      <div className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 justify-center px-[24px] pt-[73px] text-center desktop:top-[281px] desktop:translate-y-0 desktop:pt-0">
        <div
          className="flex w-full max-w-[777px] flex-col items-center gap-[20px]"
          data-section="pairing-guide-hero-content"
        >
          <h1
            id="pairing-guide-heading"
            className="font-[family-name:var(--velarro-display-light-font-family)] text-[42px] font-light uppercase leading-[var(--velarro-display-light-line-height)] tracking-[var(--velarro-display-light-letter-spacing)] text-text-text-white tablet:text-[58px] desktop:text-[length:var(--velarro-display-light-font-size)]"
            data-pairing-guide-typography="hero-title"
          >
            {PAIRING_GUIDE_HERO_COPY.title}
          </h1>
          <p
            className="max-w-[777px] font-[family-name:var(--velarro-body-default-font-family)] text-[18px] font-light leading-[28px] tracking-[var(--velarro-body-default-letter-spacing)] text-text-text-white tablet:text-[length:var(--velarro-body-default-font-size)]"
            data-pairing-guide-typography="hero-body"
          >
            {PAIRING_GUIDE_HERO_COPY.body}
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
      className="mx-auto flex min-h-[29px] w-full max-w-[1356px] items-center gap-[6px] px-[24px] font-[family-name:var(--velarro-heading-button-font-family)] text-[14px] leading-none desktop:px-0"
      data-section="pairing-guide-breadcrumbs"
      data-figma-node="14585:39985"
    >
      <Link
        href="/"
        className="rounded-[5px] px-[12px] py-[6px] font-light text-text-heading outline-none focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-2"
      >
        Home
      </Link>
      <span aria-hidden="true" className="text-[13px] text-border-strong">
        |
      </span>
      <span
        aria-current="page"
        className="border-b border-border-default py-[4px] font-normal text-text-display"
      >
        Pairing guide
      </span>
    </nav>
  );
}

function PairingCardImage({ card }: { card: PairingGuideCardData }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-radius-md"
      data-pairing-guide-card-image
      data-pairing-guide-card-image-id={card.id}
      data-pairing-guide-card-image-node={card.figmaNodeId}
      data-pairing-guide-card-image-width={String(card.cardWidthPx)}
      data-pairing-guide-card-image-height={String(card.cardHeightPx)}
      data-pairing-guide-card-image-object-position={card.objectPosition}
      data-pairing-guide-card-image-blur={String(card.blurPx)}
    >
      <Image
        src={card.imageSrc}
        alt={card.imageAlt}
        width={card.intrinsicWidth}
        height={card.intrinsicHeight}
        sizes="(min-width: 1280px) 626px, 100vw"
        className="absolute inset-0 h-full w-full max-w-none rounded-radius-md object-cover"
        style={{
          filter: `blur(${card.blurPx}px)`,
          objectPosition: card.objectPosition,
        }}
        unoptimized
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-radius-md"
        style={{ backgroundColor: card.overlay }}
        data-pairing-guide-card-overlay={card.overlay}
      />
    </div>
  );
}

function PairingCard({ card }: { card: PairingGuideCardData }) {
  return (
    <article
      className="relative h-[398px] w-full overflow-hidden rounded-radius-md border border-border-default desktop:w-[626px]"
      data-pairing-guide-card
      data-pairing-guide-card-id={card.id}
      data-pairing-guide-layout-card-width="626"
      data-pairing-guide-layout-card-height="398"
      data-pairing-guide-layout-content-left="55"
      data-pairing-guide-layout-content-top="88"
      data-pairing-guide-layout-body-width="489"
      data-figma-node={card.figmaNodeId}
    >
      <PairingCardImage card={card} />
      <div
        className="absolute left-[28px] right-[28px] top-[64px] z-10 flex flex-col items-start gap-[28px] desktop:left-[55px] desktop:right-auto desktop:top-[88px] desktop:gap-[32px]"
        data-pairing-guide-card-content
      >
        <h3
          className="font-[family-name:var(--velarro-display-light-font-family)] text-[24px] font-light leading-normal tracking-[-0.12px] text-text-text-white"
          data-pairing-guide-typography="card-title"
        >
          {card.title}
        </h3>
        <p
          className="w-full max-w-[489px] font-[family-name:var(--velarro-heading-product-cards-font-family)] text-[length:var(--velarro-heading-product-cards-font-size)] font-normal leading-[24px] tracking-[var(--velarro-heading-product-cards-letter-spacing)] text-text-text-white desktop:w-[489px]"
          data-pairing-guide-typography="card-body"
        >
          {card.body}
        </p>
        <button
          type="button"
          disabled
          aria-label={`Explore ${card.title} (deferred: pairing detail page is not approved for this scope)`}
          className="flex w-[283px] cursor-not-allowed items-center justify-center rounded-radius-md border border-border-default bg-button-fill px-[16px] py-[16px] font-[family-name:var(--velarro-ui-elements-primary-font-family)] text-[length:var(--velarro-ui-elements-primary-font-size)] font-normal uppercase leading-none tracking-[var(--velarro-ui-elements-primary-letter-spacing)] text-text-heading disabled:opacity-100"
          data-pairing-guide-typography="button-text"
          data-pairing-guide-explore="deferred"
        >
          EXPLORE
        </button>
      </div>
    </article>
  );
}

function PairingCardsSection() {
  return (
    <section
      aria-labelledby="pairing-guide-section-heading"
      className="mt-[48px] flex w-full justify-center px-[24px] pb-[48px]"
      data-section="pairing-guide-cards"
      data-figma-node="14585:39988"
    >
      <div className="flex w-full max-w-[1282px] flex-col items-center">
        <div
          className="flex w-full max-w-[414px] flex-col items-center gap-[16px]"
          data-section="pairing-guide-heading"
          data-figma-node="14585:39987"
        >
          <p
            className="w-full max-w-[362px] border-b border-border-default pb-[4px] text-center font-[family-name:var(--velarro-heading-sectionsmall-font-family)] text-[length:var(--velarro-heading-sectionsmall-font-size)] font-light uppercase leading-[var(--velarro-heading-sectionsmall-line-height)] tracking-[var(--velarro-heading-sectionsmall-letter-spacing)] text-text-display"
            data-pairing-guide-typography="section-eyebrow"
          >
            {PAIRING_GUIDE_SECTION_COPY.eyebrow}
          </p>
          <h2
            id="pairing-guide-section-heading"
            className="font-[family-name:var(--velarro-heading-section-font-family)] text-[length:var(--velarro-heading-section-font-size)] font-light leading-[var(--velarro-heading-section-line-height)] tracking-[var(--velarro-heading-section-letter-spacing)] text-text-heading"
            data-pairing-guide-typography="section-title"
          >
            {PAIRING_GUIDE_SECTION_COPY.title}
          </h2>
        </div>

        <div
          className="mt-[48px] grid w-full grid-cols-1 gap-y-[80px] desktop:grid-cols-2 desktop:gap-x-[28px]"
          data-pairing-guide-card-grid
          data-pairing-guide-layout-grid-width="1282"
          data-pairing-guide-layout-column-gap="28"
          data-pairing-guide-layout-row-gap="80"
          data-figma-node="14406:85080"
        >
          {PAIRING_GUIDE_CARDS.map((card) => (
            <PairingCard key={card.id} card={card} />
          ))}
        </div>

        <section
          aria-labelledby="pairing-guide-cta-heading"
          className="mt-[80px] flex min-h-[225px] w-full items-center justify-center rounded-[24px] border border-border-default bg-background-card px-[24px] py-[28px] desktop:px-[50px]"
          data-section="pairing-guide-cta"
          data-figma-node="14406:85121"
          data-pairing-guide-layout-cta-width="1282"
          data-pairing-guide-layout-cta-content-width="874"
        >
          <div className="flex w-full max-w-[874px] flex-col items-center gap-[20px] text-center">
            <h2
              id="pairing-guide-cta-heading"
              className="max-w-[491px] font-[family-name:var(--velarro-heading-section-font-family)] text-[length:var(--velarro-heading-section-font-size)] font-light leading-[var(--velarro-heading-section-line-height)] tracking-[var(--velarro-heading-section-letter-spacing)] text-text-heading"
            >
              {PAIRING_GUIDE_CTA_COPY.title}
            </h2>
            <p className="font-[family-name:var(--velarro-body-default-font-family)] text-[18px] font-light leading-[28px] tracking-[var(--velarro-body-default-letter-spacing)] text-text-body-text tablet:text-[length:var(--velarro-body-default-font-size)]">
              {PAIRING_GUIDE_CTA_COPY.body}
            </p>
            <button
              type="button"
              disabled
              aria-label="Find my pairing (deferred: interactive pairing flow is not approved for this scope)"
              className="flex h-[35px] w-full max-w-[368px] cursor-not-allowed items-center justify-center rounded-radius-md border border-border-default bg-button-fill px-[16px] font-[family-name:var(--velarro-ui-elements-primary-font-family)] text-[length:var(--velarro-ui-elements-primary-font-size)] font-normal uppercase leading-none tracking-[var(--velarro-ui-elements-primary-letter-spacing)] text-text-heading disabled:opacity-100"
              data-pairing-guide-find-pairing="deferred"
            >
              {PAIRING_GUIDE_CTA_COPY.button}
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}

export function PairingGuidePage() {
  return (
    <div
      className="min-h-screen w-full bg-background-page"
      data-figma-node={PAIRING_GUIDE_FIGMA_NODE}
      data-route="/pairing-guide"
    >
      <MainNavbar />
      <main className="-mt-[73px] w-full">
        <div
          className="flex w-full flex-col gap-[12px]"
          data-section="pairing-guide-hero-breadcrumb-group"
        >
          <HeroSection />
          <Breadcrumbs />
        </div>
        <PairingCardsSection />
      </main>
      <FooterSection />
    </div>
  );
}
