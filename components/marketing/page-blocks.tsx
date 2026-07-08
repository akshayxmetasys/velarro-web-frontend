import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { cn } from "@/lib/cn";
import type { FeaturedCard, HeroPanel } from "./batch-five-data";

export function JsonLdScript({
  id,
  schema,
}: {
  id: `ld-${string}`;
  schema: object;
}) {
  return (
    <script id={id} type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  );
}

export function PlaceholderHero({
  panel,
  height = 772,
  className,
}: {
  panel: HeroPanel;
  height?: number;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden bg-background-navbar text-text-text-white", className)}>
      <ImagePlaceholder
        slotName={panel.slotName}
        width={1440}
        height={height}
        alt=""
        className="h-[420px] w-full rounded-none bg-background-navbar opacity-85 min-[768px]:h-[520px]"
      />
      <div className="absolute inset-0 bg-background-navbar/45" aria-hidden="true" />
      <Container className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
        {panel.eyebrow ? (
          <p className="text-[length:var(--font-size-3)] text-icon-default">{panel.eyebrow}</p>
        ) : null}
        <h1 className="text-[40px] font-[300] leading-none tracking-[0] min-[768px]:text-[64px]">
          {panel.title}
        </h1>
        {panel.subtitle ? (
          <p className="text-[length:var(--velarro-heading-section-font-size)] font-[300]">
            {panel.subtitle}
          </p>
        ) : null}
        {panel.cta ? (
          <Link
            href={panel.cta.href}
            className="mt-spacing-20 inline-flex h-[28px] min-w-[108px] items-center justify-center rounded-radius-md bg-button-fill px-spacing-24 text-[length:var(--font-size-3)] text-text-heading hover:opacity-90"
          >
            {panel.cta.label}
          </Link>
        ) : null}
      </Container>
    </section>
  );
}

export function EyebrowHeading({
  eyebrow,
  title,
  className,
}: {
  eyebrow: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto flex max-w-xl flex-col items-center gap-2 text-center", className)}>
      <p className="border-b border-border-default px-spacing-40 pb-1 text-[length:var(--font-size-1)] uppercase text-text-secondary-body-text">
        {eyebrow}
      </p>
      <h2 className="text-[length:var(--velarro-heading-section-font-size)] font-[300] leading-none text-text-heading">
        {title}
      </h2>
    </div>
  );
}

export function FeaturedRail({
  eyebrow,
  title,
  cards,
}: {
  eyebrow: string;
  title: string;
  cards: readonly FeaturedCard[];
}) {
  return (
    <section className="bg-background-page py-spacing-20">
      <Container className="max-w-[1320px] bg-background-section py-spacing-40">
        <EyebrowHeading eyebrow={eyebrow} title={title} />
        <Grid columns={3} gap="24" className="mx-auto mt-spacing-40 max-w-[1080px]">
          {cards.map((card) => (
            <Link
              key={card.slotName}
              href={card.href}
              className="group rounded-radius-md border border-border-default bg-background-page p-3 shadow-card-subtle transition-opacity hover:opacity-90"
            >
              <ImagePlaceholder
                slotName={card.slotName}
                width={330}
                height={240}
                alt=""
                className="aspect-[1.32] h-auto w-full"
              />
              <h3 className="mt-3 text-[length:var(--velarro-heading-product-cards-font-size)] leading-[var(--velarro-heading-product-cards-line-height)] text-text-heading">
                {card.title}
              </h3>
              <span className="mt-3 inline-flex h-[28px] w-full items-center justify-center rounded-radius-md border border-border-default px-spacing-20 text-[length:var(--font-size-1)] uppercase text-text-heading">
                Explore
              </span>
            </Link>
          ))}
        </Grid>
      </Container>
    </section>
  );
}

export function FeatureBand({ panel }: { panel: HeroPanel }) {
  return (
    <Container className="max-w-[1296px] py-spacing-20">
      <div className="relative overflow-hidden rounded-radius-md bg-background-navbar text-text-text-white">
        <ImagePlaceholder
          slotName={panel.slotName}
          width={1280}
          height={500}
          alt=""
          className="h-[360px] w-full rounded-radius-md bg-background-navbar opacity-80 min-[768px]:h-[500px]"
        />
        <div className="absolute inset-0 bg-background-navbar/45" aria-hidden="true" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-spacing-24 text-center">
          {panel.eyebrow ? <p className="text-icon-default">{panel.eyebrow}</p> : null}
          <h2 className="text-[36px] font-[300] leading-none tracking-[0] min-[768px]:text-[48px]">
            {panel.title}
          </h2>
          {panel.subtitle ? <p className="text-[length:var(--font-size-3)]">{panel.subtitle}</p> : null}
          {panel.cta ? (
            <Link
              href={panel.cta.href}
              className="inline-flex h-[28px] min-w-[108px] items-center justify-center rounded-radius-md bg-button-fill px-spacing-24 text-[length:var(--font-size-3)] text-text-heading hover:opacity-90"
            >
              {panel.cta.label}
            </Link>
          ) : null}
        </div>
      </div>
    </Container>
  );
}

export function StoryCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="rounded-radius-md border border-border-default bg-background-section p-spacing-20">
      <h3 className="text-[length:var(--velarro-heading-product-cards-font-size)] font-[400] leading-[var(--velarro-heading-product-cards-line-height)] text-text-heading">
        {title}
      </h3>
      <div className="mt-3 text-[length:var(--font-size-3)] leading-[var(--line-heights-9)] text-text-body-text">
        {children}
      </div>
    </article>
  );
}
