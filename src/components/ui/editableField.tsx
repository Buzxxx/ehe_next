import { useRef, useState } from "react"
import { Edit } from "@/components/ui/icons"

interface EditableFieldProps {
  value?: string
  onSave: (newValue: string) => void
  iconSize?: number
  placeholder?: string
  type?: "text" | "email" | "tel"
  textSize: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl"
  fontWeight?: "light" | "medium" | "normal" | "semibold" | "bold"
}

const EditableField = ({
  value,
  textSize,
  onSave,
  iconSize = 16,
  placeholder = "",
  type = "text",
	fontWeight = "normal",
}: EditableFieldProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSave = () => {
    if (inputRef.current) {
      const newValue = inputRef.current.value
      if (newValue !== value) {
        onSave(newValue)
      }
    }
    setIsEditing(false)
  }

  return (
    <div
      className="relative group flex items-center gap-1"
      onMouseLeave={handleSave}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type={type}
          defaultValue={value}
          className="border-b border-gray-300 focus:outline-none text-sm"
          onBlur={handleSave}
          autoFocus
          placeholder={placeholder}
        />
      ) : (
        <p
          className={` cursor-pointer text-${textSize} font-${fontWeight}`}
          onMouseEnter={() => setIsEditing(false)}
        >
          {value || placeholder}
          <Edit
            size={iconSize}
            className="hidden group-hover:inline-block ml-2 text-gray-500 cursor-pointer"
            onClick={() => setIsEditing(true)}
          />
        </p>
      )}
    </div>
  )
}

export default EditableField
