export const GET_IN_TOUCH_FIGMA_NODE = "14644:34661" as const;
export const GET_IN_TOUCH_SUBMITTED_FIGMA_NODE = "15663:38140" as const;

export const GET_IN_TOUCH_HERO_COPY = {
  title: "GET IN TOUCH",
  body: "We're here to assist with orders, product questions, vendor inquiries and general support from the Velarro team.",
} as const;

export const GET_IN_TOUCH_INTRO_COPY = {
  heading: "We're always glad to connect with those who appreciate luxury",
  body: "Fill out the form below and we'll get back to you as soon as possible.",
} as const;

export const GET_IN_TOUCH_FORM_COPY = {
  heading: "Get In Touch with us!",
  submit: "SUBMIT",
} as const;

export const GET_IN_TOUCH_FORM_FIELDS = [
  {
    name: "name",
    label: "Name",
    placeholder: "JOHN DOE",
    type: "text",
    autoComplete: "name",
    control: "input",
    figmaNodeId: "15663:38074",
  },
  {
    name: "email",
    label: "Email address",
    placeholder: "example@gmail.com",
    type: "email",
    autoComplete: "email",
    control: "input",
    figmaNodeId: "15663:38075",
  },
  {
    name: "phone",
    label: "Phone number",
    placeholder: "000 0000 000",
    type: "tel",
    autoComplete: "tel",
    control: "input",
    figmaNodeId: "15663:38077",
  },
] as const;

export const GET_IN_TOUCH_SUBJECT_FIELD = {
  name: "subject",
  label: "Subject",
  placeholder: "Select",
  type: "text",
  autoComplete: "off",
  control: "input",
  figmaNodeId: "15663:38078",
} as const;

export const GET_IN_TOUCH_MESSAGE_FIELD = {
  name: "message",
  label: "Message",
  placeholder: "How can we help you?",
  control: "textarea",
  figmaNodeId: "15663:38080",
} as const;

export const GET_IN_TOUCH_CONTACT_INFO_COPY = {
  heading: "Contact Information",
  email: "info@velarroestate.com",
  followHeading: "FOLLOW VELARRO",
  stayConnectedHeading: "Stay Connected",
  stayConnectedBody:
    "Discover stories, collections, and behind-the-craft moments",
  findStoreLabel: "FIND A STORE NEAR YOU",
} as const;

export const GET_IN_TOUCH_LOCATION_COPY = {
  heading: "Our Primary Location",
  body: "Visit Velarro Headquarter or Explore Nearby stores.",
} as const;

export const GET_IN_TOUCH_SUBMITTED_COPY = {
  title: "Thank you!",
  body: "This on-page preview recorded your inquiry only. No message has been sent, stored, or delivered to Velarro.",
  footer:
    "This confirmation is shown in your browser only and does not represent email delivery.",
  backToForm: "BACK TO FORM",
} as const;

export const GET_IN_TOUCH_FIGMA_NODES = {
  page: "14644:34661",
  hero: "14644:34673",
  heroImage: "14644:34674",
  heroOverlay: "14644:34675",
  heroContent: "14644:34676",
  intro: "14644:34681",
  mainContact: "14644:34684",
  formCard: "14644:34685",
  formScreen: "15663:38072",
  contactInfo: "14644:34724",
  primaryLocation: "14644:34757",
  map: "14644:34761",
  submitted: "15663:38140",
} as const;
