"use client";

import { useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  GET_IN_TOUCH_FORM_COPY,
  GET_IN_TOUCH_FORM_FIELDS,
  GET_IN_TOUCH_MESSAGE_FIELD,
  GET_IN_TOUCH_SUBJECT_FIELD,
  GET_IN_TOUCH_SUBMITTED_COPY,
  GET_IN_TOUCH_SUBMITTED_FIGMA_NODE,
} from "@/components/m09-get-in-touch/get-in-touch-data";
import { cn } from "@/lib/cn";

type FieldName =
  | (typeof GET_IN_TOUCH_FORM_FIELDS)[number]["name"]
  | typeof GET_IN_TOUCH_SUBJECT_FIELD.name
  | typeof GET_IN_TOUCH_MESSAGE_FIELD.name;

type FormValues = Record<FieldName, string>;
type FormErrors = Partial<Record<FieldName, string>>;

const INITIAL_VALUES = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
} satisfies FormValues;

const FIELD_ORDER: FieldName[] = [
  "name",
  "email",
  "phone",
  "subject",
  "message",
];

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  for (const field of GET_IN_TOUCH_FORM_FIELDS) {
    if (!values[field.name].trim()) {
      errors[field.name] = `${field.label} is required.`;
    }
  }

  if (!values.subject.trim()) {
    errors.subject = `${GET_IN_TOUCH_SUBJECT_FIELD.label} is required.`;
  }

  if (!values.message.trim()) {
    errors.message = `${GET_IN_TOUCH_MESSAGE_FIELD.label} is required.`;
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
      className="h-[40px] w-[40px] text-text-success"
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

const inputClassName =
  "h-[30px] w-full rounded-radius-sm border border-border-default bg-background-input px-[8px] font-[family-name:var(--velarro-body-small-font-family)] text-[12px] font-light leading-none text-text-body-text outline-none placeholder:text-text-secondary-body-text focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-2";

export function GetInTouchForm() {
  const idPrefix = useId();
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const fieldRefs = useRef<
    Record<FieldName, HTMLInputElement | HTMLTextAreaElement | null>
  >({
    name: null,
    email: null,
    phone: null,
    subject: null,
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

    const firstInvalidField = FIELD_ORDER.find((fieldName) => nextErrors[fieldName]);

    if (firstInvalidField) {
      fieldRefs.current[firstInvalidField]?.focus();
      return;
    }

    setValues(INITIAL_VALUES);
    setSubmitted(true);
  }

  function handleBackToForm() {
    setSubmitted(false);
    setErrors({});
    fieldRefs.current.name?.focus();
  }

  if (submitted) {
    return (
      <section
        aria-labelledby="get-in-touch-submitted-heading"
        className="flex w-full flex-col items-center overflow-hidden rounded-[12px] border border-border-default bg-background-page shadow-confirmation-modal"
        data-get-in-touch-submitted-state
        data-figma-node={GET_IN_TOUCH_SUBMITTED_FIGMA_NODE}
      >
        <div className="flex w-full flex-col items-center px-[16px] pb-[24px] pt-[24px]">
          <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full border border-text-success bg-background-success">
            <CheckIcon />
          </div>
          <h2
            id="get-in-touch-submitted-heading"
            className="mt-[24px] font-[family-name:var(--font-family-primary)] text-[30px] font-medium leading-[36px] tracking-[0] text-text-display"
          >
            {GET_IN_TOUCH_SUBMITTED_COPY.title}
          </h2>
          <p className="mt-[12px] max-w-[382px] text-center font-[family-name:var(--velarro-ui-elements-form-font-family)] text-[14px] font-medium leading-[20px] text-text-body-text">
            {GET_IN_TOUCH_SUBMITTED_COPY.body}
          </p>
        </div>
        <div className="w-full border-t border-button-fill bg-background-section px-[32px] pb-[12px] pt-[13px] text-center">
          <p className="mx-auto max-w-[392px] font-[family-name:var(--velarro-ui-elements-form-font-family)] text-[14px] font-normal leading-[20px] text-text-secondary-body-text">
            {GET_IN_TOUCH_SUBMITTED_COPY.footer}
          </p>
          <button
            type="button"
            onClick={handleBackToForm}
            className="mt-[16px] rounded-radius-md border border-border-default bg-button-fill px-[24px] py-[8px] font-[family-name:var(--velarro-ui-elements-primary-font-family)] text-[14px] font-normal uppercase leading-none text-text-heading outline-none focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-2"
          >
            {GET_IN_TOUCH_SUBMITTED_COPY.backToForm}
          </button>
        </div>
        <div aria-live="polite" className="sr-only">
          {GET_IN_TOUCH_SUBMITTED_COPY.title}
        </div>
      </section>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-start gap-[48px] overflow-hidden rounded-[12px] px-[16px]"
      data-get-in-touch-form
      data-figma-node="15663:38072"
    >
      <div className="flex w-full flex-col gap-[18px]" data-figma-node="15663:38139">
        <div className="grid w-full gap-[20px] desktop:grid-cols-2">
          {GET_IN_TOUCH_FORM_FIELDS.slice(0, 2).map((field) => {
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
                  className={cn(inputClassName, hasError && "border-[#8a2c20]")}
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
        </div>

        <div className="grid w-full gap-[20px] desktop:grid-cols-2">
          {GET_IN_TOUCH_FORM_FIELDS.slice(2).map((field) => {
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
                  className={cn(inputClassName, hasError && "border-[#8a2c20]")}
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
            data-figma-node={GET_IN_TOUCH_SUBJECT_FIELD.figmaNodeId}
          >
            <label
              htmlFor={`${idPrefix}-subject`}
              className="flex h-[24px] items-start gap-[2px] font-[family-name:var(--velarro-ui-elements-form-font-family)] text-[14px] font-normal leading-none text-text-heading"
            >
              <span>{GET_IN_TOUCH_SUBJECT_FIELD.label}</span>
              <span aria-hidden="true">*</span>
            </label>
            <input
              ref={(element) => {
                fieldRefs.current.subject = element;
              }}
              id={`${idPrefix}-subject`}
              name="subject"
              aria-label={GET_IN_TOUCH_SUBJECT_FIELD.label}
              type="text"
              autoComplete="off"
              required
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={
                errors.subject ? `${idPrefix}-subject-error` : undefined
              }
              value={values.subject}
              onChange={updateValue}
              placeholder={GET_IN_TOUCH_SUBJECT_FIELD.placeholder}
              className={cn(inputClassName, errors.subject && "border-[#8a2c20]")}
            />
            {errors.subject ? (
              <p
                id={`${idPrefix}-subject-error`}
                className="font-[family-name:var(--velarro-body-small-font-family)] text-[12px] font-light leading-[16px] text-[#8a2c20]"
              >
                {errors.subject}
              </p>
            ) : null}
          </div>
        </div>

        <div
          className="flex w-full flex-col gap-[2px]"
          data-figma-node={GET_IN_TOUCH_MESSAGE_FIELD.figmaNodeId}
        >
          <label
            htmlFor={`${idPrefix}-message`}
            className="flex h-[24px] items-start gap-[2px] font-[family-name:var(--velarro-ui-elements-form-font-family)] text-[14px] font-normal leading-none text-text-heading"
          >
            <span>{GET_IN_TOUCH_MESSAGE_FIELD.label}</span>
            <span aria-hidden="true">*</span>
          </label>
          <textarea
            ref={(element) => {
              fieldRefs.current.message = element;
            }}
            id={`${idPrefix}-message`}
            name="message"
            aria-label={GET_IN_TOUCH_MESSAGE_FIELD.label}
            required
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? `${idPrefix}-message-error` : undefined
            }
            value={values.message}
            onChange={updateValue}
            placeholder={GET_IN_TOUCH_MESSAGE_FIELD.placeholder}
            rows={6}
            className={cn(
              "min-h-[164px] w-full resize-none rounded-radius-sm border border-border-default bg-background-input px-[8px] py-[8px] font-[family-name:var(--velarro-body-small-font-family)] text-[12px] font-light leading-none text-text-body-text outline-none placeholder:text-text-secondary-body-text focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-2",
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
        className="h-[43px] w-full rounded-radius-md border border-border-default bg-button-fill font-[family-name:var(--velarro-ui-elements-primary-font-family)] text-[16px] font-normal uppercase leading-none text-text-heading outline-none focus-visible:ring-2 focus-visible:ring-border-strong focus-visible:ring-offset-2"
        data-figma-node="15663:38081"
      >
        {GET_IN_TOUCH_FORM_COPY.submit}
      </button>

      <div aria-live="polite" className="sr-only">
        {Object.keys(errors).length ? "Please correct the highlighted fields." : ""}
      </div>
    </form>
  );
}
