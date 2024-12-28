import React from "react"
import { UserIcon } from "lucide-react"
import { useLeadProfile } from "@/components/lead/features/leadPage/context/leadProfileContext"
import { formatDate } from "@/utility/formatDate"
import { Badge } from "@/components/ui/badge"
import { DotIcon } from "@/components/ui/icons"
import Box from "@/components/ui/icons/box"
import FireColored from "@/components/ui/icons/fireColored"
import IceColored from "@/components/ui/icons/iceColored"

const LeadProfileFixedDetails = () => {
  const { leadProfile } = useLeadProfile()
  return (
    <>
      <p className="mb-2">
        <span className="block font-semibold text-gray-500 text-xs mb-1">
          Status
        </span>{" "}
        <Badge className="flex text-white bg-indigo-400  border hover:bg-indigo-500/75 rounded-sm w-full py-2 px-4 text-center items-center justify-center">
          {leadProfile.status.status}
        </Badge>
      </p>
      <p className="mb-2">
        <span className="block mb-1 font-semibold text-gray-500 ">Source</span>{" "}
        <Badge
          variant="outline"
          className="rounded-sm py-2 w-full justify-center items-center text-center text-gray-700 gap-1"
        >
          <Box size={16} />
          {leadProfile.source}
        </Badge>
      </p>
      <p className="mb-2 flex items-center gap-2 justify-between ">
        <span className="font-semibold text-gray-500 ">Priority</span>{" "}
        <Badge
          variant={"outline"}
          className="inline-flex gap-1 items-center text-gray-700 font-medium"
        >
          {leadProfile.priority === "hot" ? (
            <FireColored size={16} />
          ) : (
            <IceColored size={16} />
          )}

          {leadProfile.priority}
        </Badge>
      </p>
      <p className="mb-2 flex items-center gap-4 justify-between ">
        <span className="font-semibold text-gray-500 ">Assigned to</span>{" "}
        <span className="flex items-center gap-1 text-gray-700 font-semibold">
          <UserIcon size={14} strokeWidth={2} />
          <span className="font-medium">{leadProfile.assigned_to.name}</span>
        </span>
      </p>

      <p className="mb-2 flex items-center justify-between ">
        <span className="font-semibold text-gray-500 ">Created</span>
        <span className="text-gray-700  font-medium">
          {formatDate(leadProfile.created_dt)}
        </span>
      </p>
      <p className="mb-2  flex items-center justify-between">
        <span className="font-semibold text-gray-500">Last updated</span>
        <span className="text-gray-700 font-medium">
          {formatDate(leadProfile.last_updated_dt)}
        </span>
      </p>
    </>
  )
}

export default LeadProfileFixedDetails
