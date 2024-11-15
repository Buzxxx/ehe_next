"use client";

import { Suspense, lazy, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import ChevronDown from "@/components/ui/icons/chevronDown";
import { Filter } from "@/components/ui/icons";
import { Badge } from "@/components/ui/badge";
import { handleToggle } from "@/utility/toggle";
import PaginationComp from "@/components/ui/paginationComp";
import { Dashboard } from "../feature/dashboard";
import FilterModal from "@/components/lead/features/leadListing/filterModal";

type DashboardTopBarProps = {
  onSelectAll?: () => void;
  onUnselectAll?: () => void;
  onReassign?: () => void;
  selectedCount?: number;
  totalLeads?: number;
  page?: "lead" | "workplace" | "workforce" | "dashboard" | "task";
};

const DashboardTopBar: React.FC<DashboardTopBarProps> = ({
  onSelectAll,
  onUnselectAll,
  onReassign,
  selectedCount = 0,
  totalLeads = 0,
  page = "lead",
}) => {
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const router = useRouter();

  const onToggle = () => {
    handleToggle(filterVisible, setFilterVisible);
  };

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const menuItems = Dashboard.getMenuItems(
    navigateTo,
    page,
    onSelectAll,
    onUnselectAll,
    onReassign,
    selectedCount
  );

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

        {page === "lead" && (
          <>
            <PaginationComp
              perPage={20}
              totalPages={50}
              className="flex-shrink-0 justify-start "
            />

            <button
              onClick={onToggle}
              className="text-sky-600 visible"
            >
              <Filter
                color="grey"
                className={`hover:fill-gray-500 ${
                  filterVisible && "fill-gray-500"
                }`}
              />
            </button>
          </>
        )}
      </div>

      {page === "lead" && filterVisible && (
        <Suspense fallback={<> </>}>
          <FilterModal
            className={`${
              filterVisible
                ? "filter-form translate-x-0"
                : "translate-x-96 2xl:translate-x-[35rem]"
            }`}
          />
        </Suspense>
      )}
    </Menubar>
  );
};

export default DashboardTopBar;
