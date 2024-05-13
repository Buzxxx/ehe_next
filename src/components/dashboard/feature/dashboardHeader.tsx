import Notifs from "../ui/notifs";
import MenuIcon from "@/components/ui/icons/menuIcon";
import ProfilePopover from "../ui/profilePopover";
import ProfileTab from "../ui/profileTab";

interface DashboardNavProps {
  onNext: () => void;
}

const DashboardHeader: React.FC<DashboardNavProps> = ({ onNext }) => {
  return (
    <nav className="flex bg-sky-500 justify-between w-full items-center text-white z-50 fixed top-0">
      <div className="bg-sky-600 min-w-64 h-full py-3 hidden md:block ">
        <h4 className="text-center mx-auto">CRM</h4>
      </div>
      <div className="flex justify-between flex-1 pr-4 items-center">
        <button className="hover:bg-sky-600 px-4 py-3" onClick={onNext}>
          <MenuIcon />
        </button>
        <div className="flex gap-2 items-center">
          <Notifs />
          <ProfilePopover
            trigger={<ProfileTab avatarClass="h-8 w-8" className="text-sm" />}
            src={"./base/profile.webp"}
            className="p-0 rounded-none mr-4"
          />
        </div>
      </div>
    </nav>
  );
}

export default DashboardHeader;
