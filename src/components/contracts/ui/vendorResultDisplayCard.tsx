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

interface VendorResultDisplayCardProps {
  vendorId: string
  isSelected: boolean
  onSelectVendor: (vendorId: string, isSelected: boolean) => void
  vendorName: string
  vendorLogo: string
  vendorDesc: string
  vendorLocation: string
  vendorServices: string
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
  estYr
}: VendorResultDisplayCardProps) => {
  const router = useRouter()

  const openVendorModal = (vendorId: string) => {
    router.push(`/contracts/vendor/${vendorId}`)
  }

  const handleCheckboxClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation()
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectVendor(vendorId, e.target.checked)
  }

  return (
    <div
      onClick={() => openVendorModal(vendorId)}
      className={`flex md:p-6 px-2 py-4 gap-3 flex-col rounded-2xl drop-shadow-lg shadow-lg cursor-pointer ${styles.vendorResultDisplayCard}`}
    >
      <div className="flex items-center justify-between gap-4">
        <Input
          type="checkbox"
          className="bg-transparent border border-gray-300 h-4 w-4 self-start"
          onClick={handleCheckboxClick}
          onChange={handleCheckboxChange}
          checked={isSelected}
        />
        <div className="flex justify-between items-stretch flex-1">
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

          <div className="flex flex-col gap-1 md:w-[12.5%] text-center">
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

      <p className={`${styles.textGray} text-xs px-2 line-clamp-2`}>
        {vendorDesc}
      </p>

      <div className="flex rounded-lg bg-gray-400/10 md:p-4">
        <div className="flex justify-between w-full">
          <div className="flex items-center md:gap-6 gap-2 md:text-sm text-xs font-semibold">
            <div className="flex items-center gap-1">
              <MapPin className={`${styles.textGray} stroke-2`} size={20} />
              <p className={styles.textPrimary}>{vendorLocation}</p>
            </div>
            <div className="flex items-center gap-1">
              <ReceiptText
                className={`${styles.textGray} stroke-2`}
                size={20}
              />
              <p className={styles.textPrimary}>{vendorServices}</p>
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
