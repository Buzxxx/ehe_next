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
import { Copy, EditIcon, Save } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { useToast } from "@/components/ui/use-toast"

const UserWorkDetailsEditable = ({
  employee,
  setEmployee,
}: {
  employee: Employee
  setEmployee: React.Dispatch<SetStateAction<Employee | undefined>>
}) => {
  const { toast } = useToast()
  const [openRolePopover, setOpenRolePopover] = useState(false)
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [tempEmployee, setTempEmployee] = useState<Employee>(employee)

  const roles = [
    { value: "developer", label: "Developer" },
    { value: "manager", label: "Manager" },
    { value: "designer", label: "Designer" },
    { value: "analyst", label: "Analyst" },
  ]
  const teamOptions = [
    { id: 1, name: "Team Alpha" },
    { id: 2, name: "Team Beta" },
    { id: 3, name: "Team Gamma" },
  ]

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
      // Reset changes if canceled
      setTempEmployee(employee)
    }
    setIsEditing(!isEditing)
  }

  return (
    <Card className="shadow-none h-full">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg font-semibold">Work Details</CardTitle>
        <div className="flex gap-4 items-center justify-between">
          <h6 className="font-semibold">
            EMP <span className="text-sky-600 ">020040</span>{" "}
            <button className="ml-2">
              <Copy color="gray" size={16} />
            </button>
          </h6>
          <Button
            className="bg-transparent border-0 hover:bg-transparent p-0 h-fit w-fit text-gray-500 hover:text-sky-600"
            onClick={handleEditToggle}
          >
            {isEditing ? <Save /> : <EditIcon />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="status" className="text-sm font-medium">
            Status
          </label>
          <Input
            id="status"
            name="status"
            value={tempEmployee.status}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="Employee Status (e.g., Active)"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="teamId" className="text-sm font-medium">
            Team ID
          </label>
          <Select
            disabled={!isEditing}
            onValueChange={(value) =>
              setTempEmployee((prev) => ({ ...prev, teamId: Number(value) }))
            }
            value={String(tempEmployee.teamId)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Team" />
            </SelectTrigger>
            <SelectContent>
              {teamOptions.map((team) => (
                <SelectItem key={team.id} value={String(team.id)}>
                  {team.id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="role" className="text-sm font-medium">
            Role
          </label>
          <Popover open={openRolePopover} onOpenChange={setOpenRolePopover}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start"
                disabled={!isEditing}
              >
                {tempEmployee.role
                  ? roles.find((r) => r.value === tempEmployee.role)?.label ||
                    "Select Role"
                  : "+ Select Role"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" side="bottom" align="start">
              <Command>
                <CommandInput placeholder="Search roles..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {roles.map((role) => (
                      <CommandItem
                        key={role.value}
                        value={role.value}
                        onSelect={(value) => {
                          setTempEmployee((prev) => ({ ...prev, role: value }))
                          setOpenRolePopover(false)
                        }}
                      >
                        {role.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="date_joined" className="text-sm font-medium">
            Date Joined
          </label>
          <Popover open={openDatePicker} onOpenChange={setOpenDatePicker}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start"
                disabled={!isEditing}
              >
                {tempEmployee.date_joined
                  ? format(new Date(tempEmployee.date_joined), "MMMM dd, yyyy")
                  : "+ Select Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" side="bottom" className="p-0">
              <Calendar
                mode="single"
                selected={
                  tempEmployee.date_joined
                    ? new Date(tempEmployee.date_joined)
                    : undefined
                }
                onSelect={(date) =>
                  setTempEmployee((prev) => ({
                    ...prev,
                    date_joined: date ? date.toISOString().split("T")[0] : "",
                  }))
                }
              />
            </PopoverContent>
          </Popover>
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

export default UserWorkDetailsEditable
