import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, EllipsisVertical } from "@/components/ui/icons"
import classNames from "classnames"

const LeadSummaryCard = ({
  title,
  value,
  increasePercentage,
  isSelected,
  onClick,
}: {
  title?: string
  value?: string | number
  increasePercentage?: string | number
  isSelected?: boolean
  onClick: () => void
}) => {
  return (
    <Card
      className={classNames(
        "flex-1 cursor-pointer border rounded-lg transform transition-transform duration-200 hover:scale-105 hover:shadow-lg",
        isSelected
          ? "border-blue-500 bg-blue-50 shadow-md"
          : "border-gray-200 bg-white"
      )}
      onClick={onClick}
    >
      <CardHeader className="md:p-4 p-2 px-1 pb-1 ">
        <CardTitle className="flex items-center justify-between font-medium text-xs sm:text-lg text-gray-600">
          <span>{title}</span>
          <button>
            <EllipsisVertical
              size={16}
              className="text-gray-400 hover:text-gray-600"
            />
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row justify-between items-center gap-4 md:p-4 md:pt-0 py-2 px-1">
        {/* Mobile and Desktop Layout Adjustments */}
        <div className="w-full flex justify-between items-center">
          {/* Number of Leads */}
          <p className="text-base sm:text-3xl font-bold text-gray-900 sm:hidden block">
            {value}
          </p>
          <div className="sm:flex hidden flex-col items-center sm:items-start">
            <p className="text-gray-400 text-xs sm:text-sm">Leads</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">
              {value}
            </p>
          </div>

          {/* Percentage Increase */}
          <Badge
            className={classNames(
              "flex items-center md:p-2 p-1 gap-1 text-xs sm:text-lg rounded-md font-semibold",
              isSelected
                ? "bg-blue-500 text-white"
                : "bg-green-100 text-green-700"
            )}
          >
            <ArrowUp size={16} />
            {increasePercentage ?? "20"}%
          </Badge>
        </div>

      </CardContent>
    </Card>
  )
}

export default LeadSummaryCard
