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
      <article className="md:bg-gray-100 flex flex-col justify-center items-center h-screen ">
        <div className=" md:w-1/4 bg-gray-50 md:border w-full rounded-md md:drop-shadow-md h-fit">
          {children}
        </div>
      </article>
    </>
  )
}
