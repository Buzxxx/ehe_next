'use client'
import React, {useState, useEffect} from "react";
import SideNavItem from "./sideNavItem";
import dashboardItems from "../library/dashboardItems";
import { useRouter } from "next/navigation";


const SideNavMenu = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = () => {
    // Clear the token (assuming it's stored in localStorage)
    localStorage.removeItem("token");
    // Redirect to the login page
    router.push("/accounts/login");
  };

  if (!isMounted) return null;

  const updatedDashboardItems = dashboardItems.map((item) => {
    if (item.title === "Settings") {
      return {
        ...item,
        subItems: item.subItems.map((subItem) => {
          if (subItem.title === "Logout") {
            return {
              ...subItem,
              onClick: handleLogout,
            };
          }
          return subItem;
        }),
      };
    }
    return item;
  });

  return (
    <div className="w-full text-nowrap ">
      <ul className="text-neutral-300 text-sm">
        {updatedDashboardItems.map((item) => (
          <SideNavItem
            key={item.title}
            title={item.title}
            href={item.href ? item.href : null}
            subItems={item.subItems}
            icon={item.icon}
          />
        ))}
      </ul>
    </div>
  );
};

export default SideNavMenu;
