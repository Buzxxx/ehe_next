"use client";

import React from "react";
import DashboardBreadcrumb from "../ui/breadcrumb";
import DashboardTopBar from "../ui/dashboardTopbar";
import FilterForm from "../ui/filterForm";
import VisitorPanelBody from "../ui/visitorPanel";

const Lead = () => {
  const openCloseFilter = () => {
    const filter = document.getElementById("filter");
    if (filter) {
      if (filter.className === "filter_nav close") {
        filter.className = "filter_nav open";
      } else {
        filter.className = "filter_nav close";
      }
    }
  };

  const customDateOpen = (value: string) => {
    const custom = document.getElementById("customDate");
    if (custom) {
      if (value === "custom") {
        custom.className = "row mt-2 open";
      } else {
        custom.className = "row mt-2 close";
      }
    }
  };

  React.useEffect(() => {
    customDateOpen("today");
  }, []);

  return (
    <section className="p-4 overflow-x-hidden">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-neutral-600 font-semibold">
          Lead
          <span className="text-base font-normal ml-4">Control Panel</span>
        </h1>
        <DashboardBreadcrumb />
      </div>

      <DashboardTopBar />

      <div className="visitor-panel position-relative">
        <div className="filterParent position-absolute z-index-1000">
        </div>

        <VisitorPanelBody />
      </div>

      {/* <ReassignModal /> */}
    </section>
  );
};

export default Lead;
