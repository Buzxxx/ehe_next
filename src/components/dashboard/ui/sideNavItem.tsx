import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "@/components/ui/icons"
import { logout } from "@/components/authentication/features/UserObject"
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

interface SubItem {
  name: string
  route: string
}

export interface SideNavItemProps {
  title: string
  subItems: SubItem[]
  icon: React.ReactNode
  onMenuItemClick: () => void // Add the prop type for the function
}

const SideNavItem: React.FC<SideNavItemProps> = ({
  title,
  subItems,
  icon,
  onMenuItemClick, // Receive the onMenuItemClick function
}) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const router = useRouter()

  const handleItemClick = () => {
    setOpenMenu((prevState) => !prevState)
  }

  const handleSubItemClick = async (subItem: SubItem) => {
    onMenuItemClick() // Call the onMenuItemClick to close the sidebar
    if (subItem.name === "Logout") {
      const path = await logout()
      if (path) {
        router.push(path)
      }
    } else {
      router.push(subItem.route)
    }
  }

  return (
    <SidebarMenuItem
      onClick={handleItemClick}
      className={subItems.length ? "relative" : ""}
    >
      {subItems.length ? (
        <div>
          <SidebarMenuButton className="relative">
            <span className="min-w-5">{icon}</span>
            {title}
            <Badge className="absolute right-4 top-1/2 -translate-y-1/2 bg-dashboard-primary text-neutral-200 p-1 text-xs rounded-sm bg-sky-600">
              {subItems.length}
            </Badge>
          </SidebarMenuButton>

          <SidebarMenuSub
          className="overflow-hidden"
            style={{
              height: openMenu ? `${subItems.length * 2.25}rem` : "0",
              transition: "height 0.3s ease",
            }}
          >
            {subItems.map((subItem, index) => (
              <SidebarMenuSubItem key={index}>
                <SidebarMenuSubButton
                  className="cursor-pointer"
                  onClick={() => handleSubItemClick(subItem)}
                >
                  {subItem.name}
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </div>
      ) : (
        <SidebarMenuButton>
          <Link
            href={`/${title.toLowerCase().replace(/\s+/g, "")}`}
            className="flex gap-3 w-full justify-between items-center"
            onClick={onMenuItemClick} // Call the onMenuItemClick when a ubIn menu item is clicked
          >
            <div className="flex gap-3 justify-between">
              {icon} {title}
            </div>
            <ChevronLeft size={16} />
          </Link>
        </SidebarMenuButton>
      )}
    </SidebarMenuItem>
  )
}

export default SideNavItem
