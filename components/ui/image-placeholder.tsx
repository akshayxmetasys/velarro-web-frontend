import Image from "next/image";
import { cn } from "@/lib/cn";

export interface ImagePlaceholderProps {
  width: number;
  height: number;
  slotName: string;
  alt: string;
  imageUrl?: string;
  className?: string;
}

export function ImagePlaceholder({
  width,
  height,
  slotName,
  alt,
  imageUrl,
  className,
}: ImagePlaceholderProps) {
  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt={alt}
        width={width}
        height={height}
        data-slot={slotName}
        className={cn("block max-w-full object-cover", className)}
        style={{ width, height }}
        unoptimized
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      data-slot={slotName}
      className={cn(
        "flex shrink-0 items-center justify-center border border-dashed border-border-default bg-background-section text-text-secondary-body-text",
        className,
      )}
      style={{ width, height }}
    />
  );
}
