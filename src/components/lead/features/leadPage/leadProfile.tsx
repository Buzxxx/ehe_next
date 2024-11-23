import { Copy } from "@/components/ui/icons"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import EditableField from "../../../ui/editableField"
import { useLeadProfile } from "../../context/leadProfileContext"

const LeadProfile = () => {
  const { leadProfile, setLeadProfile } = useLeadProfile()

  // Update specific field in leadProfile
  const handleFieldSave = (fieldName: string, newValue: string) => {
    setLeadProfile((prev) => ({
      ...prev,
      [fieldName]: newValue, // Update the specific field
    }))
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex md:flex-row flex-col gap-2">
        {/* Lead Details */}
        <Card className="px-2 py-0 w-full md:rounded-md rounded-none border mt-4 bg-white md:shadow-sm shadow-none md:w-1/2">
          <CardHeader className="space-y-0 max-md:px-2 py-4 border-b flex-row justify-between">
            <div className="flex gap-2 items-center">
              <h4 className="text-lg font-medium">Lead Details</h4>
              <Badge
                variant="secondary"
                className="text-xs bg-green-600 font-normal text-gray-100"
              >
                {leadProfile.status ?? "Active"}
              </Badge>
            </div>
            <h6 className="font-semibold flex items-center">
              Lead Id{" "}
              <span className="text-sky-600 ml-1">{leadProfile.id}</span>{" "}
              <button className="ml-2">
                <Copy color="gray" size={16} />
              </button>
            </h6>
          </CardHeader>
          <CardContent className="max-md:px-2 grid md:grid-cols-1 gap-4 mt-4">
            <EditableField
              fieldKey="priority"
              value={leadProfile.priority}
              textSize="sm"
              title="Priority"
              textAlign="right"
            />
            <EditableField
              fieldKey="status"
              value={leadProfile.status}
              textSize="sm"
              title="Status"
              textAlign="right"
            />
            <EditableField
              fieldKey="interested_in"
              value={leadProfile.interested_in}
              textSize="sm"
              title="Interested In"
              textAlign="right"
            />
            <EditableField
              fieldKey="lead_type"
              value={leadProfile.lead_type}
              textSize="sm"
              title="Lead Type"
              textAlign="right"
            />
            <EditableField
              fieldKey="assigned_to"
              value={leadProfile.assigned_to}
              textSize="sm"
              title="Assigned To"
              textAlign="right"
            />
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card className="px-2 py-0 w-full md:rounded-md rounded-none border mt-4 bg-white md:shadow-sm shadow-none md:w-1/2">
          <CardHeader className="space-y-0 max-md:px-2 py-4 border-b flex-row justify-between">
            <CardTitle className="text-lg font-medium">
              Additional Info
            </CardTitle>
          </CardHeader>
          <CardContent className="max-md:px-2 grid md:grid-cols-1 gap-4 mt-4">
            <EditableField
              fieldKey="product_code"
              value={leadProfile.product_code}
              textSize="sm"
              title="Product Code"
              textAlign="right"
            />
            <EditableField
              fieldKey="product_type"
              value={leadProfile.product_type}
              textSize="sm"
              title="Product Type"
              textAlign="right"
            />
            <EditableField
              fieldKey="query"
              value={leadProfile.query}
              textSize="sm"
              title="Query"
              textAlign="right"
            />
            <EditableField
              fieldKey="source"
              value={leadProfile.source}
              textSize="sm"
              title="Source"
              textAlign="right"
            />
            <EditableField
              fieldKey="address"
              value={leadProfile.address}
              textSize="sm"
              title="Address"
              textAlign="right"
            />
          </CardContent>
        </Card>
      </div>

      {/* Notes Section */}
      <Card className="w-full rounded-md border bg-white shadow-sm">
        <CardHeader className="space-y-0 px-4 py-4 border-b">
          <CardTitle className="text-lg font-medium">Notes</CardTitle>
        </CardHeader>
        <CardContent className="md:px-4 px-2 py-6">
          <div className="space-y-4">
            <div className="border rounded-md p-4 bg-gray-50 transition-colors hover:bg-[#dfdfdf]/50">
              <h5 className="text-sm font-semibold text-gray-700">
                Follow-Up Scheduled
              </h5>
              <p className="text-sm text-gray-600">
                The lead is scheduled for a follow-up call on{" "}
                <strong>November 25, 2024</strong>. Ensure to confirm product
                interest during the call.
              </p>
              <span className="text-xs text-gray-400 block mt-2">
                Last updated: November 20, 2024
              </span>
            </div>
            <div className="border rounded-md p-4 bg-gray-50 transition-colors hover:bg-[#dfdfdf]/50">
              <h5 className="text-sm font-semibold text-gray-700">
                Initial Interaction
              </h5>
              <p className="text-sm text-gray-600">
                Met at the Tech Conference 2024. Expressed interest in SaaS
                solutions for mid-sized enterprises.
              </p>
              <span className="text-xs text-gray-400 block mt-2">
                Last updated: October 15, 2024
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LeadProfile
