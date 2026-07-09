import { SITE_URL } from "@/lib/seo/route-manifest";

export type JsonLd = Record<string, unknown>;

const PLACEHOLDER_PATTERN =
  /^(|tbd|todo|placeholder|lorem ipsum|example|fake|unknown|null|undefined)$/i;

function assertRealText(value: string, fieldName: string): string {
  const trimmedValue = value.trim();

  if (PLACEHOLDER_PATTERN.test(trimmedValue)) {
    throw new Error(`Schema field "${fieldName}" must use real visible content.`);
  }

  return trimmedValue;
}

function optionalRealText(
  value: string | undefined,
  fieldName: string,
): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  return assertRealText(value, fieldName);
}

function removeUndefinedValues(schema: JsonLd): JsonLd {
  return Object.fromEntries(
    Object.entries(schema).filter(([, value]) => value !== undefined),
  );
}

export interface OrganizationSchemaInput {
  name: string;
  url?: string;
  logo?: string;
}

export function buildOrganizationSchema({
  name,
  url = SITE_URL,
  logo,
}: OrganizationSchemaInput): JsonLd {
  return removeUndefinedValues({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: assertRealText(name, "name"),
    url: assertRealText(url, "url"),
    logo: optionalRealText(logo, "logo"),
  });
}

export function buildWebSiteSchema({
  name,
  url = SITE_URL,
}: OrganizationSchemaInput): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: assertRealText(name, "name"),
    url: assertRealText(url, "url"),
  };
}

export interface BreadcrumbItem {
  name: string;
  item: string;
}

export function buildBreadcrumbListSchema(items: BreadcrumbItem[]): JsonLd {
  if (items.length === 0) {
    throw new Error("BreadcrumbList requires at least one item.");
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: assertRealText(item.name, `items[${index}].name`),
      item: assertRealText(item.item, `items[${index}].item`),
    })),
  };
}

export interface ItemListInput {
  name: string;
  items: BreadcrumbItem[];
}

export function buildItemListSchema({ name, items }: ItemListInput): JsonLd {
  if (items.length === 0) {
    throw new Error("ItemList requires at least one item.");
  }

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: assertRealText(name, "name"),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: assertRealText(item.name, `items[${index}].name`),
      url: assertRealText(item.item, `items[${index}].item`),
    })),
  };
}

export interface ProductSchemaInput {
  name: string;
  description: string;
  url: string;
  image?: string;
}

export function buildProductSchema(input: ProductSchemaInput): JsonLd {
  return removeUndefinedValues({
    "@context": "https://schema.org",
    "@type": "Product",
    name: assertRealText(input.name, "name"),
    description: assertRealText(input.description, "description"),
    url: assertRealText(input.url, "url"),
    image: optionalRealText(input.image, "image"),
  });
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function buildFaqPageSchema(items: FaqItem[]): JsonLd {
  if (items.length === 0) {
    throw new Error("FAQPage requires at least one question.");
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item, index) => ({
      "@type": "Question",
      name: assertRealText(item.question, `items[${index}].question`),
      acceptedAnswer: {
        "@type": "Answer",
        text: assertRealText(item.answer, `items[${index}].answer`),
      },
    })),
  };
}

export interface ArticleSchemaInput {
  headline: string;
  url: string;
  datePublished?: string;
  description?: string;
}

export function buildArticleSchema(input: ArticleSchemaInput): JsonLd {
  return removeUndefinedValues({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: assertRealText(input.headline, "headline"),
    url: assertRealText(input.url, "url"),
    datePublished: optionalRealText(input.datePublished, "datePublished"),
    description: optionalRealText(input.description, "description"),
  });
}

export interface LocalBusinessSchemaInput {
  name: string;
  url: string;
  address?: string;
  telephone?: string;
}

export function buildLocalBusinessSchema(
  input: LocalBusinessSchemaInput,
): JsonLd {
  return removeUndefinedValues({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: assertRealText(input.name, "name"),
    url: assertRealText(input.url, "url"),
    address: optionalRealText(input.address, "address"),
    telephone: optionalRealText(input.telephone, "telephone"),
  });
}
