/**
 * @path src/components/propertyPage/ui/shareModal.tsx
 */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Copy,
  InstagramColored,
  FacebookColored,
  FbMessengerColored,
  TwitterColored,
  WhatsappColored,
  TelegramColored,
} from "@/components/ui/icons"
import { useToast } from "@/components/ui/use-toast"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast()

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "👍 Link copied to clipboard!",
      className: "!bg-green-600 text-white border-0 outline-none",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-fit">
        <DialogHeader>
          <DialogTitle>Share this property</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col md:gap-8 gap-4 ">
          <div className="flex justify-around mt-4">
            <Button className="rounded-full bg-transparent p-2">
              <InstagramColored />
            </Button>
            <Button className="rounded-full bg-transparent p-2">
              <FacebookColored />
            </Button>
            <Button className="rounded-full bg-transparent p-2">
              <FbMessengerColored />
            </Button>
            <Button className="rounded-full bg-transparent p-2">
              <TwitterColored />
            </Button>
            <Button className="rounded-full bg-transparent p-2">
              <WhatsappColored />
            </Button>
            <Button className="rounded-full bg-transparent p-2">
              <TelegramColored />
            </Button>
          </div>
          <Button
            className="flex items-center gap-2 w-1/2 mx-auto hover:bg-slate-950"
            onClick={handleCopy}
          >
            <Copy />
            Copy Link
          </Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default ShareModal
