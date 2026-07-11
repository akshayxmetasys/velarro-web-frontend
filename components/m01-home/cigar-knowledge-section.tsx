import Image from "next/image";
import { CIGAR_KNOWLEDGE_CARDS } from "@/lib/m01-home/cigar-knowledge-data";

function CigarKnowledgeCard({
  card,
}: {
  card: (typeof CIGAR_KNOWLEDGE_CARDS)[number];
}) {
  const titleId = `cigar-knowledge-title-${card.id}`;

  return (
    <article
      aria-labelledby={titleId}
      className="flex w-[390px] max-w-full shrink-0 flex-col gap-[14px] rounded-[12px] border border-border-default bg-background-card px-[16px] py-[20px]"
    >
      <div className="relative h-[309px] w-full shrink-0 overflow-hidden rounded-radius-md bg-background-page">
        <Image
          src={card.imageUrl}
          alt={card.imageAlt}
          fill
          sizes="356px"
          unoptimized
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[rgba(21,20,20,0.4)]"
        />
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-[16px]">
        <h3
          id={titleId}
          className="w-full font-[family-name:var(--velarro-heading-card-font-family)] text-[length:var(--velarro-heading-card-font-size)] font-normal leading-normal text-text-heading"
        >
          {card.title}
        </h3>

        <div className="flex w-full flex-col items-start gap-[12px] text-text-body-text">
          <p className="w-full font-[family-name:var(--velarro-heading-sectionsmall-font-family)] text-[20px] font-light leading-[28px]">
            {card.eyebrow}
          </p>
          <p className="w-full font-[family-name:var(--velarro-heading-product-cards-font-family)] text-[length:var(--velarro-heading-product-cards-font-size)] font-normal leading-[var(--velarro-heading-product-cards-line-height)]">
            {card.description}
          </p>
        </div>

        <button
          type="button"
          disabled
          aria-disabled="true"
          aria-label={`Explore ${card.title} (deferred: destination not approved for this scope)`}
          title={`Explore ${card.title} - destination not approved for this scope`}
          className="w-full cursor-not-allowed rounded-radius-md border border-border-default bg-button-fill py-[11px] font-[family-name:var(--velarro-heading-product-cards-font-family)] text-[length:var(--velarro-heading-product-cards-font-size)] font-normal uppercase leading-normal text-text-heading"
        >
          EXPLORE
        </button>
      </div>
    </article>
  );
}

export function CigarKnowledgeSection() {
  return (
    <section
      aria-labelledby="cigar-knowledge-heading"
      className="w-full bg-background-section py-[19px]"
      data-figma-node="13148:15081"
    >
      <div className="mx-auto flex w-full max-w-[1340px] flex-col items-center gap-10 px-4 min-[1372px]:px-0">
        <header className="flex flex-col items-center gap-5">
          <div className="flex w-[344px] max-w-full flex-col items-center gap-1">
            <p className="text-center font-[family-name:var(--velarro-heading-sectionsmall-font-family)] text-[length:var(--velarro-heading-sectionsmall-font-size)] font-light uppercase leading-normal tracking-[var(--velarro-heading-sectionsmall-letter-spacing)] text-text-display">
              Cigar Knowledge
            </p>
            <span
              aria-hidden="true"
              className="h-px w-full bg-border-strong"
            />
          </div>
          <h2
            id="cigar-knowledge-heading"
            className="text-center font-[family-name:var(--velarro-heading-section-font-family)] text-[length:var(--velarro-heading-section-font-size)] font-light leading-normal tracking-[var(--velarro-heading-section-letter-spacing)] text-text-heading"
          >
            Expand your horizons
          </h2>
        </header>

        <div
          className="flex w-full max-w-[1236px] flex-wrap items-center justify-center gap-[30px]"
          data-slot="cigar-knowledge-cards"
        >
          {CIGAR_KNOWLEDGE_CARDS.map((card) => (
            <CigarKnowledgeCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
