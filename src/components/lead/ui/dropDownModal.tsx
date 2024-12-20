/**
 * @path src/components/lead/ui/modal.tsx
 */

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { X } from "lucide-react"
import React from "react"
import { PropsWithChildren } from "react"

interface DialogItemProps extends PropsWithChildren {
  triggerChildren: React.ReactNode
  onSelect?: () => void
  onOpenChange?: (arg0: boolean) => void
  className?: string
}

const DialogItem = React.forwardRef((props: DialogItemProps, forwardedRef) => {
  const {
    triggerChildren,
    children,
    onSelect,
    onOpenChange,
    className,
    ...itemProps
  } = props

  const handleOpenChange = (open: boolean) => {
    if (onOpenChange) {
      onOpenChange(open)
    }
  }

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          {...itemProps}
          ref={forwardedRef as React.LegacyRef<HTMLDivElement>}
          className={`DropdownMenuItem ${className}`}
          onSelect={(event) => {
            event.preventDefault()
            onSelect && onSelect()
          }}
        >
          {triggerChildren}
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="DialogOverlay" />
        <DialogContent className="DialogContent">
          {children}
          <DialogClose asChild>
            <button className="IconButton" aria-label="Close">
              <X />
            </button>
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
})

DialogItem.displayName = "DialogItem"
export default DialogItem
