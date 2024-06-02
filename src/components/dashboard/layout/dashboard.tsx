"use client"

import React, { ReactNode, useState, useEffect } from "react"
import DashboardSideMenu from "@/components/dashboard/feature/sideBar"
import DashboardHeader from "@/components/dashboard/feature/dashboardHeader"
import {
  handleToggle,
  saveToggleState,
  loadToggleState,
} from "@/utils/toggle"

const Dashboard = ({ children }: { children: ReactNode }) => {
  const [toggled, setToggled] = useState(false)
  const [online, setOnline] = useState(true)

  const onToggle = () => {
    handleToggle(toggled, setToggled)
    saveToggleState(!toggled)
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToggled(loadToggleState())
    }
  }, [])

  return (
    <div className="min-h-screen w-100% antialiased bg-charcoal-foreground">
      <DashboardHeader toggled={toggled} onNext={onToggle} />
      <DashboardSideMenu toggled={toggled} online={online} />
      <section
        className={`${
          toggled ? "md:ml-56" : "ml-0"
        } transition-all duration-300 min-h-96 mt-10 px-6 py-4`}
      >
        {children}
      </section>
    </div>
  )
}

export default Dashboard
