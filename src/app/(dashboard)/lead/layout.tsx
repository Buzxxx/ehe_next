// /app/(dashboard)/lead/leayout.tsx


export default function LeadLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <>
      {modal }
      {children}
    </>
  )
}
