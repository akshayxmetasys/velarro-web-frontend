import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "explore"
  | "checkout"
  | "luxury";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-velarro-text text-text-text-white shadow-button hover:opacity-90 disabled:bg-button-disabled disabled:text-text-secondary-body-text",
  secondary:
    "bg-button-fill text-text-heading border border-border-default shadow-button hover:bg-background-section disabled:bg-button-disabled disabled:text-text-secondary-body-text",
  ghost:
    "bg-transparent text-color-info-links hover:bg-background-section disabled:text-text-secondary-body-text",
  explore:
    "bg-transparent text-color-info-links underline-offset-4 hover:bg-background-section hover:underline disabled:text-text-secondary-body-text",
  checkout:
    "w-full bg-velarro-text text-text-text-white shadow-button hover:opacity-90 disabled:bg-button-disabled disabled:text-text-secondary-body-text",
  luxury:
    "bg-button-fill text-text-heading border border-border-strong shadow-auth-modal hover:bg-background-section disabled:bg-button-disabled disabled:text-text-secondary-body-text",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-spacing-20 py-2 text-[length:var(--font-size-1)]",
  md: "px-spacing-24 py-3 text-[length:var(--font-size-3)]",
  lg: "px-spacing-40 py-4 text-[length:var(--velarro-display-shop-now-font-size)] leading-[var(--velarro-display-shop-now-line-height)]",
};

const variantTypography: Partial<Record<ButtonVariant, string>> = {
  explore:
    "font-[number:var(--velarro-display-shop-now-font-weight)] text-[length:var(--velarro-display-shop-now-font-size)] leading-[var(--velarro-display-shop-now-line-height)]",
  checkout:
    "font-[number:var(--velarro-heading-button-font-weight)] text-[length:var(--velarro-heading-button-font-size)] leading-[var(--velarro-heading-button-line-height)] uppercase tracking-[var(--letter-spacing-1)]",
  luxury:
    "font-[number:var(--velarro-heading-button-font-weight)] text-[length:var(--velarro-heading-button-font-size)] leading-[var(--velarro-heading-button-line-height)]",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center rounded-radius-md font-sans font-normal transition-opacity",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-info-links",
        "disabled:cursor-not-allowed disabled:opacity-70",
        variantClasses[variant],
        sizeClasses[size],
        variantTypography[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
