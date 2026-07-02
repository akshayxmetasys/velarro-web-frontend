import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/layout/container";

export interface SiteFooterProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

/**
 * Structural site footer shell. Footer content is added in M01+.
 */
export function SiteFooter({ children, className, ...props }: SiteFooterProps) {
  return (
    <footer
      className={cn("mt-auto bg-background-section text-text-body-text", className)}
      {...props}
    >
      <Container className="py-spacing-48">
        {children ?? (
          <div className="text-[length:var(--font-size-1)] text-text-secondary-body-text" aria-hidden="true">
            {/* Placeholder — footer links ship in M01 */}
          </div>
        )}
      </Container>
    </footer>
  );
}
