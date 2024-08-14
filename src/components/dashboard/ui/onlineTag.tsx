import GreenDot from "@/components/ui/icons/greenDot"
const OnlineTag = ({ text = "Online" }: { text?: "Online" | string }) => {
  return (
    <span>
      <GreenDot height={10} width={10} />
      <span className="text-xs pl-2">{text}</span>
    </span>
  )
}

export default OnlineTag
