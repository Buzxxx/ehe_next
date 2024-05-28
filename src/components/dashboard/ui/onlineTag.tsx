import GreenDot from "@/components/ui/icons/greenDot";
const OnlineTag = () => {
  return (
    <div className="flex gap-1 items-center">
      <GreenDot height={10} width={10} />
      <span className="text-xs">Online</span>
    </div>
  );
};

export default OnlineTag;
