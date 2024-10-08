import { Suspense } from "react"
import Modal from "@/components/ui/modal"
import VendorDetailsModal from "../features/vendorDetails"
import LoadingSpinner from "../ui/loadingSpinner"

const VendorModalLayout = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Modal>
        <VendorDetailsModal />
      </Modal>
    </Suspense>
  )
}

export default VendorModalLayout
