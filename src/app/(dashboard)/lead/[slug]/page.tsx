import LeadPageLayout from "@/components/lead/layout/leadPageLayout";
import React from "react";

const LeadPage = ({ params }: { params: { slug: string } }) => {
  return (
    <>
      <LeadPageLayout leadId={params.slug} />
    </>
  );
};

export default LeadPage;
