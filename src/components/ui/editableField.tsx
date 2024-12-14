import { useState, useEffect } from "react"
import { useLeadProfile } from "../lead/features/context/leadProfileContext"
import { Lead } from "../lead/features/leadObject"
import { cn } from "@/lib/utils"

interface EditableFieldProps {
  title?: string
  value?: string | number | undefined | null
  span?: number
  fieldKey: keyof Lead
  placeholder?: string
  type?: "text" | "email" | "tel" | "date"
  className?: string
  isEditable?: boolean
}

const EditableField = ({
  title,
  value,
  fieldKey,
  placeholder = "",
  type = "text",
  className,
  span=1,
  isEditable = true,
}: EditableFieldProps) => {
  const { setLeadProfile, isEditing } = useLeadProfile()

  const [isFieldEditing, setIsFieldEditing] = useState(false)
  const [tempValue, setTempValue] = useState(value)

  // Sync internal state with the updated value prop
  useEffect(() => {
    setTempValue(value)
  }, [value])

  const handleSave = () => {
    setLeadProfile((prev) => ({ ...prev, [fieldKey]: tempValue })) // Update specific field
    setIsFieldEditing(false)
  }

  const handleBlur = () => {
    handleSave()
  }

  // Editable field rendering
  return (
    <div
      className={cn(
        `p-2 ${span ? "col-span-" + span : "md:grid-cols-1"} w-fit`,
        className
      )}
      onMouseLeave={handleBlur}
    >
      {title && <p className="text-gray-400 text-sm font-light">{title}</p>}

      {isEditable && isEditing ? (
        <input
          type={type}
          value={tempValue || ""} // Ensure value is never null
          onChange={(e) => setTempValue(e.target.value)}
          className="border-b flex-1 w-full bg-transparent border-gray-300 focus:outline-none"
          onBlur={handleSave}
          placeholder={placeholder}
          autoFocus
        />
      ) : (
        <h4 className="font-medium ">{tempValue}</h4>
      )}
    </div>
  )
}

export default EditableField
