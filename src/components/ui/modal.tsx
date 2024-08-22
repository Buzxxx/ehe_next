// /components/ui/modal.tsx
"use client"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogOverlay } from "./dialog"
interface ModalProps {
  children?: React.ReactNode
  // isOpen: boolean // Control modal visibility with this prop
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const router = useRouter()
  const handleOpenChange = () => {
    router.back()
  }
  return (
    <Dialog open={true} defaultOpen={true} onOpenChange={handleOpenChange}>
      <DialogOverlay>
        <DialogContent>{children}</DialogContent>
      </DialogOverlay>
    </Dialog>
  )
}

export default Modal
