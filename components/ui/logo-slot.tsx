import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type LogoSlotVariant = "default" | "navbar" | "footer";

export interface LogoSlotProps extends HTMLAttributes<HTMLDivElement> {
  slotName?: string;
  width?: number;
  height?: number;
  /** When provided, renders an img; otherwise a brand-token placeholder block. */
  imageUrl?: string;
  alt?: string;
  variant?: LogoSlotVariant;
}

const variantClasses: Record<LogoSlotVariant, string> = {
  default: "bg-brand-logo/20 text-brand-logo",
  navbar: "bg-transparent text-brand-logo",
  footer: "bg-brand-logo/20 text-brand-logo",
};

/**
 * Logo placeholder shell — real Velarro logo asset ships in M01 (U-16).
 */
export function LogoSlot({
  slotName = "global/brand/logo",
  width = 120,
  height = 32,
  imageUrl,
  alt = "",
  variant = "default",
  className,
  ...props
}: LogoSlotProps) {
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
        className={cn("block object-contain", className)}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt || "Velarro logo placeholder"}
      data-slot={slotName}
      className={cn(
        "flex items-center justify-center rounded-radius-md",
        variantClasses[variant],
        className,
      )}
      style={{ width, height }}
      {...props}
    >
      <span
        aria-hidden="true"
        className="text-[length:var(--velarro-ui-elements-secondary-font-size)] font-[number:var(--velarro-ui-elements-secondary-font-weight)] uppercase tracking-[var(--letter-spacing-1)]"
      >
        Velarro
      </span>
    </div>
  );
}
