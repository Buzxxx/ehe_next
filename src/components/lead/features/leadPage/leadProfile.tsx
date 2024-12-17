import { Copy } from "@/components/ui/icons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EditableField from "../../../ui/editableField";
import { useLeadProfile } from "../context/leadProfileContext";

const LeadProfile = () => {
  const { leadProfile, setLeadProfile } = useLeadProfile();

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
                {leadProfile.status.status ?? "Active"}
              </Badge>
            </div>
            <h6 className="font-semibold flex items-center">
              Lead # <span className="text-sky-600 ml-1">{leadProfile.id}</span>{" "}
              <button className="ml-2">
                <Copy color="gray" size={16} />
              </button>
            </h6>
          </CardHeader>
          <CardContent className="p-0 md:px-4 mt-4 flex md:flex-row flex-col gap-4 justify-between items-start">
            <div className="grid grid-cols-2 gap-4">
              <EditableField
                fieldKey="assigned_to"
                value={leadProfile.assigned_to.id ?? "Unassigned"}
                title="Assigned To"
                isEditable={false}
                span={2}
              />
              <EditableField
                fieldKey="source_assigned"
                value={leadProfile.source_assigned ?? "Unassigned"}
                title="Source Assigned to"
                isEditable={false}
                span={2}
              />
              <EditableField
                fieldKey="priority"
                value={leadProfile.priority ?? "Unknown"}
                title="Priority"
                isEditable={false}
              />
              <EditableField
                fieldKey="status"
                value={leadProfile.status.status ?? "-"}
                title="Status"
                isEditable={false}
              />

              <EditableField
                fieldKey="source"
                value={leadProfile.source ?? "Unknown"}
                title="Source"
                isEditable={false}
              />
              <EditableField
                fieldKey="created_dt"
                value={new Date(leadProfile.created_dt).toLocaleString()}
                title="Created at"
                isEditable={false}
              />
              <EditableField
                fieldKey="last_updated_dt"
                value={new Date(leadProfile.last_updated_dt).toLocaleString()}
                title="Last updated at"
                isEditable={false}
              />
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card className="px-2 py-0 w-full md:rounded-md rounded-none border mt-4 bg-white md:shadow-sm shadow-none md:w-1/2">
          <CardHeader className="space-y-0 max-md:px-2 py-4 border-b flex-row justify-between">
            <CardTitle className="text-lg font-medium">
              Additional Info
            </CardTitle>
          </CardHeader>
          <CardContent className="max-md:px-2 pb-8 grid md:grid-cols-1 gap-4 mt-4">
            <EditableField
              fieldKey="lead_type"
              value={leadProfile.lead_type}
              title="Lead Type"
              span={1}
            />
            <EditableField
              fieldKey="budget"
              value={leadProfile.budget}
              title="Budget"
              span={1}
            />
            <EditableField
              fieldKey="follow_up_current_status"
              value={leadProfile.follow_up_current_status}
              title="Follow up current status"
              span={2}
            />
            <EditableField
              fieldKey="interested_in"
              value={leadProfile.interested_in}
              title="Interested In"
              span={2}
            />
            <EditableField
              fieldKey="product_code"
              value={leadProfile.product_code}
              title="Product code"
            />
            <EditableField
              fieldKey="product_type"
              value={leadProfile.product_type}
              title="Product Type"
            />
            <EditableField
              fieldKey="recieved_date"
              value={leadProfile.recieved_date}
              title="Recieved date"
            />
            <EditableField
              fieldKey="query"
              value={leadProfile.query}
              title="Query"
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
  );
};

export default LeadProfile;
