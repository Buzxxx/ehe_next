/**
 * @path src/components/account/layout/entityPageLayout.tsx
 */

'use client'

import Avataar from "@/components/dashboard/ui/avataar"
import { DataTable } from "@/components/ui/dataTable"
import { Employee, columns } from "../feature/employeeColumn"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export default function EntityPageLayout({ entity }: { entity: string }) {
  const sampleData: Employee[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      status: "active",
      teamId: 1
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "234-567-8901",
      status: "inactive",
      teamId: 2
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "345-678-9012",
      status: "active",
      teamId:3
    },
    {
      id: 4,
      name: "Bob Brown",
      email: "bob@example.com",
      phone: "456-789-0123",
      status: "inactive",
      teamId: 4
    },
    {
      id: 5,
      name: "Charlie Black",
      email: "charlie@example.com",
      phone: "567-890-1234",
      status: "active",
      teamId: 4
    },
  ]

  
  const [selectedTab, setSelectedTab] = useState<"active" | "inactive">(
    "active"
  )

  const filteredData = sampleData.filter(
    (employee) => employee.status === selectedTab
  )

  return (
    <>
      <div className="flex items-center pt-2 pb-3 mb-4 border-b justify-between">
        <div className="flex items-center justify-between gap-2 ">
          <Avataar
            className="border-2 h-12 w-12 aspect-square"
            src="/logo.svg"
          />
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold text-gray-800 leading-6">
              {entity}
            </h2>
            <p className="text-gray-500">Welcome to the admin console.</p>
          </div>
        </div>
      </div>
      <div>
        {/* Tabs Section */}
        <Tabs
          value={selectedTab}
          onValueChange={(value) =>
            setSelectedTab(value as "active" | "inactive")
          }
        >
          <TabsList className="flex gap-2 justify-start bg-gray-100 p-4 py-6 border-b rounded-none rounded-t">
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
        <DataTable columns={columns} data={filteredData} />
      </div>
    </>
  )
}
