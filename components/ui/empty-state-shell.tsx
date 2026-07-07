import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

export interface EmptyStateShellProps extends HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  slotName?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageUrl?: string;
  action?: ReactNode;
  children?: ReactNode;
}

/**
 * Neutral empty-state shell for cart, wishlist, search, and profile modules.
 */
export function EmptyStateShell({
  title,
  description,
  slotName = "global/empty-state/illustration",
  imageWidth = 240,
  imageHeight = 160,
  imageUrl,
  action,
  children,
  className,
  ...props
}: EmptyStateShellProps) {
  return (
    <section
      className={cn(
        "flex flex-col items-center gap-spacing-24 rounded-radius-md bg-background-section px-spacing-24 py-spacing-40 text-center shadow-section",
        className,
      )}
      {...props}
    >
      <ImagePlaceholder
        slotName={slotName}
        width={imageWidth}
        height={imageHeight}
        imageUrl={imageUrl}
        alt=""
        variant="premium"
      />
      <div className="flex max-w-lg flex-col gap-spacing-20">
        <h2
          className="text-text-heading"
          style={{
            fontFamily: "var(--velarro-heading-sectionsmall-font-family)",
            fontSize: "var(--velarro-heading-sectionsmall-font-size)",
            fontWeight: "var(--velarro-heading-sectionsmall-font-weight)",
            lineHeight: "var(--velarro-heading-sectionsmall-line-height)",
            letterSpacing: "var(--velarro-heading-sectionsmall-letter-spacing)",
          }}
        >
          {title}
        </h2>
        {description ? (
          <p
            className="text-text-body-text"
            style={{
              fontFamily: "var(--velarro-body-default-font-family)",
              fontSize: "var(--velarro-body-default-font-size)",
              fontWeight: "var(--velarro-body-default-font-weight)",
              lineHeight: "var(--velarro-body-default-line-height)",
              letterSpacing: "var(--velarro-body-default-letter-spacing)",
            }}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="flex flex-wrap items-center justify-center gap-spacing-20">{action}</div> : null}
      {children}
    </section>
  );
}
