import { Copy } from "@/components/ui/icons"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import LeadEditableDetail2 from "../../ui/leadEditableDetail2"
import LeadActivityList from "../../ui/leadPage/leadActivityList"

const LeadProfile = ({
  isEditMode,
  id,
}: {
  isEditMode: boolean
  id: string
}) => {
  return (
    <div className="w-full">
      <Card className="px-2 py-4 w-full rounded-md border mt-4 bg-white shadow-sm">
        <CardHeader className="pt-0 max-md:px-2 py-4 border-b flex-row justify-between  ">
          <div className="flex gap-2 items-center">
            <h4 className="text-lg font-medium">Additonional Details</h4>
            <Badge
              variant="secondary"
              className="text-xs bg-green-600 font-normal text-gray-100"
            >
              Active
            </Badge>
          </div>
          <h6 className="font-semibold">
            EMP <span className="text-sky-600 ">020040</span>{" "}
            <button className="ml-2">
              <Copy color="gray" size={16} />
            </button>
          </h6>
        </CardHeader>
        <CardContent className="max-md:px-2 grid md:grid-cols-3 gap-4 mt-4">
          <LeadEditableDetail2
            isEditMode={isEditMode}
            fieldKey="lead_type"
            title="Lead Type"
            value="D"
          />
          <LeadEditableDetail2
            isEditMode={isEditMode}
            fieldKey="product_code"
            title="Product Code"
            value="ABCD"
          />
          <LeadEditableDetail2
            isEditMode={isEditMode}
            fieldKey="product_type"
            title="Product Type"
            value="D"
          />
          <LeadEditableDetail2
            isEditMode={isEditMode}
            fieldKey="query"
            title="Query"
            value="F"
          />
          <LeadEditableDetail2
            isEditMode={isEditMode}
            span={2}
            fieldKey="interested_in"
            title="Interested In"
            value="34432 Helium Fields, New York, NY"
          />
          <LeadEditableDetail2
            isEditMode={isEditMode}
            fieldKey="source"
            title="Source"
            value="99 Acres"
          />
          <LeadEditableDetail2
            isEditMode={isEditMode}
            span={2}
            fieldKey="address"
            title="Address"
            value="004 Gurugram, Harayana, India"
          />
        </CardContent>
      </Card>
      <LeadActivityList />
    </div>
  )
}

export default LeadProfile
