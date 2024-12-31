import { SetStateAction, useState, Suspense, lazy } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import ChevronDown from "@/components/ui/icons/chevronDown";
import { Badge } from "@/components/ui/badge";
import PaginationComp from "@/components/lead/features/leadListing/paginationComp";
import {
  Filter,
  List,
  BetweenHorizontalEnd,
  Search,
  X,
} from "@/components/ui/icons";
import {
  LeadsResponse,
  get_total_leads,
  get_selected_leads_count,
  toggle_lead_list_view,
} from "@/components/lead/features/leadObject";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";

// Dynamically import the FilterModal component
const FilterModal = dynamic(() => import("./leadFilter/filterModal"));

interface TopBarProps {
  LeadsResponse: LeadsResponse;
  viewMode: "grid" | "list"; // View mode prop
  setViewMode: React.Dispatch<React.SetStateAction<"grid" | "list">>; // Setter for view mode
  setShowReassignModal: React.Dispatch<SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
  setShowFavourites: React.Dispatch<SetStateAction<boolean>>
  showFavourites: boolean
}

const TopBar: React.FC<TopBarProps> = ({
  LeadsResponse,
  viewMode,
  setViewMode,
  setShowReassignModal,
  setIsLoading,
  setShowFavourites,
  showFavourites
}) => {
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false)
  const totalLeads = get_total_leads(LeadsResponse);
  const selectedCount = get_selected_leads_count(LeadsResponse);

  const handleReassign = () => {
    setShowReassignModal(() => true);
  };

  const handleToggleViewMode = () => {
    setViewMode(toggle_lead_list_view(viewMode));
  };

  return (
    <div className="topbar-wrapper overflow-x-clip w-full mt-1 md:mt-0 ">
      <div className="relative bg-white border border-slate-200 shadow-sm rounded-lg md:p-3 p-2 z-40 flex items-center justify-between w-full">
        <div className="flex items-center justify-between gap-2">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className="flex items-center gap-2 px-3 py-1.5 bg-transparent rounded-lg shadow-sm text-gray-700 hover:bg-gray-100 transition">
                Actions <ChevronDown />
              </MenubarTrigger>
              <MenubarContent className="mt-2 rounded-lg shadow-lg border border-slate-200 bg-white">
                <MenubarItem onClick={() => alert("Select All")}>
                  Select All
                </MenubarItem>
                <MenubarItem onClick={() => alert("Unselect All")}>
                  Unselect All
                </MenubarItem>
                <MenubarItem onClick={handleReassign}>Reassign</MenubarItem>

                {showFavourites ? (<MenubarItem onClick={() => setShowFavourites(false)}>  Fetch All</MenubarItem>) : <MenubarItem onClick={() => setShowFavourites(true)}>
                  Fetch Favorites
                </MenubarItem>}

              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          {/* Mobile Search Button */}
          <div className="relative md:hidden">
            <button
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg shadow-sm text-gray-700 hover:bg-gray-200 transition"
              onClick={() => setSearchModalVisible(true)}
            >
              <Search size={20} color="gray" />
            </button>
          </div>
          {/* Desktop Search Input */}
          <div className="relative hidden md:block">
            <Input placeholder="Search" />
            <Search
              color="gray"
              className="absolute top-1/2 right-4 -translate-y-1/2"
            />
          </div>
        </div>

        <div className="flex items-center md:gap-4 gap-2 ml-2">
          <div className="items-center bg-gray-200 rounded-full p-1 shadow-inner hidden md:flex">
            <Button
              className={`rounded-full p-2 py-1 h-fit w-fit transition ${viewMode === "grid"
                ? "bg-sky-600 text-white shadow-md hover:bg-sky-600"
                : "bg-gray-300 text-gray-500 hover:text-gray-200 hover:bg-sky-400"
                }`}
              onClick={handleToggleViewMode}
            >
              <BetweenHorizontalEnd size={20} />
            </Button>
            <Button
              className={`rounded-full p-2 py-1 h-fit w-fit transition ${viewMode === "list"
                ? "bg-sky-600 text-white shadow-md hover:bg-sky-600"
                : "bg-gray-300 text-gray-500 hover:text-gray-200 hover:bg-sky-400"
                }`}
              onClick={handleToggleViewMode}
            >
              <List size={20} />
            </Button>
          </div>

          {(selectedCount > 0 || totalLeads > 0) && (
            <Badge
              variant={"default"}
              className="bg-sky-100 text-sky-700 rounded-lg px-3 py-1 md:text-sm hidden md:flex"
            >
              {selectedCount > 0
                ? `${selectedCount} Selected`
                : `${totalLeads} Leads`}
            </Badge>
          )}

          <PaginationComp
            perPage={20}
            totalPages={50}
            className="flex-shrink-0 fixed bottom-4 right-4"
            setIsLoading={setIsLoading}
          />

          <button
            onClick={() => setFilterVisible((prev) => !prev)}
            className={`flex items-center gap-1 md:mr-4 rounded-lg shadow-sm transition bg-none bg-transparent h-fit w-fit `}
          >
            <Filter
              color="grey"
              className={`${filterVisible ? "fill-gray-500" : "fill-gray-100"}`}
            />
          </button>
        </div>
        <FilterModal
          className={
            filterVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }
        />

      </div>
      {/* Full-Page Search Modal */}
      {
        searchModalVisible && (
          <div className="fixed inset-0 z-50 bg-white flex flex-col p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Search</h3>
              <button
                onClick={() => setSearchModalVisible(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <X />
              </button>
            </div>
            <Input placeholder="Type to search..." autoFocus />
          </div>
        )
      }
    </div >
  );
};

export default TopBar;
