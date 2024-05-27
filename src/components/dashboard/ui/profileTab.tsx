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
  profileNameTag?: string;
}

const ProfileTab: React.FC<ProfileTabProps> = ({
  user = { name: "Avinash Jha", img: "/base/profile.svg" },
  avatarClass,
  children,
  className,
  profileNameTag
}) => {
  return (
    <div className={`flex items-center justify-around py-2 gap-2 ${className}`}>
      <Avataar src={user.img} className={avatarClass} />
      <div className={`flex-col gap-1 ${profileNameTag}`}>
        <p>{user.name}</p>
        <span className="text-xs font-light">{children}</span>
      </div>
    </div>
  );
};

export default ProfileTab;
