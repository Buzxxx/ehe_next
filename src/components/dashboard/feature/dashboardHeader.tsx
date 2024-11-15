import Notifs from "../ui/notifs";
import MenuIcon from "@/components/ui/icons/menuIcon";
import ProfilePopover from "../ui/profilePopover";
import ProfileTab from "../ui/profileTab";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface DashboardNavProps {
  onNext?: () => void;
  name?: string;
  img?: string;
}

const DashboardHeader: React.FC<DashboardNavProps> = ({
  onNext,
  name,
  img,
}) => {
  return (
    <nav className="flex bg-white justify-between w-full items-center z-50 fixed top-0 border py-1">
      <div className=" min-w-64 h-full py-3 hidden md:block border-r ">
        <h4 className="text-center mx-auto">CRM</h4>
      </div>
      <div className="flex justify-between flex-1 pr-4 items-center">
        <SidebarTrigger
          className=" px-4 py-3"
          onClick={onNext}
        >
          <MenuIcon />
        </SidebarTrigger>
        <div className="flex gap-2 items-center">
          <Notifs />
          <ProfilePopover
            trigger={
              <ProfileTab
                name={name ?? "Loading..."}
                img={img}
                avatarClass="h-8 w-8"
                className="text-sm px-3"
                profileNameTag="md:flex hidden"
              />
            }
            src={"./base/profile.webp"}
            className="p-0 rounded-none mr-4"
          />
        </div>
      </div>
    </nav>
  );
};

export default DashboardHeader;
