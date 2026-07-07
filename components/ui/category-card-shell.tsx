import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

export interface CategoryCardShellProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  slotName: string;
  imageWidth: number;
  imageHeight: number;
  imageUrl?: string;
  imageAlt?: string;
  title?: ReactNode;
  description?: ReactNode;
  href?: string;
  children?: ReactNode;
}

/**
 * Structural shell for Category cards — imagery + label slots only.
 */
export function CategoryCardShell({
  slotName,
  imageWidth,
  imageHeight,
  imageUrl,
  imageAlt = "",
  title,
  description,
  href,
  children,
  className,
  ...props
}: CategoryCardShellProps) {
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
            className="whitespace-nowrap text-text-heading"
            style={{
              fontFamily: "var(--velarro-heading-card-font-family)",
              fontSize: "var(--velarro-heading-card-font-size)",
              fontWeight: "var(--velarro-heading-card-font-weight)",
              lineHeight: "var(--velarro-heading-card-line-height)",
              letterSpacing: "var(--velarro-heading-card-letter-spacing)",
            }}
          >
            {title}
          </h3>
        ) : null}
        {description ? (
          <p
            className="text-text-secondary-body-text"
            style={{
              fontFamily: "var(--velarro-body-small-font-family)",
              fontSize: "var(--velarro-body-small-font-size)",
              fontWeight: "var(--velarro-body-small-font-weight)",
              lineHeight: "var(--velarro-body-small-line-height)",
              letterSpacing: "var(--velarro-body-small-letter-spacing)",
            }}
          >
            {description}
          </p>
        ) : null}
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
