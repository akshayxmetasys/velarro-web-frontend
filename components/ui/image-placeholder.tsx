import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface ImagePlaceholderProps extends HTMLAttributes<HTMLDivElement> {
  /** Annotates the slot for QA and future asset wiring (e.g. m04/house/product-gallery-primary). */
  slotName: string;
  width: number;
  height: number;
  /** When provided, renders an img; otherwise a token-backed placeholder block. */
  imageUrl?: string;
  alt?: string;
  variant?: "default" | "premium";
}

/**
 * Fixed-dimension image slot per prototype placeholder policy.
 * No invented imagery — neutral fill until a server URL is supplied.
 */
export function ImagePlaceholder({
  slotName,
  width,
  height,
  imageUrl,
  alt = "",
  variant = "default",
  className,
  style,
  ...props
}: ImagePlaceholderProps) {
  const dimensions: CSSProperties = { width, height, ...style };

  if (imageUrl) {
    return (
      // Placeholder primitive — accepts pasted URLs before next/image remotePatterns wiring.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageUrl}
        alt={alt}
        width={width}
        height={height}
        data-slot={slotName}
        className={cn("block object-cover", className)}
        style={dimensions}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt || slotName}
      data-slot={slotName}
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-radius-md bg-background-card",
        variant === "premium" && "shadow-card-subtle",
        className,
      )}
      style={dimensions}
      {...props}
    >
      <span className="sr-only">{slotName}</span>
    </div>
  );
}
