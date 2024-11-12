
import AnalyticsSummaryCard from "../../home/ui/analyticsSummaryCard"
import { BarChartCard } from "../ui/barChart"
import { PieChartCard } from "../ui/pieChart"
import { RadialChart } from "../ui/radialChart"
import EmployeeTable from "../features/employeesTable/employeeTable"

export default async function AnalyticsLayout() {
  return (
    <>
      <div className="flex justify-between w-full gap-2">
        <AnalyticsSummaryCard />
        <AnalyticsSummaryCard />
        <AnalyticsSummaryCard />
      </div>
      <div className="grid gap-2 grid-cols-3 grid-rows-2 mt-2">
        <div className="col-span-2 row-span-2">
          <BarChartCard />
        </div>
        <div className="row-span-1">
          <PieChartCard />
        </div>
        <RadialChart />
      </div>
      <EmployeeTable />
    </>
  )
}
