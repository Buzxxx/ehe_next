import React from "react";
import CreateLeadForm from "@/components/lead/features/createLead/createLeadForm";

const CreateLeadLayout = () => {
  return (
    <div>
      <h1 className="pt-2 text-4xl text-neutral-600 font-semibold">
        Lead
        <span className="text-xl ml-4 text-neutral-900 font-medium">
          Create Lead
        </span>
      </h1>
      <CreateLeadForm />
    </div>
  );
};

export default CreateLeadLayout;
