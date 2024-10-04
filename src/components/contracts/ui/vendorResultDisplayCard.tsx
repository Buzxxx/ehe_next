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

const VendorResultDisplayCard = ({
  vendorId,
  isSelected,
  onSelectVendor,
}: {
  vendorId: string
  isSelected: boolean
  onSelectVendor: (vendorId: string, isSelected: boolean) => void
}) => {
  const router = useRouter()
  const openVendorModal = (vendorId: string) => {
    router.push(`/contracts/vendor/${vendorId}`)
  }

  // Prevent event from propagating when clicking on the checkbox
  const handleCheckboxClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation() // Prevent navigation on checkbox click
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectVendor(vendorId, e.target.checked) // Use ChangeEvent to manage selection
  }

  return (
    <div
      onClick={() => openVendorModal("1")}
      className={`flex md:p-6 px-2 py-4 gap-3 flex-col rounded-2xl drop-shadow-lg shadow-lg
         cursor-pointer ${styles.vendorResultDisplayCard}`}
    >
      <div className="flex items-center justify-between gap-4">
        <Input
          type="checkbox"
          className="bg-transparent border border-gray-300 h-4 w-4 self-start "
          onClick={handleCheckboxClick}
          onChange={handleCheckboxChange}
          checked={isSelected}
        />
        <div className="flex justify-between items-stretch flex-1 ">
          <div className="flex items-center gap-2 border-r border-slate-200 md:w-[22%] ">
            <span className="h-12 w-12 rounded-full border border-slate-200 bg-white p-1 flex items-center justify-center">
              <Image
                src={"/contracts/images/eraclm-logo.png"}
                alt="logo"
                width={160}
                height={160}
                className="rounded-full w-full"
              />
            </span>

            <div>
              <h4 className={`${styles.textPrimary} font-bold`}>Mitratech</h4>
              <p className={`${styles.textGray} text-xs`}>Estd. 1947</p>
            </div>
          </div>

          <div className="flex flex-col gap-1 md:w-[12.5%] text-center">
            <p className={`uppercase ${styles.textGray} text-xs text-center`}>
              Match %
            </p>
            <div className="flex justify-center">
              <CircularProgress percentage={26} size={40} strokeWidth={3} />
            </div>
          </div>
        </div>
      </div>
      <p className={`${styles.textGray} text-xs px-2  line-clamp-2 `}>
        Founded in 1987, Mitratech Holdings, Inc. created its first software
        product, which was designed to help law firms with legal matter
        management. Mitratech has over 50% of the Fortune 1000 as clients, and
        with its recent acquisitions can now address any type of use case
        related to a corporate legal department’s oversight of contracts,
        matters and risk. It is a Delaware C Corporation, and is privately held
        by Ontario Teachers’ Pension Plan, headquartered in Toronto, ON.
      </p>
      <div className="flex rounded-lg bg-gray-400/10 md:p-4 ">
        <div className={` flex justify-between w-full`}>
          <div className="flex items-center md:gap-6 gap-2 md:text-sm text-xs font-semibold">
            <div className="flex items-center gap-1">
              <MapPin className={`${styles.textGray} stroke-2`} size={20} />
              <p className={styles.textPrimary}>Mumbai, </p>
            </div>
            <div className="flex items-center gap-1">
              <ReceiptText
                className={`${styles.textGray} stroke-2`}
                size={20}
              />
              <p className={styles.textPrimary}>12 Services</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="default"
              className={`rounded-md bg-green-600 flex gap-1 py-1 max-md:text-xs`}
            >
              <BadgeCheck size={16} />
              Verified
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VendorResultDisplayCard
