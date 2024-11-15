/**
 * @path src/components/propertyPage/ui/shareModalUI.tsx
 */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Copy } from "@/components/ui/icons"

interface ShareModalUIProps {
  isOpen: boolean
  onClose: () => void
  socials: { name: string; icon: JSX.Element; url: string }[]
  showCopyButton?: boolean
  onCopy?: () => void
}

const ShareModalUI: React.FC<ShareModalUIProps> = ({
  isOpen,
  onClose,
  socials,
  showCopyButton = true,
  onCopy,
}) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="min-w-fit">
      <DialogHeader>
        <DialogTitle>Share this property</DialogTitle>
      </DialogHeader>
      <DialogDescription className="flex flex-col md:gap-8 gap-4">
        <div className="flex justify-around mt-4">
          {socials.map((social) => (
            <Button
              key={social.name}
              className="rounded-full bg-transparent p-0 w-fit h-fit hover:scale-105 transition-transform"
              onClick={() => window.open(social.url, "_blank")}
            >
              {social.icon}
            </Button>
          ))}
        </div>
        {showCopyButton && (
          <Button
            className="flex items-center gap-2 w-1/2 mx-auto bg-green-500 hover:bg-green-600"
            onClick={onCopy}
          >
            <Copy />
            Copy Link
          </Button>
        )}
      </DialogDescription>
    </DialogContent>
  </Dialog>
)

export default ShareModalUI
