import DashboardBreadcrumb from "../../dashboard/ui/breadcrumb"
import WorkplaceMain from "../feature/workforceMain"
import WorkforceTopbar from "../feature/workforceTopbar"

const Work = () => {
  return (
    <>
      <WorkforceTopbar />

      <div className="visitor-panel position-relative w-full rounded-md">
        <WorkplaceMain />
      </div>
    </>
  )
}

export default Work
