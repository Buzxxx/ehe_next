/**
 * @path src/components/contracts/ui/vendorResultDisplayCard.tsx
 */

import { Badge } from "@/components/ui/badge"
import { BadgeCheck, MapPin, ReceiptText } from "@/components/ui/icons"
import Image from "next/image"
import styles from "@/app/contracts/contract.module.css"
import CircularProgress from "@/components/ui/icons/circularProgressBar"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface VendorResultDisplayCardProps {
  vendorId: string
  isSelected: boolean
  onSelectVendor: (vendorId: string, isSelected: boolean) => void
  vendorName: string
  vendorLogo: string
  vendorDesc: string
  vendorLocation: string
  vendorServices: string[]
  vendorMatchPercentage: number
  isVerified: boolean
  estYr: number
}

const VendorResultDisplayCard = ({
  vendorId,
  isSelected,
  onSelectVendor,
  vendorName,
  vendorLogo,
  vendorDesc,
  vendorLocation,
  vendorServices,
  vendorMatchPercentage,
  isVerified,
  estYr,
}: VendorResultDisplayCardProps) => {
  const router = useRouter()
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)

  const openVendorModal = (vendorId: string) => {
    router.push(`/contracts/vendor/${vendorId}`)
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectVendor(vendorId, e.target.checked)
  }

  // Limit how many characters we display inline before adding "..."
  const MAX_CHARACTERS_INLINE = 30

  const displayFeaturesInline =
    vendorServices.join(", ").slice(0, MAX_CHARACTERS_INLINE) +
    (vendorServices.join(", ").length > MAX_CHARACTERS_INLINE ? "..." : "")

  return (
    <div
      className={`flex md:p-6 px-2 py-4 gap-3 flex-col rounded-2xl drop-shadow-lg shadow-lg cursor-pointer relative ${styles.vendorResultDisplayCard}`}
      style={{ zIndex: isTooltipVisible ? 10 : 1 }}
    >
      <div className="flex items-center justify-between gap-4">
        <Input
          type="checkbox"
          className="bg-transparent border border-gray-300 h-4 w-4 self-start"
          onChange={handleCheckboxChange}
          checked={isSelected}
        />
        <div className="flex justify-between items-stretch flex-1">
          <div
            className="flex flex-col gap-2 w-[92%] "
            onClick={() => openVendorModal(vendorId)}
          >
            <div className="flex items-center gap-2 border-r border-slate-200 md:w-fit">
              <span className="h-12 w-12 rounded-full border border-slate-200 bg-white p-1 flex items-center justify-center">
                <Image
                  src={vendorLogo}
                  alt={`${vendorName} logo`}
                  width={160}
                  height={160}
                  className="rounded-full w-full"
                />
              </span>
              <div>
                <h4 className={`${styles.textPrimary} font-bold`}>
                  {vendorName}
                </h4>
                <p className={`${styles.textGray} text-xs`}>Estd. {estYr}</p>
              </div>
            </div>
            <p className={`${styles.textGray} text-xs px-2 line-clamp-2`}>
              {vendorDesc}
            </p>
          </div>

          <div className="flex flex-col gap-1 flex-1 md:w-[20%] text-center">
            <p className={`uppercase ${styles.textGray} text-xs text-center`}>
              Match %
            </p>
            <div className="flex justify-center">
              <CircularProgress
                percentage={vendorMatchPercentage}
                size={40}
                strokeWidth={3}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex rounded-lg bg-gray-400/10 md:p-4">
        <div className="flex justify-between w-full">
          <div className="flex items-center md:gap-6 gap-2 md:text-sm text-xs font-semibold">
            
            <div className="relative flex items-center gap-1">
              <MapPin className={`${styles.textGray} stroke-2`} size={20} />
              <p className={styles.textPrimary}>{vendorLocation}</p>
            </div>
            {/* Matched Services with Tooltip */}
            <div
              className="relative flex items-center gap-1"
              onMouseEnter={() => setIsTooltipVisible(true)}
              onMouseLeave={() => setIsTooltipVisible(false)}
            >
              <ReceiptText
                className={`${styles.textGray} stroke-2`}
                size={20}
              />

              <p className={styles.textPrimary}>{displayFeaturesInline}</p>
              {/* Show Tooltip if there are more features */}
              {vendorServices.length > 1 && isTooltipVisible && (
                <div
                  className="absolute top-full left-0 mt-2 w-auto max-w-xs bg-gray-800 text-white p-2 rounded-md shadow-lg text-xs"
                  style={{ zIndex: 100 }}
                >
                  {vendorServices.map((service) => (
                    <p key={service} className="whitespace-pre-wrap">
                      {service}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isVerified && (
              <Badge
                variant="default"
                className="rounded-md bg-green-600 flex gap-1 py-1 max-md:text-xs"
              >
                <BadgeCheck size={16} />
                Verified
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VendorResultDisplayCard
