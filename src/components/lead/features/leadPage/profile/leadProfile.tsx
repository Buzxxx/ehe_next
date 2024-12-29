import { useRef, useState } from "react"
import { useLeadProfile } from "@/components/lead/features/leadPage/context/leadProfileContext"
import LeadProfileDetails, {
  LeadProfileDetailsRef,
} from "@/components/lead/features/leadPage/profile/profileForms/leadProfileDetails"
import LeadProfileAdditionalDetails from "@/components/lead/features/leadPage/profile/profileForms/leadProfileAdditionalDetails"
import LeadProfileFixedDetails from "./profileForms/leadProfileFixedDetails"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

import { Copy, Edit, X, Save } from "@/components/ui/icons"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const LeadProfile = () => {
  const { leadProfile } = useLeadProfile()
  const [isEditing, setIsEditing] = useState(false)
  const leadProfileDetailsRef = useRef<LeadProfileDetailsRef>(null)

  const handleSave = () => {
    if (isEditing && leadProfileDetailsRef.current) {
      leadProfileDetailsRef.current.submit()
      setIsEditing(false)
    }
  }

  return (
    <div className="py-4">
      <div className="flex md:flex-row flex-col gap-2 mx-2 items-stretch">
        <div className="md:w-1/3 h-full">
          <Card className="mb-2 shadow-none h-full">
            <CardHeader className="space-y-0 py-4 border-b flex-row justify-between">
              <div className="flex items-center justify-between w-full">
                <div className="flex gap-2 items-center">
                  <h6 className="font-semibold flex items-center">
                    Lead #{" "}
                    <span className="text-sky-600 ml-1">{leadProfile.id}</span>
                    <button className="ml-2">
                      <Copy color="gray" size={16} />
                    </button>
                  </h6>
                  <Badge
                    variant="secondary"
                    className="text-xs bg-green-600 font-normal text-gray-100 hover:bg-green-700 hover:text-white"
                  >
                    {leadProfile.status?.status || "Unknown"}
                  </Badge>
                </div>
                <div>
                  {!isEditing ? (
                    <TooltipProvider delayDuration={200}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button onClick={() => setIsEditing(true)}>
                            <Edit size={16} color="grey" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-500 text-gray-100">
                          <p className="text-sm">Edit </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <div className="flex items-center gap-2">
                      <TooltipProvider delayDuration={200}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button onClick={() => setIsEditing(false)}>
                              <X
                                size={18}
                                color="grey"
                                className="hover:stroke-red-700"
                              />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-gray-500 text-gray-100">
                            <p className="text-sm">Cancel </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider delayDuration={200}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button onClick={handleSave}>
                              <Save
                                size={16}
                                color="grey"
                                className="hover:stroke-sky-600"
                              />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-gray-500 text-gray-100">
                            <p className="text-sm">Save </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <LeadProfileDetails
                isEditing={isEditing}
                ref={leadProfileDetailsRef}
              />
            </CardContent>
          </Card>
          <Card className="shadow-none h-full">
            <CardContent className="py-4 px-6  text-sm ">
              <LeadProfileFixedDetails />
            </CardContent>
          </Card>
        </div>
        <div className="md:w-2/3">
          {/* Additional Info */}

          <LeadProfileAdditionalDetails />
        </div>
      </div>
    </div>
  )
}

export default LeadProfile
