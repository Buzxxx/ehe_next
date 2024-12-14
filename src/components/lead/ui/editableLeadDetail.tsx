import { SetStateAction, useEffect, useState } from "react"
import { Lead } from "../features/leadObject"

const EditableLeadDetail = ({
  title,
  value,
  span,
  isEditable,

  type = "text",
  placeholder,
  isEditing,
}: {
  title: string
  value: string
  span?: number
  isEditable?: boolean

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

  const handleEdit = () => {
    setIsFieldEditing(true)
  }

  return (
    <div
      className={`p-2 ${span ? "col-span-" + span : "md:grid-cols-1"}`}
      onMouseEnter={handleEdit}
    >
      <p className="text-gray-400 text-sm font-light">{title}</p>
      {isEditable && isEditing ? (
        <input
          type={type}
          value={tempValue || ""} // Ensure value is never null
          onChange={(e) => setTempValue(e.target.value)}
          className="border-b flex-1 w-full bg-transparent border-gray-300 focus:outline-none"
          placeholder={placeholder}
          autoFocus
        />
      ) : (
        <h4 className="font-medium text-base">{tempValue}</h4>
      )}
    </div>
  )
}

export default EditableLeadDetail
