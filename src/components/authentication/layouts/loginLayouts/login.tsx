"use client";
import LoginForm from "@/components/authentication/layouts/loginLayouts/loginForm";
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
      <h1 className="text-center font-semibold md:text-2xl text-lg mb-4">
        LOGIN
      </h1>
      <LoginForm setLoading={setIsLoading} />
      <Link
        className="mt-2 text-sm block"
        href={paths.ResetPassword}
        prefetch={true}
      >
        Forgot Password
      </Link>
      <p className="mt-12 mb-3 text-slate-400">© 2020-2021</p>
    </>
  );
};

export default Login;
