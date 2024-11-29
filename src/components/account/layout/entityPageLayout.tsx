/**
 * @path src/components/account/layout/entityPageLayout.tsx
 */

import Avataar from "@/components/dashboard/ui/avataar"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/dataTable"
import { Plus } from "lucide-react"
import { Employee, columns } from "../feature/employeeColumn"

export default function EntityPageLayout({entity} : {entity:string}) {
 const sampleData: Employee[] = [
   {
     id: 1,
     name: "Gaurav",
     status: "active", // Ensure this matches "active" | "inactive"
     email: "example@gmail.com",
     phone: "1234567890",
   },
   {
     id: 2,
     name: "Avinash",
     status: "active",
     email: "example@gmail.com",
     phone: "1234567890",
   },
   {
     id: 3,
     name: "John",
     status: "inactive",
     email: "example@gmail.com",
     phone: "1234567890",
   },
   {
     id: 4,
     name: "Jack",
     status: "inactive",
     email: "example@gmail.com",
     phone: "1234567890",
   },
 ]

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
        <DataTable columns={columns} data={sampleData} />
      </div>
    </>
  )
}
