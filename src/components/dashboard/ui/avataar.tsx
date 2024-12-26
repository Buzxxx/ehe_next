import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Avataar = ({ className, src, imgClass }: {imgClass?: string, className?: string; src?: string }) => {
  return (
    <Avatar className={className}>
      <AvatarImage className={imgClass} src={src ? src : "./base/profile.webp"} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
export default Avataar;
