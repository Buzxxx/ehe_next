"use client"

import { useRouter } from "next/navigation"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import ChevronDown from "@/components/ui/icons/chevronDown"
import { Badge } from "@/components/ui/badge"
import { handleToggle } from "@/utility/toggle"
import { Dashboard } from "../feature/dashboard"

type DashboardTopBarProps = {
  onSelectAll?: () => void
  onUnselectAll?: () => void
  onReassign?: () => void
  selectedCount?: number
  totalLeads?: number
  page?: "lead" | "workplace" | "workforce" | "dashboard" | "task"
}

const DashboardTopBar: React.FC<DashboardTopBarProps> = ({
  onSelectAll,
  onUnselectAll,
  onReassign,
  selectedCount = 0,
  totalLeads = 0,
  page = "lead",
}) => {
  const router = useRouter()

  const navigateTo = (path: string) => {
    router.push(path)
  }

  const menuItems = Dashboard.getMenuItems(
    navigateTo,
    page,
    onSelectAll,
    onUnselectAll,
    onReassign,
    selectedCount
  )

  return (
    <Menubar className=" mt-4 bg-transparent border-0 border-b border-slate-300 flex items-center justify-between rounded-none pb-2 z-50 ">
      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-2 border shadow-sm">
          Menu <ChevronDown />
        </MenubarTrigger>
        <MenubarContent>
          {menuItems.map((item, index) => (
            <MenubarItem key={index} onClick={item.onClick}>
              {item.label}
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>

      <div className="flex gap-4 justify-between text-xs items-center">
        {(selectedCount > 0 || totalLeads > 0) && (
          <Badge
            variant={"default"}
            className="bg-sky-300/90 text-gray-500 whitespace-nowrap"
          >
            {selectedCount > 0
              ? `${selectedCount} Selected`
              : `${totalLeads} Leads`}
          </Badge>
        )}
      </div>
    </Menubar>
  )
}

export default DashboardTopBar
