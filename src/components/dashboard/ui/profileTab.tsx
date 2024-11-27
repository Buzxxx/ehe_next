import Avataar from "@/components/lead/ui/leadPage/avataar";
import { ReactElement } from "react";

interface ProfileTabProps {
  avatarClass?: string;
  className?: string;
  children?: ReactElement | null;
  profileNameTag?: string;
  name: string;
  img?: string;
}

const ProfileTab: React.FC<ProfileTabProps> = ({
  avatarClass,
  children,
  className = "", // Default to an empty string
  profileNameTag,
  name,
  img,
}) => {
  return (
    <div className={`flex items-center py-2 gap-4 ${className}`}>
      <Avataar src={img} className={avatarClass} />
      <div className={`flex flex-col gap-1 ${profileNameTag}`}>
        <p>{name}</p>
        {children && <span className="text-xs font-light">{children}</span>}
      </div>
    </div>
  );
};

export default ProfileTab;
