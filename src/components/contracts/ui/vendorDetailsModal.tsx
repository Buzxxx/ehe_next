import Image from "next/image"
import Link from "next/link"

import styles from "@/app/contract/contract.module.css"
import VendorTabs from "./vendorTabs"
import { GeneralInfo } from "./vendorInfo"

const VendorDetailsModal = () => {
  const tabs = [
    {
      tabName: "General Information",
      tabValue: "general_info",
      tabContent: <GeneralInfo />,
    },
  ]

  return (
    <>
      <div className="flex md:gap-4 items-center mb-8 max-md:px-4">
        <Image
          className="inline mr-4 rounded-full p-2 border border-slate-200 h-16 w-16 object-contain"
          src={"/contracts/images/eraclm-logo.png"}
          alt="logo"
          width={400}
          height={400}
        />
        <div className="text-left flex-1">
          <div className="flex md:items-center gap-2 md:flex-row flex-col">
            <h2 className="text-4xl inline-block font-semibold">MitraTech</h2>
            <Link
              href={"/"}
              className="bg-gray-300 text-blue-500 rounded-md text-sm px-2 py-px w-fit"
            >
              https://miratech.com
            </Link>
          </div>
          <div>
            <p className={`${styles.textGray} text-sm`}>
              Estd. 1947 | Lorem ipsum dolor sit.
            </p>
          </div>
        </div>
      </div>
      <div className="md:px-24 px-4">
        <GeneralInfo />
      </div>
    </>
  )
}

export default VendorDetailsModal
