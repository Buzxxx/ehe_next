/**
 * @path src/components/account/feature/deactivateUserModal.tsx
 */


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface DeactivateUserModalProps {
  employee: { id: number; name: string }
  onConfirm: () => void
  onClose: () => void
}

export default function DeactivateUserModal({
  employee,
  onConfirm,
  onClose,
}: DeactivateUserModalProps) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deactivate User</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to deactivate {employee.name}?</p>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
