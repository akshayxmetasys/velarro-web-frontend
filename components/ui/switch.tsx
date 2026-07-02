"use client";

import type { ButtonHTMLAttributes, KeyboardEvent } from "react";
import { useId, useState } from "react";
import { cn } from "@/lib/cn";

export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  label: string;
  description?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function Switch({
  className,
  id,
  label,
  description,
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  onClick,
  onKeyDown,
  ...props
}: SwitchProps) {
  const generatedId = useId();
  const switchId = id ?? generatedId;
  const descriptionId = description ? `${switchId}-description` : undefined;
  const isControlled = checked !== undefined;
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);
  const isOn = isControlled ? checked : uncontrolledChecked;

  const toggle = () => {
    if (disabled) {
      return;
    }

    const next = !isOn;
    if (!isControlled) {
      setUncontrolledChecked(next);
    }
    onCheckedChange?.(next);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || disabled) {
      return;
    }

    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      toggle();
    }
  };

  return (
    <div className="flex items-start gap-3">
      <button
        id={switchId}
        type="button"
        role="switch"
        aria-checked={isOn}
        aria-describedby={descriptionId}
        disabled={disabled}
        className={cn(
          "relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-border-default transition-colors",
          isOn ? "bg-velarro-text" : "bg-background-input",
          "disabled:cursor-not-allowed disabled:opacity-60",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-info-links",
          className,
        )}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) {
            toggle();
          }
        }}
        onKeyDown={handleKeyDown}
        {...props}
      >
        <span
          aria-hidden="true"
          className={cn(
            "inline-block size-4 rounded-full bg-text-text-white transition-transform motion-reduce:transition-none",
            isOn ? "translate-x-5" : "translate-x-1",
          )}
        />
        <span className="sr-only">{label}</span>
      </button>
      <div className="flex flex-col gap-1">
        <label htmlFor={switchId} className="text-text-body-text text-[length:var(--font-size-3)]">
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
