import Notifs from "../ui/notifs"
import MenuIcon from "@/components/ui/icons/menuIcon"
import ProfilePopover from "../ui/profilePopover"
import ProfileTab from "../ui/profileTab"
import { SidebarTrigger } from "@/components/ui/sidebar"
import CustomTrigger from "./customSidebarTrigger"

interface DashboardNavProps {
  onNext?: () => void
  name?: string
  img?: string
}

const DashboardHeader: React.FC<DashboardNavProps> = ({
  onNext,
  name,
  img,
}) => {
  return (
    <nav className="flex bg-white justify-between w-full items-center z-50 fixed top-0 border ">
      <div className=" min-w-64 h-full py-3 hidden md:block border-r ">
        <h4 className="text-center mx-auto">CRM</h4>
      </div>
      <div className="flex justify-between flex-1 px-2 py-3 items-center">
        <CustomTrigger />
        <div className="flex gap-4 items-center justify-between">
          <Notifs />
          <ProfilePopover
            trigger={
              <ProfileTab
                name={name ?? "Loading..."}
                img={img}
                avatarClass="h-6 w-6 border"
                className="text-sm"
                profileNameTag="md:flex hidden"
              />
            }
            src={img ?? "/base/profile.webp"}
            className="p-0 rounded-none mr-4"
            username={name}
          />
        </div>
      </div>
    </nav>
  )
}

export default DashboardHeader
