import Image from "next/image";
import { cn } from "@/lib/cn";

export interface CigarCategoryCardProps {
  cardId: string;
  label: string;
  imageUrl: string;
  imageAlt: string;
  isActive: boolean;
}

export function CigarCategoryCard({
  cardId,
  label,
  imageUrl,
  imageAlt,
  isActive,
}: CigarCategoryCardProps) {
  const titleId = `cigar-card-title-${cardId}`;

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "flex shrink-0 flex-col bg-background-card border-border-strong",
        isActive
          ? "w-[395.07px] gap-[15.65px] rounded-[11.73px] border-[1.47px] p-[15.65px]"
          : "w-[351.42px] gap-[13.92px] rounded-[10.44px] border-[1.3px] p-[13.92px] opacity-75",
      )}
      aria-current={isActive ? "true" : undefined}
    >
      <div
        className={cn(
          "relative shrink-0 overflow-hidden bg-background-page",
          isActive
            ? "h-[321.728px] w-[363.777px] rounded-[7.823px]"
            : "h-[286.177px] w-[323.58px] rounded-[6.959px]",
        )}
      >
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes={isActive ? "364px" : "324px"}
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[rgba(21,20,20,0.4)]"
        />
      </div>

      <div
        className={cn(
          "flex flex-col",
          isActive ? "gap-[15.65px]" : "gap-[13.92px]",
        )}
      >
        <h3
          id={titleId}
          className={cn(
            "font-[family-name:var(--velarro-heading-card-font-family)] text-[length:var(--velarro-heading-card-font-size)] font-normal leading-normal text-text-heading",
            isActive ? "" : "opacity-90",
          )}
        >
          {label}
        </h3>
        <button
          type="button"
          disabled
          aria-disabled="true"
          aria-label={`Explore ${label} (deferred: destination not approved for this scope)`}
          title={`Explore ${label} — destination not approved for this scope`}
          className={cn(
            "w-full cursor-not-allowed rounded-radius-md border uppercase font-[family-name:var(--velarro-heading-card-font-family)] font-normal leading-normal text-text-heading",
            isActive
              ? "border-border-default bg-button-fill py-[11.735px] text-[15.65px]"
              : "border-border-light bg-button-disabled py-[10.438px] text-[13.92px] opacity-80",
          )}
        >
          EXPLORE
        </button>
      </div>
    </article>
  );
}
