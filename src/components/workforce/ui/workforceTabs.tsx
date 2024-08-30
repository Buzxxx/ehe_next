"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/dataTable"
import React, { useState, useEffect } from "react"
import { columns, Worker } from "./tableColumns"

const WorkforceTabs = () => {
  const tabList = ["Active", "Inactive"]

  const [activeTab, setActiveTab] = useState(tabList[0]) // Set initial active tab
  const [data, setData] = useState<Worker[]>([])

  const workerDataSet = [
    {
      userId: 42,
      name: "Gaurav J",
      mobile: "+91 1234567890",
      email: "user@example.com",
      manager: "Avinash J",
      department: "IT",
      status: "active",
    },
    {
      userId: 43,
      name: "Subrath Nayak",
      mobile: "+91 1234567890",
      email: "user@example.com",
      manager: "Avinash J",
      department: "IT",
      status: "inactive",
    },
  ]

  // Define data for both tabs
  const activeData = workerDataSet.filter((worker) => worker.status == "active")

  const inActiveData = workerDataSet.filter(
    (worker) => worker.status == "inactive"
  )

  // Update data when the active tab changes
  useEffect(() => {
    if (activeTab === "Active") {
      setData(activeData)
    } else if (activeTab === "Inactive") {
      setData(inActiveData)
    }
  }, [activeTab])

  // Handle status change
  const handleStatusChange = (userId: number, newStatus: string) => {
    setData((prevData) =>
      prevData.map((worker) =>
        worker.userId === userId ? { ...worker, status: newStatus } : worker
      )
    )
  }

  return (
    <div>
      <nav className="py-0 flex items-center justify-start bg-gray-200 w-full max-md:pl-4 rounded-t-md">
        {tabList.map((item) => (
          <Button
            key={item}
            className={`rounded-none text-xs px-2 h-8 hover:text-dashboard-primary hover:bg-dashboard-primary hover:text-white py-5 rounded-t-md ${
              activeTab === item
                ? "bg-charcoal-foreground text-dashboard-primary border border-b-0 border-gray-300"
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
