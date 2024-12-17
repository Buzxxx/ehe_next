/**
 * @path src/app/auth/layout.tsx
 */

export default function AccountsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    
      <article className="md:bg-gray-100 md:flex justify-center items-center h-screen md:py-16">
        <div className=" md:w-1/3 bg-gray-50 md:border w-full md:mx-auto px-12 py-16 md:py-6 rounded-md md:drop-shadow-md flex flex-col items-center justify-start h-full ">
          {children}
        </div>
      </article>
    </>
  )
}
