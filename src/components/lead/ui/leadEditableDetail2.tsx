import { LeadProfileForm, useLeadProfile } from "@/components/lead/context/leadProfileContext"
import { Edit } from "@/components/ui/icons"
import { useState } from "react"

const LeadEditableDetail2 = ({
  title,
  value,
  fieldKey,
  span,
  isEditMode = false,
}: {
  title: string
  value: string
  fieldKey: keyof LeadProfileForm // Key to update in the context
  span?: number
  isEditMode?: boolean
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState(value)
  const { setLeadProfile } = useLeadProfile()

  const handleSave = () => {
    setLeadProfile((prev) => ({ ...prev, [fieldKey]: tempValue })) // Update specific field
    setIsEditing(false)
  }

  return (
    <div
      className={`md:grid-cols-1 p-2 group relative w-fit ${
        span && "col-span-" + span
      }`}
    >
      <p className="text-gray-400 text-sm font-light">{title}</p>
      {isEditMode && isEditing ? (
        <input
          type="text"
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          className="border-b border-gray-300 focus:outline-none text-base font-medium w-full"
          onBlur={handleSave}
        />
      ) : (
        <h4 className="font-medium text-base">{tempValue}</h4>
      )}
      {isEditMode && (
        <button
          className="absolute top-2 left-full opacity-0 group-hover:opacity-100 duration-200"
          onClick={() => setIsEditing(true)} // Set edit mode on button click
        >
          <Edit size={16} strokeWidth={1.5} className="text-gray-500" />
        </button>
      )}
    </div>
  )
}

export default LeadEditableDetail2
