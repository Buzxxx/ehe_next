/**
 * @path src/app/contract/vendor/[vendorId]/page.tsx
 */

import VendorDetailsModal from "@/components/contracts/ui/vendorDetailsModal"

const VendorModalPage = () => {
  return (
    <div className="py-4 md:px-8 lg:px-16 lg:py-8">
      <VendorDetailsModal />
    </div>
  )
}

export default VendorModalPage
