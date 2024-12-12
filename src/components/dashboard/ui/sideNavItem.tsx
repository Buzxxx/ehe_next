/**
 * @path src/components/dashboard/ui/sideNavItem.tsx
 */

'use client'

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft } from "@/components/ui/icons"
import { logout } from "@/components/authentication/features/UserObject"
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useSidebar } from "@/components/ui/sidebar"
import {useRouter, usePathname} from 'next/navigation'

interface SubItem {
  name: string
  route: string
}

export interface SideNavItemProps {
  title: string
  subItems: SubItem[]
  icon: React.ReactNode
  onMenuItemClick?: () => void // Add the prop type for the function
}

const SideNavItem: React.FC<SideNavItemProps> = ({
  title,
  subItems,
  icon,
  onMenuItemClick, // Receive the onMenuItemClick function
}) => {
  const {setOpenMobile} = useSidebar()
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const router = useRouter()
  const currentRoute = usePathname()

  const handleItemClick = () => {
    setOpenMenu((prevState) => !prevState)
  }

  const isActive = subItems.some((subItem) => subItem.route === currentRoute)


  const handleSubItemClick = async (subItem: SubItem) => {
    setOpenMobile(false)
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
          <SidebarMenuButton className="relative flex items-center hover:bg-sky-500/10">
            <span className="w-6">{icon}</span>
            <p className="flex-1">{title}</p>

            <Badge className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-sku-600 text-neutral-100 p-0 px-1 text-xs rounded-sm bg-sky-600 hover:bg-sky-500">
              {subItems.length}
            </Badge>
          </SidebarMenuButton>

          <SidebarMenuSub
            className="overflow-hidden"
            style={{
              height:
                openMenu || isActive ? `${subItems.length * 2.25}rem` : "0",
              transition: "height 0.3s ease",
            }}
          >
            {subItems.map((subItem, index) => (
              <SidebarMenuSubItem key={index}>
                <SidebarMenuSubButton
                  className={`cursor-pointer hover:bg-sky-400/10 ${
                    subItem.route === currentRoute && "bg-sky-400/10"
                  }`}
                  onClick={() => handleSubItemClick(subItem)}
                >
                  {subItem.name}
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </div>
      ) : (
        <SidebarMenuButton className="hover:bg-sky-500/10">
          <Link
            href={`/${title.toLowerCase().replace(/\s+/g, "")}`}
            className="flex gap-3 w-full justify-between items-center"
            onClick={onMenuItemClick} // Call the onMenuItemClick when a ubIn menu item is clicked
          >
            <div className="flex gap-2 justify-start w-full">
              <span className="w-6">{icon}</span>
              <p className="">{title}</p>
            </div>
            <ChevronLeft size={16} />
          </Link>
        </SidebarMenuButton>
      )}
    </SidebarMenuItem>
  )
}

export default SideNavItem
