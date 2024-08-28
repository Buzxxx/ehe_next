import { Suspense } from "react";
import Logintest from "../../cookies/logintest";

export default function Testhome() {
  console.log("calling");
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <h1 className="text-center font-semibold md:text-2xl text-lg mb-4">
        LOGIN Test
      </h1>
      <Logintest />
    </Suspense>
  );
}
