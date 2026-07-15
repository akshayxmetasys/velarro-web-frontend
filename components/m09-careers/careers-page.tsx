import Image from "next/image";
import Link from "next/link";
import { FooterSection } from "@/components/m01-home/footer-section";
import { MainNavbar } from "@/components/m01-home/main-navbar";
import {
  CAREERS_APPROVED_IMAGES,
  CAREERS_DEFERRED_IMAGE_STATUS,
} from "@/components/m09-careers/careers-assets";
import {
  CAREERS_CTA_COPY,
  CAREERS_FIGMA_NODE,
  CAREERS_HERO_COPY,
  CAREERS_INTRO_COPY,
  CAREERS_JOBS,
  CAREERS_JOBS_COPY,
  CAREERS_TESTIMONIAL_COPY,
  CAREERS_VALUE_CARDS,
  CAREERS_WORKING_COPY,
  type CareersJob,
  type CareersValueCard,
} from "@/components/m09-careers/careers-data";
import type { AgeState } from "@/lib/age/age-state";
import { cn } from "@/lib/cn";

interface CareersPageProps {
  ageState: AgeState;
}

interface DeferredCareersImageProps {
  imageKey: string;
  figmaNode?: string;
  className?: string;
  variant?: "hero" | "card" | "panel";
}

function DeferredCareersImage({
  imageKey,
  figmaNode,
  className,
  variant = "card",
}: DeferredCareersImageProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden border border-border-default bg-background-page",
        variant === "hero" && "border-0 bg-background-navbar",
        variant === "card" && "rounded-[8px]",
        variant === "panel" && "rounded-[20px]",
        className,
      )}
      data-careers-image-status="deferred"
      data-careers-deferred-image-status={CAREERS_DEFERRED_IMAGE_STATUS}
      data-deferred-image-key={imageKey}
      data-figma-node={figmaNode}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(216,201,180,0.38)_0%,rgba(246,242,235,0.94)_46%,rgba(138,121,96,0.26)_100%)]" />
      <div className="absolute inset-[20px] rounded-[inherit] border border-border-default/70" />
      <div className="absolute left-1/2 top-1/2 h-[74%] w-px -translate-x-1/2 -translate-y-1/2 rotate-45 bg-border-default/45" />
      <div className="absolute left-1/2 top-1/2 h-px w-[74%] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-border-default/45" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_18%,rgba(252,251,248,0.82),transparent_33%),radial-gradient(circle_at_72%_76%,rgba(157,132,98,0.24),transparent_38%)]" />
    </div>
  );
}

function HeroSection() {
  return (
    <section
      aria-labelledby="careers-heading"
      className="relative h-[520px] w-full overflow-hidden bg-background-navbar desktop:h-[655px]"
      data-section="careers-hero"
      data-figma-node="13148:15772"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden"
        data-careers-hero-image="approved"
        data-figma-crop="careers-hero-final-13148-15771"
        data-careers-hero-crop="approved-asset-explicit-fill"
        data-careers-hero-frame-width="1440"
        data-careers-hero-frame-height="655"
        data-careers-hero-rendered-crop-width="100%"
        data-careers-hero-rendered-crop-height="100%"
        data-careers-hero-rendered-crop-top="0"
        data-careers-hero-rendered-crop-left="0"
        data-careers-hero-object-fit="fill"
        data-careers-hero-object-position="50% 50%"
        data-figma-node="13148:15775"
      >
        {/* Careers hero uses explicit Figma crop positioning because generic cover over-zoomed the approved asset. */}
        <Image
          src={CAREERS_APPROVED_IMAGES.hero}
          alt=""
          width={1440}
          height={655}
          preload
          sizes="100vw"
          className="absolute left-0 top-0 h-full w-full max-w-none"
          style={{
            height: "100%",
            left: 0,
            objectFit: "fill",
            objectPosition: "50% 50%",
            top: 0,
            width: "100%",
          }}
          data-careers-approved-image-key="careers_hero"
          data-careers-hero-crop-method="explicit-image-fill"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[rgba(21,20,20,0.5)]"
        data-careers-hero-overlay="preserved"
        data-careers-hero-overlay-color="rgba(21,20,20,0.5)"
      />
      <div className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 justify-center px-[24px] pt-[73px] text-center desktop:top-[266px] desktop:translate-y-0 desktop:pt-0">
        <div className="flex w-full max-w-[802px] flex-col items-center gap-[20px]">
          <h1
            id="careers-heading"
            className="font-[family-name:var(--velarro-display-light-font-family)] text-[44px] font-light uppercase leading-[var(--velarro-display-light-line-height)] tracking-[0] text-text-text-white tablet:text-[58px] desktop:text-[length:var(--velarro-display-light-font-size)]"
            data-careers-typography="hero-title"
          >
            {CAREERS_HERO_COPY.title}
          </h1>
          <p
            className="max-w-[802px] font-[family-name:var(--velarro-body-default-font-family)] text-[18px] font-light leading-[var(--velarro-body-default-line-height)] tracking-[0] text-text-text-white tablet:text-[length:var(--velarro-body-default-font-size)]"
            data-careers-typography="hero-body"
          >
            {CAREERS_HERO_COPY.body}
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
      data-section="careers-breadcrumbs"
      data-figma-node="13148:15780"
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
        Careers
      </span>
    </nav>
  );
}

function ValueCard({ card }: { card: CareersValueCard }) {
  return (
    <article
      className="flex w-full flex-col gap-[20px] rounded-[12px] border border-border-default bg-background-card p-[20px] shadow-card-subtle desktop:max-w-[378px]"
      data-careers-value-card
      data-careers-value-card-id={card.id}
      data-figma-node={card.figmaNodeId}
    >
      <DeferredCareersImage
        imageKey={card.deferredImageKey}
        figmaNode={card.imageNodeId}
        className="aspect-[338/225] w-full"
      />
      <div className="flex flex-col gap-[10px] px-[4px] pb-[4px]">
        <h3
          className="font-[family-name:var(--velarro-heading-product-cards-font-family)] text-[length:var(--velarro-heading-product-cards-font-size)] font-normal uppercase leading-[24px] tracking-[0] text-text-display"
          data-careers-typography="value-card-title"
        >
          {card.title}
        </h3>
        <p
          className="font-[family-name:var(--velarro-body-label-font-family)] text-[length:var(--velarro-body-label-font-size)] font-light leading-[var(--velarro-body-label-line-height)] tracking-[0] text-text-body-text"
          data-careers-typography="value-card-body"
        >
          {card.body}
        </p>
      </div>
    </article>
  );
}

function CareersIntroSection() {
  return (
    <section
      aria-labelledby="careers-intro-heading"
      className="flex w-full justify-center px-[24px] pb-[64px] pt-[60px] desktop:px-[48px] desktop:pb-[84px] desktop:pt-[76px]"
      data-section="careers-intro"
      data-figma-node="13148:15781"
    >
      <div className="flex w-full max-w-[1228px] flex-col items-center gap-[40px]">
        <div className="flex max-w-[1192px] flex-col items-center gap-[20px] text-center">
          <h2
            id="careers-intro-heading"
            className="font-[family-name:var(--velarro-heading-page-font-family)] text-[36px] font-normal leading-[var(--velarro-heading-page-line-height)] tracking-[0] text-text-display desktop:text-[length:var(--velarro-heading-page-font-size)]"
          >
            {CAREERS_INTRO_COPY.title}
          </h2>
          <p className="font-[family-name:var(--velarro-body-default-font-family)] text-[18px] font-light leading-[var(--velarro-body-default-line-height)] tracking-[0] text-text-body-text desktop:text-[length:var(--velarro-body-default-font-size)]">
            {CAREERS_INTRO_COPY.body}
          </p>
        </div>
        <div className="grid w-full gap-[28px] tablet:grid-cols-3 desktop:gap-[37px]">
          {CAREERS_VALUE_CARDS.map((card) => (
            <ValueCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkingAtVelarroSection() {
  return (
    <section
      aria-labelledby="careers-working-heading"
      className="flex w-full justify-center px-[24px] pb-[72px] desktop:px-[48px] desktop:pb-[96px]"
      data-section="careers-working-at-velarro"
      data-figma-node="13148:15808"
    >
      <div className="flex w-full max-w-[1276px] flex-col items-center gap-[40px] desktop:flex-row desktop:items-center desktop:justify-between desktop:gap-[112px]">
        <div className="flex w-full max-w-[724px] flex-col items-start gap-[20px]">
          <h2
            id="careers-working-heading"
            className="font-[family-name:var(--velarro-heading-page-font-family)] text-[36px] font-normal leading-[var(--velarro-heading-page-line-height)] tracking-[0] text-text-display desktop:text-[length:var(--velarro-heading-page-font-size)]"
          >
            {CAREERS_WORKING_COPY.title}
          </h2>
          <p className="font-[family-name:var(--velarro-body-default-font-family)] text-[18px] font-light leading-[var(--velarro-body-default-line-height)] tracking-[0] text-text-body-text desktop:text-[length:var(--velarro-body-default-font-size)]">
            {CAREERS_WORKING_COPY.body}
          </p>
          <button
            type="button"
            disabled
            aria-label="Learn more about working at Velarro (deferred: destination not approved for this scope)"
            className="mt-[10px] h-[35px] w-[175px] cursor-not-allowed rounded-[4px] border border-border-default bg-button-fill font-[family-name:var(--velarro-ui-elements-primary-font-family)] text-[length:var(--velarro-ui-elements-primary-font-size)] font-normal uppercase leading-[var(--velarro-ui-elements-primary-line-height)] tracking-[0] text-text-heading disabled:opacity-100"
          >
            {CAREERS_WORKING_COPY.button}
          </button>
        </div>
        <DeferredCareersImage
          imageKey="careers_working_at_velarro"
          figmaNode="13148:15814"
          variant="panel"
          className="h-[320px] w-full max-w-[439px] desktop:h-[396px]"
        />
      </div>
    </section>
  );
}

function JobCard({ job }: { job: CareersJob }) {
  return (
    <article
      className="flex w-full flex-col gap-[16px] rounded-[12px] border border-border-default bg-background-card p-[24px] shadow-card-subtle tablet:flex-row tablet:items-center tablet:justify-between"
      data-careers-job-card
      data-careers-job-id={job.id}
    >
      <div className="flex flex-col gap-[8px]">
        <h3 className="font-[family-name:var(--velarro-heading-product-cards-font-family)] text-[22px] font-normal leading-[30px] tracking-[0] text-text-display">
          {job.title}
        </h3>
        <p className="font-[family-name:var(--velarro-body-label-font-family)] text-[length:var(--velarro-body-label-font-size)] font-light leading-[var(--velarro-body-label-line-height)] tracking-[0] text-text-body-text">
          {job.location}
        </p>
      </div>
      <span className="inline-flex h-[34px] w-fit items-center rounded-[4px] border border-border-default px-[14px] font-[family-name:var(--velarro-body-label-font-family)] text-[14px] font-light leading-none text-text-heading">
        {job.type}
      </span>
    </article>
  );
}

function JobsSection() {
  return (
    <section
      aria-labelledby="careers-jobs-heading"
      className="flex w-full justify-center px-[24px] pb-[76px] desktop:px-[48px] desktop:pb-[96px]"
      data-section="careers-jobs"
      data-figma-node="13148:15816"
    >
      <div className="flex w-full max-w-[1278px] flex-col items-center gap-[32px]">
        <div className="flex max-w-[820px] flex-col items-center gap-[18px] text-center">
          <h2
            id="careers-jobs-heading"
            className="font-[family-name:var(--velarro-heading-page-font-family)] text-[36px] font-normal leading-[var(--velarro-heading-page-line-height)] tracking-[0] text-text-display desktop:text-[length:var(--velarro-heading-page-font-size)]"
          >
            {CAREERS_JOBS_COPY.title}
          </h2>
          <p className="font-[family-name:var(--velarro-body-default-font-family)] text-[18px] font-light leading-[var(--velarro-body-default-line-height)] tracking-[0] text-text-body-text desktop:text-[length:var(--velarro-body-default-font-size)]">
            {CAREERS_JOBS_COPY.body}
          </p>
        </div>
        <div className="grid w-full gap-[16px]">
          {CAREERS_JOBS.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        <Link
          href={CAREERS_JOBS_COPY.positionsHref}
          className="inline-flex h-[35px] w-[214px] items-center justify-center rounded-[4px] border border-border-default bg-button-fill font-[family-name:var(--velarro-ui-elements-primary-font-family)] text-[length:var(--velarro-ui-elements-primary-font-size)] font-normal uppercase leading-[var(--velarro-ui-elements-primary-line-height)] tracking-[0] text-text-heading outline-none focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-2"
        >
          {CAREERS_JOBS_COPY.button}
        </Link>
      </div>
    </section>
  );
}

function TestimonialSection() {
  return (
    <section
      aria-labelledby="careers-testimonial-heading"
      className="flex w-full justify-center px-[24px] pb-[76px] desktop:px-[48px] desktop:pb-[96px]"
      data-section="careers-testimonial"
      data-figma-node="13148:15832"
    >
      <div className="flex w-full max-w-[1054px] flex-col gap-[24px] border-l border-border-strong pl-[24px] desktop:pl-[40px]">
        <h2
          id="careers-testimonial-heading"
          className="font-[family-name:var(--velarro-heading-page-font-family)] text-[32px] font-normal leading-[var(--velarro-heading-page-line-height)] tracking-[0] text-text-display desktop:text-[length:var(--velarro-heading-page-font-size)]"
        >
          {CAREERS_TESTIMONIAL_COPY.title}
        </h2>
        <blockquote className="flex flex-col gap-[20px]">
          <p className="font-[family-name:var(--velarro-body-default-font-family)] text-[20px] font-light leading-[32px] tracking-[0] text-text-body-text desktop:text-[24px] desktop:leading-[38px]">
            {CAREERS_TESTIMONIAL_COPY.quote}
          </p>
          <cite className="not-italic font-[family-name:var(--velarro-body-label-font-family)] text-[length:var(--velarro-body-label-font-size)] font-light leading-[var(--velarro-body-label-line-height)] tracking-[0] text-text-heading">
            {CAREERS_TESTIMONIAL_COPY.attribution}
          </cite>
        </blockquote>
      </div>
    </section>
  );
}

function CareersCtaSection() {
  return (
    <section
      aria-labelledby="careers-cta-heading"
      className="flex w-full justify-center px-[24px] pb-[84px] desktop:px-[48px] desktop:pb-[112px]"
      data-section="careers-cta"
      data-figma-node="13148:15841"
    >
      <div className="flex w-full max-w-[820px] flex-col items-center gap-[20px] text-center">
        <h2
          id="careers-cta-heading"
          className="font-[family-name:var(--velarro-heading-page-font-family)] text-[36px] font-normal leading-[var(--velarro-heading-page-line-height)] tracking-[0] text-text-display desktop:text-[length:var(--velarro-heading-page-font-size)]"
        >
          {CAREERS_CTA_COPY.title}
        </h2>
        <p className="font-[family-name:var(--velarro-body-default-font-family)] text-[18px] font-light leading-[var(--velarro-body-default-line-height)] tracking-[0] text-text-body-text desktop:text-[length:var(--velarro-body-default-font-size)]">
          {CAREERS_CTA_COPY.body}
        </p>
        <button
          type="button"
          disabled
          aria-label="Join our team (deferred: application flow is not approved for this scope)"
          className="mt-[10px] h-[35px] w-[183px] cursor-not-allowed rounded-[4px] border border-border-default bg-button-fill font-[family-name:var(--velarro-ui-elements-primary-font-family)] text-[length:var(--velarro-ui-elements-primary-font-size)] font-normal uppercase leading-[var(--velarro-ui-elements-primary-line-height)] tracking-[0] text-text-heading disabled:opacity-100"
        >
          {CAREERS_CTA_COPY.button}
        </button>
      </div>
    </section>
  );
}

export function CareersPage({ ageState }: CareersPageProps) {
  return (
    <div
      className="min-h-screen w-full overflow-x-hidden bg-background-page"
      data-figma-node={CAREERS_FIGMA_NODE}
      data-route="/careers"
      data-route-audience="review"
      data-age-state={ageState}
    >
      <MainNavbar />
      <main className="-mt-[73px] w-full">
        <HeroSection />
        <Breadcrumbs />
        <CareersIntroSection />
        <WorkingAtVelarroSection />
        <JobsSection />
        <TestimonialSection />
        <CareersCtaSection />
      </main>
      <FooterSection />
    </div>
  );
}
