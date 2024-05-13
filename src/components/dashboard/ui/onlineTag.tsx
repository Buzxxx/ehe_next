import GreenDot from "@/components/ui/icons/greenDot";
const OnlineTag = () => {
  return (
    <div className="flex gap-1 items-center">
      <GreenDot height={12} width={12} />
      <span>Online</span>
    </div>
  );
};

export default OnlineTag;
