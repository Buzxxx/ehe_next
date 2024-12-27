import EmployeeActivityItem from "../ui/employeeActivityItem"
import { Copy, Filter } from "@/components/ui/icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import React from "react"

const EmployeeActivityList = () => {
  return (
    <Card className="md:w-1/3 h-full shadow-none">
      <CardHeader className="border-b justify-between flex-row items-center">
        <CardTitle className="text-lg font-semibold">
          Employee Activity
        </CardTitle>
        <div className="flex gap-2 items-center">
          <Button className="bg-transparent text-gray-700 hover:text-gray-600 hover:bg-transparent h-fit p-0">
            <Filter size={16} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ul>
          <EmployeeActivityItem
            title="Checkout"
            icon={<Copy size={16} />}
            description="Checkout on 12 August 2024"
            date="12:30 AM"
          />
          <EmployeeActivityItem
            title="Checkout"
            icon={<Copy size={16} />}
            description="Checkout on 12 August 2024"
            date="12:30 AM"
          />
          <EmployeeActivityItem
            title="Checkout"
            icon={<Copy size={16} />}
            description="Checkout on 12 August 2024"
            date="12:30 AM"
          />
        </ul>
      </CardContent>
    </Card>
  )
}

export default React.memo(EmployeeActivityList)
