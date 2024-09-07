import React from "react"
import SideNavItem from "./sideNavItem"
import dashboardItems from "../library/dashboardItems"

const SideNavMenu = ({ onMenuItemClick }: { onMenuItemClick: () => void }) => {
  return (
    <div className="w-full text-nowrap  ">
      <ul className="text-neutral-300 text-sm">
        {dashboardItems.map((item) => (
          <SideNavItem
            key={item.title}
            title={item.title}
            subItems={item.subItems}
            icon={item.icon}
            onMenuItemClick={onMenuItemClick} // Pass the onMenuItemClick function
          />
        ))}
      </ul>
    </div>
  )
}

export default SideNavMenu
