"use client"

import React, { ReactNode, useState, useEffect } from "react"
import {
  handleToggle,
  saveToggleState,
  loadToggleState,
} from "@/utility/toggle"
import DashboardSideMenu from "@/components/dashboard/feature/sideBar"
import DashboardHeader from "@/components/dashboard/feature/dashboardHeader"
import { fetch_User_Data } from "../feature/fetchUserData"
import { SidebarProvider } from "@/components/ui/sidebar"

const Dashboard = ({ children }: { children: ReactNode }) => {
  const [toggled, setToggled] = useState(false) // Initially set to false
  const [name, setName] = useState<string>("Loading...")
  useEffect(() => {
    async function getUserData() {
      const fetchedName = await fetch_User_Data()
      setName(fetchedName)
    }
    getUserData()
  }, [])

  const img = "/base/profile.webp"

  useEffect(() => {
    if (typeof window !== "undefined") {
      const initialToggleState =
        window.innerWidth < 768 ? false : loadToggleState()
      setToggled(initialToggleState)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.querySelector("aside")
      if (
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        window.innerWidth < 768
      ) {
        setToggled(false)
      }
    }

    if (toggled) {
      document.addEventListener("click", handleClickOutside)
    } else {
      document.removeEventListener("click", handleClickOutside)
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [toggled])

  const onToggle = () => {
    handleToggle(toggled, setToggled)
    saveToggleState(!toggled)
  }

  const handleMenuClick = () => {
    // Close sidebar on menu item click for mobile view
    if (window.innerWidth < 768) {
      setToggled(false)
    }
  }

  return (
    <div className="min-h-screen w-full  relative">
      <SidebarProvider defaultOpen={toggled}>
        <DashboardHeader
          toggled={toggled}
          onNext={onToggle}
          name={name}
          img={img}
        />
        <DashboardSideMenu
          toggled={toggled}
          name={name}
          img={img}
          onMenuClick={handleMenuClick}
        />
        <section
          className={` bg-gradient-to-b from-sky-100/50 to-white rounded-lg min-h-96 mt-16 p-4 ml-auto flex-0 w-full shadow-sm relative overflow-x-hidden`}
        >
          {children}
        </section>
      </SidebarProvider>
    </div>
  )
}

export default Dashboard
