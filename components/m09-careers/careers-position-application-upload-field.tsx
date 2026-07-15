"use client";

import { useId, type ChangeEvent } from "react";
import { CAREERS_POSITION_APPLICATION_COPY } from "@/components/m09-careers/careers-position-application-data";
import { cn } from "@/lib/cn";

function UploadIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[24px] w-[24px] text-text-heading"
      fill="none"
    >
      <path
        d="M12 16V6M12 6L8 10M12 6L16 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 18H19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface CareersPositionApplicationUploadFieldProps {
  id: string;
  name: "resume" | "coverLetter";
  label: string;
  title: string;
  accept: string;
  required?: boolean;
  error?: string;
  selectedFile: File | null;
  figmaNodeId: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function CareersPositionApplicationUploadField({
  id,
  name,
  label,
  title,
  accept,
  required = false,
  error,
  selectedFile,
  figmaNodeId,
  onChange,
}: CareersPositionApplicationUploadFieldProps) {
  const helpId = useId();
  const errorId = useId();
  const describedBy = [error ? errorId : null, helpId].filter(Boolean).join(" ");

  return (
    <div className="flex w-full flex-col gap-[8px]" data-figma-node={figmaNodeId}>
      <label
        htmlFor={id}
        className="font-[family-name:var(--velarro-heading-product-cards-font-family)] text-[length:var(--velarro-heading-product-cards-font-size)] font-normal leading-[var(--velarro-heading-product-cards-line-height)] text-text-body-text"
      >
        {label}
        {required ? (
          <>
            <span aria-hidden="true"> *</span>
            <span className="sr-only"> (required)</span>
          </>
        ) : null}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type="file"
          accept={accept}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className="peer sr-only"
          onChange={onChange}
        />
        <label
          htmlFor={id}
          className={cn(
            "flex h-[180px] w-full cursor-pointer flex-col items-center justify-center gap-[10px] rounded-[8px] border border-border-default bg-background-input px-[16px] text-center outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-border-strong peer-focus-visible:ring-offset-2",
            error && "border-background-error",
          )}
        >
          <UploadIcon />
          <span className="font-[family-name:var(--velarro-heading-page-font-family)] text-[24px] font-bold leading-[normal] tracking-[-0.25px] text-text-heading">
            {title}
          </span>
          <span
            id={helpId}
            className="font-[family-name:var(--velarro-body-small-font-family)] text-[length:var(--velarro-body-small-font-size)] font-light leading-[normal] text-text-body-text"
          >
            {CAREERS_POSITION_APPLICATION_COPY.uploadHelpText}
          </span>
          {selectedFile ? (
            <span className="max-w-full truncate font-[family-name:var(--velarro-body-default-font-family)] text-[14px] font-light text-text-heading">
              {selectedFile.name}
            </span>
          ) : null}
        </label>
      </div>
      {error ? (
        <p
          id={errorId}
          role="alert"
          className="font-[family-name:var(--velarro-body-small-font-family)] text-[length:var(--velarro-body-small-font-size)] font-light leading-[normal] text-text-heading"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
