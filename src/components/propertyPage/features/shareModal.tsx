// ShareModal.tsx

import { useToast } from "@/components/ui/use-toast"
import ShareModalUI from "../ui/shareModalUI"
import {
  InstagramColored,
  FacebookColored,
  FbMessengerColored,
  TwitterColored,
  WhatsappColored,
  TelegramColored,
} from "@/components/ui/icons"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  showCopyButton?: boolean
  title?:string
  platforms?: Array<
    "facebook" | "twitter" | "whatsapp" | "telegram" | "instagram" | "messenger"
  >
}

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  showCopyButton = true,
  title,
  platforms = [
    "facebook",
    "twitter",
    "whatsapp",
    "telegram",
    "instagram",
    "messenger",
  ],
}) => {
  const { toast } = useToast()
  const currentUrl = typeof window === "undefined" ? "" : window.location.href
  // Mapping of social platforms to their URLs and icons
  const platformConfig = {
    facebook: {
      name: "Facebook",
      icon: <FacebookColored />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentUrl
      )}`,
    },
    twitter: {
      name: "Twitter",
      icon: <TwitterColored />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        currentUrl
      )}&text=Check+this+property!`,
    },
    whatsapp: {
      name: "WhatsApp",
      icon: <WhatsappColored />,
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        "Check out this property: " + currentUrl
      )}`,
    },
    telegram: {
      name: "Telegram",
      icon: <TelegramColored />,
      url: `https://telegram.me/share/url?url=${encodeURIComponent(
        currentUrl
      )}&text=Check+this+property!`,
    },
    instagram: {
      name: "Instagram",
      icon: <InstagramColored />,
      url: "https://www.instagram.com/", // Instagram does not have a direct share URL
    },
    messenger: {
      name: "Messenger",
      icon: <FbMessengerColored />,
      url: `https://www.facebook.com/dialog/send?link=${encodeURIComponent(
        currentUrl
      )}&app_id=YOUR_APP_ID&redirect_uri=${encodeURIComponent(currentUrl)}`,
    },
  }

  // Filter the platforms based on props
  const socials = platforms.map((platform) => platformConfig[platform])

  // Copy link handler
  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl)
    toast({
      title: "👍 Link copied to clipboard!",
      className: "!bg-green-600 text-white border-0 outline-none",
    })
  }

  return (
    <ShareModalUI
      isOpen={isOpen}
      onClose={onClose}
      socials={socials}
      showCopyButton={showCopyButton}
      onCopy={handleCopy}
      title={title}
    />
  )
}

export default ShareModal
