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

import { Button } from "@/components/ui/button"
import { GreenDot } from "@/components/ui/icons"
import { Edit } from "@/components/ui/icons"

// New component to handle the actions cell
const ActionCell = ({ userId }: { userId: number }) => {
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
          onClick={() => console.log(userId)}
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
      <button onClick={() => console.log(userId)}>
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

export default ActionCell
