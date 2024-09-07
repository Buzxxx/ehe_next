import SideNavMenu from "../ui/sideNavMenu";
import OnlineTag from "../ui/onlineTag";
import ProfileTab from "../ui/profileTab";
import { useState, useEffect } from "react";
import { get_user_data_as_cookie } from "@/components/authentication/features/UserObject";

const DashboardSideMenu = ({
  toggled,
  onMenuClick
}: {
  toggled: boolean
  name: string
  img: string
  onMenuClick: () => void
}) => {
  const [name, setName] = useState<string>("Loading...")
  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await get_user_data_as_cookie()
        setName(userData.name)
      } catch (error) {
        console.error("Error fetching user data:", error)
        setName("Unknown User")
      }
    }

    fetchUserData()
  }, [])

  const img = "/base/profile.webp"
  return (
    <aside
      className={`${
        toggled ? "translate-x-0" : "-translate-x-56"
      } overflow-hidden fixed z-10 top-0 w-3/4 md:w-56 left-0 pt-12 flex flex-col bg-charcoal-700 items-center transition-all text-nowrap duration-300 h-screen`}
    >
      <div className="flex gap-3 items-center justify-start w-full px-4 ">
        <div className="text-white text-left flex flex-col">
          <ProfileTab
            name={name}
            img={img}
            avatarClass="h-11 w-11"
            className="mb-1 font-semibold text-sm"
          >
            <OnlineTag />
          </ProfileTab>
        </div>
      </div>
      <div className="bg-charcoal-900 py-3 px-4 w-full text-neutral-500 text-xs">
        <p>MAIN NAVIGATION</p>
      </div>
      <SideNavMenu onMenuItemClick={onMenuClick} />
    </aside>
  )
}

export default DashboardSideMenu;
