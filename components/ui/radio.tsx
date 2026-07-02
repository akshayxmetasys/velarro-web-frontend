import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

export function Radio({ className, id, label, disabled, ...props }: RadioProps) {
  const radioId = id ?? props.name;

  return (
    <div className="flex items-center gap-3">
      <input
        id={radioId}
        type="radio"
        disabled={disabled}
        className={cn(
          "size-4 shrink-0 accent-velarro-text",
          "disabled:cursor-not-allowed disabled:opacity-60",
          className,
        )}
        {...props}
      />
      <label htmlFor={radioId} className="text-text-body-text text-[length:var(--font-size-3)]">
        {label}
      </label>
    </div>
  );
}

export interface RadioGroupProps {
  legend: string;
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  className?: string;
}

export function RadioGroup({
  legend,
  name,
  value,
  defaultValue,
  onChange,
  options,
  className,
}: RadioGroupProps) {
  return (
    <fieldset className={cn("flex flex-col gap-3 border-0 p-0", className)}>
      <legend className="mb-2 text-text-heading text-[length:var(--font-size-3)]">{legend}</legend>
      {options.map((option) => (
        <Radio
          key={option.value}
          name={name}
          value={option.value}
          label={option.label}
          disabled={option.disabled}
          checked={value !== undefined ? value === option.value : undefined}
          defaultChecked={defaultValue !== undefined ? defaultValue === option.value : undefined}
          onChange={(event) => onChange?.(event.target.value)}
        />
      ))}
    </fieldset>
  );
}
