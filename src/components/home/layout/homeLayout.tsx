/**
 * @path src/components/home/layout/homeLayout.tsx
 */

import Tasks from "@/app/(dashboard)/task/page"
import AnalyticsCard from "../ui/analyticsCard"
import AnalyticsSummaryCard from "../ui/analyticsSummaryCard"
import RequestsCard from "../ui/requestsCard"
import TasksCard from "../ui/tasksCard"

const HomeLayout = () => {
  return (
    <>
      <div className="flex justify-between w-full gap-2">
        <AnalyticsSummaryCard />
        <AnalyticsSummaryCard />
        <AnalyticsSummaryCard />
      </div>
      <div className="mt-2 grid md:grid-cols-3 gap-2 md:grid-rows-2 items-stretch">
        <div className="md:col-span-1 flex flex-col gap-2 row-span-2">
          <RequestsCard />
          <TasksCard />
        </div>
        <div className="md:col-span-2 row-span-2 h-full">
          <AnalyticsCard />
        </div>
      </div>
    </>
  )
}

export default HomeLayout
