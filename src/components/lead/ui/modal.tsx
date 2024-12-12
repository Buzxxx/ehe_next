/**
 * @path src/components/lead/ui/modal.tsx
 */

import { Button } from "@/components/ui/button"
import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  header?: string
  children: React.ReactElement
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  header,
  children,
}) => {
  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-md:top-1/3">
      <DialogTitle>{header ?? ''}</DialogTitle>
        <DialogHeader>{header}</DialogHeader>
        <DialogDescription >  </DialogDescription>
        <div>{children}</div>
    
      </DialogContent>
    </Dialog>
  )
}

export default Modal
