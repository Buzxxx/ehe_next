/**
 * @path src/components/teams/ui/workCard.tsx
 */


import Avataar from "@/components/lead/ui/leadPage/avataar"
import Link from "next/link"

export const WorkCard = ({
  name,
  email,
  phone,
  onClick,
}: {
  name: string
  email: string
  phone: string
  onClick: () => void
}) => (
  <div
    onClick={onClick}
    className="border-b h-fit flex items-center justify-between px-2 py-2 cursor-pointer hover:bg-gray-50 transition-colors"
  >
    <div className="flex gap-2">
      <Link href="#" className="flex gap-2 items-center">
        <Avataar className="w-8 h-8" />
        <div>
          <h6 className="font-medium text-sm">{name}</h6>
          <p className="text-gray-500 text-xs">{email}</p>
        </div>
      </Link>
    </div>
  </div>
)
