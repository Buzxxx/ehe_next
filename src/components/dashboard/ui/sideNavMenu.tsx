/**
 * @path src/components/dashboard/ui/sideNavMenu.tsx
 */

import SideNavItem, { SideNavItemProps } from "./sideNavItem"
import { SidebarMenu } from "@/components/ui/sidebar"

const SideNavMenu = ({
  items,
}: {
  items: Omit<SideNavItemProps, "onMenuItemClick">[]
  onMenuItemClick?: () => void
}) => {
  return (
    <SidebarMenu className="text-slate-700 text-sm">
      {items.map((item) => (
        <SideNavItem
          key={item.title}
          title={item.title}
          subItems={item.subItems}
          icon={item.icon}
        />
      ))}
    </SidebarMenu>
  )
}

export default SideNavMenu
