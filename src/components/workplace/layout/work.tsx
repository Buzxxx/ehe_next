import DashboardBreadcrumb from "../../dashboard/ui/breadcrumb"
import DashboardTopBar from "../../dashboard/ui/dashboardTopbar"
import WorkplaceMain from "../feature/workplaceMain"

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

      <div className="visitor-panel position-relative w-full">
        <WorkplaceMain />
      </div>
    </>
  )
}

export default Work
