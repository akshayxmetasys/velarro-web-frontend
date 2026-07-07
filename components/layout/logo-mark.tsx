import Link from "next/link";
import { cn } from "@/lib/cn";
import type { SiteRoute } from "@/components/layout/navigation-data";

export interface LogoMarkProps {
  href?: SiteRoute;
  className?: string;
  compact?: boolean;
}

function LogoContent({ compact = false }: Pick<LogoMarkProps, "compact">) {
  return (
    <span
      className={cn(
        "flex flex-col items-center text-brand-logo",
        compact ? "w-[173px]" : "w-[265px]",
      )}
      data-slot="global/brand/logo-placeholder"
    >
      <span
        className={cn(
          "font-serif leading-none",
          compact ? "text-[54px]" : "text-[64px]",
        )}
      >
        Velarro Estate
      </span>
      <span className="mt-1 text-center text-[8px] font-medium uppercase tracking-[2.32px]">
        SINCE&nbsp;&nbsp;1919
      </span>
    </span>
  );
}

/**
 * Placeholder logo mark matching verified Figma text until the licensed
 * Velarro logo asset is available.
 */
export function LogoMark({ href = "/", className, compact = false }: LogoMarkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-radius-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-info-links",
        className,
      )}
      aria-label="Velarro Estate home"
    >
      <LogoContent compact={compact} />
    </Link>
  );
}
