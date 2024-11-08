/**
 * @path src/components/analytics/ui/analyticsSummaryCard.tsx
 */

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp } from "@/components/ui/icons"
const AnalyticsSummaryCard = () => {
  return (
    <Card className="flex-1 ">
      <CardHeader className="sm:p-6 sm:pt-2 p-2 flex-row justify-between items-center">
        <CardTitle className="flex justify-between font-normal sm:text-lg text-sm">
          Leads
        </CardTitle>
        <button className="p-1 rounded-full shadow-sm bg-[#dfdfdf]">
          <ArrowUp className="rotate-45" color="white" strokeWidth={1.5} />
        </button>
      </CardHeader>
      <CardContent className="p-2 md:p-6 md:pt-2 ">
        <p className=" text-base font-medium sm:font-semibold sm:text-3xl">
          400
        </p>
        <div className="flex gap-2 items-center">
          <Badge className="p-1 text-xs bg-green-400">+10%</Badge>
          <span className="sm:text-sm text-xs">Than last month</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default AnalyticsSummaryCard
