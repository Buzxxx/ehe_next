"use client"

import { Button } from "@/components/ui/button"
import { GreenDot } from "@/components/ui/icons"
import { ColumnDef } from "@tanstack/react-table"
import { Edit } from "@/components/ui/icons"
import React, { useEffect, useState } from "react"
import { MoreHorizontal } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Worker = {
  userId: number
  name: string
  mobile: string
  email: string
  manager: string
  department: string
}

// New component to handle the actions cell
const ActionCell: React.FC<{ worker: Worker }> = ({ worker }) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return isMobile ? (
    // Render this content for mobile screens
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          className="flex gap-2"
          onClick={() => console.log(worker.userId)}
        >
          <Edit size={16} color="grey" /> Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-2">
          <GreenDot height={16} width={16} /> Online
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button className="bg-dashboard-primary hover:bg-dashboard-secondary h-fit">
            + Alias
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    // Render this content for non-mobile screens
    <div className="flex gap-2">
      <button onClick={() => console.log(worker.userId)}>
        <Edit size={16} color="grey" />
      </button>
      <button>
        <GreenDot height={16} width={16} />
      </button>
      <Button className="bg-dashboard-primary hover:bg-dashboard-secondary h-fit">
        + Alias
      </Button>
    </div>
  )
}

export const columns: ColumnDef<Worker>[] = [
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
    cell: ({ row }) => <ActionCell worker={row.original} />,
  },
]
