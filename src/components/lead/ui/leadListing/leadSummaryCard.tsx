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
      <CardHeader className="sm:p-6 p-2">
        <CardTitle className="flex justify-between font-normal sm:text-lg text-sm">
          {title}{" "}
          <button>
            <EllipsisVertical size={16} className="size-4 md:" />
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between p-2 md:p-6 md:pt-0 items-center">
        <p className=" text-base font-medium sm:font-semibold sm:text-3xl">
          {value}
        </p>
        <Badge className="p-1 py-0 sm:p-2 sm:text-xl   bg-sky-600/80 hover:bg-sky-600 ">
          <ArrowUp />
          20%
        </Badge>
      </CardContent>
    </Card>
  )
}

export default LeadSummaryCard
