import { ColumnDef } from "@tanstack/react-table"
import ActionCell from "./actionCell"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type WorkforceUser = {
  userId: number
  first_name: string
  second_name?: string
  username: string
  last_name:string
  mobile: string
  email: string
  manager: string
  department: string
  status: string
  supervisor:string
}

export const columns: ColumnDef<WorkforceUser>[] = [
  {
    accessorKey: "userId",
    header: "User Id",
  },
  {
    id: "name", // Unique ID for the column
    header: "Name",
    accessorFn: (row) => `${row.first_name} ${row.last_name}`, // Combine first_name and second_name
    cell: ({ getValue }) => getValue(), // Render the combined name
  },
  { accessorKey: "mobile", header: "Mobile" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "manager", header: "Manager" },
  {
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
