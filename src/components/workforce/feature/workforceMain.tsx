/**
 * @path src/components/workplace/feature/workplaceMain.tsx
 */

"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { WorkCard } from "../ui/workCard"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const WorkplaceMain = () => {
  // Sample employee data
  const employeeData = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      status: "active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "234-567-8901",
      status: "inactive",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "345-678-9012",
      status: "active",
    },
    {
      id: 4,
      name: "Bob Brown",
      email: "bob@example.com",
      phone: "456-789-0123",
      status: "inactive",
    },
    {
      id: 5,
      name: "Charlie Black",
      email: "charlie@example.com",
      phone: "567-890-1234",
      status: "active",
    },
  ]

  const [selectedTab, setSelectedTab] = useState<"active" | "inactive">(
    "active"
  )

  const filteredData = employeeData.filter(
    (employee) => employee.status === selectedTab
  )

  return (
    <div className="p-4 pt-0 mt-4 px-0 bg-gray-50 min-h-screen rounded-md border">
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

      {/* Table Section */}
      <div className="overflow-x-auto">
        <Table className="min-w-[800px] rounded-md bg-white">
          <TableHeader>
            <TableRow>
              <TableHead className="py-5 min-w-[150px]">
                <div className="flex gap-3 items-center">
                  <Input type="checkbox" className="w-fit h-fit" />
                  Select All
                </div>
              </TableHead>
              <TableHead className="py-5 min-w-[150px]">Role</TableHead>
              <TableHead className="py-5 min-w-[200px]">Email</TableHead>
              <TableHead className="py-5 min-w-[150px]">Phone</TableHead>
              <TableHead className="py-5 min-w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((employee) => (
                <WorkCard
                  key={employee.id}
                  name={employee.name}
                  email={employee.email}
                  phone={employee.phone}
                />
              ))
            ) : (
              <TableRow>
                <td colSpan={5} className="text-center text-gray-500 p-4">
                  No {selectedTab} employees found.
                </td>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default WorkplaceMain
