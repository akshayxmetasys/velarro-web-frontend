import type { HTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Container } from "@/components/layout/container";
import { LogoMark } from "@/components/layout/logo-mark";
import { footerNavigationSections } from "@/components/layout/navigation-data";

export interface SiteFooterProps extends HTMLAttributes<HTMLElement> {
  variant?: "default" | "under21";
}

/**
 * MAIN FOOTER shell. Text and labels are Figma-verified from
 * MAIN FOOTER/Footer - under 21 (14534:33732).
 */
export function SiteFooter({ className, variant = "under21", ...props }: SiteFooterProps) {
  return (
    <footer
      className={cn("mt-auto border-t border-border-default bg-background-page text-text-body-text", className)}
      data-variant={variant}
      {...props}
    >
      <Container className="flex max-w-[1440px] flex-col items-center gap-spacing-20 px-0 pt-spacing-20 pb-2">
        <div aria-label="Social links" className="flex items-center justify-center gap-[60px]" role="list">
          {["Instagram", "YouTube", "Facebook", "X", "LinkedIn"].map((label) => (
            <span
              key={label}
              role="listitem"
              className="flex h-[35px] w-[35px] items-center justify-center rounded-radius-md border border-border-default text-icon-default"
            >
              <span className="sr-only">{label}</span>
            </span>
          ))}
        </div>

        <section
          aria-labelledby="footer-newsletter-heading"
          className="flex w-full max-w-[1436px] flex-col items-center gap-[15px] rounded-[12px] bg-background-section px-spacing-24 py-[15px] min-[1024px]:px-[346px]"
        >
          <h2
            id="footer-newsletter-heading"
            className="w-[244px] border-b border-border-strong pb-1 text-center text-[length:var(--velarro-heading-section-font-size)] font-[number:var(--velarro-heading-section-font-weight)] leading-[var(--velarro-heading-section-line-height)] text-text-heading"
          >
            Stay in Know
          </h2>
          <p className="whitespace-nowrap text-center text-[length:var(--velarro-heading-section-font-size)] font-[number:var(--velarro-heading-section-font-weight)] leading-[var(--velarro-heading-section-line-height)] text-text-heading">
            Receive the latest news in your inbox
          </p>
          <form
            aria-label="Newsletter signup"
            className="grid w-full grid-cols-1 gap-spacing-20 min-[768px]:w-[775px] min-[768px]:grid-cols-[183px_183px_217px] min-[768px]:items-center min-[768px]:justify-center min-[768px]:gap-[22px]"
          >
            <input
              type="text"
              name="name"
              placeholder="Your name"
              aria-label="Your name"
              className="h-[33px] rounded-[4px] border border-border-default bg-background-input px-2 text-[length:var(--velarro-body-caption-font-size)] text-text-body-text"
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              aria-label="Your email"
              className="h-[33px] rounded-[4px] border border-border-default bg-background-input px-2 text-[length:var(--velarro-body-caption-font-size)] text-text-body-text"
            />
            <button
              type="button"
              className="h-[33px] w-full rounded-radius-md border border-border-default bg-button-fill px-spacing-24 text-[length:var(--velarro-ui-elements-primary-font-size)] uppercase text-text-heading min-[768px]:w-[217px]"
            >
              SUBMIT
            </button>
          </form>
        </section>

        <div className="grid w-full max-w-[1440px] gap-[28px] border-y border-border-light py-4 min-[1024px]:w-[1216px] min-[1024px]:grid-cols-[265px_1fr]">
          <div className="flex h-[134px] w-[265px] flex-col items-center justify-start justify-self-center min-[1024px]:justify-self-start">
            <LogoMark compact={false} />
            <p className="mt-2 text-center text-[length:var(--velarro-heading-product-cards-font-size)] leading-[var(--velarro-heading-product-cards-line-height)] text-text-heading">
              Crafted. Refined. Velarro.
            </p>
          </div>
          <nav aria-label="Footer navigation" className="grid gap-spacing-20 min-[1024px]:w-[1020px]">
            <div className="flex flex-wrap justify-center gap-x-[60px] gap-y-spacing-20 border-b border-border-default pb-4 min-[1024px]:justify-start">
              {footerNavigationSections[0].links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="whitespace-nowrap text-[length:var(--velarro-ui-elements-footer-font-size)] font-[number:var(--velarro-ui-elements-footer-font-weight)] text-text-body-text hover:text-color-info-links"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-x-[60px] gap-y-spacing-20 min-[1024px]:justify-start">
              <button
                type="button"
                className="whitespace-nowrap text-left text-[length:var(--velarro-ui-elements-footer-font-size)] font-[number:var(--velarro-ui-elements-footer-font-weight)] text-text-body-text"
              >
                Track Order
              </button>
              {footerNavigationSections[1].links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="whitespace-nowrap text-[length:var(--velarro-ui-elements-footer-font-size)] font-[number:var(--velarro-ui-elements-footer-font-weight)] text-text-body-text hover:text-color-info-links"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <p className="w-full bg-background-section px-spacing-24 py-3 text-center text-[length:var(--font-size-3)] leading-[var(--line-heights-9)] text-velarro-neutral-neutral-11">
          <span>Surgeon General Warning:</span>
          <br />
          <span>Cigar smoking can cause cancers of the mouth and throat, even if you do not inhale.</span>
        </p>

        <p className="text-center text-[length:var(--font-size-3)] leading-[var(--line-heights-9)]">
          Highest level of Encryption, Security and Trust
        </p>

        <div className="flex w-full flex-wrap items-center justify-center gap-spacing-40">
          <Link
            href="/accessibility"
            className="rounded-radius-md bg-button-fill p-2 text-[length:var(--font-size-1)] text-text-body-text"
            aria-label="Accessibility"
          >
            <span aria-hidden="true" className="block h-4 w-4 rounded-full border border-current" />
          </Link>
          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-radius-md bg-button-fill px-3 py-2 text-[length:var(--font-size-3)] text-text-body-text"
          >
            <span aria-hidden="true">&uarr;</span>
            <span>Ascend</span>
          </a>
        </div>

        <nav aria-label="Legal navigation">
          <ul className="flex flex-wrap items-center justify-center gap-x-spacing-40 gap-y-spacing-20">
            {footerNavigationSections[2].links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="whitespace-nowrap text-[length:var(--velarro-ui-elements-footer-font-size)] font-[number:var(--velarro-ui-elements-footer-font-weight)] text-text-body-text hover:text-color-info-links"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-center text-[length:var(--font-size-3)] leading-[var(--line-heights-9)]">
          &copy; 2026 Velarro Estate - All rights reserved
        </p>
      </Container>
    </footer>
  );
}
