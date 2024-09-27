/**
 * @path src/app/contract/layout.tsx
 */

import ContractsNavbar from "@/components/contracts/ui/contractsNavbar"
import styles from "@/app/contract/contract.module.css"
import { Suspense } from "react"
import Loading from "./loading"

export default function ContractLayout({
  modal,
  children,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <div className={`bg-gray-100 ${styles.contractsLayout}`}>
      <ContractsNavbar />
      <Suspense fallback={<Loading />}>
        {modal}
        {children}
      </Suspense>
    </div>
  )
}
