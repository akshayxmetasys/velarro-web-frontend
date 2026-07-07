import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type StackGap = "20" | "24" | "40" | "48";
export type StackDirection = "row" | "column";
export type StackAlign = "start" | "center" | "end" | "stretch";
export type StackJustify = "start" | "center" | "end" | "between";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: StackDirection;
  gap?: StackGap;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  children: ReactNode;
}

const gapClasses: Record<StackGap, string> = {
  "20": "gap-spacing-20",
  "24": "gap-spacing-24",
  "40": "gap-spacing-40",
  "48": "gap-spacing-48",
};

const alignClasses: Record<StackAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const justifyClasses: Record<StackJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
};

/**
 * Token-bound flex stack for vertical/horizontal rhythm.
 */
export function Stack({
  direction = "column",
  gap = "24",
  align = "stretch",
  justify = "start",
  wrap = false,
  children,
  className,
  ...props
}: StackProps) {
  return (
    <div
      className={cn(
        "flex",
        direction === "row" ? "flex-row" : "flex-col",
        gapClasses[gap],
        alignClasses[align],
        justifyClasses[justify],
        wrap && "flex-wrap",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
