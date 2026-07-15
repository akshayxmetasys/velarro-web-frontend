import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CareersPositionApplicationPageByAgeState } from "@/components/m09-careers/careers-position-application-page-by-age-state";
import {
  getCareerPositionApplicationBySlug,
  getImplementedCareerApplicationStaticParams,
} from "@/components/m09-careers/careers-position-application-data";
import {
  getCareerPositionBySlug,
  getCareerPositionDetailBySlug,
} from "@/components/m09-careers/careers-position-details-data";
import { getInitialAgeStateFromCookies } from "@/lib/age/get-initial-age-state";
import { buildPageMetadata } from "@/lib/seo/metadata";

interface CareersPositionApplicationRouteProps {
  params: Promise<{
    jobId: string;
  }>;
}

export function generateStaticParams() {
  return getImplementedCareerApplicationStaticParams();
}

export async function generateMetadata({
  params,
}: CareersPositionApplicationRouteProps): Promise<Metadata> {
  const { jobId } = await params;
  const position = getCareerPositionBySlug(jobId);
  const detail = getCareerPositionDetailBySlug(jobId);
  const application = getCareerPositionApplicationBySlug(jobId);

  if (!position || !detail || !application) {
    return {
      title: "Application Not Found",
      robots: { index: false, follow: false },
    };
  }

  return buildPageMetadata({
    title: `Apply for ${position.title}`,
    description: `Review the ${position.title} application form for Velarro Estate. Application submission is not connected in this review build.`,
    path: `/careers/positions/${jobId}/apply`,
    indexable: false,
  });
}

export default async function CareersPositionApplication({
  params,
}: CareersPositionApplicationRouteProps) {
  const { jobId } = await params;
  const position = getCareerPositionBySlug(jobId);
  const detail = getCareerPositionDetailBySlug(jobId);
  const application = getCareerPositionApplicationBySlug(jobId);

  if (!position || !detail || !application) {
    notFound();
  }

  const ageState = await getInitialAgeStateFromCookies();

  return (
    <CareersPositionApplicationPageByAgeState
      ageState={ageState}
      position={position}
      application={application}
    />
  );
}
