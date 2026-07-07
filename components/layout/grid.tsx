import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type GridGap = "20" | "24" | "40" | "48";
export type GridColumns = 1 | 2 | 3 | 4;

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: GridColumns;
  gap?: GridGap;
  children: ReactNode;
}

const gapClasses: Record<GridGap, string> = {
  "20": "gap-spacing-20",
  "24": "gap-spacing-24",
  "40": "gap-spacing-40",
  "48": "gap-spacing-48",
};

/** Maps to --breakpoint-tablet (768px) and --breakpoint-desktop (1440px). */
const columnClasses: Record<GridColumns, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 min-[768px]:grid-cols-2",
  3: "grid-cols-1 min-[768px]:grid-cols-2 min-[1440px]:grid-cols-3",
  4: "grid-cols-1 min-[768px]:grid-cols-2 min-[1440px]:grid-cols-4",
};

/**
 * Responsive grid helper aligned to engineering breakpoints.
 */
export function Grid({
  columns = 3,
  gap = "24",
  children,
  className,
  ...props
}: GridProps) {
  return (
    <div
      className={cn("grid", columnClasses[columns], gapClasses[gap], className)}
      {...props}
    >
      {children}
    </div>
  );
}
