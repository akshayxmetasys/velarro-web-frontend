import Image from "next/image";
import Link from "next/link";
import { FooterSection } from "@/components/m01-home/footer-section";
import { MainNavbar } from "@/components/m01-home/main-navbar";
import { THE_VAULT_HERO_IMAGE_STATUS } from "@/components/m05-vault/the-vault-assets";
import {
  VAULT_HERO_COPY,
  VAULT_OFFERS,
  VAULT_SECTION_COPY,
  type VaultOffer,
} from "@/components/m05-vault/the-vault-data";

function HeroSection() {
  return (
    <section
      aria-labelledby="the-vault-heading"
      className="relative h-[520px] w-full overflow-hidden bg-background-navbar desktop:h-[654px]"
      data-figma-node="14240:78029"
      data-section="the-vault-hero"
      data-image-status={THE_VAULT_HERO_IMAGE_STATUS}
      data-vault-hero="deferred"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,20,20,0.96)_0%,rgba(47,41,36,0.86)_48%,rgba(21,20,20,0.92)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70 [background-image:linear-gradient(115deg,transparent_0%,rgba(198,180,157,0.12)_42%,transparent_68%),linear-gradient(0deg,rgba(0,0,0,0.22),rgba(0,0,0,0.22))]"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[58px] left-[8%] h-[118px] w-[54%] rounded-full border border-border-strong/25 opacity-40 blur-[1px]"
      />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-[24px] pt-[73px] text-center">
        <h1
          id="the-vault-heading"
          className="font-[family-name:var(--velarro-display-light-font-family)] text-[44px] font-light uppercase leading-[var(--velarro-display-light-line-height)] tracking-[var(--velarro-display-light-letter-spacing)] text-text-text-white tablet:text-[58px] desktop:text-[length:var(--velarro-display-light-font-size)]"
        >
          {VAULT_HERO_COPY.title}
        </h1>
        <p className="mt-[18px] max-w-[760px] font-[family-name:var(--velarro-body-default-font-family)] text-[18px] font-light leading-[var(--velarro-body-default-line-height)] tracking-[var(--velarro-body-default-letter-spacing)] text-text-text-white/90 tablet:text-[length:var(--velarro-body-default-font-size)]">
          {VAULT_HERO_COPY.body}
        </p>
      </div>
    </section>
  );
}

function Breadcrumbs() {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex min-h-[62px] items-center gap-[6px] px-[24px] font-[family-name:var(--velarro-heading-button-font-family)] text-[14px] leading-none desktop:px-[35px]"
      data-section="the-vault-breadcrumbs"
    >
      <Link
        href="/"
        className="rounded-[5px] px-[12px] py-[6px] font-light text-text-heading"
      >
        Home
      </Link>
      <span
        aria-hidden="true"
        className="text-border-strong"
      >
        |
      </span>
      <span
        aria-current="page"
        className="border-b border-border-strong py-[4px] font-normal text-text-display"
      >
        The Vault
      </span>
    </nav>
  );
}

function SectionHeading() {
  return (
    <header className="flex flex-col items-center gap-[12px] text-center">
      <p className="font-[family-name:var(--velarro-heading-sectionsmall-font-family)] text-[length:var(--velarro-heading-sectionsmall-font-size)] font-light uppercase leading-[var(--velarro-heading-sectionsmall-line-height)] tracking-[var(--velarro-heading-sectionsmall-letter-spacing)] text-text-heading">
        {VAULT_SECTION_COPY.eyebrow}
      </p>
      <h2
        id="vault-offers-heading"
        className="font-[family-name:var(--velarro-heading-section-font-family)] text-[length:var(--velarro-heading-section-font-size)] font-light leading-[var(--velarro-heading-section-line-height)] tracking-[var(--velarro-heading-section-letter-spacing)] text-text-heading"
      >
        {VAULT_SECTION_COPY.title}
      </h2>
    </header>
  );
}

function OfferImage({ offer }: { offer: VaultOffer }) {
  return (
    <div
      className="relative flex h-[270px] w-full items-center justify-center overflow-hidden bg-background-navbar desktop:h-[398px] desktop:w-[390px] desktop:shrink-0 desktop:rounded-[8px] desktop:bg-white"
      data-vault-offer-image-region
    >
      <div className="relative h-full w-full desktop:size-[390px]">
        <Image
          src={offer.imageUrl}
          alt={offer.imageAlt}
          fill
          sizes="(min-width: 1440px) 390px, 90vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[rgba(21,20,20,0.18)]"
        />
      </div>
    </div>
  );
}

function OfferCopy({ offer }: { offer: VaultOffer }) {
  return (
    <div
      className="flex min-w-0 flex-1 flex-col px-[22px] py-[20px] desktop:w-[796px] desktop:max-w-[796px] desktop:shrink-0 desktop:px-0 desktop:py-0"
      data-vault-offer-content
    >
      <div className="flex items-start justify-between gap-[16px]">
        <p className="font-[family-name:var(--velarro-heading-card-font-family)] text-[length:var(--velarro-heading-card-font-size)] font-normal leading-[var(--velarro-heading-card-line-height)] tracking-[var(--velarro-heading-card-letter-spacing)] text-text-display">
          {offer.eyebrow}
        </p>
        <p className="text-right font-[family-name:var(--velarro-ui-elements-primary-font-family)] text-[length:var(--velarro-ui-elements-primary-font-size)] font-normal uppercase leading-[var(--velarro-ui-elements-primary-line-height)] tracking-[var(--velarro-ui-elements-primary-letter-spacing)] text-text-heading">
          {offer.status}
        </p>
      </div>
      <h3 className="mt-[22px] font-[family-name:var(--velarro-heading-card-font-family)] text-[26px] font-medium leading-none text-text-display tablet:text-[30px]">
        {offer.title}
      </h3>
      <p className="mt-[12px] font-[family-name:var(--velarro-body-default-font-family)] text-[18px] font-light leading-[var(--velarro-body-default-line-height)] tracking-[var(--velarro-body-default-letter-spacing)] text-text-body-text tablet:text-[length:var(--velarro-body-default-font-size)]">
        {offer.date}
      </p>
      <p className="mt-[14px] font-[family-name:var(--velarro-body-default-font-family)] text-[18px] font-light leading-[var(--velarro-body-default-line-height)] tracking-[var(--velarro-body-default-letter-spacing)] text-text-body-text tablet:text-[length:var(--velarro-body-default-font-size)]">
        {offer.description}
      </p>
      <div className="mt-[18px] font-[family-name:var(--velarro-body-default-font-family)] text-[18px] font-light leading-[var(--velarro-body-default-line-height)] tracking-[var(--velarro-body-default-letter-spacing)] text-text-body-text tablet:text-[length:var(--velarro-body-default-font-size)]">
        <p>Benefits:</p>
        <ul className="mt-[3px] list-disc pl-[18px]">
          {offer.benefits.map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        disabled
        aria-label={`View details for ${offer.title} (deferred: offer detail behavior is not approved for this scope)`}
        className="mt-[24px] h-[43px] w-full cursor-not-allowed rounded-[4px] border border-border-default bg-button-fill font-[family-name:var(--velarro-ui-elements-primary-font-family)] text-[length:var(--velarro-ui-elements-primary-font-size)] font-normal uppercase leading-[var(--velarro-ui-elements-primary-line-height)] tracking-[var(--velarro-ui-elements-primary-letter-spacing)] text-text-heading disabled:opacity-100 desktop:w-full"
      >
        VIEW DETAILS
      </button>
    </div>
  );
}

function OfferCard({ offer }: { offer: VaultOffer }) {
  const imageFirst = offer.imageSide === "left";

  return (
    <article
      className="flex w-full flex-col overflow-hidden rounded-[12px] border-[1.5px] border-border-default bg-background-card shadow-card-subtle desktop:min-h-[438px] desktop:max-w-[1314px] desktop:flex-row desktop:items-start desktop:gap-[80px] desktop:p-[24px]"
      data-offer-id={offer.id}
      data-figma-node="14581:35996"
      data-vault-offer-card
    >
      {imageFirst ? <OfferImage offer={offer} /> : null}
      <OfferCopy offer={offer} />
      {imageFirst ? null : <OfferImage offer={offer} />}
    </article>
  );
}

function OfferList() {
  return (
    <section
      aria-labelledby="vault-offers-heading"
      className="flex w-full flex-col gap-[30px] px-[24px] pb-[70px] pt-[22px]"
      data-section="the-vault-offers"
      data-figma-node="14240:78025"
      data-vault-offer-list
    >
      <SectionHeading />
      <div
        className="mx-auto mt-[10px] grid w-full max-w-[1314px] gap-[30px]"
        data-vault-offer-grid
      >
        {VAULT_OFFERS.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </section>
  );
}

export function TheVaultPage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background-page">
      <MainNavbar />
      <main className="-mt-[73px] w-full">
        <HeroSection />
        <Breadcrumbs />
        <OfferList />
      </main>
      <FooterSection />
    </div>
  );
}
