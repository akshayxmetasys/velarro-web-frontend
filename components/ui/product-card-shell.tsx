import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

export interface ProductCardShellProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  slotName: string;
  imageWidth: number;
  imageHeight: number;
  imageUrl?: string;
  imageAlt?: string;
  title?: ReactNode;
  price?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  href?: string;
}

/**
 * Structural shell for MAIN PRODUCT CARD — content slots only, no catalog data.
 */
export function ProductCardShell({
  slotName,
  imageWidth,
  imageHeight,
  imageUrl,
  imageAlt = "",
  title,
  price,
  actions,
  children,
  href,
  className,
  ...props
}: ProductCardShellProps) {
  const content = (
    <>
      <ImagePlaceholder
        slotName={`${slotName}/image`}
        width={imageWidth}
        height={imageHeight}
        imageUrl={imageUrl}
        alt={imageAlt}
        variant="premium"
        className="w-full"
      />
      <div className="flex flex-col gap-spacing-20 p-spacing-20">
        {title ? (
          <h3
            className="text-text-heading"
            style={{
              fontFamily: "var(--velarro-heading-product-cards-font-family)",
              fontSize: "var(--velarro-heading-product-cards-font-size)",
              fontWeight: "var(--velarro-heading-product-cards-font-weight)",
              lineHeight: "var(--velarro-heading-product-cards-line-height)",
              letterSpacing: "var(--velarro-heading-product-cards-letter-spacing)",
            }}
          >
            {title}
          </h3>
        ) : null}
        {price ? (
          <p
            className="text-text-body-text"
            style={{
              fontFamily: "var(--velarro-ui-elements-price-font-family)",
              fontSize: "var(--velarro-ui-elements-price-font-size)",
              fontWeight: "var(--velarro-ui-elements-price-font-weight)",
              lineHeight: "var(--velarro-ui-elements-price-line-height)",
              letterSpacing: "var(--velarro-ui-elements-price-letter-spacing)",
            }}
          >
            {price}
          </p>
        ) : null}
        {actions ? <div className="flex flex-wrap items-center gap-spacing-20">{actions}</div> : null}
        {children}
      </div>
    </>
  );

  const shellClasses = cn(
    "group flex flex-col overflow-hidden rounded-radius-md bg-background-page shadow-card-subtle",
    "transition-colors hover:bg-background-section",
    className,
  );

  if (href) {
    return (
      <a href={href} className={shellClasses} data-slot={slotName} {...props}>
        {content}
      </a>
    );
  }

  return (
    <article className={shellClasses} data-slot={slotName} {...props}>
      {content}
    </article>
  );
}
