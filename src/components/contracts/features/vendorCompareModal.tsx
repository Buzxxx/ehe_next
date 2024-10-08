import { SelectedOptions } from "./contractsObject"
import VendorCompareTable from "../ui/vendorCompareTable"
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog"
import { isSelectedOptionsEmpty } from "./contractsObject"
import { Dispatch, SetStateAction } from "react"

const VendorCompareModal = ({
  showComparision,
  selectedOptions,
  setShowComparison,
  vendorComparisonData,
}: {
  showComparision?: boolean
  selectedOptions: SelectedOptions
  setShowComparison: Dispatch<SetStateAction<boolean>>
  vendorComparisonData: any
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
            selectedOptions={selectedOptions}
            vendorComparisonData={vendorComparisonData}
          />
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  )
}

export default VendorCompareModal
