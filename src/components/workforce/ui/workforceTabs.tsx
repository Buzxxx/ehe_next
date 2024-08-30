"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/dataTable"
import React, { useState, useEffect } from "react"
import { columns, Worker } from "./tableColumns"

const WorkforceTabs = () => {
  const tabList = ["Active", "Inactive"]

  const [activeTab, setActiveTab] = useState(tabList[0]) // Set initial active tab
  const [data, setData] = useState<Worker[]>([])

  // Define data for both tabs
  const activeData = [
    {
      userId: 42,
      name: "Gaurav J",
      mobile: "+91 1234567890",
      email: "user@example.com",
      manager: "Avinash J",
      department: "IT",
    },
    // ...
  ]

  const inActiveData = [
    {
      userId: 43,
      name: "Subrath Nayak",
      mobile: "+91 1234567890",
      email: "user@example.com",
      manager: "Avinash J",
      department: "IT",
    },
  ]

  // Update data when the active tab changes
  useEffect(() => {
    if (activeTab === "Active") {
      setData(activeData)
    } else if (activeTab === "Inactive") {
      setData(inActiveData)
    }
  }, [activeTab])

  return (
    <div>
      <nav className="py-2 md:px-4 mt-8 flex items-center justify-start gap-4 bg-slate-200 w-full max-md:pl-4">
        {tabList.map((item) => (
          <Button
            key={item}
            className={`text-xs px-2 h-8 hover:text-dashboard-primary hover:bg-dashboard-primary hover:text-white ${
              activeTab === item
                ? "bg-dashboard-primary text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveTab(item)}
          >
            {item}
          </Button>
        ))}
      </nav>
      <section>
        <DataTable columns={columns} data={data} />
      </section>
    </div>
  )
}

export default WorkforceTabs
