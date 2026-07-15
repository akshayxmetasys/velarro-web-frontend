import type { CareerPositionDetail } from "@/components/m09-careers/careers-position-details-data";

interface CareersPositionDetailSectionsProps {
  detail: CareerPositionDetail;
}

export function CareersPositionDetailSections({
  detail,
}: CareersPositionDetailSectionsProps) {
  return (
    <div className="flex w-full flex-col gap-[36px]">
      <div
        className="flex flex-col gap-[20px]"
        data-figma-node="13148:15957"
      >
        {detail.overview.map((paragraph) => (
          <p
            key={paragraph}
            className="font-[family-name:var(--velarro-body-default-font-family)] text-[20px] font-light leading-[28px] tracking-[0] text-text-body-text"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {detail.sections.map((section) => (
        <section
          key={section.id}
          aria-labelledby={`careers-position-section-${section.id}`}
          data-figma-node={section.figmaNodeId}
        >
          <h2
            id={`careers-position-section-${section.id}`}
            className="font-[family-name:var(--velarro-heading-page-font-family)] text-[24px] font-normal leading-none tracking-[0] text-text-heading"
          >
            {section.title}
          </h2>
          <ul className="mt-[24px] list-disc space-y-[12px] pl-[24px] font-[family-name:var(--velarro-body-default-font-family)] text-[20px] font-light leading-[28px] text-text-body-text">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}

      <button
        type="button"
        disabled
        aria-disabled="true"
        aria-label="Apply for this job (unavailable: application flow is not approved for this scope)"
        data-application-status="deferred"
        data-application-route={detail.deferredApplyRoute}
        data-figma-node="13148:15976"
        className="inline-flex h-[48px] min-h-[44px] w-full cursor-not-allowed items-center justify-center rounded-[8px] border border-border-default bg-button-fill px-[24px] font-[family-name:var(--velarro-ui-elements-primary-font-family)] text-[16px] font-normal uppercase leading-none tracking-[0] text-text-heading disabled:opacity-100 desktop:max-w-[738px]"
      >
        APPLY FOR THIS JOB
      </button>
    </div>
  );
}
