import { ColumnDef } from "@tanstack/react-table"
import ActionCell from "./actionCell"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type WorkforceUser = {
  userId: number
  name: string
  mobile: string
  email: string
  manager: string
  department: string
  status: string
}

export const columns: ColumnDef<WorkforceUser>[] = [
  {
    id: "userId",
    accessorKey: "userId",
    header: "User Id",
  },
  { id: "name", accessorKey: "name", header: "Name" },
  { id: "mobile", accessorKey: "mobile", header: "Mobile" },
  { id: "email", accessorKey: "email", header: "Email" },
  { id: "manager", accessorKey: "manager", header: "Manager" },
  {
    id: "department",
    accessorKey: "department",
    header: "Department",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const worker = row.original
      // return <ActionCell workerStatus={worker.status} userId={worker.userId} />
    },
  },
]
