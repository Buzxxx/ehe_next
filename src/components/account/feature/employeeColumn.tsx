/**
 * @path src/components/account/feature/employeeColumn.tsx
 */

import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import Link from "next/link"

export interface Employee {
  id: number
  name: string
  email: string
  phone: string
  status: string
  img?: string
  teamId: number
  role?: string
  date_joined?: string
}

export const columns: ColumnDef<Employee, any>[] = [
  {
    accessorKey: "name", // Key for accessing data from Employee
    header: "Name",
    cell: ({ row }) => {
      const employee = row.original
      return (
        <Link
          href={`/account/${employee.teamId}/employees/${employee.id}`}
          className="flex items-center gap-2 cursor-pointer hover:text-black text-gray-600 transition-colors"
        >
          <Image
            height={20}
            width={20}
            src={employee.img ?? "/base/profile.webp"}
            alt={employee.name}
            className="h-6 w-6 rounded-full object-cover border"
          />
          <p className="font-medium">{employee.name}</p>
        </Link>
      )
    },
  },
  {
    accessorKey: "email", // Email column
    header: "Email",
  },
  {
    accessorKey: "phone", // Phone column
    header: "Phone",
  },
  {
    accessorKey: "status", // Status column
    header: "Status",
    cell: (info: any) => (
      <span
        className={`px-2 py-1 rounded ${
          info.getValue() === "active"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorKey: "actions", // Actions column
    header: "Actions",
 
  },
]
