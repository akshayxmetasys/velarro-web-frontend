const SCHEMA_CONTEXT = "https://schema.org" as const;

interface JsonLdBase<TType extends string> {
  "@context": typeof SCHEMA_CONTEXT;
  "@type": TType;
}

export interface OrganizationSchema extends JsonLdBase<"Organization"> {
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
}

export interface WebsiteSchema extends JsonLdBase<"WebSite"> {
  name: string;
  url: string;
  description?: string;
  potentialAction?: {
    "@type": "SearchAction";
    target: {
      "@type": "EntryPoint";
      urlTemplate: string;
    };
    "query-input": string;
  };
}

export interface BreadcrumbListItem {
  name: string;
  item: string;
}

export interface BreadcrumbListSchema extends JsonLdBase<"BreadcrumbList"> {
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
}

export interface FAQEntry {
  question: string;
  answer: string;
}

export interface FAQPageSchema extends JsonLdBase<"FAQPage"> {
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
}

export interface ItemListEntry {
  name: string;
  url: string;
}

export interface ItemListSchema extends JsonLdBase<"ItemList"> {
  itemListOrder: "https://schema.org/ItemListOrderAscending";
  numberOfItems: number;
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    url: string;
  }>;
}

export interface ProductCollectionSchema extends JsonLdBase<"CollectionPage"> {
  name: string;
  url: string;
  description?: string;
  mainEntity: ItemListSchema;
}

export type JsonLdSchema =
  | OrganizationSchema
  | WebsiteSchema
  | BreadcrumbListSchema
  | FAQPageSchema
  | ItemListSchema
  | ProductCollectionSchema;

export function createOrganizationSchema(input: {
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
}): OrganizationSchema {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Organization",
    name: input.name,
    url: input.url,
    ...(input.logo ? { logo: input.logo } : {}),
    ...(input.sameAs && input.sameAs.length > 0 ? { sameAs: input.sameAs } : {}),
  };
}

export function createWebsiteSchema(input: {
  name: string;
  url: string;
  description?: string;
  searchTargetUrlTemplate?: string;
}): WebsiteSchema {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "WebSite",
    name: input.name,
    url: input.url,
    ...(input.description ? { description: input.description } : {}),
    ...(input.searchTargetUrlTemplate
      ? {
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: input.searchTargetUrlTemplate,
            },
            "query-input": "required name=search_term_string",
          },
        }
      : {}),
  };
}

export function createBreadcrumbListSchema(items: BreadcrumbListItem[]): BreadcrumbListSchema {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

export function createFAQPageSchema(entries: FAQEntry[]): FAQPageSchema {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };
}

export function createItemListSchema(items: ItemListEntry[]): ItemListSchema {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "ItemList",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function createProductCollectionSchema(input: {
  name: string;
  url: string;
  description?: string;
  products: ItemListEntry[];
}): ProductCollectionSchema {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "CollectionPage",
    name: input.name,
    url: input.url,
    ...(input.description ? { description: input.description } : {}),
    mainEntity: createItemListSchema(input.products),
  };
}

export function serializeJsonLd(schema: JsonLdSchema): string {
  return JSON.stringify(schema);
}
