import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/layout/container";

export interface SiteHeaderProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

/**
 * Structural site header shell. Navigation content is added in M01+.
 */
export function SiteHeader({ children, className, ...props }: SiteHeaderProps) {
  return (
    <header
      className={cn("bg-background-navbar text-text-text-white", className)}
      {...props}
    >
      <Container className="flex min-h-16 items-center py-spacing-20">
        {children ?? (
          <div className="text-[length:var(--font-size-3)]" aria-hidden="true">
            {/* Placeholder — logo and nav ship in M01 */}
          </div>
        )}
      </Container>
    </header>
  );
}
