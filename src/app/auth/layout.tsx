/**
 * @path src/app/auth/layout.tsx
 */

import Image from "next/image"

export default function AccountsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <article className="md:bg-gray-100 md:flex flex-col justify-center items-center h-screen md:py-16 gap-4">
        <Image src={"/base/crm_logo.svg"} alt="Logo" width={100} height={100} className="object-cover"/>
        <div className=" md:w-1/3 bg-gray-50 md:border w-full md:mx-auto px-12 py-16 md:pt-8 md:pb-2 rounded-md md:drop-shadow-md flex flex-col items-center justify-start flex-1 h-80">
          {children}
        </div>
      </article>
    </>
  )
}
