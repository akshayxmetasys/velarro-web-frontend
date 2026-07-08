import {
  homeCollections,
  homeFeatureBands,
  homeHero,
  under21HomePreview,
} from "@/components/marketing/batch-five-data";
import { FeaturedRail, FeatureBand, JsonLdScript, PlaceholderHero } from "@/components/marketing/page-blocks";
import {
  SITE_ORIGIN,
  getStructuredDataScriptId,
} from "@/lib/seo/metadata";
import {
  createItemListSchema,
  createOrganizationSchema,
  createWebsiteSchema,
} from "@/lib/seo/schema";

const homeSchemas = [
  {
    id: getStructuredDataScriptId("organization"),
    schema: createOrganizationSchema({
      name: "Velarro Estate",
      url: SITE_ORIGIN,
    }),
  },
  {
    id: getStructuredDataScriptId("website"),
    schema: createWebsiteSchema({
      name: "Velarro Estate",
      url: SITE_ORIGIN,
      description: "Discover timeless luxury through Velarro Estate collections.",
    }),
  },
  {
    id: getStructuredDataScriptId("item-list", "home-sections"),
    schema: createItemListSchema([
      { name: "Velarro cigars", url: `${SITE_ORIGIN}/the-estate` },
      { name: under21HomePreview.heading, url: `${SITE_ORIGIN}/the-house` },
      { name: "The Clothier", url: `${SITE_ORIGIN}/the-house/the-clothier` },
      { name: "The Roastery", url: `${SITE_ORIGIN}/the-house/the-roastery` },
    ]),
  },
] as const;

export function HomePage() {
  return (
    <>
      {homeSchemas.map((entry) => (
        <JsonLdScript key={entry.id} id={entry.id} schema={entry.schema} />
      ))}
      <PlaceholderHero panel={homeHero} height={760} />
      <div aria-label="Homepage collections" className="py-spacing-20">
        <FeaturedRail {...homeCollections[0]} />
        <FeatureBand panel={homeFeatureBands[0]} />
        <FeaturedRail {...homeCollections[1]} />
        <FeatureBand panel={homeFeatureBands[1]} />
        <FeaturedRail {...homeCollections[2]} />
        <FeaturedRail {...homeCollections[3]} />
        <FeatureBand panel={homeFeatureBands[2]} />
      </div>
    </>
  );
}
