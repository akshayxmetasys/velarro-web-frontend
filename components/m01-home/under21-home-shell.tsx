import Link from "next/link";

const SAFE_UNDER_21_LINKS = [
  { label: "Accessibility", href: "/accessibility" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
] as const;

export function Under21HomeShell() {
  return (
    <section
      aria-labelledby="under21-heading"
      className="flex min-h-screen flex-col items-center justify-center bg-background-page px-[var(--container-padding-inline)] py-spacing-48"
    >
      <div className="w-full max-w-[640px] rounded-radius-md border border-border-default bg-background-section px-spacing-40 py-spacing-48 text-center shadow-section">
        <p className="text-[length:var(--velarro-heading-sectionsmall-font-size)] font-light uppercase tracking-[0.08em] text-text-display">
          Velarro Estate
        </p>
        <h1
          id="under21-heading"
          className="mt-spacing-24 text-[length:var(--velarro-heading-page-font-size)] font-normal text-text-heading"
        >
          Access restricted
        </h1>
        <p className="mt-spacing-24 text-[length:var(--font-size-3)] leading-[var(--line-heights-9)] text-text-body-text">
          This experience is available only to visitors who are 21 years of age or
          older. Tobacco and product content is not shown here.
        </p>
        <nav
          aria-label="Legal and accessibility links"
          className="mt-spacing-40 flex flex-wrap items-center justify-center gap-x-spacing-24 gap-y-spacing-20"
        >
          {SAFE_UNDER_21_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[length:var(--velarro-ui-elements-footer-font-size)] font-light text-color-info-links underline-offset-4 hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
