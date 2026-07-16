import Link from "next/link";
import { FooterSection } from "@/components/layout/main-footer";
import { MainNavbar } from "@/components/layout/main-navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Branded not-found using shared shell only.
 * Copy is neutral and does not invent support channels or legal claims.
 */
export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background-page text-text-body-text">
      <MainNavbar />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto flex w-full max-w-[720px] flex-1 flex-col items-start justify-center gap-[24px] px-[24px] py-[64px]"
      >
        <p className="font-[family-name:var(--velarro-body-label-font-family)] text-[14px] font-light uppercase tracking-[0.08em] text-text-secondary-body-text">
          404
        </p>
        <h1 className="font-[family-name:var(--velarro-heading-page-font-family)] text-[32px] font-normal leading-none text-text-display">
          Page not found
        </h1>
        <p className="max-w-[40rem] font-[family-name:var(--velarro-body-default-font-family)] text-[20px] font-light leading-[28px] text-text-body-text">
          The page you requested is not available. It may have moved, or it is
          not part of this review build.
        </p>
        <Link
          href="/"
          className="inline-flex h-[40px] items-center justify-center rounded-radius-md border border-border-default bg-button-fill px-[24px] font-[family-name:var(--velarro-heading-button-font-family)] text-[14px] font-light uppercase leading-none text-text-heading focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-2"
        >
          Return home
        </Link>
      </main>
      <FooterSection />
    </div>
  );
}
