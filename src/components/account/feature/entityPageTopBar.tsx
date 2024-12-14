import { Button } from "@/components/ui/button"
import { BetweenHorizontalEnd, List, Search, X } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

interface EntityPageTopBarProps {
  viewMode: "card" | "row"
  setViewMode: React.Dispatch<React.SetStateAction<"card" | "row">>
  selectedTab: "active" | "inactive"
  setSelectedTab: React.Dispatch<React.SetStateAction<"active" | "inactive">>
}

const EntityPageTopBar = ({
  viewMode,
  setViewMode,
  selectedTab,
  setSelectedTab,
}: EntityPageTopBarProps) => {
  const [searchModalVisible, setSearchModalVisible] = useState(false)
  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-t-lg md:p-3 p-2 z-40 flex items-center justify-between">
      <div className="flex justify-between w-fit items-center">
        <Tabs
          value={selectedTab}
          onValueChange={(value) =>
            setSelectedTab(value as "active" | "inactive")
          }
        >
          <TabsList>
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

      <div className="items-center bg-gray-200 rounded-full p-1 shadow-inner hidden md:flex">
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
    </div>
  )
}

export default EntityPageTopBar
