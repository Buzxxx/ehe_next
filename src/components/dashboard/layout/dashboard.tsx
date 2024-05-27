"use client";

import React, { ReactNode, useState, useEffect } from "react"; 
import useAuth from "@/hooks/useAuth";

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

   const isAuthenticated = useAuth(); // Call the custom hook to get the authentication status

   if (!isAuthenticated) {
     return null; // Or show a loading spinner
   }



  return (
    <div className="min-h-full">
      <DashboardHeader toggled={toggled} onNext={handleToggle} />
      <DashboardSideMenu toggled={toggled} online={online} />
      <div
        className={`${
          toggled ? "md:ml-64" : "ml-0"
        } transition-all duration-300 min-h-96 mt-20`}
      >
        {children}
      </div>
    </div>
  );
};

export default Dashboard;
