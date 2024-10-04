const vendors = [
  {
    id: "1",
    vendorName: "Basware",
    email: "contact@luminance.com",
    website: "https://www.luminance.com",
    regions: [1, 4],
    capabilities: [1, 2, 3],
    organizationalFunction: [2, 4],
    contractType: [1, 5],
    licensingModel: [1, 5],
    integrations: [1, 3],
  },
  {
    id: "2",
    vendorName: "Bravo Solution Now Jagger",
    email: "info@brightify.com",
    website: "https://www.brightify.com",
    regions: [2, 3],
    capabilities: [5, 6],
    organizationalFunction: [1, 5],
    contractType: [3, 2],
    licensingModel: [3, 4],
    integrations: [2, 4],
  },
  {
    id: "3",
    vendorName: "Cobblestone Systems",
    email: "support@shinetech.com",
    website: "https://www.shinetech.com",
    regions: [1, 2, 4],
    capabilities: [4, 7],
    organizationalFunction: [3, 2],
    contractType: [5, 1],
    licensingModel: [2, 4],
    integrations: [3, 1],
  },
]

const regions = [
  { id: 1, name: "APAC" },
  { id: 2, name: "EMEA" },
  { id: 3, name: "LatAm" },
  { id: 4, name: "North America" },
]

const capabilities = [
  { id: 1, name: "Change Management" },
  { id: 2, name: "Configurable Approval Workflows" },
  { id: 3, name: "AI Built in" },
  { id: 4, name: "Version Comparison Redlining & Negotiation" },
  { id: 5, name: "Repository and Integration Capabilities" },
  { id: 6, name: "Custom Reporting and Queries" },
  { id: 7, name: "Obligation Tracking and Upload of Evidence" },
]

const organizationalFunction = [
  { id: 1, name: "Commercial" },
  { id: 2, name: "Legal" },
  { id: 3, name: "Other Dept" },
  { id: 4, name: "Procurement" },
  { id: 5, name: "Risk/Compliance" },
]

const contractType = [
  { id: 1, name: "Buy Side" },
  { id: 2, name: "Distribution" },
  { id: 3, name: "Employment" },
  { id: 4, name: "Other Type" },
  { id: 5, name: "Sell Side" },
]
const licensingModel = [
  { id: 1, name: "Annual subscription fee" },
  { id: 2, name: "Annual subscription fee with maintenance" },
  { id: 3, name: "Monthly subscription fee" },
  { id: 4, name: "Perpetual" },
  { id: 5, name: "Volume-based" },
]
const integrations = [
  { id: 1, name: "Application Integration (API)" },
  { id: 2, name: "E-mail Client" },
  { id: 3, name: "eSignatures" },
  { id: 4, name: "Financials and Supply Chain Management (FSCM)" },
]
