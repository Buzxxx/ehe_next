"use client"

import React, { ReactNode, useState, useEffect } from "react"
import DashboardSideMenu from "@/components/dashboard/feature/sideBar"
import DashboardHeader from "@/components/dashboard/feature/dashboardHeader"
import { handleToggle, saveToggleState, loadToggleState } from "@/utils/toggle"

const Dashboard = ({ children }: { children: ReactNode }) => {
  const [toggled, setToggled] = useState(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return false
    }
    return loadToggleState()
  })
  const [online, setOnline] = useState(true)

  const onToggle = () => {
    handleToggle(toggled, setToggled)
    saveToggleState(!toggled)
  }

  return (
    <div className="min-h-screen w-full bg-charcoal-foreground ">
      <DashboardHeader toggled={toggled} onNext={onToggle} />
      <DashboardSideMenu toggled={toggled} online={online} />
      <section
        className={` transition-all duration-300 min-h-96 mt-10 px-6 py-4 ml-auto flex-0 ${
          toggled ? "md:w-[calc(100%-14rem)] ml-56" : "w-full ml-0"
        }`}
      >
        {children}
      </section>
    </div>
  )
}

export default Dashboard
