export default function AccountsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <article className="flex justify-center items-center h-screen ">
        <div className="shadow-lg rounded-md bg-slate-100 md:w-1/4 w-full md:mx-auto mx-8 p-4 border-2 flex flex-col items-center justify-center">
          {children}
        </div>
      </article>
    </>
  );
}
