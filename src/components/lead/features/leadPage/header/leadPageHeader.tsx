import { Button } from "@/components/ui/button";
import BackIcon from "@/components/ui/icons/back";
import { useRouter } from "next/navigation";
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
} from "@/components/ui/icons";
import Avataar from "@/components/dashboard/ui/avataar";
import { useState } from "react";
import { useLeadProfile } from "@/components/lead/features/leadPage/context/leadProfileContext";
import dynamic from "next/dynamic";
import { useLeadSave } from "../../../hooks/useLeadSave";
const ShareModal = dynamic(
  () => import("@/components/propertyPage/features/shareModal")
);

const LeadPageHeader = ({
  id,
  navItems,
  activeTab,
  setActiveTab,
}: {
  id: number;
  navItems: { name: string; component: React.ReactNode }[];
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { leadProfile, setLeadProfile, isEditing, setIsEditing } =
    useLeadProfile();
  const router = useRouter();
  const { isSaved, toggleSave } = useLeadSave(id);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false); // State for share modal

  const toggleShareModal = () => {
    setIsShareModalOpen(!isShareModalOpen);
  };

  const [localLeadProfile, setLocalLeadProfile] = useState(leadProfile);

  const handleSave = () => {
    setLeadProfile(localLeadProfile);
    setIsEditing(false);
  };

  // Cancel editing and revert changes
  const handleCancel = () => {
    setLocalLeadProfile(leadProfile);
    setIsEditing(false);
  };

  // Function to handle navigation
  const handleNavigation = (direction: "prev" | "next") => {
    const newId = direction === "prev" ? id - 1 : id + 1;
    if (newId > 0) {
      router.push(`/lead/${newId}`);
    }
  };

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
            onClick={toggleSave}
            className={`p-1 rounded-md h-fit bg-transparent text-yellow-600 hover:bg-yellow-100`}
          >
            <Bookmark size={20} className={isSaved ? "fill-yellow-600" : ""} />
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
            <div className="font-semibold text-2xl p-0">{leadProfile.name}</div>
            <div>
              <div className="flex gap-1 items-center text-gray-500 text-sm">
                <Mail size={16} />
                <div className="text-sm p-0">
                  {leadProfile.email || "Email not provided"}
                </div>
              </div>
              <div className="flex gap-1 items-center text-gray-500 text-sm">
                <Phone size={16} />
                <div className="text-sm p-0">{leadProfile.contact}</div>
                <span className="text-gray-300 h-4 overflow-hidden my-auto px-1">
                  |
                </span>
                <BriefCase size={16} />
                <p>{leadProfile.priority}</p>
              </div>
            </div>
          </div>
        </div>
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
      </nav>
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={toggleShareModal}
        title={"Share this Lead"}
      />
    </section>
  );
};

export default LeadPageHeader;
