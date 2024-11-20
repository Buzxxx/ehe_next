/**
 * @path src/components/lead/ui/modal.tsx
 */

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import React from "react"

const Modal = ({
  children,
  title,
  open,
  setOpen,
}: {
  children: React.ReactNode
  title: string
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <Dialog open={open} onOpenChange={() => {setOpen(false)}}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
