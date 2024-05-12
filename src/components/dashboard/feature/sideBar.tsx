import SideNavMenu from "../ui/sideNavMenu";
import OnlineTag from "../ui/onlineTag";
import ProfileTab from "../ui/profileTab";

const DashboardSideMenu = ({
  toggled,
  online,
}: {
  toggled: boolean;
  online?: boolean;
}) => {
  return (
    <div
      className={`${
        toggled ? "w-64 py-2" : "w-0 p-0"
      } overflow-hidden flex flex-col bg-zinc-800 items-center transition-all h-screen`}
    >
      <div className="flex gap-3 items-center justify-start w-full px-4 ">
        <div className="text-white text-left flex flex-col">
          <ProfileTab avatarClass="h-12 w-12" className="mb-1 font-semibold text-base">
            {online ? <OnlineTag /> : null}
          </ProfileTab>
        </div>
      </div>
      <div className="bg-zinc-900 py-2 px-4 w-full text-neutral-500">
        <p>MAIN NAVIGATION</p>
      </div>
      <SideNavMenu />
    </div>
  );
};

export default DashboardSideMenu;
