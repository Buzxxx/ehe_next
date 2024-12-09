import EmployeeDetail from "../ui/employeeDetail"
import { Copy } from "@/components/ui/icons"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Employee } from "./employeeColumn"
import { SetStateAction } from "react"

const EmployeeDetails = ({
  isEditing,
  setIsEditing,
}: {
  isEditing: boolean
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <Card className="p-4 rounded-md border mt-4 bg-white shadow-sm">
      <CardHeader className="py-4 border-b flex-row justify-between">
        <div className="flex gap-2 items-center">
          <h4 className="text-xl font-medium">Work Details</h4>
          <Badge
            variant="secondary"
            className="text-xs bg-green-600 font-normal text-gray-100"
          >
            Active
          </Badge>
        </div>
        <h6 className="font-semibold">
          EMP <span className="text-sky-600 ">020040</span>{" "}
          <button className="ml-2">
            <Copy color="gray" size={16} />
          </button>
        </h6>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-4 mt-4">
        <EmployeeDetail title="Company" value="EHE Industries" />
        <EmployeeDetail title="Date Joined" value="12 August 2024" />
        <EmployeeDetail title="Team" value="Software" />
        <EmployeeDetail title="Phone Number" value="+91 9012344567" />
        <EmployeeDetail span={2} title="Country" value="India" />
        <EmployeeDetail title="Email" value="example@ehe.com" />
        <EmployeeDetail
          span={2}
          title="Address"
          value="004 Gurugram, Harayana, India"
        />
      </CardContent>
    </Card>
  )
}

export default EmployeeDetails
