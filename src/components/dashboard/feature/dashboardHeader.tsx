import { Dispatch, SetStateAction } from "react";
import Notifs from "../ui/notifs";
import MenuIcon from "@/components/ui/icons/menuIcon";
import ProfilePopover from "../ui/profilePopover";
import ProfileTab from "../ui/profileTab";

interface DashboardNavProps {
  toggled: boolean;
  setToggled?: Dispatch<SetStateAction<boolean>>;
  onNext: () => void;
  name: string;
  img: string;
}

const DashboardHeader: React.FC<DashboardNavProps> = ({
  toggled,
  onNext,
  name,
  img,
}) => {
  return (
    <nav className="flex bg-dashboard-primary justify-between w-full items-center text-white z-50 fixed top-0">
      <div className="bg-dashboard-secondary min-w-56 h-full py-3 hidden md:block ">
        <h4 className="text-center mx-auto">CRM</h4>
      </div>
      <div className="flex justify-between flex-1 pr-4 items-center">
        <button
          className="hover:bg-dashboard-secondary px-4 py-3"
          onClick={onNext}
        >
          <MenuIcon />
        </button>
        <div className="flex gap-2 items-center">
          <Notifs />
          <ProfilePopover
            trigger={
              <ProfileTab
                name={name}
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
