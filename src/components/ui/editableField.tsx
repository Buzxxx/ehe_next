import { useState } from "react"
import { useLeadProfile } from "../lead/context/leadProfileContext"
import { Lead } from "../lead/features/leadObject"

interface EditableFieldProps {
  title?: string
  value?: string | undefined
  fieldKey: keyof Lead
  placeholder?: string
  type?: "text" | "email" | "tel"
  textSize: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl"
  fontWeight?: "light" | "medium" | "normal" | "semibold" | "bold"
  textAlign?: "left" | "center" | "right"
}

const EditableField = ({
  title,
  value,
  fieldKey,
  textSize,
  placeholder = "",
  type = "text",
  fontWeight = "normal",
  textAlign = "left",
}: EditableFieldProps) => {
  const { leadProfile, setLeadProfile, isEditing } = useLeadProfile()

  const [isFieldEditing, setIsFieldEditing] = useState(false)
  const [tempValue, setTempValue] = useState(value)

  const handleSave = () => {
    setLeadProfile((prev) => ({ ...prev, [fieldKey]: tempValue })) // Update specific field
    setIsFieldEditing(false)
  }

  return (
    <div
      className="relative group flex items-center gap-2"
      onMouseEnter={() => setIsFieldEditing(true)}
      onBlur={handleSave}
      autoFocus
    >
      {title && (
        <p className="text-gray-600 text-sm font-light flex-1">{title}</p>
      )}

      {isEditing && isFieldEditing ? (
        <input
          type={type}
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          className={`border-b border-gray-300 focus:outline-none text-${
            textSize ?? "sm"
          } font-${fontWeight ?? "normal"} text-${textAlign} `}
          onBlur={handleSave}
          placeholder={placeholder}
          autoFocus
        />
      ) : (
        <p className={` cursor-pointer text-${textSize} font-${fontWeight}`}>
          {tempValue || placeholder}
        </p>
      )}
    </div>
  )
}

export default EditableField
