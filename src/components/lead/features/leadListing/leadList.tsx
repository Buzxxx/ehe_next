import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@/components/ui/icons";
import { LeadCard } from "@/components/lead/ui/leadListing/leadCard";
import {
  lead_listing_controller,
  LeadsResponse,
  DefaultLeadsResponse,
} from "@/components/lead/features/leadObject";

interface LeadListProps {
  leadsResponse: LeadsResponse;
  setLeadsResponse: (response: LeadsResponse) => void;
}

const LeadList: React.FC<LeadListProps> = ({
  leadsResponse = DefaultLeadsResponse,
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
        if (leadsList) {
          setLeadsResponse(leadsList);
          setIsLoading(false);
        }
      } catch (error: any) {
        console.error("error fetching leads from component: ", error);
      }
    };

    fetchLeads();
  }, [URLParams, setLeadsResponse]);

  function handleToggleLeadSelection(index: number) {
    console.log(index);
  }

  const hasLeads = leadsResponse?.leads?.length > 0;

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50 min-h-screen">
          <Spinner className="animate-spin h-10 w-10" />
        </div>
      ) : (
        <div className="pt-2">
          <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
            {hasLeads ? (
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
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadList;
