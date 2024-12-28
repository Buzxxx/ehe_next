import React from "react";
import { UserIcon } from "lucide-react";
import { useLeadProfile } from "@/components/lead/features/leadPage/context/leadProfileContext";
import { formatDate } from "@/lib/formatDate";

const LeadProfileFixedDetails = () => {
  const { leadProfile } = useLeadProfile();
  return (
    <>
      <p className="mb-1">
        <span className="font-semibold text-gray-700">Status:</span>{" "}
        <span className="text-gray-900">{leadProfile.status.status}</span>
      </p>
      <p className="mb-1">
        <span className="font-semibold text-gray-700">Priority:</span>{" "}
        <span className="text-gray-900">{leadProfile.priority}</span>
      </p>
      <p className="mb-1 flex items-center">
        <span className="font-semibold text-gray-700">Assigned to:</span>{" "}
        <span className="flex items-center ml-2">
          <UserIcon className="w-5 h-5 text-gray-500 mr-1" />
          <span className="text-gray-900">{leadProfile.assigned_to.name}</span>
        </span>
      </p>
      <p className="mb-1">
        <span className="font-semibold text-gray-700">Source:</span>{" "}
        <span className="text-gray-900">{leadProfile.source}</span>
      </p>
      <p className="mb-1">
        <span className="font-semibold text-gray-700">Created at :</span>{" "}
        <span className="text-gray-900">
          {formatDate(leadProfile.created_dt)}
        </span>
      </p>
      <p className="mb-1">
        <span className="font-semibold text-gray-700">Last updated at :</span>{" "}
        <span className="text-gray-900">
          {formatDate(leadProfile.last_updated_dt)}
        </span>
      </p>
    </>
  );
};

export default LeadProfileFixedDetails;
