import ForgotPassword from "@/components/accounts/ui/forgotPassword";

export default function Home() {
  return (
    <>
      <h1 className="text-center font-semibold md:text-2xl text-lg mb-4">
        FORGOT PASSWORD
      </h1>
      <ForgotPassword />
    </>
  );
}
