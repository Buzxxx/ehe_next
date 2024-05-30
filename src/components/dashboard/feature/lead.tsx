import DashboardBreadcrumb from "../ui/breadcrumb"
import DashboardTopBar from "../ui/dashboardTopbar"
import VisitorPanelBody from "../ui/visitorPanel"

const Lead = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-neutral-600 font-normal">
          Lead
          <span className="text-base font-medium ml-4">Control Panel</span>
        </h1>
        <DashboardBreadcrumb />
      </div>

      <DashboardTopBar />

      <div className="visitor-panel position-relative">
        <VisitorPanelBody />
      </div>
    </>
  )
}

export default Lead
