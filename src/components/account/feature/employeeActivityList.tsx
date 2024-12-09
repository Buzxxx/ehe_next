import EmployeeActivityItem from "../ui/employeeActivityItem"
import { Copy, Filter } from "@/components/ui/icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const EmployeeActivityList = () => {
  return (
    <Card className="mt-4">
      <CardHeader className="border-b justify-between flex-row items-center">
        <CardTitle className="text-lg font-semibold">
          Employee Activity
        </CardTitle>
        <div className="flex gap-2 items-center">
          <Button className="bg-transparent text-gray-700 hover:text-gray-800 border border-gray-400">
            <Filter /> Filters
          </Button>
          <Button className="bg-sky-600 hover:bg-sky-700 text-white">
            Enter Time
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ul>
          <EmployeeActivityItem
            title="Checkout"
            icon={<Copy size={20} />}
            description="Checkout on 12 August 2024"
            date="12:30 AM"
          />
          <EmployeeActivityItem
            title="Checkout"
            icon={<Copy size={20} />}
            description="Checkout on 12 August 2024"
            date="12:30 AM"
          />
          <EmployeeActivityItem
            title="Checkout"
            icon={<Copy size={20} />}
            description="Checkout on 12 August 2024"
            date="12:30 AM"
          />
        </ul>
      </CardContent>
    </Card>
  )
}

export default EmployeeActivityList
