import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/tailwindClassnameMergeLib";
import FilterAttributes from "./filterAttribute";
import { get_default_filterBy_obj } from "@/components/lead/features/filterObject";
import { get_all_active_employee_list_controller } from "@/components/lead/features/userObject";
import { get_lead_status_controller } from "@/components/lead/features/statusObject";
import { get_priority_list } from "@/components/lead/features/leadObject";
import { useSearchParams } from "next/navigation";

const FilterModal = ({ className }: { className: string }) => {
  const [filterBy, setFilterBy] = useState({});
  const searchParams = useSearchParams();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const filterByObj = get_default_filterBy_obj(params);
    setFilterBy(filterByObj);
  }, [searchParams]);

  return (
    <aside
      className={cn(
        "absolute top-16 mt-2 p-4 pt-1 overflow-y-auto min-h-96 border right-0 z-40 md:w-96 bg-white rounded-md transition-all ease-in-out duration-100 shadow-lg",
        className
      )}
    >
      <div>
        <h3 className="text-lg font-semibold flex items-center mb-0 border-b py-2">
          Filters
        </h3>
        <Tabs
          defaultValue="assigned_to"
          className="flex items-start w-full justify-between gap-8 "
        >
          <TabsList className="flex flex-col pr-4 justify-start w-1/3 h-full border-r bg-transparent min-h-96 pl-0 py-2">
            <TabsTrigger
              value="assigned_to"
              className="w-fit mr-auto text-sm data-[state=active]:bg-sky-100/70 justify-start"
            >
              Assigned To
            </TabsTrigger>
            <TabsTrigger
              value="status"
              className="w-fit mr-auto text-sm data-[state=active]:bg-sky-100/50 justify-start"
            >
              Status
            </TabsTrigger>
            <TabsTrigger
              value="priority"
              className="w-fit mr-auto text-sm data-[state=active]:bg-sky-100/50 justify-start"
            >
              Priority
            </TabsTrigger>
          </TabsList>

          <div className="w-2/3 ">
            <TabsContent value="assigned_to">
              <FilterAttributes
                label="Select Assignees"
                filterBy={filterBy}
                filterKey="assigned_to"
                fetchData={get_all_active_employee_list_controller}
                itemLabelField="name"
                itemValueField="id"
              ></FilterAttributes>
            </TabsContent>

            <TabsContent value="status">
              {" "}
              <FilterAttributes
                label="Select Status"
                filterBy={filterBy}
                filterKey="status"
                fetchData={get_lead_status_controller}
                itemLabelField="status"
                itemValueField="id"
              ></FilterAttributes>
            </TabsContent>
            <TabsContent value="priority">
              <FilterAttributes
                label="Select Priority"
                filterBy={filterBy}
                filterKey="priority"
                fetchData={get_priority_list}
                itemLabelField="value"
                itemValueField="id"
              ></FilterAttributes>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </aside>
  );
};

export default FilterModal;
