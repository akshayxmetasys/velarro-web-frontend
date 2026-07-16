export const PARTNER_FIGMA_NODE = "14670:42180" as const;
export const PARTNER_SUBMITTED_FIGMA_NODE = "15640:24481" as const;

export const PARTNER_COPY = {
  heading: "Partner with Velarro",
  submit: "SUBMIT",
} as const;

export const PARTNER_FORM_FIELDS = [
  {
    name: "email",
    label: "Email Address",
    placeholder: "example@gmail.com",
    type: "email",
    autoComplete: "email",
    figmaNodeId: "15640:27180",
  },
  {
    name: "fullName",
    label: "Full name",
    placeholder: "JOHN DOE",
    type: "text",
    autoComplete: "name",
    figmaNodeId: "15640:27181",
  },
  {
    name: "phone",
    label: "Phone number",
    placeholder: "Enter your phone number",
    type: "tel",
    autoComplete: "tel",
    figmaNodeId: "15640:27182",
  },
  {
    name: "businessName",
    label: "Business name",
    placeholder: "Enter name",
    type: "text",
    autoComplete: "organization",
    figmaNodeId: "15640:27183",
  },
  {
    name: "country",
    label: "Country",
    placeholder: "Country name",
    type: "text",
    autoComplete: "country-name",
    figmaNodeId: "15640:27184",
  },
] as const;

export const PARTNER_MESSAGE_FIELD = {
  name: "message",
  label: "Your message",
  placeholder: "Type a message",
  figmaNodeId: "15640:27185",
} as const;

export const PARTNER_SUBMITTED_COPY = {
  title: "Preview recorded",
  body:
    "This on-page preview recorded your partnership inquiry only. No application has been submitted, stored, or delivered to Velarro.",
  footer:
    "This confirmation is shown in your browser only. No application ID was created and no email was sent.",
  backToForm: "BACK TO FORM",
} as const;
