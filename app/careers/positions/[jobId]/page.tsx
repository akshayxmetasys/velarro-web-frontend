import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CareersPositionDetailPageByAgeState } from "@/components/m09-careers/careers-position-detail-page-by-age-state";
import {
  getCareerPositionBySlug,
  getCareerPositionDetailBySlug,
  getImplementedCareerPositionDetailStaticParams,
} from "@/components/m09-careers/careers-position-details-data";
import { getInitialAgeStateFromCookies } from "@/lib/age/get-initial-age-state";
import { buildPageMetadata } from "@/lib/seo/metadata";

interface CareersPositionDetailRouteProps {
  params: Promise<{
    jobId: string;
  }>;
}

export function generateStaticParams() {
  return getImplementedCareerPositionDetailStaticParams();
}

export async function generateMetadata({
  params,
}: CareersPositionDetailRouteProps): Promise<Metadata> {
  const { jobId } = await params;
  const position = getCareerPositionBySlug(jobId);
  const detail = getCareerPositionDetailBySlug(jobId);

  if (!position || !detail) {
    return {
      title: "Position Not Found",
      robots: { index: false, follow: false },
    };
  }

  return buildPageMetadata({
    title: `${position.title} Careers`,
    description: `Review the ${position.title} position at Velarro Estate, including responsibilities, qualifications, and role details.`,
    path: `/careers/positions/${jobId}`,
    indexable: false,
  });
}

export default async function CareersPositionDetail({
  params,
}: CareersPositionDetailRouteProps) {
  const { jobId } = await params;
  const position = getCareerPositionBySlug(jobId);
  const detail = getCareerPositionDetailBySlug(jobId);

  if (!position || !detail) {
    notFound();
  }

  const ageState = await getInitialAgeStateFromCookies();

  return (
    <CareersPositionDetailPageByAgeState
      ageState={ageState}
      position={position}
      detail={detail}
    />
  );
}
