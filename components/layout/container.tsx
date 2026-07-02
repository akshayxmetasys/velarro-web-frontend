import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  as?: "div" | "main" | "section" | "article";
}

export function Container({
  children,
  className,
  as: Component = "div",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-[var(--container-max-width)] px-[var(--container-padding-inline)]",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
