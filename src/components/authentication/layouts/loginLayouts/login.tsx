/**
 * @path src/components/authentication/layouts/loginLayouts/login.tsx
 */

"use client"

import LoginForm from "@/components/authentication/features/forms/loginForm"
import Link from "next/link"
import { useState } from "react"
import OverlayLoading from "@/components/authentication/ui/overlayLoading"
import Spinner from "@/components/ui/icons/spinner"
import { paths } from "@/components/authentication/urls"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75 z-50">
          <Spinner className="w-8 h-8 md:w-14 md:h-16 "></Spinner>
        </div>
      ) : null}

      <Card className="gap-4 flex flex-col items-center justify-center border-0 md:border">
        <CardHeader className="pb-2">
          <Image
            src={"/pin-code(1).svg"}
            alt="Logo"
            width={60}
            height={60}
            className="object-cover md:mx-auto"
          />
        </CardHeader>

        <CardContent className="pt-0">
          <CardTitle className="text-center font-medium md:text-xl text-lg text-gray-600">
            LOGIN
          </CardTitle>
          <p className="text-gray-500 text-sm mb-8">
            You must be a member to access the CRM
          </p>
          <LoginForm setLoading={setIsLoading} />
        </CardContent>
        <CardFooter>
          <p className="mt-auto text-slate-400 text-sm text-center">
            © 2020-2021
          </p>
        </CardFooter>
      </Card>
    </>
  )
}

export default Login
