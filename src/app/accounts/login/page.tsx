import Login from "@/components/accounts/ui/login";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <h1 className="text-center font-semibold md:text-2xl text-lg mb-4">
        LOGIN
      </h1>
      <Login />
    </Suspense>
  )
}
