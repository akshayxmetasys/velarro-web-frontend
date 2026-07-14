import Image from "next/image";
import Link from "next/link";
import { FooterSection } from "@/components/m01-home/footer-section";
import { MainNavbar } from "@/components/m01-home/main-navbar";
import {
  GET_IN_TOUCH_ASSETS,
  GET_IN_TOUCH_HERO_NATURAL_DIMENSIONS,
} from "@/components/m09-get-in-touch/get-in-touch-assets";
import {
  GET_IN_TOUCH_CONTACT_INFO_COPY,
  GET_IN_TOUCH_FIGMA_NODE,
  GET_IN_TOUCH_FIGMA_NODES,
  GET_IN_TOUCH_FORM_COPY,
  GET_IN_TOUCH_HERO_COPY,
  GET_IN_TOUCH_INTRO_COPY,
  GET_IN_TOUCH_LOCATION_COPY,
} from "@/components/m09-get-in-touch/get-in-touch-data";
import { GetInTouchForm } from "@/components/m09-get-in-touch/get-in-touch-form";
import type { AgeState } from "@/lib/age/age-state";

interface GetInTouchPageProps {
  ageState: AgeState;
}

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[24px] w-[24px] text-icon-default"
      fill="none"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M4 7L12 13L20 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[24px] w-[24px]" fill="none">
      <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[24px] w-[24px]" fill="currentColor">
      <path d="M14 8.5H16.5V5.5H14C11.79 5.5 10 7.29 10 9.5V11.5H7.5V14.5H10V20.5H13V14.5H15.8L16.3 11.5H13V9.75C13 8.95 13.45 8.5 14 8.5Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[24px] w-[24px]" fill="currentColor">
      <path d="M6.5 9.5H9.5V18.5H6.5V9.5ZM8 8.25C8.9665 8.25 9.75 7.4665 9.75 6.5C9.75 5.5335 8.9665 4.75 8 4.75C7.0335 4.75 6.25 5.5335 6.25 6.5C6.25 7.4665 7.0335 8.25 8 8.25ZM11 9.5H13.8V10.65C14.2 9.95 15.05 9.25 16.35 9.25C19 9.25 19.75 10.95 19.75 13.45V18.5H16.75V13.95C16.75 12.85 16.5 11.45 14.95 11.45C13.55 11.45 13.05 12.55 13.05 13.9V18.5H11V9.5Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 12 9" className="h-[8px] w-[11px]" fill="none">
      <path
        d="M1 4.5H10.5M10.5 4.5L7 1M10.5 4.5L7 8"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeroSection() {
  const heroAsset = GET_IN_TOUCH_ASSETS.hero;

  return (
    <section
      aria-labelledby="get-in-touch-hero-heading"
      className="relative h-[520px] w-full overflow-hidden bg-background-navbar desktop:h-[655px]"
      data-testid="get-in-touch-hero"
      data-section="get-in-touch-hero"
      data-figma-node={GET_IN_TOUCH_FIGMA_NODES.hero}
      data-hero-natural-width={GET_IN_TOUCH_HERO_NATURAL_DIMENSIONS.naturalWidth}
      data-hero-natural-height={GET_IN_TOUCH_HERO_NATURAL_DIMENSIONS.naturalHeight}
      data-hero-classification="raw-source-cover"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden"
        data-figma-node={GET_IN_TOUCH_FIGMA_NODES.heroImage}
      >
        <Image
          src={heroAsset.url}
          alt=""
          width={1440}
          height={655}
          preload
          sizes="100vw"
          className="h-full w-full object-cover object-center"
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            objectPosition: "50% 50%",
          }}
          data-testid="get-in-touch-hero-image"
          data-asset-slot={heroAsset.slot}
          data-asset-status={heroAsset.status}
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(358.47deg,rgba(18,18,18,0.8)_2.31%,rgba(120,120,120,0)_156.6%)]"
        data-figma-node={GET_IN_TOUCH_FIGMA_NODES.heroOverlay}
      />
      <div
        className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 justify-center px-[24px] desktop:top-[314px] desktop:translate-y-0"
        data-figma-node={GET_IN_TOUCH_FIGMA_NODES.heroContent}
      >
        <div className="flex w-full max-w-[777px] flex-col items-center gap-[24px] text-center">
          <div className="flex flex-col items-center gap-[4px]">
            <h1
              id="get-in-touch-hero-heading"
              className="font-[family-name:var(--velarro-display-light-font-family)] text-[44px] font-light uppercase leading-none tracking-[0] text-text-text-white tablet:text-[58px] desktop:text-[72px]"
            >
              {GET_IN_TOUCH_HERO_COPY.title}
            </h1>
            <span
              aria-hidden="true"
              className="h-px w-full max-w-[777px] bg-border-strong/80"
            />
          </div>
          <p className="max-w-[615px] font-[family-name:var(--velarro-body-default-font-family)] text-[18px] font-light leading-[28px] tracking-[0] text-text-text-white desktop:text-[20px]">
            {GET_IN_TOUCH_HERO_COPY.body}
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
      className="flex min-h-[29px] items-center gap-[6px] px-[24px] font-[family-name:var(--velarro-heading-button-font-family)] text-[14px] leading-none desktop:px-[49px]"
      data-section="get-in-touch-breadcrumbs"
      data-figma-node="14644:34672"
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
        Get in Touch
      </span>
    </nav>
  );
}

function IntroSection() {
  return (
    <section
      aria-labelledby="get-in-touch-intro-heading"
      className="flex w-full justify-center px-[24px] pb-[32px] pt-[24px] desktop:px-[80px]"
      data-section="get-in-touch-intro"
      data-figma-node={GET_IN_TOUCH_FIGMA_NODES.intro}
    >
      <div className="flex w-full max-w-[1024px] flex-col items-center gap-[24px] text-center">
        <h2
          id="get-in-touch-intro-heading"
          className="font-[family-name:var(--velarro-heading-page-font-family)] text-[28px] font-normal leading-none tracking-[0] text-text-heading desktop:text-[32px]"
        >
          {GET_IN_TOUCH_INTRO_COPY.heading}
        </h2>
        <p className="font-[family-name:var(--velarro-body-default-font-family)] text-[20px] font-light leading-none tracking-[-0.12px] text-text-body-text desktop:text-[24px]">
          {GET_IN_TOUCH_INTRO_COPY.body}
        </p>
      </div>
    </section>
  );
}

function DeferredSocialButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      aria-label={`${label} social profile (deferred: social URL not approved for this scope)`}
      title={`${label} social profile - social URL not approved for this scope`}
      className="inline-flex h-[36px] w-[36px] cursor-not-allowed items-center justify-center rounded-[1px] border border-icon-default/50 bg-transparent p-0 text-icon-default"
    >
      {label === "Instagram" ? <InstagramIcon /> : null}
      {label === "Facebook" ? <FacebookIcon /> : null}
      {label === "LinkedIn" ? <LinkedInIcon /> : null}
    </button>
  );
}

function ContactInformationColumn() {
  return (
    <aside
      aria-labelledby="get-in-touch-contact-heading"
      className="flex w-full flex-col border-border-strong desktop:w-[430px] desktop:border-l desktop:pl-[54px] desktop:pt-[74px]"
      data-section="get-in-touch-contact-information"
      data-figma-node={GET_IN_TOUCH_FIGMA_NODES.contactInfo}
    >
      <div className="flex w-full flex-col gap-[20px]">
        <div className="flex flex-col gap-[24px]">
          <h2
            id="get-in-touch-contact-heading"
            className="font-[family-name:var(--velarro-heading-page-font-family)] text-[24px] font-normal leading-none tracking-[0] text-text-heading"
          >
            {GET_IN_TOUCH_CONTACT_INFO_COPY.heading}
          </h2>
          <div className="flex items-center gap-[8px]">
            <MailIcon />
            <p className="font-[family-name:var(--velarro-body-default-font-family)] text-[18px] font-light leading-[28px] tracking-[0] text-text-body-text desktop:text-[20px]">
              {GET_IN_TOUCH_CONTACT_INFO_COPY.email}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-[12px] bg-background-input px-[24px] py-[21px]">
          <p className="font-[family-name:var(--velarro-body-default-font-family)] text-[18px] font-light leading-none tracking-[0] text-text-body-text">
            {GET_IN_TOUCH_CONTACT_INFO_COPY.followHeading}
          </p>
          <div className="flex flex-col gap-[2px]">
            <p className="font-[family-name:var(--velarro-body-default-font-family)] text-[16px] font-light leading-[24px] tracking-[0] text-text-body-text">
              {GET_IN_TOUCH_CONTACT_INFO_COPY.stayConnectedHeading}
            </p>
            <p className="font-[family-name:var(--velarro-body-small-font-family)] text-[8px] font-light leading-[12px] tracking-[0.16px] text-text-secondary-body-text">
              {GET_IN_TOUCH_CONTACT_INFO_COPY.stayConnectedBody}
            </p>
          </div>
          <div className="flex items-center gap-[11px]" aria-label="Social profiles">
            <DeferredSocialButton label="Instagram" />
            <DeferredSocialButton label="Facebook" />
            <DeferredSocialButton label="LinkedIn" />
          </div>
        </div>

        <span aria-hidden="true" className="h-px w-full bg-border-strong" />

        <button
          type="button"
          disabled
          aria-disabled="true"
          aria-label="Find a store near you (deferred: store locator not approved for this scope)"
          title="Find a store near you - store locator not approved for this scope"
          className="inline-flex cursor-not-allowed items-center gap-[8px] border-0 bg-transparent p-0 font-[family-name:var(--velarro-body-default-font-family)] text-[18px] font-light leading-none tracking-[0] text-text-heading"
        >
          <span>{GET_IN_TOUCH_CONTACT_INFO_COPY.findStoreLabel}</span>
          <ArrowIcon />
        </button>

        <span aria-hidden="true" className="h-px w-full bg-border-strong" />
      </div>
    </aside>
  );
}

function ContactSection() {
  return (
    <section
      aria-labelledby="get-in-touch-form-heading"
      className="flex w-full justify-center px-[24px] py-[32px] desktop:px-[80px]"
      data-section="get-in-touch-contact"
      data-figma-node={GET_IN_TOUCH_FIGMA_NODES.mainContact}
    >
      <div className="flex w-full max-w-[1280px] flex-col gap-[28px] desktop:flex-row desktop:items-start">
        <div
          className="flex w-full flex-col gap-[32px] rounded-[24px] border border-border-default bg-background-page px-[20px] py-[32px] shadow-card-subtle desktop:w-[792px] desktop:px-[49px] desktop:pb-[65px] desktop:pt-[49px]"
          data-figma-node={GET_IN_TOUCH_FIGMA_NODES.formCard}
        >
          <h2
            id="get-in-touch-form-heading"
            className="font-[family-name:var(--velarro-heading-page-font-family)] text-[24px] font-normal leading-none tracking-[0] text-text-heading"
            data-figma-node="14644:34687"
          >
            {GET_IN_TOUCH_FORM_COPY.heading}
          </h2>
          <GetInTouchForm />
        </div>
        <ContactInformationColumn />
      </div>
    </section>
  );
}

function DeferredMap() {
  const mapAsset = GET_IN_TOUCH_ASSETS.map;

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-[1280/550] w-full max-w-[1280px] overflow-hidden rounded-[12px] border-2 border-border-default bg-background-section"
      data-testid="get-in-touch-map-deferred"
      data-asset-slot={mapAsset.slot}
      data-asset-status={mapAsset.status}
      data-figma-node={mapAsset.figmaNodeId}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(216,201,180,0.22)_0%,rgba(246,242,235,0.94)_48%,rgba(138,121,96,0.18)_100%)]" />
      <div className="absolute inset-[24px] rounded-[inherit] border border-border-default/60" />
      <div className="absolute left-1/2 top-1/2 h-[58%] w-px -translate-x-1/2 -translate-y-1/2 bg-border-default/35" />
      <div className="absolute left-1/2 top-1/2 h-px w-[58%] -translate-x-1/2 -translate-y-1/2 bg-border-default/35" />
    </div>
  );
}

function PrimaryLocationSection() {
  return (
    <section
      aria-labelledby="get-in-touch-location-heading"
      className="flex w-full justify-center px-[24px] pb-[80px] pt-[16px] desktop:px-[80px] desktop:pb-[80px]"
      data-section="get-in-touch-primary-location"
      data-figma-node={GET_IN_TOUCH_FIGMA_NODES.primaryLocation}
    >
      <div className="flex w-full max-w-[1280px] flex-col items-center gap-[16px]">
        <div className="flex max-w-[508px] flex-col items-center gap-[8px] text-center">
          <h2
            id="get-in-touch-location-heading"
            className="font-[family-name:var(--velarro-body-default-font-family)] text-[32px] font-light leading-none tracking-[0] text-text-heading desktop:text-[40px]"
          >
            {GET_IN_TOUCH_LOCATION_COPY.heading}
          </h2>
          <p className="font-[family-name:var(--velarro-body-default-font-family)] text-[18px] font-light leading-[28px] tracking-[0] text-text-body-text desktop:text-[20px]">
            {GET_IN_TOUCH_LOCATION_COPY.body}
          </p>
        </div>
        <DeferredMap />
      </div>
    </section>
  );
}

export function GetInTouchPage({ ageState }: GetInTouchPageProps) {
  return (
    <div
      className="min-h-screen w-full overflow-x-hidden bg-background-page"
      data-figma-node={GET_IN_TOUCH_FIGMA_NODE}
      data-route="/get-in-touch"
      data-route-audience="review"
      data-age-state={ageState}
    >
      <MainNavbar />
      <main className="-mt-[73px] w-full">
        <HeroSection />
        <Breadcrumbs />
        <IntroSection />
        <ContactSection />
        <PrimaryLocationSection />
      </main>
      <FooterSection />
    </div>
  );
}
