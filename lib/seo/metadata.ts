import type { Metadata } from "next";
import { buildCanonicalUrl } from "@/lib/seo/indexability";

export interface BuildMetadataOptions {
  title: string;
  description: string;
  path: string;
  indexable?: boolean;
}

export function buildPageMetadata({
  title,
  description,
  path,
  indexable = false,
}: BuildMetadataOptions): Metadata {
  const canonical = buildCanonicalUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Velarro Estate",
      type: "website",
    },
    robots: {
      index: indexable,
      follow: indexable,
    },
  };
}
