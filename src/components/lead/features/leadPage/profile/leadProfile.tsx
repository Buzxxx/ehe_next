import { useRef, useState } from "react"
import { useLeadProfile } from "@/components/lead/features/leadPage/context/leadProfileContext"
import LeadProfileDetails, {
  LeadProfileDetailsRef,
} from "@/components/lead/features/leadPage/profile/profileForms/leadProfileDetails"
import LeadProfileAdditionalDetails from "@/components/lead/features/leadPage/profile/profileForms/leadProfileAdditionalDetails"
import LeadProfileFixedDetails from "./profileForms/leadProfileFixedDetails"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Copy, Edit } from "@/components/ui/icons"
import { Save } from "lucide-react"

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
      <div className="flex md:flex-row flex-col gap-2 mx-2">
        <div className="md:w-1/3">
          <Card className="mb-4">
            <CardHeader className="space-y-0 max-md:px-2 py-4 border-b flex-row justify-between">
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
                    <button onClick={() => setIsEditing(true)}>
                      <Edit size={16} color="grey" />
                    </button>
                  ) : (
                    <button onClick={handleSave}>
                      <Save size={16} color="grey" />
                    </button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <LeadProfileDetails
                isEditing={isEditing}
                ref={leadProfileDetailsRef}
              />
            </CardContent>
          </Card>
          <Card className="mb-4">
            <CardContent>
              <LeadProfileFixedDetails />
            </CardContent>
          </Card>
        </div>
        <div className="md:w-2/3">
          {/* Additional Info */}
          <Card>
            <CardHeader className="space-y-0 max-md:px-2 py-4 border-b flex-row justify-between">
              <CardTitle className="text-lg font-medium">
                Additional Info
              </CardTitle>
            </CardHeader>
            <CardContent className="max-md:px-2 pb-8 mt-4">
              <LeadProfileAdditionalDetails />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default LeadProfile
