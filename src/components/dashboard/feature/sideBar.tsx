/**
 * @path src/components/dashboard/feature/sideBar.tsx
 */

import SideNavMenu from "../ui/sideNavMenu"
import OnlineTag from "../ui/onlineTag"
import ProfileTab from "../ui/profileTab"
import dashboardItems from "../library/dashboardItems"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar"

const DashboardSideMenu = ({
  name,
  img,
}: {
  name?: string | undefined
  img?: string
}) => {
  return (
    <Sidebar
      variant="floating"
      className={` fixed z-10 top-0 pt-16 left-0  flex flex-col items-center transition-all text-nowrap border-0 `}
    >
      <SidebarHeader className="text-slate-800 text-left flex flex-col border-b bg-gray-50">
        <ProfileTab
          name={name ?? "Unknown User"}
          img={img}
          avatarClass="h-11 w-11"
          className=" font-semibold text-sm"
        >
          <OnlineTag />
        </ProfileTab>
      </SidebarHeader>

      <SidebarContent className="bg-transparent w-full text-slate-700 text-xs bg-gray-50">
        <SidebarGroup>
          <SidebarGroupLabel>MAIN NAVIGATION</SidebarGroupLabel>
          <SidebarGroupContent>
            <SideNavMenu
              items={dashboardItems.slice(0, dashboardItems.length - 1)}
            />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-gray-50">
        <SideNavMenu items={[dashboardItems[dashboardItems.length - 1]]} />{" "}
      </SidebarFooter>
    </Sidebar>
  )
}

export default DashboardSideMenu
