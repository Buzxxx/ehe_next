import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, EllipsisVertical } from "@/components/ui/icons"
const LeadSummaryCard = ({
  title,
  value,
}: {
  title?: string
  value?: string | number
}) => {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="flex justify-between font-normal text-lg">
          {title}{" "}
          <button>
            <EllipsisVertical size={16} />
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p className="font-semibold text-3xl">{value}</p>
        <Badge>
          <ArrowUp />
          20%
        </Badge>
      </CardContent>
    </Card>
  )
}

export default LeadSummaryCard
