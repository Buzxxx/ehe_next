import Avataar from "@/components/lead/ui/leadPage/avataar";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactElement } from "react";

interface ProfileTabProps {
  avatarClass?: string;
  className?: string;
  children?: ReactElement | null;
  profileNameTag?: string;
  name?: string;
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

export const ProfileTabSkeleton: React.FC<ProfileTabProps> = ({
  avatarClass = "h-10 w-10 rounded-full", // Default class for avatar
  className = "", // Default to an empty string
  profileNameTag,
}) => {
  return (
    <div className={`flex items-center py-2 gap-4 ${className}`}>
      {/* Avatar Skeleton */}
      <Skeleton className={avatarClass} />
      <div className={`flex flex-col gap-1 ${profileNameTag}`}>
        {/* Name Skeleton */}
        <Skeleton className="h-4 w-24" />
        {/* Optional Children Placeholder */}
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  )
}
