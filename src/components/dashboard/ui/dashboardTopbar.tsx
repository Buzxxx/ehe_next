// DashboardTopBar.tsx
"use client"

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenu,
} from "@/components/ui/dropdown-menu"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import ChevronDown from "@/components/ui/icons/chevronDown"
import FilterIcon from "@/components/ui/icons/filterIcon"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import FilterForm from "./filterForm"
import { handleToggle } from "@/utils/toggle"

type DashboardTopBarProps = {
  onSelectAll?: () => void
  onUnselectAll?: () => void
  selectedCount?: number
  totalLeads?: number
}

const DashboardTopBar: React.FC<DashboardTopBarProps> = ({
  onSelectAll,
  onUnselectAll,
  selectedCount,
  totalLeads,
}) => {
  const [filterVisible, setFilterVisible] = useState<boolean>(false)

  const onToggle = () => {
    handleToggle(filterVisible, setFilterVisible)
  }

  return (
    <Menubar className="dashboard-top-bar mt-4 overflow-hidden bg-transparent border-0 border-b border-slate-300 flex items-center justify-between rounded-none pb-2 z-50">
      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-2 border shadow-sm">
          Menu <ChevronDown />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Share</MenubarItem>
          <MenubarItem onClick={onSelectAll}>Select All</MenubarItem>
          <MenubarItem onClick={onUnselectAll}>Unselect All</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <div className="flex gap-4 justify-between text-xs items-center">
        {(selectedCount || totalLeads) && (
          <Badge variant={"default"} className="bg-sky-300/90 text-gray-500">
            {selectedCount && selectedCount > 0
              ? `${selectedCount} Selected`
              : `${totalLeads} Leads`}
          </Badge>
        )}

        <button onClick={onToggle} className="text-dashboard-primary">
          <FilterIcon />
        </button>
      </div>

      <FilterForm
        className={`${
          filterVisible
            ? "filter-form md:translate-x-0  "
            : "translate-x-96 2xl:translate-x-[35rem] hidden"
        }`}
      />
    </Menubar>
  )
}

export default DashboardTopBar
