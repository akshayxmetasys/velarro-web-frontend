import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type SectionHeadingVariant =
  | "page"
  | "section"
  | "sectionSmall"
  | "card"
  | "productCard";

export type SectionHeadingLevel = "h1" | "h2" | "h3" | "h4";

export interface SectionHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  variant: SectionHeadingVariant;
  as?: SectionHeadingLevel;
  /** Optional eyebrow line rendered above the heading (h1+h2 pattern). */
  eyebrow?: ReactNode;
  children: ReactNode;
}

const variantStyles: Record<
  SectionHeadingVariant,
  {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
    letterSpacing: string;
    fontStyle?: string;
  }
> = {
  page: {
    fontFamily: "var(--velarro-heading-page-font-family)",
    fontSize: "var(--velarro-heading-page-font-size)",
    fontWeight: "var(--velarro-heading-page-font-weight)",
    lineHeight: "var(--velarro-heading-page-line-height)",
    letterSpacing: "var(--velarro-heading-page-letter-spacing)",
  },
  section: {
    fontFamily: "var(--velarro-heading-section-font-family)",
    fontSize: "var(--velarro-heading-section-font-size)",
    fontWeight: "var(--velarro-heading-section-font-weight)",
    lineHeight: "var(--velarro-heading-section-line-height)",
    letterSpacing: "var(--velarro-heading-section-letter-spacing)",
  },
  sectionSmall: {
    fontFamily: "var(--velarro-heading-sectionsmall-font-family)",
    fontSize: "var(--velarro-heading-sectionsmall-font-size)",
    fontWeight: "var(--velarro-heading-sectionsmall-font-weight)",
    lineHeight: "var(--velarro-heading-sectionsmall-line-height)",
    letterSpacing: "var(--velarro-heading-sectionsmall-letter-spacing)",
  },
  card: {
    fontFamily: "var(--velarro-heading-card-font-family)",
    fontSize: "var(--velarro-heading-card-font-size)",
    fontWeight: "var(--velarro-heading-card-font-weight)",
    lineHeight: "var(--velarro-heading-card-line-height)",
    letterSpacing: "var(--velarro-heading-card-letter-spacing)",
  },
  productCard: {
    fontFamily: "var(--velarro-heading-product-cards-font-family)",
    fontSize: "var(--velarro-heading-product-cards-font-size)",
    fontWeight: "var(--velarro-heading-product-cards-font-weight)",
    lineHeight: "var(--velarro-heading-product-cards-line-height)",
    letterSpacing: "var(--velarro-heading-product-cards-letter-spacing)",
  },
};

const defaultLevel: Record<SectionHeadingVariant, SectionHeadingLevel> = {
  page: "h1",
  section: "h2",
  sectionSmall: "h3",
  card: "h3",
  productCard: "h3",
};

/**
 * Token-bound section heading system for editorial and catalog surfaces.
 */
export function SectionHeading({
  variant,
  as,
  eyebrow,
  children,
  className,
  ...props
}: SectionHeadingProps) {
  const Component = as ?? defaultLevel[variant];
  const styles = variantStyles[variant];

  return (
    <div className={cn("flex flex-col gap-spacing-20", className)}>
      {eyebrow ? (
        <p
          className="whitespace-nowrap text-text-secondary-body-text uppercase"
          style={{
            fontFamily: "var(--velarro-body-small-font-family)",
            fontSize: "var(--velarro-body-small-font-size)",
            fontWeight: "var(--velarro-body-small-font-weight)",
            lineHeight: "var(--velarro-body-small-line-height)",
            letterSpacing: "var(--velarro-body-small-letter-spacing)",
          }}
        >
          {eyebrow}
        </p>
      ) : null}
      <Component
        className="text-text-heading"
        style={{
          fontFamily: styles.fontFamily,
          fontSize: styles.fontSize,
          fontWeight: styles.fontWeight,
          lineHeight: styles.lineHeight,
          letterSpacing: styles.letterSpacing,
          fontStyle: styles.fontStyle,
        }}
        {...props}
      >
        {children}
      </Component>
    </div>
  );
}
