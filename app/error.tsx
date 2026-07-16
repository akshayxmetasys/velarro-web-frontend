"use client";

import Link from "next/link";
import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Client error boundary UI.
 * Does not expose stack traces or invent support promises.
 */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Digest-only diagnostic hook for future telemetry — no payload logging.
    void error.digest;
  }, [error]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background-page px-[24px] py-[64px] text-text-body-text">
      <main
        id="main-content"
        tabIndex={-1}
        className="flex w-full max-w-[640px] flex-col items-start gap-[24px]"
        aria-labelledby="error-heading"
      >
        <h1
          id="error-heading"
          className="font-[family-name:var(--velarro-heading-page-font-family)] text-[32px] font-normal leading-none text-text-display"
        >
          Something went wrong
        </h1>
        <p className="font-[family-name:var(--velarro-body-default-font-family)] text-[20px] font-light leading-[28px] text-text-body-text">
          This page could not be displayed. You can try again, or return to the
          homepage.
        </p>
        <div className="flex flex-wrap gap-[12px]">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-[40px] items-center justify-center rounded-radius-md border border-border-default bg-button-fill px-[24px] font-[family-name:var(--velarro-heading-button-font-family)] text-[14px] font-light uppercase leading-none text-text-heading focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-2"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-[40px] items-center justify-center rounded-radius-md border border-border-default bg-background-page px-[24px] font-[family-name:var(--velarro-heading-button-font-family)] text-[14px] font-light uppercase leading-none text-text-heading focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-2"
          >
            Return home
          </Link>
        </div>
      </main>
    </div>
  );
}
