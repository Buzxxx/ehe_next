export const vendors = [
  {
    id: 1,
    vendorName: "Luminance",
    email: "contact@luminance.com",
    website: "https://www.luminance.com",
    region: ["APAC", "North America"],
    capabilities: [
      "Change Management",
      "Configurable Approval Workflows",
      "AI Built in",
    ],
    organizationalFunction: ["Legal", "Procurement"],
    contractType: ["Buy Side", "Sell Side"],
    licensingModel: ["Annual subscription fee", "Volume-based"],
    integrations: ["Application Integration (API)", "eSignatures"],
  },
  {
    id: 2,
    vendorName: "Brightify",
    email: "info@brightify.com",
    website: "https://www.brightify.com",
    region: ["EMEA", "LatAm"],
    capabilities: [
      "Repository and Integration Capabilities",
      "Custom Reporting and Queries",
    ],
    organizationalFunction: ["Commercial", "Risk/Compliance"],
    contractType: ["Employment", "Distribution"],
    licensingModel: ["Monthly subscription fee", "Perpetual"],
    integrations: [
      "E-mail Client",
      "Financials and Supply Chain Management (FSCM)",
    ],
  },
  {
    id: 3,
    vendorName: "ShineTech",
    email: "support@shinetech.com",
    website: "https://www.shinetech.com",
    region: ["APAC", "EMEA", "North America"],
    capabilities: [
      "Version Comparison Redlining & Negotiation",
      "Obligation Tracking and Upload of Evidence",
    ],
    organizationalFunction: ["Other Dept", "Legal"],
    contractType: ["Sell Side", "Buy Side"],
    licensingModel: ["Annual subscription fee with maintenance", "Perpetual"],
    integrations: ["eSignatures", "Application Integration (API)"],
  },
]

export const stepInputFields = [
  {
    title: "capability",
    description:
      "Which of the following capabilities do you need the software to support?",
    imagePath: "/contracts/images/capabilities.webp",
    inputType: "multiSelect" as const,
    choices: [
      "Change Management",
      "Configurable Approval Workflows",
      "AI Built in",
      "Version Comparison Redlining & Negotiation",
      "Repository and Integration Capabilities",
      "Custom Reporting and Queries",
      "Obligation Tracking and Upload of Evidence",
    ],
  },
  {
    title: "organizational function",
    description:
      "Which of the following functions do you need the software to support?",
    imagePath: "/contracts/images/capabilities.webp",
    inputType: "multiSelect" as const,
    choices: [
      "Commercial",
      "Legal",
      "Other Dept",
      "Procurement",
      "Risk/Compliance",
    ],
  },
  {
    title: "contract type",
    description:
      "Which of the following contract types do you need the software to support?",
    imagePath: "/contracts/images/capabilities.webp",
    inputType: "multiSelect" as const,
    choices: [
      "Buy Side",
      "Distribution",
      "Employment",
      "Other Type",
      "Sell Side",
    ],
  },
  {
    title: "licensing model",
    description:
      "Which of the following integrations do you need the software to support?",
    imagePath: "/contracts/images/capabilities.webp",
    inputType: "multiSelect" as const,
    choices: [
      "Annual subscription fee",
      "Annual subscription fee with maintenance",
      "Monthly subscription fee",
      "Perpetual",
      "Volume-based",
    ],
  },
  {
    title: "integrations",
    description: "Do you require use of the software on specific device(s)?",
    imagePath: "/contracts/images/capabilities.webp",
    inputType: "multiSelect" as const,
    choices: [
      "Application Integration (API)",
      "E-mail Client",
      "eSignatures",
      "Financials and Supply Chain Management (FSCM)",
    ],
  },
  {
    title: "regions",
    description: "Do you require use of the software on specific device(s)?",
    imagePath: "/contracts/images/capabilities.webp",
    inputType: "multiSelect" as const,
    choices: ["APAC", "EMEA", "LatAm", "North America"],
  },
]

// Function to map step number to the correct slice of stepInputFields
export function getInputFieldsForStep(step: number) {
  return stepInputFields.slice(step * 3, (step + 1) * 3)
}
