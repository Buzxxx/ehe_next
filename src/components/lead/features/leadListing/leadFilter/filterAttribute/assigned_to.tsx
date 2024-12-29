import React from "react";
import { useEffect, useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { MultiSelectCombobox } from "@/components/lead/ui/multiSelectCombobox";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "next/navigation";
import { get_all_active_employee_list_controller } from "@/components/lead/features/userObject";
import { get_default_filterBy_obj } from "@/components/lead/features/filterObject";

const searchParams = useSearchParams();

const AssignedTo = ({
  selectedValues,
  setSelectedValues,
  handleMultiSelectChange,
}: {
  selectedValues: { assigned_to: string[] };
  setSelectedValues: React.Dispatch<
    React.SetStateAction<{ assigned_to: string[] }>
  >;
  handleMultiSelectChange: (filterName: string, selected: string[]) => void;
}) => {
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
  useEffect(() => {
    async function fetchData() {
      const [userListResponse] = await Promise.all([
        !users || users.length === 0
          ? get_all_active_employee_list_controller()
          : Promise.resolve(null),
      ]);

      if (userListResponse) {
        setUsers(userListResponse.statusList);
      }
    }
    fetchData();
    const params = new URLSearchParams(window.location.search);
    setSelectedValues(() => get_default_filterBy_obj(params)); // Set default filter values based on URL params
  }, [searchParams]);
  return (
    <div>
      <TabsContent value="assigned_to">
        <h2 className="text-base font-medium mb-1">Select Assignees</h2>
        <MultiSelectCombobox
          items={users.map((user) => ({
            value: user.id,
            label: user.name,
          }))}
          selectedValues={selectedValues.assigned_to} // Pass selectedValues directly as number[]
          onSelectionChange={(selected) =>
            handleMultiSelectChange("assigned_to", selected)
          }
        />
        <div className="mt-2 w-full ">
          <h3 className="text-sm font-semibold">Selected:</h3>
          <div className="flex flex-wrap gap-2 mt-2 border min-h-20 p-2 w-full rounded-md">
            {selectedValues.assigned_to?.length > 0 &&
              selectedValues.assigned_to.map((value) => (
                <Badge
                  key={value}
                  className="h-fit bg-sky-600/80 hover:bg-sky-600"
                >
                  {users.find((user) => user.id === value)?.name}
                </Badge>
              ))}
          </div>
        </div>
      </TabsContent>
    </div>
  );
};

export default AssignedTo;
