"use client";

import { useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  PARTNER_COPY,
  PARTNER_FORM_FIELDS,
  PARTNER_MESSAGE_FIELD,
  PARTNER_SUBMITTED_COPY,
  PARTNER_SUBMITTED_FIGMA_NODE,
} from "@/components/m09-partner/partner-data";
import { cn } from "@/lib/cn";

type FieldName =
  | (typeof PARTNER_FORM_FIELDS)[number]["name"]
  | typeof PARTNER_MESSAGE_FIELD.name;

type FormValues = Record<FieldName, string>;
type FormErrors = Partial<Record<FieldName, string>>;

const INITIAL_VALUES = {
  email: "",
  fullName: "",
  phone: "",
  businessName: "",
  country: "",
  message: "",
} satisfies FormValues;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  for (const field of PARTNER_FORM_FIELDS) {
    if (!values[field.name].trim()) {
      errors[field.name] = `${field.label} is required.`;
    }
  }

  if (!values.message.trim()) {
    errors.message = `${PARTNER_MESSAGE_FIELD.label} is required.`;
  }

  if (
    values.email.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
  ) {
    errors.email = "Enter a valid email address.";
  }

  return errors;
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 40"
      className="h-[40px] w-[40px] text-[#465739]"
      fill="none"
    >
      <circle cx="20" cy="20" r="13" stroke="currentColor" strokeWidth="2" />
      <path
        d="M13 20.5L18 25.5L28 15.5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PartnerForm() {
  const idPrefix = useId();
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const fieldRefs = useRef<Record<FieldName, HTMLInputElement | HTMLTextAreaElement | null>>({
    email: null,
    fullName: null,
    phone: null,
    businessName: null,
    country: null,
    message: null,
  });

  function updateValue(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      delete nextErrors[name as FieldName];
      return nextErrors;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstInvalidField = Object.keys(nextErrors)[0] as FieldName | undefined;

    if (firstInvalidField) {
      fieldRefs.current[firstInvalidField]?.focus();
      return;
    }

    setValues(INITIAL_VALUES);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section
        aria-labelledby="partner-submitted-heading"
        className="flex w-full max-w-[500px] flex-col items-center overflow-hidden rounded-[12px] border border-border-strong bg-background-page"
        data-partner-submitted-state
        data-figma-node={PARTNER_SUBMITTED_FIGMA_NODE}
      >
        <div className="flex w-full flex-col items-center pb-[24px] pt-[40px]">
          <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full border border-[#465739] bg-[#e6ebdd]">
            <CheckIcon />
          </div>
          <h2
            id="partner-submitted-heading"
            className="mt-[24px] font-[family-name:var(--font-family-primary)] text-[30px] font-medium leading-none tracking-[0] text-text-display"
          >
            {PARTNER_SUBMITTED_COPY.title}
          </h2>
          <p className="mt-[11px] font-[family-name:var(--velarro-ui-elements-form-font-family)] text-[18px] font-normal leading-none text-text-heading">
            {PARTNER_SUBMITTED_COPY.id}
          </p>
          <p className="mt-[4px] font-[family-name:var(--velarro-ui-elements-form-font-family)] text-[14px] font-normal leading-none text-text-body-text">
            {PARTNER_SUBMITTED_COPY.date}
          </p>
        </div>
        <div className="px-[32px] pb-[32px]">
          <p className="flex min-h-[86px] w-full max-w-[384px] items-center justify-center rounded-[8px] bg-background-card px-[8px] py-[12px] text-center font-[family-name:var(--velarro-heading-product-cards-font-family)] text-[16px] font-normal leading-[24px] text-text-body-text">
            {PARTNER_SUBMITTED_COPY.body}
          </p>
        </div>
        <div className="w-full border-t border-background-card bg-background-card px-[32px] pb-[24px] pt-[25px] text-center">
          <p className="font-[family-name:var(--velarro-ui-elements-form-font-family)] text-[14px] font-normal leading-none text-text-secondary-body-text">
            {PARTNER_SUBMITTED_COPY.footer}
          </p>
        </div>
        <div aria-live="polite" className="sr-only">
          {PARTNER_SUBMITTED_COPY.title}
        </div>
      </section>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="flex min-h-[669px] w-full flex-col items-start gap-[32px] overflow-hidden rounded-[12px] px-[32px] py-[48px]"
      data-partner-form
      data-figma-node="15640:27178"
    >
      <div className="flex w-full flex-col gap-[20px]" data-figma-node="15640:27179">
        {PARTNER_FORM_FIELDS.map((field) => {
          const fieldId = `${idPrefix}-${field.name}`;
          const errorId = `${fieldId}-error`;
          const hasError = Boolean(errors[field.name]);

          return (
            <div
              key={field.name}
              className="flex w-full flex-col gap-[2px]"
              data-figma-node={field.figmaNodeId}
            >
              <label
                htmlFor={fieldId}
                className="flex h-[24px] items-start gap-[2px] font-[family-name:var(--velarro-ui-elements-form-font-family)] text-[14px] font-normal leading-none text-text-heading"
              >
                <span>{field.label}</span>
                <span aria-hidden="true">*</span>
              </label>
              <input
                ref={(element) => {
                  fieldRefs.current[field.name] = element;
                }}
                id={fieldId}
                name={field.name}
                aria-label={field.label}
                type={field.type}
                autoComplete={field.autoComplete}
                required
                aria-invalid={hasError}
                aria-describedby={hasError ? errorId : undefined}
                value={values[field.name]}
                onChange={updateValue}
                placeholder={field.placeholder}
                className={cn(
                  "h-[30px] w-full rounded-[4px] border border-border-default bg-background-input px-[8px] font-[family-name:var(--velarro-body-small-font-family)] text-[12px] font-light leading-none text-text-body-text outline-none placeholder:text-text-secondary-body-text focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-2",
                  hasError && "border-[#8a2c20]",
                )}
              />
              {hasError ? (
                <p
                  id={errorId}
                  className="font-[family-name:var(--velarro-body-small-font-family)] text-[12px] font-light leading-[16px] text-[#8a2c20]"
                >
                  {errors[field.name]}
                </p>
              ) : null}
            </div>
          );
        })}

        <div
          className="flex w-full flex-col gap-[2px]"
          data-figma-node={PARTNER_MESSAGE_FIELD.figmaNodeId}
        >
          <label
            htmlFor={`${idPrefix}-message`}
            className="flex h-[24px] items-start gap-[2px] font-[family-name:var(--velarro-ui-elements-form-font-family)] text-[14px] font-normal leading-none text-text-heading"
          >
            <span>{PARTNER_MESSAGE_FIELD.label}</span>
            <span aria-hidden="true">*</span>
          </label>
          <textarea
            ref={(element) => {
              fieldRefs.current.message = element;
            }}
            id={`${idPrefix}-message`}
            name="message"
            aria-label={PARTNER_MESSAGE_FIELD.label}
            required
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${idPrefix}-message-error` : undefined}
            value={values.message}
            onChange={updateValue}
            placeholder={PARTNER_MESSAGE_FIELD.placeholder}
            rows={1}
            className={cn(
              "min-h-[30px] w-full resize-none rounded-[4px] border border-border-default bg-background-input px-[8px] py-[8px] font-[family-name:var(--velarro-body-small-font-family)] text-[12px] font-light leading-none text-text-body-text outline-none placeholder:text-text-secondary-body-text focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-2",
              errors.message && "border-[#8a2c20]",
            )}
          />
          {errors.message ? (
            <p
              id={`${idPrefix}-message-error`}
              className="font-[family-name:var(--velarro-body-small-font-family)] text-[12px] font-light leading-[16px] text-[#8a2c20]"
            >
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      <button
        type="submit"
        className="h-[43px] w-full rounded-[8px] border border-border-default bg-button-fill font-[family-name:var(--velarro-ui-elements-primary-font-family)] text-[16px] font-normal uppercase leading-none text-text-heading outline-none focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-2 desktop:w-[500px]"
        data-figma-node="15640:27187"
      >
        {PARTNER_COPY.submit}
      </button>

      <div aria-live="polite" className="sr-only">
        {Object.keys(errors).length ? "Please correct the highlighted fields." : ""}
      </div>
    </form>
  );
}
