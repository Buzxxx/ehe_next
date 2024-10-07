export const vendors = [
  {
    id: "1",
    vendorName: "Basware",
    logo: "/contracts/images/basware.svg",
    email: "contact@luminance.com",
    website: "https://www.luminance.com",
    description:
      "Track spending on assets within your purchase-to-pay process. Costs and warranty information are collected in your e-procurement system. Helps you conduct life cycle value comparisons, track which assets are on warranties and service contracts, properly depreciate fixed assets and get the most useful life from your equipment",
    vendorLocation: "Mumbai",
    vendorServices: "12 Services",
    vendorMatchPercentage: 90,
    isVerified: true,
    regions: [1, 4],
    capabilities: [1, 2, 3],
    organizationalFunctions: [2, 4],
    contractTypes: [1, 5],
    licensingModels: [1, 5],
    integrations: [1, 3],
  },
  {
    id: "2",
    vendorName: "Bravo Solution Now Jagger",
    logo: "/contracts/images/Jaggaer-Logo-Red.svg",
    description:
      " JAGGAER Contracts enables you to manage every phase of contract development from initiation through approval and execution. In JAGGAER ONE it is a complete end-to-end solution that provides full authoring and automated review and approval workflows to reduce risk and increase compliance.",
    vendorLocation: "Delhi",
    email: "info@brightify.com",
    website: "https://www.brightify.com",
    vendorServices: "15 Services",
    vendorMatchPercentage: 75,
    isVerified: false,
    regions: [2, 3],
    capabilities: [5, 6],
    organizationalFunctions: [1, 5],
    contractTypes: [3, 2],
    licensingModels: [3, 4],
    integrations: [2, 4],
  },
  {
    id: "3",
    vendorName: "Cobblestone Systems",
    logo: "/contracts/images/hub.webp",
    email: "support@shinetech.com",
    website: "https://www.shinetech.com",
    description:
      "Cobblestone's flagship product is Contract Insight Enterprise. Based on the summary of our clients’ feedback, Contract Insight Enterprise is a “great solution to an organization’s needs.",
    vendorLocation: "Bangalore",
    vendorServices: "10 Services",
    vendorMatchPercentage: 21,
    isVerified: true,
    regions: [1, 2, 4],
    capabilities: [4, 7],
    organizationalFunctions: [3, 2],
    contractTypes: [5, 1],
    licensingModels: [2, 4],
    integrations: [3, 1],
  },
]

export const regions = [
  { id: 1, name: "APAC" },
  { id: 2, name: "EMEA" },
  { id: 3, name: "LatAm" },
  { id: 4, name: "North America" },
]

export const capabilities = [
  { id: 1, name: "Change Management" },
  { id: 2, name: "Configurable Approval Workflows" },
  { id: 3, name: "AI Built in" },
  { id: 4, name: "Version Comparison Redlining & Negotiation" },
  { id: 5, name: "Repository and Integration Capabilities" },
  { id: 6, name: "Custom Reporting and Queries" },
  { id: 7, name: "Obligation Tracking and Upload of Evidence" },
]

export const organizationalFunctions = [
  { id: 1, name: "Commercial" },
  { id: 2, name: "Legal" },
  { id: 3, name: "Other Dept" },
  { id: 4, name: "Procurement" },
  { id: 5, name: "Risk/Compliance" },
]

export const contractTypes = [
  { id: 1, name: "Buy Side" },
  { id: 2, name: "Distribution" },
  { id: 3, name: "Employment" },
  { id: 4, name: "Other Type" },
  { id: 5, name: "Sell Side" },
]
export const licensingModels = [
  { id: 1, name: "Annual subscription fee" },
  { id: 2, name: "Annual subscription fee with maintenance" },
  { id: 3, name: "Monthly subscription fee" },
  { id: 4, name: "Perpetual" },
  { id: 5, name: "Volume-based" },
]
export const integrations = [
  { id: 1, name: "Application Integration (API)" },
  { id: 2, name: "E-mail Client" },
  { id: 3, name: "eSignatures" },
  { id: 4, name: "Financials and Supply Chain Management (FSCM)" },
]
