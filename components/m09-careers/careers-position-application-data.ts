export const CAREERS_POSITION_APPLICATION_FIGMA_NODE = "13563:29858" as const;

export const CAREERS_POSITION_APPLICATION_FIGMA_NODES = {
  page: "13563:29858",
  mainContent: "13563:29869",
  outerFrame: "13563:30076",
  innerFrame: "13563:30077",
  headingGroup: "13563:30078",
  heading: "13563:30079",
  description: "13563:30080",
  formRows: "13563:30081",
  actionsRow: "14254:30087",
  goBack: "13563:30138",
  applyButton: "14254:30085",
  breadcrumb: "15057:24249",
} as const;

export const CAREERS_POSITION_APPLICATION_NOT_CONNECTED_STATUS =
  "Application submission is not connected in this review build. No personal information or files were sent." as const;

export const CAREERS_POSITION_APPLICATION_COPY = {
  heading: "Join the legacy of velarro estate",
  description:
    "Become part of a team dedicated to excellence, craftsmanship and luxury. We curate experiences for the world's most discerning individuals.",
  goBackLabel: "GO BACK",
  submitLabel: "APPLY TO THIS JOB",
  uploadHelpText: "PDF, Docx, (Max 10 MB)",
  resumeLabel: "Upload Resume",
  coverLetterLabel: "Upload Cover Letter",
  countryPlaceholder: "Select",
} as const;

export const CAREERS_POSITION_APPLICATION_FIELDS = [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "Enter your first name",
    required: true,
    autocomplete: "given-name",
    figmaNodeId: "13563:30083",
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Enter your last name",
    required: true,
    autocomplete: "family-name",
    figmaNodeId: "13563:30088",
  },
  {
    name: "email",
    label: "Email Address",
    placeholder: "velarro@gmail.com",
    required: true,
    autocomplete: "email",
    type: "email" as const,
    figmaNodeId: "13563:30094",
  },
  {
    name: "phone",
    label: "Phone number",
    placeholder: "",
    required: true,
    autocomplete: "tel",
    type: "tel" as const,
    figmaNodeId: "13563:30099",
  },
  {
    name: "city",
    label: "City",
    placeholder: "e.g. new york",
    required: true,
    autocomplete: "address-level2",
    figmaNodeId: "13563:30108",
  },
  {
    name: "country",
    label: "Country",
    placeholder: "Select",
    required: false,
    autocomplete: "country-name",
    figmaNodeId: "13563:30113",
  },
] as const;

export const CAREERS_POSITION_APPLICATION_FILE_ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export const CAREERS_POSITION_APPLICATION_MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

export const IMPLEMENTED_CAREER_POSITION_APPLICATION_SLUGS = [
  "area-sales-manager",
] as const;

export type ImplementedCareerPositionApplicationSlug =
  (typeof IMPLEMENTED_CAREER_POSITION_APPLICATION_SLUGS)[number];

export interface CareerCallingCode {
  value: string;
  label: string;
}

export interface CareerApplicationCountry {
  value: string;
  label: string;
}

export interface CareerPositionApplicationConfig {
  slug: ImplementedCareerPositionApplicationSlug;
  figmaNodeId: string;
  route: string;
  formMode: "ui-only-not-connected";
  callingCodes: readonly CareerCallingCode[];
  countries: readonly CareerApplicationCountry[];
  acceptedFileExtensions: readonly string[];
  maximumFileSizeBytes: number;
}

export const CAREER_POSITION_APPLICATIONS: readonly CareerPositionApplicationConfig[] =
  [
    {
      slug: "area-sales-manager",
      figmaNodeId: CAREERS_POSITION_APPLICATION_FIGMA_NODE,
      route: "/careers/positions/area-sales-manager/apply",
      formMode: "ui-only-not-connected",
      callingCodes: [{ value: "+91", label: "+91" }],
      countries: [{ value: "India", label: "India" }],
      acceptedFileExtensions: [".pdf", ".doc", ".docx"],
      maximumFileSizeBytes: CAREERS_POSITION_APPLICATION_MAX_FILE_SIZE_BYTES,
    },
  ];

const CAREER_POSITION_APPLICATION_BY_SLUG = new Map(
  CAREER_POSITION_APPLICATIONS.map((application) => [application.slug, application]),
);

export function getCareerPositionApplicationBySlug(
  slug: string,
): CareerPositionApplicationConfig | undefined {
  return CAREER_POSITION_APPLICATION_BY_SLUG.get(
    slug as ImplementedCareerPositionApplicationSlug,
  );
}

export function hasImplementedCareerPositionApplication(slug: string): boolean {
  return IMPLEMENTED_CAREER_POSITION_APPLICATION_SLUGS.includes(
    slug as ImplementedCareerPositionApplicationSlug,
  );
}

export function getCareerPositionApplicationHref(slug: string): string | null {
  const application = getCareerPositionApplicationBySlug(slug);
  return application?.route ?? null;
}

export function getImplementedCareerApplicationStaticParams(): Array<{
  jobId: string;
}> {
  return IMPLEMENTED_CAREER_POSITION_APPLICATION_SLUGS.map((slug) => ({
    jobId: slug,
  }));
}

export type CareerPositionApplicationTextFieldName =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "city"
  | "country"
  | "callingCode";

export type CareerPositionApplicationFileFieldName = "resume" | "coverLetter";

export interface CareerPositionApplicationFormValues {
  firstName: string;
  lastName: string;
  email: string;
  callingCode: string;
  phone: string;
  city: string;
  country: string;
}

export type CareerPositionApplicationFormErrors = Partial<
  Record<
    CareerPositionApplicationTextFieldName | CareerPositionApplicationFileFieldName,
    string
  >
>;

export const CAREER_POSITION_APPLICATION_FIELD_ORDER: readonly (
  | CareerPositionApplicationTextFieldName
  | CareerPositionApplicationFileFieldName
)[] = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "city",
  "country",
  "resume",
  "coverLetter",
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getFileExtension(filename: string): string {
  const lastDot = filename.lastIndexOf(".");
  return lastDot >= 0 ? filename.slice(lastDot).toLowerCase() : "";
}

function isAllowedApplicationFile(
  file: File,
  acceptedExtensions: readonly string[],
): boolean {
  const extension = getFileExtension(file.name);
  if (acceptedExtensions.includes(extension)) {
    return true;
  }

  const allowedMimeTypes = new Set([
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]);

  return file.type.length > 0 && allowedMimeTypes.has(file.type);
}

export function validateCareerPositionApplicationForm(
  values: CareerPositionApplicationFormValues,
  files: {
    resume: File | null;
    coverLetter: File | null;
  },
  config: CareerPositionApplicationConfig,
): CareerPositionApplicationFormErrors {
  const errors: CareerPositionApplicationFormErrors = {};

  if (!values.firstName.trim()) {
    errors.firstName = "First Name is required.";
  }

  if (!values.lastName.trim()) {
    errors.lastName = "Last Name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email Address is required.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else {
    const digits = values.phone.replace(/[\s()+-]/g, "");
    if (!/^\d{7,15}$/.test(digits)) {
      errors.phone = "Enter a valid phone number.";
    }
  }

  if (!values.city.trim()) {
    errors.city = "City is required.";
  }

  if (!files.resume) {
    errors.resume = "Upload Resume is required.";
  } else if (!isAllowedApplicationFile(files.resume, config.acceptedFileExtensions)) {
    errors.resume = "Upload a PDF, DOC, or DOCX file.";
  } else if (files.resume.size > config.maximumFileSizeBytes) {
    errors.resume = "Resume must be 10 MB or smaller.";
  }

  if (!files.coverLetter) {
    errors.coverLetter = "Upload Cover Letter is required.";
  } else if (
    !isAllowedApplicationFile(files.coverLetter, config.acceptedFileExtensions)
  ) {
    errors.coverLetter = "Upload a PDF, DOC, or DOCX file.";
  } else if (files.coverLetter.size > config.maximumFileSizeBytes) {
    errors.coverLetter = "Cover letter must be 10 MB or smaller.";
  }

  return errors;
}
