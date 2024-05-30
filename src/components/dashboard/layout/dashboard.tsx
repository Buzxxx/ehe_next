"use client";

import React, { ReactNode, useState, useEffect } from "react"; // import "./globals.css";

import DashboardSideMenu from "@/components/dashboard/feature/sideBar";
import DashboardHeader from "@/components/dashboard/feature/dashboardHeader";

const Dashboard = ({ children }: { children: ReactNode }) => {
  const [toggled, setToggled] = useState(false);
  const [online, setOnline] = useState(true);

  const handleToggle = () => {
    setToggled(!toggled);
    localStorage.setItem("toggled", JSON.stringify(!toggled));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToggled = localStorage.getItem("toggled");

      if (storedToggled !== null) {
        setToggled(JSON.parse(storedToggled));
      }
    }
  }, []);



  return (
    <div className="min-h-full w-100% antialiased ">
      <DashboardHeader toggled={toggled} onNext={handleToggle} />
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
};

export default Dashboard;
