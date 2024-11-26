import { Button } from "@/components/ui/button"
import BackIcon from "@/components/ui/icons/back"
import { useRouter } from "next/navigation"
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  BriefCase,
  Share2,
  Edit,
  Chat,
  WhatsAppOutline,
} from "@/components/ui/icons"
import EditableField from "@/components/ui/editableField"
import Avataar from "@/components/dashboard/ui/avataar"
import { useEffect, useState } from "react"
import { useLeadProfile } from "../context/leadProfileContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CheckCircle, MailIcon } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import dynamic from "next/dynamic"
const ShareModal = dynamic(
  () => import("@/components/propertyPage/features/shareModal")
)

const LeadPageHeader = ({
  id,
  navItems,
  activeTab,
  setActiveTab,
}: {
  id: number
  navItems: { name: string; component: React.ReactNode }[]
  activeTab: number
  setActiveTab: React.Dispatch<React.SetStateAction<number>>
}) => {
  const { leadProfile, setLeadProfile, isEditing, setIsEditing } =
    useLeadProfile()
  const router = useRouter()
  const { toast } = useToast()
  const [isSaved, setIsSaved] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false) // State for share modal

  const toggleShareModal = () => {
    setIsShareModalOpen(!isShareModalOpen)
  }

  // Initialize isSaved state based on localStorage
  useEffect(() => {
    const savedLeads = JSON.parse(localStorage.getItem("savedLeads") || "[]")
    setIsSaved(savedLeads.some((lead: any) => lead.id === id))
  }, [id])

  const [localLeadProfile, setLocalLeadProfile] = useState(leadProfile)

  // Save the lead to localStorage
  // Handle toggle save/unsave
  const handleSaveToggle = () => {
    const savedLeads = JSON.parse(localStorage.getItem("savedLeads") || "[]")

    if (isSaved) {
      // Unsave the lead
      const updatedLeads = savedLeads.filter((lead: any) => lead.id !== id)
      localStorage.setItem("savedLeads", JSON.stringify(updatedLeads))
      setIsSaved(false)
      toast({
        variant: "default",
        title: "Lead Unsaved",
      })
    } else {
      // Save the lead
      const updatedLeads = [...savedLeads, { ...leadProfile, id }]
      localStorage.setItem("savedLeads", JSON.stringify(updatedLeads))
      setIsSaved(true)
      toast({
        title: "Lead Unsaved",
        className: "bg-green-400 text-white ",
      })
    }
  }
  // Save changes and disable editing
  const handleSave = () => {
    setLeadProfile(localLeadProfile) // Commit changes to global state
    setIsEditing(false) // Exit editing mode
  }

  // Cancel editing and revert changes
  const handleCancel = () => {
    setLocalLeadProfile(leadProfile) // Revert to original values
    setIsEditing(false) // Exit editing mode
  }

  // Function to handle navigation
  const handleNavigation = (direction: "prev" | "next") => {
    const newId = direction === "prev" ? id - 1 : id + 1
    if (newId > 0) {
      router.push(`/lead/${newId}`)
    }
  }

  return (
    <section className="p-2 md:p-4 md:pt-2 md:pb-0 pb-0 bg-gray-50 shadow-sm rounded-lg">
      <header className="flex justify-between items-center mt-10 md:mb-1 md:mt-0">
        <div className="flex items-center gap-2">
          <BackIcon
            onClick={() => router.back()}
            className="p-1 cursor-pointer hover:bg-gray-200 rounded-full h-fit py-0"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="p-1 bg-transparent text-gray-600 hover:bg-gray-200 rounded-md h-fit"
            onClick={() => handleNavigation("prev")}
          >
            <ChevronLeft size={20} />
          </Button>
          <Button
            className="p-1 bg-transparent text-gray-600 hover:bg-gray-200 rounded-md h-fit"
            onClick={() => handleNavigation("next")}
          >
            <ChevronRight size={20} />
          </Button>
          <Button
            className="p-1 bg-transparent text-blue-600 hover:bg-blue-100 rounded-md h-fit"
            onClick={toggleShareModal}
          >
            <Share2 size={20} />
          </Button>
          <Button
            onClick={handleSaveToggle}
            className={`p-1 rounded-md h-fit  ${
              isSaved
                ? "bg-green-100 text-green-600 hover:bg-green-50"
                : "bg-transparent text-yellow-600 hover:bg-yellow-100"
            }`}
          >
            {isSaved ? <CheckCircle size={20} /> : <Bookmark size={20} />}
          </Button>
        </div>
      </header>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex items-start gap-3 ml-2">
          <Avataar
            src={leadProfile.img ?? "/base/profile.webp"}
            className="h-20 w-20 rounded-full border border-sky-800 p-1"
          />
          <div className="flex flex-col 1">
            <EditableField
              value={leadProfile.name}
              fieldKey="name"
              textSize="xl"
              fontWeight="semibold"
            />
            <div>
              <div className="flex gap-1 items-center text-gray-500 text-sm">
                <Mail size={16} />
                <EditableField
                  value={leadProfile.email || "Email not provided"}
                  fieldKey="email"
                  textSize="sm"
                />
              </div>
              <div className="flex gap-1 items-center text-gray-500 text-sm">
                <Phone size={16} />
                <EditableField
                  value={leadProfile.contact}
                  fieldKey="contact"
                  textSize="sm"
                />
                <span className="text-gray-300 h-4 overflow-hidden my-auto px-1">
                  |
                </span>
                <BriefCase size={16} />
                <p>{leadProfile.priority}</p>
              </div>
            </div>
          </div>
        </div>

        {activeTab === 1 ? (
          <div className="hidden md:flex items-center gap-2 ">
            {isEditing ? (
              <>
                <Button
                  onClick={handleSave}
                  className="h-fit bg-transparent border text-sky-600 hover:text-sky-700 py-1 border-sky-600 hover:border-sky-700 hover:bg-transparent"
                >
                  Save
                </Button>
                <Button
                  onClick={handleCancel}
                  className="h-fit bg-transparent border text-gray-500 hover:text-gray-700 py-1 border-gray-500 hover:border-gray-700 hover:bg-transparent"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="h-fit bg-transparent border text-slate-400 hover:text-slate-600 py-1 border-slate-400 hover:border-slate-600 hover:bg-transparent"
              >
                <Edit /> Edit
              </Button>
            )}
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-2 ">
            <Button
              onClick={handleSave}
              className="h-fit bg-transparent border text-sky-600 hover:text-sky-700 py-1 border-sky-600 hover:border-sky-700 hover:bg-transparent"
            >
              <Phone /> Call
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  onClick={handleCancel}
                  className="h-fit bg-transparent border text-gray-500 hover:text-gray-700 py-1 border-gray-500 hover:border-gray-700 hover:bg-transparent"
                >
                  <Chat /> Message
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link
                    href={`https://wa.me/${leadProfile.contact}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-1 items-center"
                  >
                    <WhatsAppOutline size={16} /> WhatsApp
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href={`mailto:${localLeadProfile.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-1 items-center"
                  >
                    <MailIcon size={16} /> Email
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      <nav className="md:pt-2 mt-2 flex items-center justify-start bg-white w-full">
        {navItems.map((item, index) => (
          <button
            key={item.name}
            className={`relative text-sm text-gray-700 border-b-2 transition-all px-4 py-2 ${
              activeTab === index
                ? "border-b-sky-600 text-sky-600"
                : "border-transparent"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {item.name}
          </button>
        ))}

        {activeTab === 1 ? (
          <div className="md:hidden flex items-center gap-2 self-center ml-auto">
            {isEditing ? (
              <>
                <Button
                  onClick={handleSave}
                  className="h-fit bg-transparent border text-sky-600 hover:text-sky-700 py-1 border-sky-600 hover:border-sky-700 hover:bg-transparent"
                >
                  Save
                </Button>
                <Button
                  onClick={handleCancel}
                  className="h-fit bg-transparent border text-gray-500 hover:text-gray-700 py-1 border-gray-500 hover:border-gray-700 hover:bg-transparent"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="h-fit bg-transparent border text-slate-400 hover:text-slate-600 py-1 border-slate-400 hover:border-slate-600 hover:bg-transparent"
              >
                <Edit /> Edit
              </Button>
            )}
          </div>
        ) : (
          <div className="md:hidden flex items-center gap-2 self-center ml-auto">
            <Button
              onClick={handleSave}
              className="h-fit bg-transparent border text-sky-600 hover:text-sky-700 py-1 border-sky-600 hover:border-sky-700 hover:bg-transparent"
            >
              <Phone /> Call
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  onClick={handleCancel}
                  className="h-fit bg-transparent border text-gray-500 hover:text-gray-700 py-1 border-gray-500 hover:border-gray-700 hover:bg-transparent"
                >
                  <Chat /> Message
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link
                    href={`https://wa.me/${leadProfile.contact}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-1 items-center"
                  >
                    <WhatsAppOutline size={16} /> WhatsApp
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href={`mailto:${localLeadProfile.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-1 items-center"
                  >
                    <MailIcon size={16} /> Email
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </nav>
      <ShareModal isOpen={isShareModalOpen} onClose={toggleShareModal} />
    </section>
  )
}

export default LeadPageHeader
