import type { Metadata } from "next";

export const SITE_NAME = "Velarro Estate";
export const SITE_ORIGIN = "https://velarroestate.com";

const DEFAULT_DESCRIPTION =
  "Velarro Estate - curated cigars, house goods, and membership experiences.";
const DEFAULT_OG_IMAGE_PATH = "/og-default.jpg";

export type StructuredDataKey =
  | "organization"
  | "website"
  | "breadcrumb-list"
  | "faq-page"
  | "item-list"
  | "product-collection";

export interface StructuredDataDescriptor {
  key: StructuredDataKey;
  scriptId: `ld-${string}`;
}

export interface RootMetadataConfig {
  defaultTitle?: string;
  titleTemplate?: string;
  description?: string;
  metadataBase?: string;
}

export interface PageMetadataConfig {
  title?: string;
  absoluteTitle?: string;
  description?: string;
  pathname?: `/${string}` | "/";
  openGraphType?: "website" | "article";
  ogImagePath?: `/${string}`;
  twitterCard?: "summary" | "summary_large_image";
  keywords?: string[];
  noIndex?: boolean;
  noFollow?: boolean;
  structuredDataKeys?: StructuredDataKey[];
}

export interface MetadataBuildResult {
  metadata: Metadata;
  structuredData: StructuredDataDescriptor[];
}

function joinUrl(pathname: string): string {
  return new URL(pathname, SITE_ORIGIN).toString();
}

export function getStructuredDataScriptId(
  key: StructuredDataKey,
  suffix?: string,
): `ld-${string}` {
  return `ld-${suffix ? `${key}-${suffix}` : key}`;
}

export function createRootMetadata(config: RootMetadataConfig = {}): Metadata {
  const defaultTitle = config.defaultTitle ?? SITE_NAME;
  const titleTemplate = config.titleTemplate ?? `%s | ${SITE_NAME}`;
  const description = config.description ?? DEFAULT_DESCRIPTION;
  const metadataBase = new URL(config.metadataBase ?? SITE_ORIGIN);

  return {
    title: {
      default: defaultTitle,
      template: titleTemplate,
    },
    description,
    metadataBase,
    applicationName: SITE_NAME,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: defaultTitle,
      description,
      url: "/",
      images: [
        {
          url: DEFAULT_OG_IMAGE_PATH,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} brand preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description,
      images: [DEFAULT_OG_IMAGE_PATH],
    },
  };
}

export function createPageMetadata(config: PageMetadataConfig): MetadataBuildResult {
  const title = config.absoluteTitle
    ? { absolute: config.absoluteTitle }
    : (config.title ?? SITE_NAME);
  const description = config.description ?? DEFAULT_DESCRIPTION;
  const pathname = config.pathname ?? "/";
  const ogImagePath = config.ogImagePath ?? DEFAULT_OG_IMAGE_PATH;
  const noIndex = config.noIndex ?? false;
  const noFollow = config.noFollow ?? noIndex;
  const structuredDataKeys = config.structuredDataKeys ?? [];

  return {
    metadata: {
      title,
      description,
      alternates: {
        canonical: pathname,
      },
      keywords: config.keywords,
      robots: {
        index: !noIndex,
        follow: !noFollow,
        googleBot: {
          index: !noIndex,
          follow: !noFollow,
          "max-image-preview": noIndex ? "none" : "large",
          "max-snippet": noIndex ? 0 : -1,
          "max-video-preview": noIndex ? 0 : -1,
        },
      },
      openGraph: {
        type: config.openGraphType ?? "website",
        siteName: SITE_NAME,
        title: config.absoluteTitle ?? config.title ?? SITE_NAME,
        description,
        url: pathname,
        images: [
          {
            url: ogImagePath,
            width: 1200,
            height: 630,
            alt: `${SITE_NAME} preview`,
          },
        ],
      },
      twitter: {
        card: config.twitterCard ?? "summary_large_image",
        title: config.absoluteTitle ?? config.title ?? SITE_NAME,
        description,
        images: [joinUrl(ogImagePath)],
      },
    },
    structuredData: structuredDataKeys.map((key) => ({
      key,
      scriptId: getStructuredDataScriptId(key),
    })),
  };
}
