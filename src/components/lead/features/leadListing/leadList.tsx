import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@/components/ui/icons";
import { LeadCard } from "@/components/lead/ui/leadListing/leadCard";
import {
  lead_listing_controller,
  LeadsResponse,
} from "@/components/lead/features/leadObject";

interface LeadListProps {
  leadsResponse: LeadsResponse;
  setLeadsResponse: (response: LeadsResponse) => void;
}

const LeadList: React.FC<LeadListProps> = ({
  leadsResponse,
  setLeadsResponse,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const URLParams = useSearchParams();

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams(window.location.search);
        const leadsList = await lead_listing_controller(params);
        setLeadsResponse(leadsList);
      } catch (error: any) {
        console.error("error fetching leads from component: ", error);
      }
      setIsLoading(false);
    };

    fetchLeads();
  }, [URLParams, setLeadsResponse]);

  function handleToggleLeadSelection(index: number) {
    console.log(index);
  }

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50 min-h-screen">
          <Spinner className="animate-spin h-10 w-10" />
        </div>
      ) : (
        <div className="pt-2">
          <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
            {leadsResponse ? (
              leadsResponse.leads.length ? (
                leadsResponse.leads.map((lead, index) => (
                  <LeadCard
                    key={lead.id}
                    idx={index}
                    lead={lead}
                    isSelected={lead.isSelected}
                    onToggle={() => handleToggleLeadSelection(index)}
                  />
                ))
              ) : (
                <p>No leads available</p>
              )
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadList;
