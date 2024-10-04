import Modal from "@/components/ui/modal"
import React, { Suspense } from "react"
import VendorDetailsModal from "../features/vendorDetails"
import OverlayLoading from "@/components/ui/overlayLoading"
import { Spinner } from "@/components/ui/icons"
import LoadingSpinner from "../features/loadingSpinner"

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
