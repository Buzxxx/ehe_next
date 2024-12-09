import { Employee } from "@/components/account/feature/employeeColumn"

export const employeeData: Employee[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    status: "active" as const,
    teamId: 1,
    role: "Software Developer",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "234-567-8901",
    status: "inactive" as const,
    teamId: 1,
    role: "Software Developer",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "345-678-9012",
    status: "active" as const,
    teamId: 1,
    role: "Software Developer",
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "bob@example.com",
    phone: "456-789-0123",
    status: "inactive" as const,
    teamId: 1,
    role: "Software Developer",
  },
  {
    id: 5,
    name: "Charlie Black",
    email: "charlie@example.com",
    phone: "567-890-1234",
    status: "active" as const,
    teamId: 1,
    role: "Software Developer",
  },
]
