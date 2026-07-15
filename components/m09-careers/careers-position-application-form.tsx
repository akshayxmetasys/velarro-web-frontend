"use client";

import Link from "next/link";
import {
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import {
  CAREER_POSITION_APPLICATION_FIELD_ORDER,
  CAREERS_POSITION_APPLICATION_COPY,
  CAREERS_POSITION_APPLICATION_FIELDS,
  CAREERS_POSITION_APPLICATION_FILE_ACCEPT,
  CAREERS_POSITION_APPLICATION_FIGMA_NODES,
  CAREERS_POSITION_APPLICATION_NOT_CONNECTED_STATUS,
  validateCareerPositionApplicationForm,
  type CareerPositionApplicationConfig,
  type CareerPositionApplicationFileFieldName,
  type CareerPositionApplicationFormErrors,
  type CareerPositionApplicationFormValues,
  type CareerPositionApplicationTextFieldName,
} from "@/components/m09-careers/careers-position-application-data";
import { CareersPositionApplicationUploadField } from "@/components/m09-careers/careers-position-application-upload-field";
import { cn } from "@/lib/cn";

const INITIAL_VALUES: CareerPositionApplicationFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  callingCode: "+91",
  phone: "",
  city: "",
  country: "",
};

const labelClassName =
  "font-[family-name:var(--velarro-heading-product-cards-font-family)] text-[length:var(--velarro-heading-product-cards-font-size)] font-normal leading-[var(--velarro-heading-product-cards-line-height)] text-text-body-text";

const inputClassName =
  "h-[44px] min-h-[44px] w-full rounded-[8px] border border-border-default bg-background-input px-[16px] font-[family-name:var(--velarro-body-label-font-family)] text-[18px] font-light leading-[normal] text-text-body-text outline-none placeholder:text-text-secondary-body-text focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-2";

const selectClassName = cn(inputClassName, "appearance-none");

interface CareersPositionApplicationFormProps {
  config: CareerPositionApplicationConfig;
  detailHref: string;
}

export function CareersPositionApplicationForm({
  config,
  detailHref,
}: CareersPositionApplicationFormProps) {
  const idPrefix = useId();
  const summaryId = useId();
  const statusId = useId();
  const [values, setValues] = useState<CareerPositionApplicationFormValues>({
    ...INITIAL_VALUES,
    callingCode: config.callingCodes[0]?.value ?? "+91",
  });
  const [files, setFiles] = useState<{
    resume: File | null;
    coverLetter: File | null;
  }>({
    resume: null,
    coverLetter: null,
  });
  const [errors, setErrors] = useState<CareerPositionApplicationFormErrors>({});
  const [formSummary, setFormSummary] = useState<string | null>(null);
  const [showNotConnectedStatus, setShowNotConnectedStatus] = useState(false);

  const fieldRefs = useRef<
    Record<
      CareerPositionApplicationTextFieldName | CareerPositionApplicationFileFieldName,
      HTMLInputElement | HTMLSelectElement | null
    >
  >({
    firstName: null,
    lastName: null,
    email: null,
    callingCode: null,
    phone: null,
    city: null,
    country: null,
    resume: null,
    coverLetter: null,
  });

  function updateValue(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;
    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      delete nextErrors[name as CareerPositionApplicationTextFieldName];
      return nextErrors;
    });
    setFormSummary(null);
    setShowNotConnectedStatus(false);
  }

  function updateFile(
    fieldName: CareerPositionApplicationFileFieldName,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0] ?? null;
    setFiles((currentFiles) => ({
      ...currentFiles,
      [fieldName]: file,
    }));
    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      delete nextErrors[fieldName];
      return nextErrors;
    });
    setFormSummary(null);
    setShowNotConnectedStatus(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateCareerPositionApplicationForm(values, files, config);
    setErrors(nextErrors);
    setShowNotConnectedStatus(false);

    const firstInvalidField = CAREER_POSITION_APPLICATION_FIELD_ORDER.find(
      (fieldName) => nextErrors[fieldName],
    );

    if (firstInvalidField) {
      setFormSummary("Please correct the errors below before continuing.");
      fieldRefs.current[firstInvalidField]?.focus();
      return;
    }

    setFormSummary(null);
    setShowNotConnectedStatus(true);
  }

  const firstName = CAREERS_POSITION_APPLICATION_FIELDS[0];
  const lastName = CAREERS_POSITION_APPLICATION_FIELDS[1];
  const email = CAREERS_POSITION_APPLICATION_FIELDS[2];
  const phone = CAREERS_POSITION_APPLICATION_FIELDS[3];
  const city = CAREERS_POSITION_APPLICATION_FIELDS[4];
  const country = CAREERS_POSITION_APPLICATION_FIELDS[5];

  return (
    <form
      noValidate
      className="flex w-full flex-col gap-[24px]"
      data-careers-position-application-form
      data-form-mode={config.formMode}
      data-submission-endpoint="none"
      data-figma-node={CAREERS_POSITION_APPLICATION_FIGMA_NODES.formRows}
      onSubmit={handleSubmit}
    >
      <div
        id={summaryId}
        role="alert"
        aria-live="polite"
        className={cn(
          "font-[family-name:var(--velarro-body-small-font-family)] text-[length:var(--velarro-body-small-font-size)] font-light leading-[normal] text-text-heading",
          !formSummary && "sr-only",
        )}
      >
        {formSummary}
      </div>

      <div className="grid w-full gap-x-[40px] gap-y-[24px] desktop:grid-cols-2">
        <div className="flex flex-col gap-[8px]" data-figma-node={firstName.figmaNodeId}>
          <label htmlFor={`${idPrefix}-firstName`} className={labelClassName}>
            {firstName.label}
            <span aria-hidden="true"> *</span>
            <span className="sr-only"> (required)</span>
          </label>
          <input
            ref={(element) => {
              fieldRefs.current.firstName = element;
            }}
            id={`${idPrefix}-firstName`}
            name="firstName"
            type="text"
            required
            autoComplete={firstName.autocomplete}
            placeholder={firstName.placeholder}
            value={values.firstName}
            aria-invalid={errors.firstName ? true : undefined}
            aria-describedby={errors.firstName ? `${idPrefix}-firstName-error` : undefined}
            className={cn(inputClassName, errors.firstName && "border-background-error")}
            onChange={updateValue}
          />
          {errors.firstName ? (
            <p
              id={`${idPrefix}-firstName-error`}
              role="alert"
              className="font-[family-name:var(--velarro-body-small-font-family)] text-[length:var(--velarro-body-small-font-size)] font-light leading-[normal] text-text-heading"
            >
              {errors.firstName}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-[8px]" data-figma-node={lastName.figmaNodeId}>
          <label htmlFor={`${idPrefix}-lastName`} className={labelClassName}>
            {lastName.label}
            <span aria-hidden="true"> *</span>
            <span className="sr-only"> (required)</span>
          </label>
          <input
            ref={(element) => {
              fieldRefs.current.lastName = element;
            }}
            id={`${idPrefix}-lastName`}
            name="lastName"
            type="text"
            required
            autoComplete={lastName.autocomplete}
            placeholder={lastName.placeholder}
            value={values.lastName}
            aria-invalid={errors.lastName ? true : undefined}
            aria-describedby={errors.lastName ? `${idPrefix}-lastName-error` : undefined}
            className={cn(inputClassName, errors.lastName && "border-background-error")}
            onChange={updateValue}
          />
          {errors.lastName ? (
            <p
              id={`${idPrefix}-lastName-error`}
              role="alert"
              className="font-[family-name:var(--velarro-body-small-font-family)] text-[length:var(--velarro-body-small-font-size)] font-light leading-[normal] text-text-heading"
            >
              {errors.lastName}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-[8px]" data-figma-node={email.figmaNodeId}>
          <label htmlFor={`${idPrefix}-email`} className={labelClassName}>
            {email.label}
            <span aria-hidden="true"> *</span>
            <span className="sr-only"> (required)</span>
          </label>
          <input
            ref={(element) => {
              fieldRefs.current.email = element;
            }}
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            required
            autoComplete={email.autocomplete}
            placeholder={email.placeholder}
            value={values.email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${idPrefix}-email-error` : undefined}
            className={cn(inputClassName, errors.email && "border-background-error")}
            onChange={updateValue}
          />
          {errors.email ? (
            <p
              id={`${idPrefix}-email-error`}
              role="alert"
              className="font-[family-name:var(--velarro-body-small-font-family)] text-[length:var(--velarro-body-small-font-size)] font-light leading-[normal] text-text-heading"
            >
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-[8px]" data-figma-node={phone.figmaNodeId}>
          <label htmlFor={`${idPrefix}-phone`} className={labelClassName}>
            {phone.label}
            <span aria-hidden="true"> *</span>
            <span className="sr-only"> (required)</span>
          </label>
          <div className="flex w-full gap-[12px]">
            <select
              ref={(element) => {
                fieldRefs.current.callingCode = element;
              }}
              id={`${idPrefix}-callingCode`}
              name="callingCode"
              aria-label="Calling code"
              value={values.callingCode}
              className={cn(selectClassName, "w-[88px] shrink-0 desktop:w-[96px]")}
              onChange={updateValue}
            >
              {config.callingCodes.map((callingCode) => (
                <option key={callingCode.value} value={callingCode.value}>
                  {callingCode.label}
                </option>
              ))}
            </select>
            <input
              ref={(element) => {
                fieldRefs.current.phone = element;
              }}
              id={`${idPrefix}-phone`}
              name="phone"
              type="tel"
              inputMode="tel"
              required
              autoComplete={phone.autocomplete}
              placeholder={phone.placeholder}
              value={values.phone}
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={errors.phone ? `${idPrefix}-phone-error` : undefined}
              className={cn(
                "min-w-0 flex-1",
                inputClassName,
                errors.phone && "border-background-error",
              )}
              onChange={updateValue}
            />
          </div>
          {errors.phone ? (
            <p
              id={`${idPrefix}-phone-error`}
              role="alert"
              className="font-[family-name:var(--velarro-body-small-font-family)] text-[length:var(--velarro-body-small-font-size)] font-light leading-[normal] text-text-heading"
            >
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-[8px]" data-figma-node={city.figmaNodeId}>
          <label htmlFor={`${idPrefix}-city`} className={labelClassName}>
            {city.label}
            <span aria-hidden="true"> *</span>
            <span className="sr-only"> (required)</span>
          </label>
          <input
            ref={(element) => {
              fieldRefs.current.city = element;
            }}
            id={`${idPrefix}-city`}
            name="city"
            type="text"
            required
            autoComplete={city.autocomplete}
            placeholder={city.placeholder}
            value={values.city}
            aria-invalid={errors.city ? true : undefined}
            aria-describedby={errors.city ? `${idPrefix}-city-error` : undefined}
            className={cn(inputClassName, errors.city && "border-background-error")}
            onChange={updateValue}
          />
          {errors.city ? (
            <p
              id={`${idPrefix}-city-error`}
              role="alert"
              className="font-[family-name:var(--velarro-body-small-font-family)] text-[length:var(--velarro-body-small-font-size)] font-light leading-[normal] text-text-heading"
            >
              {errors.city}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-[8px]" data-figma-node={country.figmaNodeId}>
          <label htmlFor={`${idPrefix}-country`} className={labelClassName}>
            {country.label}
            <span className="sr-only"> (optional)</span>
          </label>
          <select
            ref={(element) => {
              fieldRefs.current.country = element;
            }}
            id={`${idPrefix}-country`}
            name="country"
            autoComplete={country.autocomplete}
            value={values.country}
            aria-invalid={errors.country ? true : undefined}
            aria-describedby={errors.country ? `${idPrefix}-country-error` : undefined}
            className={cn(selectClassName, errors.country && "border-background-error")}
            onChange={updateValue}
          >
            <option value="">{CAREERS_POSITION_APPLICATION_COPY.countryPlaceholder}</option>
            {config.countries.map((countryOption) => (
              <option key={countryOption.value} value={countryOption.value}>
                {countryOption.label}
              </option>
            ))}
          </select>
          {errors.country ? (
            <p
              id={`${idPrefix}-country-error`}
              role="alert"
              className="font-[family-name:var(--velarro-body-small-font-family)] text-[length:var(--velarro-body-small-font-size)] font-light leading-[normal] text-text-heading"
            >
              {errors.country}
            </p>
          ) : null}
        </div>

        <CareersPositionApplicationUploadField
          id={`${idPrefix}-resume`}
          name="resume"
          label="Upload Resume"
          title={CAREERS_POSITION_APPLICATION_COPY.resumeLabel}
          accept={CAREERS_POSITION_APPLICATION_FILE_ACCEPT}
          required
          error={errors.resume}
          selectedFile={files.resume}
          figmaNodeId="13563:30120"
          onChange={(event) => {
            fieldRefs.current.resume = event.target;
            updateFile("resume", event);
          }}
        />

        <CareersPositionApplicationUploadField
          id={`${idPrefix}-coverLetter`}
          name="coverLetter"
          label="Upload Cover Letter"
          title={CAREERS_POSITION_APPLICATION_COPY.coverLetterLabel}
          accept={CAREERS_POSITION_APPLICATION_FILE_ACCEPT}
          required
          error={errors.coverLetter}
          selectedFile={files.coverLetter}
          figmaNodeId="13563:30129"
          onChange={(event) => {
            fieldRefs.current.coverLetter = event.target;
            updateFile("coverLetter", event);
          }}
        />
      </div>

      {showNotConnectedStatus ? (
        <p
          id={statusId}
          role="status"
          aria-live="polite"
          data-submission-status="ui-only-not-connected"
          data-network-submission="disabled"
          className="rounded-[8px] border border-border-default bg-background-section px-[16px] py-[12px] font-[family-name:var(--velarro-body-default-font-family)] text-[length:var(--velarro-body-default-font-size)] font-light leading-[var(--velarro-body-default-line-height)] text-text-body-text"
        >
          {CAREERS_POSITION_APPLICATION_NOT_CONNECTED_STATUS}
        </p>
      ) : null}

      <div
        className="grid w-full gap-[24px] desktop:grid-cols-2 desktop:gap-[36px]"
        data-figma-node={CAREERS_POSITION_APPLICATION_FIGMA_NODES.actionsRow}
      >
        <Link
          href={detailHref}
          className="inline-flex h-[48px] min-h-[44px] w-full items-center justify-center rounded-[8px] border border-border-default bg-button-fill px-[24px] font-[family-name:var(--velarro-ui-elements-primary-font-family)] text-[length:var(--velarro-ui-elements-primary-font-size)] font-normal uppercase leading-[normal] tracking-[0] text-text-heading outline-none focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-2 desktop:max-w-[640px]"
          data-figma-node={CAREERS_POSITION_APPLICATION_FIGMA_NODES.goBack}
        >
          {CAREERS_POSITION_APPLICATION_COPY.goBackLabel}
        </Link>
        <button
          type="submit"
          className="inline-flex h-[48px] min-h-[44px] w-full items-center justify-center rounded-[8px] border border-border-default bg-button-fill px-[24px] font-[family-name:var(--velarro-ui-elements-primary-font-family)] text-[length:var(--velarro-ui-elements-primary-font-size)] font-normal uppercase leading-[normal] tracking-[0] text-text-heading outline-none focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-2 desktop:max-w-[640px]"
          data-figma-node={CAREERS_POSITION_APPLICATION_FIGMA_NODES.applyButton}
        >
          {CAREERS_POSITION_APPLICATION_COPY.submitLabel}
        </button>
      </div>
    </form>
  );
}
