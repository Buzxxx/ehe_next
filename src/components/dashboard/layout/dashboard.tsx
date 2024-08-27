"use client"

import React, { ReactNode, useState, useEffect } from "react"
import DashboardSideMenu from "@/components/dashboard/feature/sideBar"
import DashboardHeader from "@/components/dashboard/feature/dashboardHeader"
import { handleToggle, saveToggleState, loadToggleState } from "@/utils/toggle"

const Dashboard = ({ children }: { children: ReactNode }) => {
  const [toggled, setToggled] = useState(false) // Initially set to false
  const [online, setOnline] = useState(true)

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

  return (
    <div className="min-h-screen w-full bg-charcoal-foreground relative">
      <DashboardHeader toggled={toggled} onNext={onToggle} />
      <DashboardSideMenu toggled={toggled} online={online} />
      <section
        className={` transition-all duration-300 min-h-96 mt-10 px-6 py-4 ml-auto flex-0 relative ${
          toggled ? "md:w-[calc(100%-14rem)] ml-56" : "w-full ml-0"
        }`}
      >
        {children}
      </section>
    </div>
  )
}

export default Dashboard
