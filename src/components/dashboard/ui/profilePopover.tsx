import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Avataar from "./avataar";

interface ProfilePopoverProps {
  className: string;
  trigger: React.ReactNode;
  src: string;
  username?: string;
  role?: string;
  lastLogin?: string;
}

const ProfilePopover: React.FC<ProfilePopoverProps> = ({
  className,
  trigger,
  src,
  username,
  role,
  lastLogin,
}) => {
  return (
    <Popover>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent className={className}>
        <div className="p-4 flex flex-col justify-center items-center bg-sky-500 text-white">
          <div className="border-2 mb-3 p-2 rounded-full border-sky-200">
            <Avataar className="w-16 h-16" src={src} />
          </div>
          <h4 className="text-md mb-1">
            {username ? username + "&nbsp; -- &nbsp; " : "Guest"}

            {role ? role : ""}
          </h4>
          <p className="text-xs">
            Last Login - &nbsp;
            {lastLogin ? lastLogin : "Recently"}
          </p>
        </div>
        <div className="p-2 w-full flex justify-end">
          <button className="py-2 px-2 bg-slate-300 hover:bg-slate-200 ">
            Log Out
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProfilePopover;
