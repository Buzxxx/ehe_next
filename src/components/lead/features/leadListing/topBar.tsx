import React, { Suspense, lazy, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import ChevronDown from "@/components/ui/icons/chevronDown";
import { Badge } from "@/components/ui/badge";
import PaginationComp from "@/components/ui/paginationComp";
import { Filter } from "@/components/ui/icons";
import { handleToggle } from "@/utility/toggle";
import {
  LeadsResponse,
  get_total_leads,
  get_selected_leads_count,
} from "@/components/lead/features/leadObject";

const FilterForm = lazy(() => import("./filterForm"));

interface TopBarProps {
  LeadsResponse: LeadsResponse;
}

const TopBar: React.FC<TopBarProps> = ({ LeadsResponse }) => {
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
  const [modalLoading, setModalLoading] = useState(false);
  const router = useRouter();
  const totalLeads = get_total_leads(LeadsResponse);
  const selectedCount = get_selected_leads_count(LeadsResponse);

  const onToggle = () => {
    handleToggle(filterVisible, setFilterVisible);
  };

  const handleReassign = () => {
    setModalLoading(true);
    try {
      const selectedLeadIds = selectedLeads.join(",");
      router.push(`/lead/leadReassignModal/?leads=${selectedLeadIds}`);
    } catch (error) {
      console.error(error);
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <>
      <div>
        <Menubar className="mt-4 bg-transparent border-0 border-b border-slate-300 flex items-center justify-between rounded-none pb-2 z-50">
          <MenubarMenu>
            <MenubarTrigger className="flex items-center gap-2 border shadow-sm">
              Action <ChevronDown />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Select All</MenubarItem>
              <MenubarItem>Unselect All</MenubarItem>
              <MenubarItem onClick={handleReassign}>Reassign</MenubarItem>
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
            <PaginationComp
              perPage={20}
              totalPages={50}
              className="flex-shrink-0 justify-start"
            />

            <button
              onClick={onToggle}
              className="text-dashboard-primary visible"
            >
              <Filter
                color="grey"
                className={`hover:fill-gray-500 ${
                  filterVisible && "fill-gray-500"
                }`}
              />
            </button>
          </div>

          {filterVisible && (
            <Suspense fallback={<> </>}>
              <FilterForm
                className={`${
                  filterVisible
                    ? "filter-form translate-x-0"
                    : "translate-x-96 2xl:translate-x-[35rem]"
                }`}
              />
            </Suspense>
          )}
        </Menubar>
      </div>
      {modalLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-95 z-50 min-h-screen">
          {/* Loading modal content */}
        </div>
      )}
    </>
  );
};

export default TopBar;
