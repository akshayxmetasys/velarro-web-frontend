"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import {
  breadcrumbLabels,
  isPrototypeRoute,
} from "@/components/layout/navigation-data";

export interface BreadcrumbsProps {
  className?: string;
}

function formatSegment(segment: string): string {
  return segment
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function isBreadcrumbLabelKey(path: string): path is keyof typeof breadcrumbLabels {
  return Object.prototype.hasOwnProperty.call(breadcrumbLabels, path);
}

function getBreadcrumbLabel(path: string): string {
  if (isBreadcrumbLabelKey(path)) {
    return breadcrumbLabels[path];
  }

  return formatSegment(path.split("/").at(-1) ?? "");
}

export function Breadcrumbs({ className }: BreadcrumbsProps) {
  const pathname = usePathname();

  if (!pathname || pathname === "/") {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);
  const items = segments.map((_, index) => {
    const path = `/${segments.slice(0, index + 1).join("/")}`;
    const isCurrent = index === segments.length - 1;

    return {
      label: getBreadcrumbLabel(path),
      href: !isCurrent && isPrototypeRoute(path) ? path : undefined,
      isCurrent,
    };
  });

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("border-b border-border-light bg-background-page", className)}
    >
      <ol className="mx-auto flex w-full max-w-[var(--container-max-width)] flex-wrap items-center gap-spacing-20 px-[var(--container-padding-inline)] py-3">
        <li className="flex items-center gap-spacing-20">
          <Link
            href="/"
            className="whitespace-nowrap text-[length:var(--font-size-1)] text-color-info-links hover:opacity-90"
          >
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-spacing-20">
            <span aria-hidden="true" className="text-[length:var(--font-size-1)] text-text-secondary-body-text">
              /
            </span>
            {item.href ? (
              <Link
                href={item.href}
                className="whitespace-nowrap text-[length:var(--font-size-1)] text-color-info-links hover:opacity-90"
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current="page"
                className="whitespace-nowrap text-[length:var(--font-size-1)] text-text-heading"
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
