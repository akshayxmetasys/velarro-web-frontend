import type { ReactNode } from "react";
import { useId } from "react";
import { cn } from "@/lib/cn";

export interface FormFieldProps {
  label: string;
  htmlFor?: string;
  description?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * Accessible label + description wrapper for custom form controls.
 */
export function FormField({
  label,
  htmlFor,
  description,
  error,
  required,
  children,
  className,
}: FormFieldProps) {
  const generatedId = useId();
  const fieldId = htmlFor ?? generatedId;
  const descriptionId = description ? `${fieldId}-description` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={fieldId}
        className="text-text-heading text-[length:var(--font-size-3)]"
        style={{
          fontFamily: "var(--velarro-body-label-font-family)",
          fontWeight: "var(--velarro-body-label-font-weight)",
        }}
      >
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {children}
      {description ? (
        <p
          id={descriptionId}
          className="text-[length:var(--font-size-1)] text-text-secondary-body-text"
        >
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
