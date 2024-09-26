/**
 * @path src/components/ui/modal.tsx
 */

"use client"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogOverlay } from "./dialog"
interface ModalProps {
  children?: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const router = useRouter()
  const handleOpenChange = () => {
    router.back()
  }
  return (
    <Dialog open={true} defaultOpen={true} onOpenChange={handleOpenChange} >
      <DialogOverlay className="">
        <DialogContent className="max-w-6xl overflow-scroll h-full">{children}</DialogContent>
      </DialogOverlay>
    </Dialog>
  )
}

export default Modal
