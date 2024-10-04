import { SelectedOptions } from "./contractsObject"
import VendorCompareTable from "../ui/vendorCompareTable"
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog"
import { isSelectedOptionsEmpty } from "./contractsObject"
import { Dispatch, SetStateAction } from "react"

const VendorCompareModal = ({
  showComparision,
  selectedOptions,
  selectedVendors,
  setShowComparison,
}: {
  showComparision?: boolean
  selectedOptions: SelectedOptions
  selectedVendors: string[]
  setShowComparison: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <Dialog
      open={showComparision && !isSelectedOptionsEmpty(selectedOptions)}
      defaultOpen={false}
      onOpenChange={() => setShowComparison(false)}
    >
      <DialogOverlay className="">
        <DialogContent className="h-[400] overflow-scroll transition-all px-2">
          <VendorCompareTable
            selectedVendors={selectedVendors}
            selectedOptions={selectedOptions}
          />
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  )
}

export default VendorCompareModal
