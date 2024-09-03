import { Button } from "@/components/ui/button"
import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  header: string
  children: React.ReactElement
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  header,
  children,
}) => {
  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-md:top-1/3">
        <DialogHeader>{header}</DialogHeader>
        <DialogDescription>{children}</DialogDescription>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" className="border border-gray-500 hover:border-gray-800 text-gray-800 hover:text-gray-950" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-dashboard-primary hover:bg-dashboard-secondary" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
