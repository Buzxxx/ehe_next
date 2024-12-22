import React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ChevronDown from "@/components/ui/icons/chevronDown"
import { Badge } from "@/components/ui/badge"

const RoleDropdown = React.memo(
  ({
    role,
    onRoleChange,
  }: {
    role: string
    onRoleChange: (role: string) => void
  }) => (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Badge
          variant="outline"
          className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center justify-center gap-2 w-full min-w-24 font-medium text-right "
        >
          {role}
          <ChevronDown />
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {["Admin", "User", "Sub-User"].map((r) => (
          <DropdownMenuItem
            key={r}
            className={`text-sm ${
              role === r ? "text-blue-600" : "text-gray-600"
            }`}
            onClick={() => onRoleChange(r)}
          >
            {r}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
)

RoleDropdown.displayName = "RoleDropdown"

export default RoleDropdown
