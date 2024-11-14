import AnalyticsSummaryCard from "../../home/ui/analyticsSummaryCard"
import { BarChartCard } from "../ui/barChart"
import EmployeeTable from "../features/employeesTable/employeeTable"

export default async function AnalyticsLayout() {
  return (
    <div className="grid grid-cols-3 gap-2 place-items-stretch items-stretch">
      <div className="col-span-1 row-span-1 h-fit">
        <AnalyticsSummaryCard />
      </div>
      <div className="col-span-1 row-span-1 h-fit">
        <AnalyticsSummaryCard />
      </div>
      <div className="col-span-1 row-span-1 h-fit">
        <AnalyticsSummaryCard />
      </div>
      <div className="col-span-2 row-span-3 h-fit">
        <BarChartCard />
      </div>
      <div className="col-span-1 row-span-1 ">
        <AnalyticsSummaryCard />
      </div>
      <div className="col-span-1 row-span-1 ">
        <AnalyticsSummaryCard />
      </div>
      <div className="col-span-1 row-span-1 ">
        <AnalyticsSummaryCard />
      </div>

      <div className="col-span-3">
        <EmployeeTable />
      </div>
    </div>
  )
}
