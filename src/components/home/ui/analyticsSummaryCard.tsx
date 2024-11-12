/**
 * @path src/components/analytics/ui/analyticsSummaryCard.tsx
 */

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp } from "@/components/ui/icons"
const AnalyticsSummaryCard = () => {
  return (
    <Card className="flex-1 bg-gradient-to-b from-white to-[#efefef]">
      <CardHeader className="sm:p-6 sm:pt-2 p-2 flex-row justify-between items-center">
        <CardTitle className="flex justify-between font-normal sm:text-lg text-sm">
          Leads
        </CardTitle>
        <button className="p-1 rounded-full shadow-sm bg-[#dfdfdf]">
          <ArrowUp className="rotate-45 size-4 md:size-6" color="white" strokeWidth={1.5}  />
        </button>
      </CardHeader>
      <CardContent className="p-2 pt-0 md:p-6 md:pt-0 ">
        <p className=" text-base font-medium sm:font-semibold sm:text-5xl">
          400
        </p>
        <div className="flex md:gap-2 md:items-center mt-1 md:flex-row flex-col ">
          <Badge className="p-1 text-xs bg-green-400 py-0 w-fit">+10%</Badge>
          <span className="sm:text-sm text-xs">vs last month</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default AnalyticsSummaryCard
