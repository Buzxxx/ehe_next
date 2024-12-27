import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy } from "@/components/ui/icons";
import LeadProfileDetails from "@/components/lead/features/leadPage/profile/profileForms/leadProfileDetails";
import LeadProfileAdditionalDetails from "@/components/lead/features/leadPage/profile/profileForms/leadProfileAdditionalDetails";
import LeadProfileFixedDetails from "./profileForms/leadProfileFixedDetails";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLeadProfile } from "@/components/lead/features/leadPage/context/leadProfileContext";

const LeadProfile = () => {
  const { leadProfile } = useLeadProfile();

  return (
    <div className="py-4">
      <div className="flex md:flex-row flex-col gap-2 mx-2">
        <div className="md:w-1/3">
          {" "}
          {/* Lead Details */}
          <Card className="mb-4">
            <CardHeader className="space-y-0 max-md:px-2 py-4 border-b flex-row justify-between">
              <div className="flex gap-2 items-center">
                <h6 className="font-semibold flex items-center">
                  Lead #{" "}
                  <span className="text-sky-600 ml-1">{leadProfile.id}</span>{" "}
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
            </CardHeader>
            <CardContent className="">
              <LeadProfileDetails></LeadProfileDetails>
            </CardContent>
          </Card>
          <Card className="mb-4">
            <CardContent className="">
              <LeadProfileFixedDetails></LeadProfileFixedDetails>
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
            <CardContent className="max-md:px-2 pb-8  mt-4">
              <LeadProfileAdditionalDetails></LeadProfileAdditionalDetails>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Notes Section */}
      <Card className=" rounded-md border shadow-sm mx-2">
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
