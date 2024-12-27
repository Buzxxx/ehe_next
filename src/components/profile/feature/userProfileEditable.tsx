import { Employee } from "@/components/account/feature/employeeColumn"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React, { SetStateAction, useState } from "react"
import { EditIcon, Save } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"

const UserProfileEditable = ({
  employee,
  setEmployee,
}: {
  employee: Employee
  setEmployee: React.Dispatch<SetStateAction<Employee | undefined>>
}) => {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [tempEmployee, setTempEmployee] = useState<Employee>(employee)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTempEmployee((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    toast({
      title: "Profile updated successfully!",
      className: "bg-green-500 text-white",
    })
  }

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setEmployee(tempEmployee)
      handleSave()
    } else {
      // Start editing
      setTempEmployee(employee) // Reset changes if canceled
    }
    setIsEditing(!isEditing)
  }

  return (
    <Card className="shadow-none h-full">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          Personal Details
        </CardTitle>
        <Button
          className="bg-transparent border-0 hover:bg-transparent p-0 h-fit w-fit text-gray-500 hover:text-sky-600"
          onClick={handleEditToggle}
        >
          {isEditing ? <Save /> : <EditIcon />}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <Input
            id="name"
            name="name"
            value={tempEmployee.name}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="Full Name"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            name="email"
            value={tempEmployee.email}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="Email Address"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone
          </label>
          <Input
            id="phone"
            name="phone"
            value={tempEmployee.phone}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="Phone Number"
          />
        </div>
        
      </CardContent>
      <CardFooter className="text-right">
        {isEditing && (
          <Button
            variant="secondary"
            onClick={() => {
              setIsEditing(false)
              setTempEmployee(employee) // Revert changes on cancel
            }}
          >
            Cancel
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default UserProfileEditable
