import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface AccordionItemProps {
  id: string;
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function AccordionItem({
  id,
  title,
  children,
  defaultOpen = false,
  className,
}: AccordionItemProps) {
  const panelId = `${id}-panel`;
  const summaryId = `${id}-trigger`;

  return (
    <details
      id={id}
      open={defaultOpen}
      className={cn(
        "group rounded-radius-md border border-border-light bg-background-card",
        className,
      )}
    >
      <summary
        id={summaryId}
        className={cn(
          "cursor-pointer list-none px-spacing-24 py-spacing-20 text-text-heading",
          "text-[length:var(--font-size-3)] font-normal",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-info-links",
          "[&::-webkit-details-marker]:hidden",
        )}
        aria-controls={panelId}
      >
        <span className="flex items-center justify-between gap-4">
          {title}
          <span aria-hidden="true" className="text-text-secondary-body-text group-open:rotate-180 motion-reduce:transition-none transition-transform">
            ▾
          </span>
        </span>
      </summary>
      <div
        id={panelId}
        role="region"
        aria-labelledby={summaryId}
        className="border-t border-border-light px-spacing-24 py-spacing-20 text-text-body-text"
      >
        {children}
      </div>
    </details>
  );
}

export interface AccordionProps {
  items: AccordionItemProps[];
  className?: string;
  "aria-label"?: string;
}

export function Accordion({ items, className, "aria-label": ariaLabel }: AccordionProps) {
  return (
    <div className={cn("flex flex-col gap-spacing-20", className)} role="group" aria-label={ariaLabel}>
      {items.map((item) => (
        <AccordionItem key={item.id} {...item} />
      ))}
    </div>
  );
}
