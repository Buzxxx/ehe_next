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
  title?: string
}

const ShareModalUI: React.FC<ShareModalUIProps> = ({
  isOpen,
  onClose,
  socials,
  showCopyButton = true,
  onCopy,
  title
}) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="min-w-fit">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col md:gap-8 gap-4">
        <div className="flex justify-around mt-4">
          {socials.map((social) => (
            <button
              key={social.name}
              className="rounded-full bg-transparent p-0 w-fit h-fit hover:scale-105 transition-transform"
              onClick={() => window.open(social.url, "_blank")}
            >
              {social.icon}
            </button>
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
      </div>
    </DialogContent>
  </Dialog>
)

export default ShareModalUI
