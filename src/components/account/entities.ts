export interface Entity {
  id: number
  name: string
  description: string
  locations: {
    location: string
    totalEmployees: number
    activeEmployees: number
  }[]
}

export const entities: Entity[] = [
  {
    id: 1,
    name: "Tech Solutions Inc.",
    description: "Specializes in IT solutions and consulting.",
    locations: [
      {
        location: "India",
        totalEmployees: 50,
        activeEmployees: 45,
      },
      {
        location: "USA",
        totalEmployees: 40,
        activeEmployees: 35,
      },
      {
        location: "UK",
        totalEmployees: 30,
        activeEmployees: 20,
      },
    ],
  },
  {
    id: 2,
    name: "Green Landscapes",
    description: "Experts in landscaping and outdoor spaces.",
    locations: [
      {
        location: "Australia",
        totalEmployees: 20,
        activeEmployees: 18,
      },
      {
        location: "Canada",
        totalEmployees: 15,
        activeEmployees: 12,
      },
      {
        location: "Germany",
        totalEmployees: 10,
        activeEmployees: 8,
      },
    ],
  },
  {
    id: 3,
    name: "Spark Innovations",
    description: "Startup incubator and co-working space.",
    locations: [
      {
        location: "India",
        totalEmployees: 25,
        activeEmployees: 22,
      },
      {
        location: "Singapore",
        totalEmployees: 20,
        activeEmployees: 19,
      },
      {
        location: "Sweden",
        totalEmployees: 15,
        activeEmployees: 14,
      },
    ],
  },
]
