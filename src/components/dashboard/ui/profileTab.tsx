import { ReactElement } from "react";
import Avataar from "./avataar";

interface User {
  name: string;
  img: string;
}

interface ProfileTabProps {
  user?: User;
  avatarClass?: string;
  className?: string;
  children?: ReactElement | null;
}

const ProfileTab: React.FC<ProfileTabProps> = ({
  user = { name: "Avinash Jha", img: "/base/profile.webp" },
  avatarClass,
  children,
  className
}) => {
  return (
    <div className={`flex items-center justify-around px-3 py-2 gap-2 ${className}`}>
      <Avataar src={user.img} className={avatarClass} />
      <div className="flex flex-col gap-1">
        <p>{user.name}</p>
        <span className="text-xs font-light">{children}</span>
      </div>
    </div>
  );
};

export default ProfileTab;
