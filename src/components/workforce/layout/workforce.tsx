import DashboardBreadcrumb from "@/components/dashboard/ui/breadcrumb"
import DashboardTopBar from "@/components/dashboard/ui/dashboardTopbar"
import WorkforceTabs from "../ui/workforceTabs"

const Work = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-neutral-600 font-normal">
          Workplace
          <span className="text-base font-medium ml-4">Control Panel</span>
        </h1>
        <DashboardBreadcrumb />
      </div>

      <DashboardTopBar />

      <div className="visitor-panel relative w-full">
        <WorkforceTabs />
      </div>
    </>
  )
}

export default Work
