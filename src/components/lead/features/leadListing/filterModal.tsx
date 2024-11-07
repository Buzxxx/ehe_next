import { SetStateAction, useState } from "react"
import Modal from "@/components/ui/modal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MultiSelectCombobox } from "../../ui/multiSelectCombobox"

const FilterModal = ({
  open,
  onClose,
}: {
  open?: boolean
  onClose: React.Dispatch<SetStateAction<boolean>>
}) => {
  const [selectedNames, setSelectedNames] = useState<string[]>([])

  // Unique list of sample names for selection
  const items = [
    { value: "me", label: "Me" },
    { value: "avinash_jha", label: "Avinash Jha" },
    { value: "gaurav_jha", label: "Gaurav Jha" },
    { value: "john_doe", label: "John Doe" },
    { value: "jane_doe", label: "Jane Doe" },
  ]

  const handleSelectionChange = (selected: string[]) => {
    setSelectedNames(selected)
  }

  return (
    <aside
      className={`absolute top-60 mt-2 p-4 overflow-y-auto min-h-fit border right-4 z-50  md:w-96  bg-white rounded-md transition-all ease-in-out duration-75 ${
        open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 hidden"
      } `}
    >
      <div>
        <h3 className="text-lg font-semibold flex items-center">Filter</h3>
        {/* Side-by-side layout: Tabs on the left */}
        <Tabs
          defaultValue="assigned_to"
          className="flex items-start w-full justify-between gap-4 "
        >
          <div className="w-1/3 h-full ">
            <TabsList className="flex justify-start flex-col w-full h-full bg-transparent">
              <TabsTrigger
                value="assigned_to"
                className="w-full text-sm px-4 data-[state=active]:bg-sky-100/70"
              >
                Assigned To
              </TabsTrigger>
              <TabsTrigger
                value="status"
                className="w-full  data-[state=active]:bg-sky-100/50"
              >
                Status
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="w-2/3 ">
            {/* Content on the right */}
            <TabsContent value="assigned_to">
              <h2 className="text-base font-medium mb-4">Select Assignees</h2>

              {/* Multi-Select Combobox */}
              <MultiSelectCombobox
                items={items}
                onSelectionChange={handleSelectionChange}
              />

              {/* Display Selected Names */}
              <div className="mt-2 w-full ">
                <h3 className="text-sm font-semibold">Selected:</h3>
                <div className="flex flex-wrap gap-2 mt-2 border min-h-20 p-2 w-full rounded-md">
                  {selectedNames.length > 0 && (
                    <>
                      {selectedNames.map((name) => (
                        <Badge key={name} className="h-fit">
                          {name}
                        </Badge>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="status">
              <h2 className="text-lg font-semibold mb-4">Status Settings</h2>
              <p>Change your status preferences here.</p>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </aside>
  )
}

export default FilterModal
