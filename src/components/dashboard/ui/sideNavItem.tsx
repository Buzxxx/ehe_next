import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "@/components/ui/icons"
import { logout } from "@/components/authentication/features/UserObject"

interface SubItem {
  name: string
  route: string
}

interface SideNavItemProps {
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
    <li
      className={`flex items-center hover:bg-charcoal-900 transition-all cursor-pointer text-neutral-300 hover:text-neutral-200  ${
        subItems.length ? "relative" : ""
      }`}
      onClick={handleItemClick}
    >
      {subItems.length ? (
        <div className="relative w-full">
          <span
            className={`border-l-4 border-l-transparent hover:border-l-dashboard-primary p-3 flex gap-3 relative w-full items-center hover:text-neutral-200 ${
              openMenu
                ? "border-l-dashboard-primary bg-charcoal-900"
                : "border-0"
            }`}
          >
            <span className="min-w-5">{icon}</span>
            {title}
            <Badge className="absolute right-4 top-1/2 -translate-y-1/2 bg-dashboard-primary text-neutral-200 p-1 text-xs rounded-sm">
              {subItems.length}
            </Badge>
          </span>

          <ul
            style={{
              height: openMenu ? `${subItems.length * 2.25}rem` : "0",
              transition: "height 0.3s ease",
            }}
            className="bg-charcoal-800 pl-8 overflow-hidden"
          >
            {subItems.map((subItem, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:text-neutral-200 cursor-pointer"
                onClick={() => handleSubItemClick(subItem)}
              >
                {subItem.name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Link
          href={`/${title.toLowerCase().replace(/\s+/g, "")}`}
          className="border-l-4 border-l-transparent hover:border-l-dashboard-primary p-3 flex gap-3 w-full justify-between items-center"
          onClick={onMenuItemClick} // Call the onMenuItemClick when a main menu item is clicked
        >
          <div className="flex gap-3 justify-between">
            {icon} {title}
          </div>
          <ChevronLeft size={16} />
        </Link>
      )}
    </li>
  )
}

export default SideNavItem
