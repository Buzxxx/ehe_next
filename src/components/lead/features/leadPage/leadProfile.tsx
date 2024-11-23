import { Copy } from "@/components/ui/icons"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
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
    <div className="w-full">
      <Card className="px-2 py-0 w-full rounded-md border mt-4 bg-white shadow-sm">
        <CardHeader className="space-y-0 max-md:px-2 py-4 border-b flex-row justify-between  ">
          <div className="flex gap-2 items-center">
            <h4 className="text-lg font-medium">Additonional Details</h4>
            <Badge
              variant="secondary"
              className="text-xs bg-green-600 font-normal text-gray-100"
            >
              Active
            </Badge>
          </div>
          <h6 className="font-semibold flex items-center">
            Lead Id <span className="text-sky-600 ml-1">{leadProfile.id}</span>{" "}
            <button className="ml-2">
              <Copy color="gray" size={16} />
            </button>
          </h6>
        </CardHeader>
        <CardContent className="max-md:px-2 grid md:grid-cols-3 gap-4 mt-4">
          <EditableField
            fieldKey="lead_type"
            value={leadProfile.lead_type}
            textSize="sm"
            title="Lead Type"
            textAlign="right"
          />
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
            fieldKey="interested_in"
            value={leadProfile.interested_in}
            textSize="sm"
            title="Interested In"
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
  )
}

export default LeadProfile
