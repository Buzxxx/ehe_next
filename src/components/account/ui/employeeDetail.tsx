import { SetStateAction, useEffect, useState } from "react"
import { Employee } from "../feature/employeeColumn"

const EmployeeDetail = ({
  title,
  value,
  span,
  isEditable,
  employee,
  setEmployee,
  type = "text",
  placeholder,
  isEditing,
}: {
  title: string
  value: string
  span?: number
  isEditable?: boolean
  employee?: Employee
  setEmployee: React.Dispatch<SetStateAction<Employee | undefined>>
  type?: string
  placeholder?: string
  isEditing: boolean
}) => {
  const [tempValue, setTempValue] = useState(value)
  const [isFieldEditing, setIsFieldEditing] = useState(false)

  // Sync internal state with the updated value prop
  useEffect(() => {
    setTempValue(value)
  }, [value])

  const handleSave = () => {
    if (tempValue !== value) {
      setEmployee(
        (prev) =>
          ({
            ...prev,
            [title]: tempValue,
          } as Employee | undefined)
      )
    }
    setIsFieldEditing(false)
  }

  const handleEdit = () => {
    setIsFieldEditing(true)
  }

  const handleBlur = () => {
    handleSave()
  }

  return (
    <div
      className={`p-2 ${span ? "col-span-" + span : "md:grid-cols-1"}`}
      onMouseEnter={handleEdit}
      onMouseLeave={handleBlur}
    >
      <p className="text-gray-400 text-sm font-light">{title}</p>
      {isEditing ? (
        <input
          type={type}
          value={tempValue || ""} // Ensure value is never null
          onChange={(e) => setTempValue(e.target.value)}
          className="border-b flex-1 w-fit border-gray-300 focus:outline-none"
          placeholder={placeholder}
          autoFocus
        />
      ) : (
        <h4 className="font-medium text-base">{tempValue}</h4>
      )}
    </div>
  )
}

export default EmployeeDetail
