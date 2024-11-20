import React, { useState, useEffect, useRef } from "react"
import { Edit } from "@/components/ui/icons"

const LeadDetail = ({
  title,
  value,
  span,
  className,
  isEditMode,
  onSave,
  type = "text",
  options = [], // Added options prop for dropdown
}: {
  title: string
  value: string | React.ReactNode
  span?: number
  className?: string
  isEditMode: boolean
  onSave: (newValue: string) => void
  type?: "text" | "email" | "tel" | "select" | "date"
  options?: string[] // Options for dropdown type
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState(value as string)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      if (isEditing) {
        onSave(tempValue) // Save the new value when clicked outside
        setIsEditing(false)
      }
    }
  }

  useEffect(() => {
    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isEditing])

  return (
    <div
      ref={containerRef}
      className={`group md:grid-cols-1 md:p-4 p-2 bg-gradient-to-r from-gray-100/85 to-gray-200/50 rounded-2xl relative ${
        span && "col-span-" + span
      } ${className}`}
    >
      <p className="text-gray-600 md:text-sm text-xs font-normal mb-1">
        {title}
      </p>
      {isEditing ? (
        type === "select" ? (
          <select
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className=" focus:outline-none text-sm w-full bg-transparent focus:bg-white "
          >
            {options.map((option) => (
              <option key={option} value={option} className="bg-transparent focus-visible:bg-transparent">
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className=" focus:outline-none text-sm w-full focus-within:bg-transparent focus-visible:bg-transparent bg-transparentd"
          />
        )
      ) : (
        <div className="font-medium md:text-sm text-xs">
          {typeof value === "string" ? value : <>{value}</>}
        </div>
      )}
      {isEditMode && (
        <button
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={() => setIsEditing(true)}
        >
          <Edit size={16} strokeWidth={1.5} />
        </button>
      )}
    </div>
  )
}

export default LeadDetail
