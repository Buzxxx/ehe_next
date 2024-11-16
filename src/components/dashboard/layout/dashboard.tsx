/**
 * @path src/components/dashboard/layout/dashboard.tsx
 */

import DashboardHeader from "@/components/dashboard/feature/dashboardHeader"
import { fetch_User_Data } from "../feature/fetchUserData"
import { SidebarProvider } from "@/components/ui/sidebar"

import { cookies } from "next/headers"
import dynamic from "next/dynamic"
import { get_user_data_as_cookie } from "@/components/authentication/features/UserObject"


const DashboardSideMenu = dynamic(
  () => import("@/components/dashboard/feature/sideBar")
)

const Dashboard = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"
  const { name, img } = await get_user_data_as_cookie()

  return (
    <div className="min-h-screen w-full  relative bg-gray-100/75">
      <SidebarProvider defaultOpen={defaultOpen}>
        <DashboardHeader name={name} img={img ?? "/base/profile.webp"} />
        <DashboardSideMenu name={name} img={img ?? "/base/profile.webp"} />
        <section
          className={`  rounded-lg min-h-96 mt-12 py-4 px-2 mx-2 flex-0 w-full shadow-sm`}
        >
          {children}
        </section>
      </SidebarProvider>
    </div>
  )
}

export default Dashboard
