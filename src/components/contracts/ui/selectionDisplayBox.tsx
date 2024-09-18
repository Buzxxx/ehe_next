// /components/contracts/ui/selectionDisplayBox.tsx

import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import React from "react"

interface SelectionDisplayBoxProps {
  selectedItems: string[]
  onRemoveItem: (item: string) => void
}

const SelectionDisplayBox: React.FC<SelectionDisplayBoxProps> = ({
  selectedItems,
  onRemoveItem,
}) => {
  return (
    <div className="border border-t-0 border-slate-200 p-4 min-h-32 overflow-scroll">
      <h3 className="font-semibold text-sm mb-2">Selected Items:</h3>
      <div className="flex gap-2 flex-wrap">
        {selectedItems.length > 0 ? (
          selectedItems.map((item, index) => (
            <Badge
              key={index}
              className="border border-slate-300 bg-white text-primary hover:bg-white px-2 py-1 rounded-full text-xs flex items-center justify-between gap-2"
            >
              {item}
              <button
                type="button"
                onClick={() => onRemoveItem(item)}
                className=" "
              >
                <X className="h-4 w-4" />
              </button>
            </Badge>
          ))
        ) : (
          <p>No items selected.</p>
        )}
      </div>
    </div>
  )
}

export default SelectionDisplayBox
