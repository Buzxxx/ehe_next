/**
 * @path src/components/lead/features/leadListing/leadSummarySection.tsx
 * @description LeadSummarySection component for the lead listing page
 */

import React, { useState, useEffect } from "react";
import LeadSummaryCard from "../../ui/leadListing/leadSummaryCard";
import {
  get_default_filterBy_obj,
  filter_multiselect_change_controller,
} from "../filterObject";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const statuses = [
  { title: "New Leads", value: 20, key: 1 },
  { title: "In Progress", value: 15, key: 2 },
  { title: "Completed", value: 10, key: 3 },
  { title: "Archived", value: 5, key: 4 },
];

const LeadSummarySection = ({
  setIsLoading,
}: {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Sync selectedStatuses with the URL on searchParams change
  useEffect(() => {
    const filterByObj = get_default_filterBy_obj(
      new URLSearchParams(searchParams.toString())
    );
  }, [searchParams]);

  // Handle card clicks with instant UI update
  const handleCardClick = (status: number) => {
    setIsLoading(true);

    // Update the URL
    const newParams = new URLSearchParams(searchParams.toString()); // Create a mutable copy of the params

    // Use router to push updated URL
    router.push(`?${newParams.toString()}`);
  };

  return (
    <>
      <Accordion type="single" collapsible className="md:hidden">
        <AccordionItem value="item-1">
          <AccordionTrigger className="pt-0">Leads Summary</AccordionTrigger>
          <AccordionContent className="flex gap-1 w-full md:hidden">
            {statuses.map(({ title, value, key }) => (
              <LeadSummaryCard
                key={key}
                title={title}
                value={value}
                onClick={() => handleCardClick(key)}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="md:flex hidden flex-wrap justify-between gap-2 w-full">
        {statuses.map(({ title, value, key }) => (
          <LeadSummaryCard
            key={key}
            title={title}
            value={value}
            onClick={() => handleCardClick(key)}
          />
        ))}
      </div>
    </>
  );
};

export default LeadSummarySection;
