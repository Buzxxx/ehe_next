import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ChevronDown from "@/components/ui/icons/chevronDown";
import FilterIcon from "@/components/ui/icons/filterIcon";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import FilterForm from "./filterForm";

const DashboardTopBar = () => {
  const [filterVisible, setFilterVisible] = useState(false);

  const openCloseFilter = () => {
    setFilterVisible(!filterVisible);
  };

  return (
    <div className="dashboard-top-bar mt-4">
      <div className="flex justify-between items-center py-1 pb-050 border-b border-slate-300">
        <form action="/lead/share" method="GET" className="dropdown">
          <DropdownMenu>
            <DropdownMenuTrigger className="border border-muted-500 flex text-sm gap-2 rounded-md items-center px-2 py-1 outline-none">
              Menu
              <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="relative">
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem>Select All</DropdownMenuItem>
              <DropdownMenuItem>Unselect All</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </form>
        <div className="flex gap-4 justify-between text-xs">
          <Badge variant={"default"} className="">
            0 Leads
          </Badge>
          <Badge variant={"default"} className="">
            New
          </Badge>
          <Badge variant={"default"} className="">
            Self
          </Badge>

          <button onClick={openCloseFilter}>
            <FilterIcon />
          </button>
        </div>
      </div>

      <FilterForm className={`${filterVisible ? "filter-form translate-x-0 " : "translate-x-96"}`} />
    </div>
  );
};

export default DashboardTopBar;
