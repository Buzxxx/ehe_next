"use client"

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
}

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const employee = row.original
      return (
        <Link href={`/account/${employee.teamId}/employees/${employee.id}`} className="flex items-center gap-2 cursor-pointer hover:text-black text-gray-600 transition-colors">
          <Image
            height={20}
            width={20}
            src={employee.img ?? "/base/profile.webp"}
            alt={employee.name}
            className="h-6 w-6 rounded-full object-cover border"
          />
          <p className="font-medium ">{employee.name}</p>
        </Link>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]
