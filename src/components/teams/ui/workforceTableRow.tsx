// @/components/ui/workforceTableRow.tsx

import { TableCell, TableRow } from "@/components/ui/table"
import React, { useState, useEffect, useRef } from "react"
import { Pencil, Trash2 } from "@/components/ui/icons"
import { Alias } from "../feature/workforce"
import { Input } from "@/components/ui/input"

interface WorkforceTableRowProps {
  alias: Alias
  onDelete: (alias: Alias) => void // Add onDelete prop
  onUpdate: (updatedAlias: Alias) => void // Add onUpdate prop
}

const WorkforceTableRow: React.FC<WorkforceTableRowProps> = ({
  alias,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [showBorder, setShowBorder] = useState(false)
  const [username, setUsername] = useState(alias.username)
  const inputRef = useRef<HTMLInputElement | null>(null)

  // Handle click outside to save and close input
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsEditing(false)
        if (username !== alias.username) {
          onUpdate({ ...alias, username }) // Update alias name if it has changed
        }
      }
    }

    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isEditing, alias, username, onUpdate])

  // useEffect(() => {
  //   if (isEditing) {
  //     setShowBorder(true) // Show border when editing starts
  //     const timer = setTimeout(() => setShowBorder(false), 500) // Hide border after 1 second

  //     return () => clearTimeout(timer) // Cleanup timeout on unmount or re-run
  //   }
  // }, [isEditing])

  const handleEditClick = (aliasType: string) => {
    if (aliasType === "Default") {
      setIsEditing(!isEditing)
    } else {
      onDelete(alias) // Call the onDelete function
    }
  }

  return (
    <TableRow>
      <TableCell>{alias.type}</TableCell>
      <TableCell className="relative">
        {isEditing ? (
          <Input
            ref={inputRef}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`absolute top-1/2 -translate-y-1/2 left-1 h-fit w-fit bg-opacity-75 bg-slate-100 ${
              isEditing ? "border border-slate-300" : ""
            }`}
          />
        ) : (
          alias.username
        )}
      </TableCell>
      <TableCell>{alias.created}</TableCell>
      <TableCell className="text-right">
        <button onClick={() => handleEditClick(alias.type)}>
          {alias.type !== "Default" ? (
            <Trash2
              color="grey"
              size={16}
              className="hover:stroke-destructive"
            />
          ) : (
            <Pencil
              color="grey"
              size={16}
              className="hover:stroke-sky-600"
            />
          )}
        </button>
      </TableCell>
    </TableRow>
  )
}

export default WorkforceTableRow
