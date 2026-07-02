import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function Section({ children, className, ...props }: SectionProps) {
  return (
    <section className={cn("py-spacing-40", className)} {...props}>
      {children}
    </section>
  );
}
