import { cn } from "@/lib/cn";

export interface ProgressIndicatorProps {
  value: number;
  max?: number;
  label: string;
  className?: string;
}

export function ProgressIndicator({
  value,
  max = 100,
  label,
  className,
}: ProgressIndicatorProps) {
  const clamped = Math.min(max, Math.max(0, value));
  const percentage = max > 0 ? Math.round((clamped / max) * 100) : 0;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between gap-4">
        <span className="text-text-heading text-[length:var(--font-size-3)]">{label}</span>
        <span className="text-text-secondary-body-text text-[length:var(--font-size-1)]" aria-hidden="true">
          {percentage}%
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={clamped}
        aria-label={label}
        className="h-2 w-full overflow-hidden rounded-radius-md bg-background-section"
      >
        <div
          className="h-full rounded-radius-md bg-brand-logo motion-reduce:transition-none transition-[width]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
