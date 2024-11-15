import DashboardBreadcrumb from "../../dashboard/ui/breadcrumb"
import WorkplaceMain from "../feature/workforceMain"
import WorkforceTopbar from "../feature/workforceTopbar"

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

      <WorkforceTopbar />

      <div className="visitor-panel position-relative w-full">
        <WorkplaceMain />
      </div>
    </>
  )
}

export default Work
