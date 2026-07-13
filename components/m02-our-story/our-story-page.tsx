import Image from "next/image";
import Link from "next/link";
import { FooterSection } from "@/components/m01-home/footer-section";
import { MainNavbar } from "@/components/m01-home/main-navbar";
import {
  BRAND_VALUES,
  MISSION_STATS,
  WHY_CONNOISSEURS,
} from "@/components/m02-our-story/our-story-data";
import { OUR_STORY_APPROVED_IMAGES } from "@/components/m02-our-story/our-story-assets";

const OUR_STORY_CARD_INTERACTION_CLASS =
  "transition-[transform,box-shadow] duration-300 ease-out [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-[0_14px_28px_rgba(47,41,36,0.12)]" as const;

function Breadcrumbs() {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto flex w-full max-w-[1330px] items-center gap-[6px] px-[24px] py-[18px] text-[14px]"
      data-figma-node="15934:43017"
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
      <span
        aria-current="page"
        className="border-b border-border-strong py-[4px] font-[family-name:var(--velarro-heading-product-cards-font-family)] text-text-heading"
      >
        Our story
      </span>
    </nav>
  );
}

function HeroSection() {
  return (
    <section
      aria-labelledby="our-story-heading"
      className="relative h-[640px] w-full overflow-hidden bg-background-navbar desktop:h-[808px]"
      data-figma-node="15934:43010"
    >
      <Image
        src={OUR_STORY_APPROVED_IMAGES.heroBackground}
        alt="Velarro cigar box overlooking estate fields"
        fill
        priority
        sizes="100vw"
        className="pointer-events-none object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[rgba(21,20,20,0.4)]"
      />
      <div className="absolute inset-x-0 top-[calc(50%+24px)] flex -translate-y-1/2 flex-col items-center px-[24px] text-center desktop:top-[325px] desktop:translate-y-0">
        <h1
          id="our-story-heading"
          className="font-[family-name:var(--velarro-display-light-font-family)] text-[48px] font-light uppercase leading-none text-text-text-white tablet:text-[60px] desktop:text-[length:var(--velarro-display-light-font-size)]"
        >
          OUR STORY
        </h1>
        <p className="mt-[20px] max-w-[777px] font-[family-name:var(--velarro-body-default-font-family)] text-[18px] font-light leading-[28px] text-text-text-white desktop:text-[length:var(--velarro-body-default-font-size)]">
          Crafted with purpose, aged with time
        </p>
      </div>
    </section>
  );
}

function BrandStorySection() {
  return (
    <section
      aria-labelledby="brand-story-heading"
      className="w-full bg-background-page px-[24px] pb-[40px] desktop:px-[80px]"
      data-figma-node="15934:43019"
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-[40px] rounded-radius-md p-0 tablet:p-[40px] desktop:flex-row">
        <div className="flex max-w-[669px] flex-1 flex-col gap-[16px]">
          <h2
            id="brand-story-heading"
            className="font-[family-name:var(--velarro-heading-page-font-family)] text-[length:var(--velarro-heading-page-font-size)] font-normal leading-none text-text-heading"
          >
            Brand Story
          </h2>
          <p className="font-[family-name:var(--velarro-body-default-font-family)] text-[20px] font-light leading-none text-text-secondary-body-text">
            &ldquo;A legacy rooted in the earth. A future defined by craftsmanship.&rdquo;
          </p>
          <p className="font-[family-name:var(--velarro-body-default-font-family)] text-[20px] font-light leading-[28px] text-text-body-text">
            Velarro&apos;s story begins not in a factory or boardroom, but in
            the fertile fields where generations of our family dedicated their
            lives to cultivating tobacco with patience, expertise, and deep
            respect for the land.
            <br />
            <br />
            For more than a century, we focused exclusively on cultivation and
            harvesting building an understanding of soil conditions, seasonal
            cycles, leaf quality, and curing processes that only time and
            experience can create.
          </p>
          <blockquote className="flex gap-[20px] py-[6px]">
            <span aria-hidden="true" className="w-px shrink-0 bg-border-strong" />
            <p className="font-[family-name:var(--velarro-body-default-font-family)] text-[20px] font-light leading-none text-text-secondary-body-text">
              &ldquo;Through decades of changing markets and shifting preferences,
              one principle remained unchanged: quality begins at the
              source.&rdquo;
            </p>
          </blockquote>
          <p className="font-[family-name:var(--velarro-body-default-font-family)] text-[20px] font-light leading-[28px] text-text-body-text">
            Today, Velarro represents the evolution of that philosophy. What
            began as a tobacco-growing heritage is now expanding into a modern
            premium lifestyle company one that celebrates craftsmanship,
            authenticity, traceability, and direct-origin sourcing.
            <br />
            <br />
            Rather than operating as a brand disconnected from production,
            Velarro maintains a close relationship with the people, regions,
            and traditions behind every product we offer. The world&apos;s finest
            products begin at their source. That belief guides everything.
          </p>
        </div>

        <div
          className="relative min-h-[420px] flex-1 overflow-hidden rounded-[12px] bg-background-navbar desktop:h-[696px] desktop:max-w-[507px]"
          data-figma-node="15934:43030"
        >
          <Image
            src={OUR_STORY_APPROVED_IMAGES.brandStorySide}
            alt="Velarro lounge display with cigars and accessories"
            fill
            sizes="(min-width: 1024px) 507px, calc(100vw - 48px)"
            className="object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[rgba(21,20,20,0.4)]"
          />
        </div>
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section
      aria-labelledby="our-mission-heading"
      className="w-full bg-background-section px-[24px] py-[40px] desktop:px-[80px]"
      data-figma-node="15934:43031"
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-[40px] rounded-radius-md p-0 tablet:p-[40px] desktop:flex-row desktop:items-center">
        <div className="flex flex-1 flex-col gap-[16px]">
          <h2
            id="our-mission-heading"
            className="font-[family-name:var(--velarro-heading-page-font-family)] text-[length:var(--velarro-heading-page-font-size)] font-normal leading-none text-text-heading"
          >
            Our Mission
          </h2>
          <p className="font-[family-name:var(--velarro-heading-card-font-family)] text-[length:var(--velarro-heading-card-font-size)] font-bold leading-none text-text-heading">
            A great cigar is not simply made.
          </p>
          <p className="font-[family-name:var(--velarro-body-default-font-family)] text-[20px] font-light leading-[28px] text-text-body-text">
            At Velarro, our mission is to transform generations of agricultural
            expertise into premium products that celebrate quality,
            sustainability, craftsmanship, and the stories behind every origin.
            We honour the centuries-old tradition of cigar-making by combining
            the finest raw materials, the most skilled artisans, and an
            unwavering commitment to excellence.
            <br />
            <br />
            We exist to build meaningful connections between consumers and the
            people, places, and traditions that make exceptional products
            possible delivering experiences that connect the smoker to the
            land, the craft, and the moment. We believe a great cigar is not
            simply made; it is cultivated, guided, and released only when it is
            ready. That philosophy shapes every decision we make, from the
            fields where our tobacco grows to the moment a Velarro cigar
            arrives in your hands.
          </p>
        </div>
        <dl className="flex shrink-0 flex-col gap-[26px] border-t border-border-strong pt-[32px] desktop:w-[388px] desktop:border-l desktop:border-t-0 desktop:py-[40px] desktop:pl-[45px]">
          {MISSION_STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-[20px]">
              <dt className="order-2 whitespace-nowrap font-[family-name:var(--velarro-heading-card-font-family)] text-[24px] font-normal leading-none text-text-body-text">
                {stat.label}
              </dt>
              <dd className="m-0 font-[family-name:var(--velarro-ui-elements-price-font-family)] text-[58px] font-medium leading-none text-text-heading">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function WhyConnoisseursSection() {
  return (
    <section
      aria-labelledby="why-connoisseurs-heading"
      className="w-full bg-background-page px-[24px] py-[8px] desktop:px-[80px]"
      data-figma-node="15934:43048"
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-[63px]">
        <div className="text-center">
          <h2
            id="why-connoisseurs-heading"
            className="font-[family-name:var(--velarro-display-light-font-family)] text-[40px] font-light leading-none text-text-heading"
          >
            Why Connoisseurs
          </h2>
          <p className="mt-[8px] font-[family-name:var(--velarro-body-default-font-family)] text-[20px] font-light leading-[28px] text-text-heading">
            Crafted with purpose, aged with time
          </p>
        </div>
        <div className="grid w-full gap-[40px] tablet:grid-cols-2 desktop:grid-cols-4">
          {WHY_CONNOISSEURS.map((card) => (
            <article
              key={card.title}
              className={`min-h-[324px] rounded-[12px] border border-border-strong bg-background-card p-[20px] desktop:min-h-[364px] ${OUR_STORY_CARD_INTERACTION_CLASS}`}
            >
              <h3 className="font-[family-name:var(--velarro-body-default-font-family)] text-[20px] font-medium leading-none text-text-heading">
                {card.title}
              </h3>
              <div className="mt-[12px] flex flex-col gap-[24px] font-[family-name:var(--velarro-heading-product-cards-font-family)] text-[16px] font-normal leading-[24px] text-text-body-text">
                {card.copy.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandValuesSection() {
  return (
    <section
      aria-labelledby="brand-values-heading"
      className="w-full bg-background-page px-[24px] py-[40px] desktop:px-[80px]"
      data-figma-node="15934:43069"
    >
      <div className="mx-auto flex w-full max-w-[1244px] flex-col gap-[32px] px-0 py-[24px] desktop:px-[36px]">
        <div className="flex flex-col gap-[24px]">
          <h2
            id="brand-values-heading"
            className="font-[family-name:var(--velarro-heading-page-font-family)] text-[length:var(--velarro-heading-page-font-size)] font-normal leading-none text-text-heading"
          >
            Brand Values
          </h2>
          <p className="font-[family-name:var(--velarro-body-default-font-family)] text-[20px] font-light leading-[28px] tracking-[-0.3px] text-text-body-text">
            We honour the knowledge, traditions, and agricultural expertise
            developed across more than a century. That history is not
            background it is the product.
          </p>
        </div>
        <div className="grid gap-[14px] tablet:grid-cols-2 desktop:grid-cols-3 desktop:gap-x-[40px]">
          {BRAND_VALUES.map((value) => (
            <article
              key={value.title}
              className={`min-h-[130px] rounded-radius-md border border-border-strong bg-background-card px-[20px] py-[24px] desktop:min-h-[180px] ${OUR_STORY_CARD_INTERACTION_CLASS}`}
            >
              <h3 className="font-[family-name:var(--velarro-body-default-font-family)] text-[18px] font-medium leading-none text-text-heading">
                {value.title}
              </h3>
              <p className="mt-[12px] font-[family-name:var(--velarro-heading-product-cards-font-family)] text-[16px] font-normal leading-[24px] text-text-body-text">
                {value.copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OurStoryPage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background-page">
      <MainNavbar />
      <main className="-mt-[73px] w-full">
        <HeroSection />
        <Breadcrumbs />
        <div className="flex w-full flex-col gap-[48px]">
          <BrandStorySection />
          <MissionSection />
          <WhyConnoisseursSection />
          <BrandValuesSection />
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
