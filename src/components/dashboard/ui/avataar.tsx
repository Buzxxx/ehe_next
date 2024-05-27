import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Avataar = ({ className, src }: { className?: string; src: string }) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={src ? src : "./base/profile.svg"} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
export default Avataar;
