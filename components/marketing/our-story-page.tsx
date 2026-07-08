import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { storyContent } from "@/components/marketing/batch-five-data";
import { JsonLdScript, PlaceholderHero, StoryCard } from "@/components/marketing/page-blocks";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import {
  SITE_ORIGIN,
  getStructuredDataScriptId,
} from "@/lib/seo/metadata";
import {
  createBreadcrumbListSchema,
  createOrganizationSchema,
} from "@/lib/seo/schema";

const storySchemas = [
  {
    id: getStructuredDataScriptId("organization"),
    schema: createOrganizationSchema({
      name: "Velarro Estate",
      url: SITE_ORIGIN,
    }),
  },
  {
    id: getStructuredDataScriptId("breadcrumb-list"),
    schema: createBreadcrumbListSchema([
      { name: "Home", item: `${SITE_ORIGIN}/` },
      { name: "Our Story", item: `${SITE_ORIGIN}/our-story` },
    ]),
  },
] as const;

export function OurStoryPage() {
  return (
    <>
      {storySchemas.map((entry) => (
        <JsonLdScript key={entry.id} id={entry.id} schema={entry.schema} />
      ))}
      <PlaceholderHero
        height={760}
        panel={{
          title: storyContent.hero.title,
          subtitle: storyContent.hero.subtitle,
          slotName: storyContent.hero.slotName,
        }}
      />
      <section className="bg-background-page py-[96px]">
        <Container className="grid max-w-[1216px] gap-spacing-48 min-[768px]:grid-cols-[560px_500px] min-[1440px]:gap-[112px]">
          <article className="max-w-[560px]">
            <h2 className="text-[length:var(--velarro-heading-section-font-size)] font-[300] leading-none text-text-heading">
              {storyContent.brandStory.heading}
            </h2>
            <p className="mt-spacing-20 text-[length:var(--font-size-3)] italic leading-[var(--line-heights-9)] text-text-secondary-body-text">
              {storyContent.brandStory.quote}
            </p>
            <div className="mt-spacing-20 space-y-spacing-20 text-[length:var(--font-size-3)] leading-[var(--line-heights-9)] text-text-body-text">
              {storyContent.brandStory.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
          <ImagePlaceholder
            slotName={storyContent.brandStory.slotName}
            width={500}
            height={610}
            alt=""
            className="h-[420px] w-full min-[768px]:h-[610px]"
          />
        </Container>
      </section>
      <section className="bg-background-section py-[84px]">
        <Container className="grid max-w-[1216px] gap-spacing-48 min-[768px]:grid-cols-[720px_280px] min-[1440px]:gap-[96px]">
          <article className="max-w-[720px]">
            <h2 className="text-[length:var(--velarro-heading-section-font-size)] font-[300] leading-none text-text-heading">
              {storyContent.mission.heading}
            </h2>
            <p className="mt-spacing-20 font-[700] text-text-heading">{storyContent.mission.lead}</p>
            <div className="mt-spacing-20 space-y-spacing-20 text-[length:var(--font-size-3)] leading-[var(--line-heights-9)] text-text-body-text">
              {storyContent.mission.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
          <dl className="border-l border-border-default pl-spacing-40">
            {storyContent.mission.stats.map((stat) => (
              <div key={stat.label} className="mb-spacing-40 last:mb-0">
                <dt className="text-[length:var(--font-size-3)] uppercase leading-[var(--line-heights-9)] text-text-body-text">
                  {stat.label}
                </dt>
                <dd className="mb-2 text-[48px] font-[700] leading-none text-text-heading">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
      <section className="bg-background-page py-[84px]">
        <Container className="max-w-[1280px]">
          <div className="text-center">
            <h2 className="text-[length:var(--velarro-heading-section-font-size)] font-[300] leading-none text-text-heading">
              {storyContent.connoisseurs.heading}
            </h2>
            <p className="mt-2 text-[length:var(--font-size-3)] text-text-secondary-body-text">
              {storyContent.connoisseurs.subtitle}
            </p>
          </div>
          <Grid columns={4} gap="40" className="mt-spacing-48">
            {storyContent.connoisseurs.cards.map((card) => (
              <StoryCard key={card.title} title={card.title}>
                <p>{card.body}</p>
              </StoryCard>
            ))}
          </Grid>
          <article className="mt-[72px] rounded-radius-md border border-border-default bg-background-section p-spacing-40">
            <h2 className="text-[length:var(--velarro-heading-section-font-size)] font-[300] leading-none text-text-heading">
              {storyContent.values.heading}
            </h2>
            <p className="mt-spacing-20 text-[length:var(--font-size-3)] leading-[var(--line-heights-9)] text-text-body-text">
              {storyContent.values.body}
            </p>
            <Grid columns={3} gap="40" className="mt-spacing-40">
              {storyContent.values.cards.map((value) => (
                <StoryCard key={value} title={value}>
                  <span aria-hidden="true" />
                </StoryCard>
              ))}
            </Grid>
          </article>
        </Container>
      </section>
    </>
  );
}
