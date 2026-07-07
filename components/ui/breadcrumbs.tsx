import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
}

/**
 * MAIN BREADCRUMBS navigation primitive.
 */
export function Breadcrumbs({ items, className, ...props }: BreadcrumbsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className={cn("w-full", className)} {...props}>
      <ol className="flex flex-wrap items-center gap-spacing-20">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isCurrent = isLast || !item.href;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-spacing-20">
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className="text-text-secondary-body-text text-[length:var(--font-size-1)]"
                >
                  /
                </span>
              ) : null}
              {isCurrent ? (
                <span
                  aria-current="page"
                  className="whitespace-nowrap text-text-heading text-[length:var(--font-size-3)]"
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="whitespace-nowrap text-color-info-links text-[length:var(--font-size-3)] hover:opacity-90"
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
