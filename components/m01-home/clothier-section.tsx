import Image from "next/image";
import { M01_CONTAINED_SECTION_WIDTH_CLASS } from "@/components/m01-home/m01-section-layout";
import { CLOTHIER_CARDS } from "@/lib/m01-home/clothier-data";

function ClothierCard({ card }: { card: (typeof CLOTHIER_CARDS)[number] }) {
  const titleId = `clothier-title-${card.id}`;

  return (
    <article
      aria-labelledby={titleId}
      className="flex w-[355px] max-w-full shrink-0 flex-col gap-[14.6px] rounded-radius-md border border-border-light bg-background-card p-[17px]"
    >
      <div className="relative h-[321px] w-full shrink-0 overflow-hidden rounded-radius-md bg-background-page">
        <Image
          src={card.imageUrl}
          alt={card.imageAlt}
          fill
          sizes="321px"
          unoptimized
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[rgba(21,20,20,0.4)]"
        />
        <span className="absolute left-0 top-0 rounded-radius-md bg-text-heading px-[7.3px] py-[4.9px] font-[family-name:var(--velarro-heading-sectionsmall-font-family)] text-[14.6px] font-light leading-[20.68px] tracking-[0.146px] text-background-section">
          {card.badge}
        </span>
      </div>

      <div className="flex w-full flex-col items-start gap-[14.6px]">
        <h3
          id={titleId}
          className="w-full font-[family-name:var(--velarro-heading-product-cards-font-family)] text-[19.46px] font-normal leading-[29.2px] text-text-display"
        >
          {card.title}
        </h3>
        <p className="w-full font-[family-name:var(--velarro-body-caption-font-family)] text-[12.16px] font-normal italic leading-[20.68px] tracking-[0.122px] text-text-body-text">
          {card.description}
        </p>

        <div
          aria-label={`${card.title} color options`}
          className="flex w-full items-start gap-[9.73px]"
          role="list"
        >
          {card.swatches.map((swatch) => (
            <span
              key={`${card.id}-${swatch.label}`}
              aria-label={swatch.label}
              className={[
                "size-[19.46px] shrink-0 rounded-full",
                swatch.bordered
                  ? "border border-[rgba(116,120,120,0.2)]"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
              role="listitem"
              style={{ backgroundColor: swatch.color }}
            />
          ))}
        </div>

        <button
          type="button"
          disabled
          aria-disabled="true"
          aria-label={`Explore ${card.title} (deferred: destination not approved for this scope)`}
          title={`Explore ${card.title} - destination not approved for this scope`}
          className="w-full cursor-not-allowed rounded-radius-md border border-border-default bg-button-fill px-[12.17px] py-[9.73px] font-[family-name:var(--velarro-heading-product-cards-font-family)] text-[19.46px] font-normal uppercase leading-normal text-text-heading"
        >
          EXPLORE
        </button>
      </div>
    </article>
  );
}

export function ClothierSection() {
  return (
    <section
      aria-labelledby="clothier-heading"
      className="w-full bg-background-section py-[32px]"
      data-figma-node="13148:15120"
    >
      <div className="mx-auto flex w-full max-w-[1340px] flex-col items-center justify-center gap-[40px] px-4 min-[1372px]:px-0">
        <header className="flex w-full max-w-[1314px] flex-col items-center gap-[20px]">
          <div className="flex w-[526px] max-w-full items-center justify-center border-b border-border-strong pb-[4px]">
            <p className="w-[808px] max-w-full text-center font-[family-name:var(--velarro-heading-sectionsmall-font-family)] text-[length:var(--velarro-heading-sectionsmall-font-size)] font-light uppercase leading-normal tracking-[var(--velarro-heading-sectionsmall-letter-spacing)] text-text-display">
              Curated for the Exceptional
            </p>
          </div>
          <h2
            id="clothier-heading"
            className="w-full text-center font-[family-name:var(--velarro-heading-section-font-family)] text-[length:var(--velarro-heading-section-font-size)] font-light leading-normal tracking-[var(--velarro-heading-section-letter-spacing)] text-text-heading"
          >
            The Clothier
          </h2>
        </header>

        <div
          className={`flex w-full ${M01_CONTAINED_SECTION_WIDTH_CLASS} flex-wrap items-center justify-between gap-[30px]`}
          data-slot="clothier-cards"
        >
          {CLOTHIER_CARDS.map((card) => (
            <ClothierCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
