/**
 * @path src/components/propertyPage/features/propertyFormModal.tsx
 */

// src/components/ui/ModalUI.tsx
"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ModalUIProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

const ModalUI: React.FC<ModalUIProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md h-fit my-auto">
        <DialogHeader className="mb-4">
          <DialogTitle className="leading-6">{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{children}</DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default ModalUI
