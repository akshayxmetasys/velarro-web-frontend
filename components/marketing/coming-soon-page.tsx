import Link from "next/link";
import { Container } from "@/components/layout/container";
import { comingSoonContent } from "@/components/marketing/batch-five-data";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

export function ComingSoonPage() {
  return (
    <section className="relative h-[772px] overflow-hidden bg-background-page">
      <ImagePlaceholder
        slotName={comingSoonContent.slotName}
        width={1440}
        height={772}
        alt=""
        className="h-[772px] w-full rounded-none opacity-70"
      />
      <p
        aria-hidden="true"
        className="absolute left-1/2 top-[-116px] -translate-x-1/2 text-[180px] font-[500] leading-none text-neutral-7/45 min-[768px]:top-[-177px] min-[768px]:text-[502px]"
      >
        {comingSoonContent.eyebrow}
      </p>
      <Container className="absolute left-1/2 top-[280px] flex -translate-x-1/2 flex-col items-center gap-spacing-40 min-[768px]:top-[469px] min-[768px]:w-[957px] min-[768px]:flex-row min-[768px]:items-start min-[768px]:gap-[120px]">
        <h1 className="max-w-[260px] text-center text-[48px] font-[300] leading-[0.95] text-text-secondary-body-text min-[768px]:w-[249px] min-[768px]:text-left min-[768px]:text-[57px]">
          Unveiling
          <span className="block text-[31px]">soon</span>
        </h1>
        <div className="max-w-[645px] text-center min-[768px]:w-[588px] min-[768px]:text-left">
          <p className="text-[20px] leading-normal tracking-[0.2px] text-text-secondary-body-text">
            {comingSoonContent.body}
          </p>
          <div className="mt-spacing-48 flex justify-center gap-[41px] min-[768px]:justify-start">
            {comingSoonContent.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex w-[108px] justify-center border-b border-border-strong pb-1 text-[length:var(--font-size-3)] uppercase leading-[var(--line-heights-9)] text-text-heading"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
