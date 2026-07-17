"use client";

import Image from "next/image";
import Link from "next/link";
import {
  M01_HOME_APPROVED_IMAGES,
  assertApprovedImageUrl,
} from "@/lib/assets/approved-image-hosts";
import { cn } from "@/lib/cn";

const FOOTER_ASSETS = {
  logo: assertApprovedImageUrl(M01_HOME_APPROVED_IMAGES.navbarLogoScript),
  instagram: assertApprovedImageUrl(
    "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/instagram-20260626-190912-svg-logo-icon.svg",
  ),
  youtube: assertApprovedImageUrl(
    "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/youtube-20260626-191022-svg-logo-icon.svg",
  ),
  facebook: assertApprovedImageUrl(
    "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/facebook-20260626-190843-svg-logo-icon.svg",
  ),
  twitterX: assertApprovedImageUrl(
    "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/pajamas_twitter-20260626-190952-svg-logo-icon.svg",
  ),
  linkedin: assertApprovedImageUrl(
    "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/linkedin-20260626-190918-svg-logo-icon.svg",
  ),
  brandMark: assertApprovedImageUrl(
    "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/metasys-20260626-191149-svg-logo-icon.svg",
  ),
  accessibility: assertApprovedImageUrl(
    "https://lpnrhpvmrnoqkzoxukov.supabase.co/storage/v1/object/public/product-images/oui_accessibility-20260626-190950-svg-logo-icon.svg",
  ),
} as const;

export const M01_FOOTER_ASSET_URLS = FOOTER_ASSETS;

const SOCIAL_CONTROLS = [
  { label: "Instagram", src: FOOTER_ASSETS.instagram, size: 35 },
  { label: "YouTube", src: FOOTER_ASSETS.youtube, size: 35 },
  { label: "Facebook", src: FOOTER_ASSETS.facebook, size: 35 },
  { label: "X", src: FOOTER_ASSETS.twitterX, size: 28 },
  { label: "LinkedIn", src: FOOTER_ASSETS.linkedin, size: 32 },
] as const;

const PRIMARY_LINKS = [
  "Our Story",
  "The Humidor",
  "The House",
  "Craftsmanship",
  "Limited Editions",
] as const;

const SECONDARY_LINKS = [
  "Track Order",
  "Sustainability",
  "Press",
  "Contact Us",
  "FAQ",
] as const;

const LEGAL_LINKS = [
  "Privacy Policy",
  "Terms of Service",
  "Cookie Policy",
  "Accessibility",
] as const;

const FOOTER_LINK_CLASS =
  "cursor-not-allowed whitespace-nowrap font-[family-name:var(--velarro-ui-elements-footer-font-family)] text-[length:var(--velarro-ui-elements-footer-font-size)] font-light leading-[var(--velarro-ui-elements-footer-line-height)] text-text-body-text";

function DeferredFooterLink({ label }: { label: string }) {
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-label={`${label} (deferred: destination not approved for this scope)`}
      title={`${label} - destination not approved for this scope`}
      className={FOOTER_LINK_CLASS}
    >
      {label}
    </span>
  );
}

function FooterNavLink({ label, href }: { label: string; href?: string }) {
  if (href) {
    return (
      <Link
        href={href}
        className="whitespace-nowrap font-[family-name:var(--velarro-ui-elements-footer-font-family)] text-[length:var(--velarro-ui-elements-footer-font-size)] font-light leading-[var(--velarro-ui-elements-footer-line-height)] text-text-body-text outline-none focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-2"
      >
        {label}
      </Link>
    );
  }

  return <DeferredFooterLink label={label} />;
}

function SocialControl({
  label,
  src,
  size,
}: {
  label: string;
  src: string;
  size: number;
}) {
  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      aria-label={`${label} social profile (deferred: social URL not approved for this scope)`}
      title={`${label} social profile - social URL not approved for this scope`}
      className="inline-flex cursor-not-allowed items-center justify-center border-0 bg-transparent p-0 opacity-80"
    >
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        unoptimized
        className="object-contain"
      />
    </button>
  );
}

function ArrowUpIcon() {
  return (
    <svg
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M12 19V5M12 5L6.5 10.5M12 5L17.5 10.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FooterSection() {
  function handleAscend() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer
      aria-labelledby="footer-newsletter-heading"
      className="relative w-full border-t border-border-default bg-background-page pt-[20px] text-text-body-text desktop:min-h-[697px]"
      data-figma-node="14468:34842"
      data-slot="m01-over21-footer"
    >
      <div className="flex w-full flex-col items-center gap-[20px]">
        <div
          aria-label="Social profiles"
          className="flex flex-wrap items-center justify-center gap-[40px] px-4 desktop:gap-[60px]"
          data-slot="footer-socials"
          role="list"
        >
          {SOCIAL_CONTROLS.map((social) => (
            <div key={social.label} role="listitem">
              <SocialControl {...social} />
            </div>
          ))}
        </div>

        <section
          className="w-full px-[2px]"
          aria-labelledby="footer-newsletter-heading"
        >
          <div
            className="mx-auto flex w-full max-w-[1436px] flex-col items-center gap-[15px] rounded-[12px] bg-background-section px-4 py-[15px]"
            data-slot="footer-newsletter-panel"
          >
            <div className="flex w-[244px] max-w-full flex-col items-center gap-[4px]">
              <h2
                id="footer-newsletter-heading"
                className="whitespace-nowrap font-[family-name:var(--velarro-heading-section-font-family)] text-[length:var(--velarro-heading-section-font-size)] font-light leading-[var(--velarro-heading-section-line-height)] text-text-heading"
              >
                Stay in Know
              </h2>
              <span
                aria-hidden="true"
                className="h-px w-full bg-border-strong"
                data-slot="footer-newsletter-divider"
              />
            </div>
            <p className="text-center font-[family-name:var(--velarro-heading-section-font-family)] text-[24px] font-light leading-[var(--velarro-heading-section-line-height)] text-text-heading desktop:text-[length:var(--velarro-heading-section-font-size)]">
              Receive the latest news in your inbox
            </p>
            <form
              aria-label="Newsletter signup (deferred: backend not approved for this scope)"
              className="flex w-full max-w-[775px] flex-col items-center gap-[22px] tablet:flex-row"
              data-slot="footer-newsletter-form"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="grid w-full max-w-[536px] gap-[20px] tablet:grid-cols-2">
                <input
                  disabled
                  aria-label="Your name (deferred: newsletter backend not approved)"
                  placeholder="Your name"
                  className="h-[33px] w-full cursor-not-allowed rounded-[4px] border border-border-default bg-background-input px-[8px] font-sans text-[14px] text-text-secondary-body-text placeholder:text-text-secondary-body-text disabled:opacity-100"
                />
                <input
                  disabled
                  aria-label="Your email (deferred: newsletter backend not approved)"
                  placeholder="Your email"
                  className="h-[33px] w-full cursor-not-allowed rounded-[4px] border border-border-default bg-background-input px-[8px] font-sans text-[14px] text-text-secondary-body-text placeholder:text-text-secondary-body-text disabled:opacity-100"
                />
              </div>
              <button
                type="submit"
                disabled
                aria-disabled="true"
                aria-label="Submit newsletter signup (deferred: backend not approved for this scope)"
                className="h-[33px] w-[217px] shrink-0 cursor-not-allowed rounded-radius-md border border-border-default bg-button-fill px-6 font-[family-name:var(--velarro-heading-button-font-family)] text-[length:var(--velarro-heading-button-font-size)] font-light uppercase leading-[var(--velarro-heading-button-line-height)] text-text-heading"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </section>

        <div
          className="flex w-full flex-col items-center border-y border-border-default px-4 py-[16px]"
          data-slot="footer-nav-band"
        >
          <div
            className="flex w-full max-w-[1216px] flex-col items-center gap-[28px] desktop:flex-row"
            data-slot="footer-main-row"
          >
            <div
              className="flex h-[134px] w-[265px] shrink-0 flex-col items-center justify-start text-center"
              data-slot="footer-brand-block"
            >
              <div
                className="flex h-[90px] w-full flex-col items-center justify-center gap-[7px]"
                data-slot="footer-brand-mark"
              >
                <Image
                  src={FOOTER_ASSETS.logo}
                  alt="Velarro Estate footer logo"
                  width={265}
                  height={90}
                  className="h-[90px] w-[265px] object-contain"
                />
              </div>
              <p className="mt-[18px] font-[family-name:var(--velarro-heading-product-cards-font-family)] text-[length:var(--velarro-heading-product-cards-font-size)] font-normal leading-[24px] text-text-heading">
                Crafted. Refined. Velarro.
              </p>
            </div>

            <nav
              aria-label="Footer navigation"
              className="flex min-w-0 flex-1 flex-col items-center gap-[20px]"
              data-slot="footer-nav"
            >
              <div className="flex w-full max-w-[1020px] flex-wrap items-center justify-center gap-x-[60px] gap-y-[16px] border-b border-border-default pb-[16px]">
                {PRIMARY_LINKS.map((label) => (
                  <DeferredFooterLink key={label} label={label} />
                ))}
              </div>
              <div className="flex w-full max-w-[1020px] flex-wrap items-center justify-center gap-x-[60px] gap-y-[16px]">
                {SECONDARY_LINKS.map((label) => (
                  <FooterNavLink
                    key={label}
                    label={label}
                    href={label === "Contact Us" ? "/get-in-touch" : undefined}
                  />
                ))}
              </div>
            </nav>
          </div>
        </div>

        <section
          aria-label="Surgeon General warning"
          className="w-full bg-background-section px-4 py-[10px] text-center"
          data-slot="footer-surgeon-warning"
        >
          <p className="font-[family-name:var(--velarro-heading-product-cards-font-family)] text-[length:var(--velarro-heading-product-cards-font-size)] font-normal leading-[24px] text-text-body-text">
            <span>Surgeon General Warning:</span>
            <br />
            <span>
              Cigar smoking can cause cancers of the mouth and throat, even if
              you do not inhale.
            </span>
          </p>
        </section>

        <p className="px-4 text-center font-[family-name:var(--velarro-heading-product-cards-font-family)] text-[length:var(--velarro-heading-product-cards-font-size)] font-normal leading-[24px] text-text-body-text">
          Highest level of Encryption, Security and Trust
        </p>

        <Image
          src={FOOTER_ASSETS.brandMark}
          alt="Metasys"
          width={128}
          height={35}
          unoptimized
          className="h-[35px] w-[128px] object-contain"
        />

        <nav
          aria-label="Footer legal"
          className="flex flex-wrap items-center justify-center gap-x-[60px] gap-y-[16px] px-4"
          data-slot="footer-legal"
        >
          {LEGAL_LINKS.map((label) => (
            <DeferredFooterLink key={label} label={label} />
          ))}
        </nav>

        <p className="px-4 pb-[72px] text-center font-[family-name:var(--velarro-heading-product-cards-font-family)] text-[length:var(--velarro-heading-product-cards-font-size)] font-normal leading-[24px] text-text-body-text desktop:pb-[80px]">
          &copy; 2026 Velarro Estate - All rights reserved
        </p>

        <div
          className={cn(
            "flex w-full items-center justify-between px-4 pb-[20px]",
            "desktop:absolute desktop:bottom-[20px] desktop:left-0 desktop:right-0 desktop:px-[50px] desktop:pb-0",
          )}
          data-slot="footer-utility-row"
        >
          <button
            type="button"
            disabled
            aria-disabled="true"
            aria-label="Accessibility options (deferred: accessibility widget not approved for this scope)"
            title="Accessibility options - accessibility widget not approved for this scope"
            className="inline-flex size-[40px] cursor-not-allowed items-center justify-center rounded-radius-md bg-button-fill p-[8px]"
            data-slot="footer-accessibility"
          >
            <Image
              src={FOOTER_ASSETS.accessibility}
              alt=""
              width={24}
              height={24}
              unoptimized
            />
          </button>

          <button
            type="button"
            onClick={handleAscend}
            aria-label="Ascend to top"
            className="inline-flex items-center justify-center gap-[10px] rounded-radius-md bg-button-fill p-[8px] font-heading text-[length:var(--font-size-3)] font-medium leading-[var(--line-heights-9)] tracking-[var(--letter-spacing-1)] text-text-body-text outline-none focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-2"
            data-slot="footer-ascend"
          >
            <ArrowUpIcon />
            <span>Ascend</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

/** Canonical shared-layout name (shared-component-plan: main-footer). */
export const MainFooter = FooterSection;
