import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { cn } from "@/lib/cn";

export interface SiteShellProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

/**
 * Structural shell only. Final Figma header/footer visuals ship in later modules.
 */
export function SiteShell({
  children,
  header,
  footer,
  className,
}: SiteShellProps) {
  return (
    <div className={cn("flex min-h-screen flex-col bg-background-page", className)}>
      <SiteHeader>{header}</SiteHeader>
      <main className="flex-1">{children}</main>
      <SiteFooter>{footer}</SiteFooter>
    </div>
  );
}
