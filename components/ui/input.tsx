import type { InputHTMLAttributes } from "react";
import { useId } from "react";
import { cn } from "@/lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
  error?: string;
}

export function Input({
  className,
  id,
  label,
  description,
  error,
  disabled,
  required,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? props.name ?? generatedId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="text-text-heading text-[length:var(--font-size-3)]">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <input
        id={inputId}
        disabled={disabled}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={[descriptionId, errorId].filter(Boolean).join(" ") || undefined}
        className={cn(
          "w-full rounded-radius-md border border-border-default bg-background-input px-spacing-20 py-3 text-text-body-text",
          "placeholder:text-text-secondary-body-text",
          "disabled:cursor-not-allowed disabled:opacity-60",
          error && "border-border-strong bg-background-error",
          className,
        )}
        {...props}
      />
      {description ? (
        <p id={descriptionId} className="text-[length:var(--font-size-1)] text-text-secondary-body-text">
          {description}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="text-[length:var(--font-size-1)] text-text-heading">
          {error}
        </p>
      ) : null}
    </div>
  );
}
