import ForgotPasswordLayout from "@/components/authentication/layouts/forgotPasswordLayouts/forgotPassword"
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog"

const ResetPasswordModal = ({
  open,
  handleOpenClose,
}: {
  open: boolean
  handleOpenClose: () => void
}) => {
  return (
    <Dialog open={open} onOpenChange={handleOpenClose}>
      <DialogContent className="rounded-none sm:rounded-none *:border-0 border-none *:border-none w-fit">
        <ForgotPasswordLayout />
      </DialogContent>
    </Dialog>
  )
}

export default ResetPasswordModal
