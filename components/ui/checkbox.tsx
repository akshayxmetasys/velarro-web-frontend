import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  description?: string;
}

export function Checkbox({
  className,
  id,
  label,
  description,
  disabled,
  ...props
}: CheckboxProps) {
  const checkboxId = id ?? props.name;
  const descriptionId = description ? `${checkboxId}-description` : undefined;

  return (
    <div className="flex items-start gap-3">
      <input
        id={checkboxId}
        type="checkbox"
        disabled={disabled}
        aria-describedby={descriptionId}
        className={cn(
          "mt-1 size-4 shrink-0 rounded-radius-md border border-border-strong accent-velarro-text",
          "disabled:cursor-not-allowed disabled:opacity-60",
          className,
        )}
        {...props}
      />
      <div className="flex flex-col gap-1">
        <label htmlFor={checkboxId} className="text-text-body-text text-[length:var(--font-size-3)]">
          {label}
        </label>
        {description ? (
          <p id={descriptionId} className="text-[length:var(--font-size-1)] text-text-secondary-body-text">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
