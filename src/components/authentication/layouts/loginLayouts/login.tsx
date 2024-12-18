/**
 * @path src/components/authentication/layouts/loginLayouts/login.tsx
 */

"use client";

import LoginForm from "@/components/authentication/features/forms/loginForm";
import Link from "next/link";
import { useState } from "react";
import OverlayLoading from "@/components/authentication/ui/overlayLoading";
import Spinner from "@/components/ui/icons/spinner";
import { paths } from "@/components/authentication/urls";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      {isLoading ? (
        <OverlayLoading>
          <Spinner className="w-8 h-8 md:w-14 md:h-16 "></Spinner>
        </OverlayLoading>
      ) : null}
      <h1 className="text-center font-bold md:text-2xl text-xl">
        LOGIN
      </h1>
      <p className="text-gray-500 text-sm mb-8">You must be a member to access the CRM</p>
      <LoginForm setLoading={setIsLoading} />

      <p className="mt-auto text-slate-400 text-sm">© 2020-2021</p>
    </>
  );
};

export default Login;
