// /components/contracts/ui/selectionDisplayBox.tsx

import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import React from "react"

import styles from '@/app/contract/contract.module.css'

interface SelectionDisplayBoxProps {
  selectedItems: string[]
  onRemoveItem: (item: string) => void
}

const SelectionDisplayBox: React.FC<SelectionDisplayBoxProps> = ({
  selectedItems,
  onRemoveItem,
}) => {
  return (
    <div className="border border-slate-300 mt-2 py-2 px-4 min-h-20 overflow-scroll ">
      <div className={`flex gap-2 flex-wrap h-20 `}>
        {selectedItems.length > 0 ? (
          selectedItems.map((item, index) => (
            <Badge
              key={index}
              className={` ${styles.textPrimary} hover:bg-white px-2 py-1 rounded-full text-xs flex items-center justify-between gap-2 h-fit w-fit bg-slate-300/40`}
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
          <div className="w-full h-full flex items-center justify-center">
            <p className={`${styles.textMuted} text-sm`}>No items selected</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SelectionDisplayBox
