import ResetPassword from "@/components/authentication/ui/resetPassword";

export default function Home() {
  return (
    <>
      <h1 className="text-center font-semibold md:text-2xl text-lg mb-4">
        RESET PASSWORD
      </h1>
      <ResetPassword />
    </>
  );
}
