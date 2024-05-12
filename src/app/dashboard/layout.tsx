"use client";
import type { Metadata } from "next";
import React, { useState, useEffect, ReactNode } from "react"; // import "./globals.css";

import DashboardSideMenu from "@/components/dashboard/feature/sideBar";
import DashboardHeader from "@/components/dashboard/feature/dashboardHeader";

// export const metadata: Metadata = {
//   title: "EHE Industries",
//   description: "A Real Estate company",
// };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [toggled, setToggled] = useState(false);
  const [online, setOnline] = useState(true);

  const handleToggle = () => {
    setToggled(!toggled);
    // localStorage.setItem("toggled", JSON.stringify(!toggled));
  };
  return (
    <html lang="en">
      <body>
        <DashboardHeader onNext={handleToggle} />
        <div className="w-full flex items-center ">
          <DashboardSideMenu toggled={toggled} online={online} />
          {children}
        </div>
      </body>
    </html>
  );
}
