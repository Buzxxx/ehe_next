'use client'

import ContractLogoPlaceholder from "./contractLogoPlaceholder"
import { Input } from "@/components/ui/input"
import { SearchIcon, Menu } from "lucide-react"

import styles from "@/app/contract/contract.module.css"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const ContractsNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div
      className={`flex justify-between md:gap-2 gap-8 items-center md:px-16 px-4 py-3 bg-transparent ${styles.contractsNavbar} ${styles.bgPrimary} shadow-sm overflow-hidden relative`}
    >
      <ContractLogoPlaceholder />
      <div className="flex items-center justify-evenly md:gap-16 ">
        <div className="flex gap-2 max-md:flex-1 relative flex-1 md:w-80">
          <Input
            placeholder="Search..."
            className={`border-gray-500 bg-transparent ${styles.navSearch}`}
          />
          <SearchIcon className="absolute right-2 top-1/2 -translate-y-1/2" />
        </div>
        <ul className="md:flex gap-8 justify-between items-center hidden">
          <li className=" cursor-pointer">Home</li>
          <li className=" cursor-pointer">About </li>
          <li className=" cursor-pointer">Vendor List</li>
          <li className=" cursor-pointer">Register</li>
          <li className=" cursor-pointer">Login</li>
        </ul>
        <ul className={`md:hidden flex flex-col absolute top-16 gap-4 items-center transition-all bg-white shadow-2xl drop-shadow-xl h-screen w-2/3 py-4 ml-auto z-40  ${isOpen ? 'translate-x-0 right-0' : 'translate-x-80'}`}>
          <li className=" cursor-pointer">Home</li>
          <li className=" cursor-pointer">About </li>
          <li className=" cursor-pointer">Vendor List</li>
          <li className=" cursor-pointer">Register</li>
          <li className=" cursor-pointer">Login</li>
        </ul>
        <Button className="bg-transparent" onClick={() => setIsOpen(!isOpen)}>
          <Menu color="black" />
        </Button>
      </div>
    </div>
  )
}

export default ContractsNavbar