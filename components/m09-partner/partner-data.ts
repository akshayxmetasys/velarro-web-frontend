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
  title: "Application submitted",
  id: "Application ID #VL-10482",
  date: "Submission date : 21.02.26",
  body:
    "Our team will review your application and respond within 3-5 business days. You'll be notified via your registered email",
  footer: "A confirmation has been sent to your registered email.",
} as const;
