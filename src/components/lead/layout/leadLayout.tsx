/**
 * @path src/components/lead/layout/leadLayout.tsx
 * @description LeadLayout component for the lead listing page
 */

"use client";

import { useState } from "react";
import TopBar from "../features/leadListing/topBar";
import LeadList from "../features/leadListing/leadList";

import {
  LeadsResponse,
  DefaultLeadsResponse,
  lead_list_view_mode,
} from "@/components/lead/features/leadObject";
import Modal from "../ui/modal";
import LeadReassignForm from "../features/forms/leadReassignForm";

const LeadLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [leadsResponse, setLeadsResponse] =
    useState<LeadsResponse>(DefaultLeadsResponse); // State to store the response from the API call that fetches the list of leads.
  const [viewMode, setViewMode] = useState<"grid" | "list">(lead_list_view_mode()); // State to determine how the leads are displayed in the LeadList component.
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
  const [showFavourites, setShowFavourites] = useState(false);

  return (
    <div className="px-1 md:px-0 h-full">
      {/* <LeadSummarySection setIsLoading={setIsLoading} /> */}

      <TopBar
        LeadsResponse={leadsResponse}
        viewMode={viewMode}
        setViewMode={setViewMode}
        setShowReassignModal={setShowReassignModal}
        setIsLoading={setIsLoading}
        setShowFavourites={setShowFavourites}
      />
      <LeadList
        viewMode={viewMode}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        selectedLeads={selectedLeads}
        setSelectedLeads={setSelectedLeads}
        showFavourites={showFavourites}
      />

      <Modal
        isOpen={showReassignModal}
        onClose={() => setShowReassignModal(false)}
      >
        <LeadReassignForm
          leadIds={selectedLeads}
          setShowLeadReassignModal={setShowReassignModal}
        />
      </Modal>
    </div>
  );
};

export default LeadLayout;
