"use client"
import React, { useEffect, useState } from "react";
import DashboardBreadcrumb from "../../dashboard/ui/breadcrumb";
import DashboardTopBar from "../../dashboard/ui/dashboardTopbar";
import VisitorPanelBody from "../ui/visitorPanel";
import { useRouter } from "next/navigation";
import LeadApiClient from "@/lib/leadApiClient";
import LeadUtils from "@/utils/LeadUtils";



const Lead: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)

    const initialLeads = [
      { id: 1, isSelected: false, name: 'User', email:'user@email.com', contact: '1234567890', lead_type: 's', assigned_to: 'hero', priority: 'cold', source: '4', status:1 },
      { id: 2, isSelected: false, name: 'User', email:'user@email.com', contact: '1234567890', lead_type: 's', assigned_to: 'hero', priority: 'cold', source: '4', status:1 },
      { id: 3, isSelected: false, name: 'User', email:'user@email.com', contact: '1234567890', lead_type: 's', assigned_to: 'hero', priority: 'cold', source: '4', status:1 },
    ]
  const [leads, setLeads] = useState<LeadCard[]>(initialLeads);
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);

  const router = useRouter();

  // // Fetch leads on component mount
  // useEffect(() => {
  //   const fetchLeads = async () => {
  //     try {
  //       const fetchedLeads: Lead[] = await LeadApiClient.getLeads({ per_page: 10, page: 1 });

  //       // Convert Lead[] to LeadCard[] by adding isSelected property
  //       const leadsWithSelection = fetchedLeads.map(lead => ({ ...lead, isSelected: false }));
  //       setLeads(leadsWithSelection);
  //     } catch (error) {
  //       console.error("Failed to fetch leads:", error);
  //     }
  //   };

  //   fetchLeads();
  // }, []);

  const handleToggleLeadSelection = (index: number) => {
    const updatedLeads = LeadUtils.toggleLeadSelection(leads, index);
    setLeads(updatedLeads);
    setSelectedLeads(LeadUtils.getSelectedLeads(updatedLeads));
  };

  const handleSelectAllLeads = () => {
    const updatedLeads = LeadUtils.selectAllLeads(leads);
    setLeads(updatedLeads);
    setSelectedLeads(LeadUtils.getSelectedLeads(updatedLeads));
  };

  const handleUnselectAllLeads = () => {
    const updatedLeads = LeadUtils.unselectAllLeads(leads);
    setLeads(updatedLeads);
    setSelectedLeads([]);
  };

  const selectedCount = LeadUtils.getSelectedCount(leads);
  const totalLeads = LeadUtils.getTotalLeads(leads);


 const handleReassign = () => {
   setIsLoading(true) // Set loading state to true
    try {
      const selectedLeadIds = selectedLeads.join(",") // Convert selectedLeads array to a comma-separated string
     router.push(`/lead/leadReassignModal/?leads=${selectedLeadIds}`)
    } catch (error) {
      console.error("Failed to navigate to reassign modal:", error)
    } finally {
      setIsLoading(false) // Reset loading state
    }
 }


// ...

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-neutral-900 font-normal">
          Lead
          <span className="text-base ml-4 text-neutral-600">Control Panel</span>
        </h1>
        <DashboardBreadcrumb />
      </div>

      <DashboardTopBar
        onSelectAll={handleSelectAllLeads}
        onUnselectAll={handleUnselectAllLeads}
        onReassign={handleReassign}
        selectedCount={selectedCount}
        totalLeads={totalLeads}
      />
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          Loading...
        </div>
      )}

      <div className="visitor-panel w-full">
        <VisitorPanelBody
          leads={leads}
          onToggleLead={handleToggleLeadSelection}
        />
      </div>
    </>
  )
};

export default Lead;
