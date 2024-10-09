/**
 * @path src/app/contract/layout.tsx
 */
import styles from "@/app/contracts/contract.module.css"
export default function ContractsLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <div className={`${styles.contractsLayout} contractsLayout`}>
      {modal}
      {children}
    </div>
  )
}
