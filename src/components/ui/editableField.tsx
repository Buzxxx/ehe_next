import { useState, useEffect } from "react";
import { useLeadProfile } from "../lead/features/context/leadProfileContext";
import { Lead } from "../lead/features/leadObject";
import { cn } from "@/lib/utils";

interface EditableFieldProps {
  title?: string;
  value?: string | number | undefined | null;
  fieldKey: keyof Lead;
  placeholder?: string;
  type?: "text" | "email" | "tel";
  textSize: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
  fontWeight?: "light" | "medium" | "normal" | "semibold" | "bold";
  textAlign?: "left" | "center" | "right";
  className?: string;
  isEditable?: boolean; // Add an `isEditable` prop to toggle editability
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
  className,
  isEditable = true, // Default to editable
}: EditableFieldProps) => {
  const { setLeadProfile, isEditing } = useLeadProfile();

  const [isFieldEditing, setIsFieldEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  // Sync internal state with the updated value prop
  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleSave = () => {
    setLeadProfile((prev) => ({ ...prev, [fieldKey]: tempValue })); // Update specific field
    setIsFieldEditing(false);
  };

  // Non-editable field rendering
  if (!isEditable) {
    return (
      <div className={cn("relative flex items-center gap-2", className)}>
        {title && (
          <p className="text-gray-600 text-sm font-light flex-1">{title}</p>
        )}
        <p className={`text-${textSize} font-${fontWeight} text-${textAlign}`}>
          {tempValue || placeholder}
        </p>
      </div>
    );
  }

  // Editable field rendering
  return (
    <div
      className={cn("relative group flex items-center gap-4", className)}
      onMouseEnter={() => setIsFieldEditing(true)}
      onBlur={handleSave}
      autoFocus
    >
      {title && <p className="text-gray-600 text-sm font-light ">{title}</p>}

      {isEditing && isFieldEditing ? (
        <input
          type={type}
          value={tempValue || ""} // Ensure value is never null
          onChange={(e) => setTempValue(e.target.value)}
          className={`border-b flex-1 w-fit border-gray-300 focus:outline-none text-${
            textSize ?? "sm"
          } font-${fontWeight ?? "normal"} text-${textAlign}`}
          onBlur={handleSave}
          placeholder={placeholder}
          autoFocus
        />
      ) : (
        <p
          className={`cursor-pointer flex-1  text-${textSize} border-b border-transparent font-${fontWeight} text-${textAlign}`}
        >
          {tempValue || placeholder}
        </p>
      )}
    </div>
  )
};

export default EditableField;
