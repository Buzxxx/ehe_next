/**
 * @path src/components/lead/ui/leadListing/leadSummaryCard.tsx
 * @description LeadSummaryCard component for the lead listing page
 */

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, EllipsisVertical } from "@/components/ui/icons"
import classNames from "classnames"

const LeadSummaryCard = ({
  title,
  value,
  isSelected,
  onClick,
}: {
  title?: string
  value?: string | number
  isSelected?: boolean
  onClick: () => void
}) => {
  return (
    <Card
      className={classNames(
        "flex-1 cursor-pointer border transform transition-transform duration-200 hover:scale-105 hover:shadow-lg",
        isSelected
          ? "border-blue-500 bg-blue-50 shadow-md"
          : "border-gray-200 bg-white"
      )}
      onClick={onClick} // Handle card click
    >
      <CardHeader className="sm:p-6 p-2 md:pb-0">
        <CardTitle className="flex justify-between font-medium text-sm sm:text-lg ">
          {title}{" "}
          <button>
            <EllipsisVertical
              size={20}
              className="text-gray-400 hover:text-gray-600"
            />
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-center p-3 md:p-4">
        <p className="text-lg sm:text-3xl font-bold text-gray-800">{value}</p>
        <Badge
          className={classNames(
            "flex items-center p-2 sm:text-lg transition-colors",
            isSelected ? "bg-blue-600 hover:bg-blue-500" : "bg-gray-300"
          )}
        >
          <ArrowUp className="mr-1" />
          20%
        </Badge>
      </CardContent>
    </Card>
  )
}

export default LeadSummaryCard
