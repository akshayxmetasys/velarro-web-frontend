import type { HTMLAttributes, ReactNode } from "react";
import { useId } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/layout/container";

export interface MainExploreProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  title?: string;
}

/**
 * Structural explore/content shell mapped from MAIN EXPLORE Figma component.
 * Page-specific rails and imagery ship in later modules.
 */
export function MainExplore({
  children,
  title = "Explore",
  className,
  ...props
}: MainExploreProps) {
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className={cn("bg-background-page py-spacing-40", className)}
      {...props}
    >
      <Container>
        <h2 id={titleId} className="sr-only">
          {title}
        </h2>
        {children ?? <div className="min-h-24" aria-hidden="true" />}
      </Container>
    </section>
  );
}
