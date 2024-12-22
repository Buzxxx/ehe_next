/**
 * @path src/components/account/feature/entityPageTopBar.tsx
 */

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BetweenHorizontalEnd, List, Search, X } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import AddSubUserForm from "./addSubUserForm"
import { Employee } from "./employeeColumn"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ChevronDown from "@/components/ui/icons/chevronDown"

interface EntityPageTopBarProps {
  viewMode: "card" | "row"
  setViewMode: React.Dispatch<React.SetStateAction<"card" | "row">>
  selectedTab: "active" | "inactive"
  setSelectedTab: React.Dispatch<React.SetStateAction<"active" | "inactive">>
  onAddEmployee: (newEmployee: Employee) => void
}

const EntityPageTopBar = ({
  viewMode,
  setViewMode,
  selectedTab,
  setSelectedTab,
  onAddEmployee,
}: EntityPageTopBarProps) => {
  const [searchModalVisible, setSearchModalVisible] = useState(false)
  const [showSubUserForm, setShowSubUserForm] = useState(false)

  const handleAddEmployee = (newEmployee: Employee) => {
    onAddEmployee(newEmployee)
    setShowSubUserForm(false)
  }

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-t-lg md:p-3 p-2 z-40 flex items-center justify-between">
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger className="md:hidden mr-2">
            <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="md:hidden">
            <DialogTrigger>
              <DropdownMenuItem>Add Sub-user</DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent className="md:max-w-[40%] max-w-[95%] max-h-[80%] m-auto overflow-auto p-0 rounded-md">
          <AddSubUserForm onAddEmployee={handleAddEmployee} />
        </DialogContent>
      </Dialog>

      <div className="flex justify-between w-full items-center md:w-1/2">
        <Tabs
          value={selectedTab}
          onValueChange={(value) =>
            setSelectedTab(value as "active" | "inactive")
          }
        >
          <TabsList className="">
            <TabsTrigger
              value="active"
              className={`px-4 py-2 rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:bg-gray-200`}
            >
              Active
            </TabsTrigger>
            <TabsTrigger
              value="inactive"
              className={`px-4 py-2 rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:bg-gray-200`}
            >
              Inactive
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative md:hidden ml-auto">
          <button
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg shadow-sm text-gray-700 hover:bg-gray-200 transition"
            onClick={() => setSearchModalVisible(true)}
          >
            <Search size={20} color="gray" />
          </button>
        </div>

        {/* Desktop Search Input */}
        <div className="relative hidden md:block flex-1">
          <Input placeholder="Search" />
          <Search
            color="gray"
            size={16}
            className="absolute top-1/2 right-4 -translate-y-1/2"
          />
        </div>
      </div>

      <div className="items-center  hidden md:flex gap-2">
        <Button
          className="bg-sky-600 hover:bg-sky-700"
          onClick={() => setShowSubUserForm(true)}
        >
          Add Sub-user
        </Button>
        <div className="bg-gray-200 rounded-full p-1 shadow-inner flex items-center ">
          <Button
            className={`rounded-full p-2 py-1 h-fit w-fit transition ${
              viewMode === "card"
                ? "bg-sky-600 text-white shadow-md hover:bg-sky-600"
                : "bg-gray-300 text-gray-500 hover:text-gray-200 hover:bg-sky-400"
            }`}
            onClick={() => setViewMode("card")}
          >
            <BetweenHorizontalEnd size={20} />
          </Button>
          <Button
            className={`rounded-full p-2 py-1 h-fit w-fit transition ${
              viewMode === "row"
                ? "bg-sky-600 text-white shadow-md hover:bg-sky-600"
                : "bg-gray-300 text-gray-500 hover:text-gray-200 hover:bg-sky-400"
            }`}
            onClick={() => setViewMode("row")}
          >
            <List size={20} />
          </Button>
        </div>
      </div>

      {/* Full-Page Search Modal */}
      {searchModalVisible && (
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
      )}

      <Dialog open={showSubUserForm} onOpenChange={setShowSubUserForm}>
        <DialogTitle className="hidden"></DialogTitle>
        <DialogContent className="max-w-[40%]  max-h-[80%] m-auto overflow-auto hidden md:block">
          <AddSubUserForm onAddEmployee={handleAddEmployee} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EntityPageTopBar
