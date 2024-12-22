import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy } from "@/components/ui/icons";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLeadProfile } from "@/components/lead/features/leadPage/context/leadProfileContext";

const LeadProfile = () => {
  const { leadProfile } = useLeadProfile();

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex md:flex-row flex-col gap-2">
        {/* Lead Details */}
        <Card className="px-2 py-0 w-full md:rounded-md rounded-none border mt-4 bg-white md:shadow-sm shadow-none md:w-1/2">
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
          <CardContent className="p-0 md:px-4 mt-4 flex md:flex-row flex-col gap-4 justify-between items-start">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid w-full max-w-sm items-center gap-1.5 col-span-2">
                <Label htmlFor="assigned_to">Assigned To</Label>
                <Input
                  type="text"
                  id="assigned_to"
                  value={leadProfile.assigned_to?.id || "Unassigned"}
                  readOnly
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5 col-span-2">
                <Label htmlFor="source_assigned">Source Assigned to</Label>
                <Input
                  type="text"
                  id="source_assigned"
                  value={leadProfile.source_assigned || "Unassigned"}
                  readOnly
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="priority">Priority</Label>
                <Input
                  type="text"
                  id="priority"
                  value={leadProfile.priority || ""}
                  readOnly
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="status">Status</Label>
                <Input
                  type="text"
                  id="status"
                  value={leadProfile.status?.status || ""}
                  readOnly
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="source">Source</Label>
                <Input
                  type="text"
                  id="source"
                  value={leadProfile.source || ""}
                  readOnly
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="created_at">Created At</Label>
                <Input
                  type="text"
                  id="created_at"
                  value={
                    leadProfile.created_dt
                      ? new Date(leadProfile.created_dt).toLocaleString()
                      : ""
                  }
                  readOnly
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="last_updated_at">Last Updated At</Label>
                <Input
                  type="text"
                  id="last_updated_at"
                  value={
                    leadProfile.last_updated_dt
                      ? new Date(leadProfile.last_updated_dt).toLocaleString()
                      : ""
                  }
                  readOnly
                />
              </div>
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
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="lead_type">Lead Type</Label>
              <Input
                type="text"
                id="lead_type"
                value={leadProfile.lead_type || ""}
                readOnly
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="budget">Budget</Label>
              <Input
                type="text"
                id="budget"
                value={leadProfile.budget || ""}
                readOnly
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 col-span-2">
              <Label htmlFor="follow_up_current_status">
                Follow-up Current Status
              </Label>
              <Input
                type="text"
                id="follow_up_current_status"
                value={leadProfile.follow_up_current_status || ""}
                readOnly
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 col-span-2">
              <Label htmlFor="interested_in">Interested In</Label>
              <Input
                type="text"
                id="interested_in"
                value={leadProfile.interested_in || ""}
                readOnly
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="product_code">Product Code</Label>
              <Input
                type="text"
                id="product_code"
                value={leadProfile.product_code || ""}
                readOnly
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="product_type">Product Type</Label>
              <Input
                type="text"
                id="product_type"
                value={leadProfile.product_type || ""}
                readOnly
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="received_date">Received Date</Label>
              <Input
                type="text"
                id="received_date"
                value={leadProfile.recieved_date || ""}
                readOnly
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="query">Query</Label>
              <Input
                type="text"
                id="query"
                value={leadProfile.query || ""}
                readOnly
              />
            </div>
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
