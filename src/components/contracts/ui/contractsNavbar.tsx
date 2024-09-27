import ContractLogoPlaceholder from "./contractLogoPlaceholder"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"

import styles from "@/app/contract/contract.module.css"

const ContractsNavbar = () => {
  return (
    <div
      className={`flex justify-between gap-2 items-center px-16 py-3 bg-transparent ${styles.contractsNavbar} ${styles.bgPrimary} shadow-sm`}
    >
      <ContractLogoPlaceholder />
      <div className="flex items-center justify-evenly gap-16 ">
        <div className="flex gap-2 relative flex-1 md:w-80">
          <Input
            placeholder="Search..."
            className={`border-gray-500 bg-transparent ${styles.navSearch}`}
          />
          <SearchIcon className="absolute right-2 top-1/2 -translate-y-1/2" />
        </div>
        <ul className="flex gap-8 justify-between items-center">
          <li className=" cursor-pointer">
            Home
          </li>
          <li className=" cursor-pointer">
            About{" "}
          </li>
          <li className=" cursor-pointer">
            Vendor List
          </li>
          <li className=" cursor-pointer">
            Register
          </li>
          <li className=" cursor-pointer">
            Login
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ContractsNavbar
