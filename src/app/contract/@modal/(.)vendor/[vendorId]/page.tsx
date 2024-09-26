/**
 * @path src/app/contract/@modal/(.)vendor/[vendorId]/page.tsx
 */

import VendorDetailsModal from "@/components/contracts/ui/vendorDetailsModal"
import Modal from "@/components/ui/modal"

const VendorPage = () => {
  return (
    <Modal >
      <VendorDetailsModal />
    </Modal>
  )
}

export default VendorPage
