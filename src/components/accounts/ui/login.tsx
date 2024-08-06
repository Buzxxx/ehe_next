"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import InputField from "./inputField"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"

// Ensure proper typing and schema
const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username cannot be empty",
  }),
  password: z.string().min(1, {
    message: "Password cannot be empty",
  }),
})

const Login = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectPath = searchParams.get("redirect") || "/lead" // Default redirect path if not set

  const [message, setMessage] = useState({ status: "", message: "" })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Login failed")
      }

      const result = await response.json()

      if (result.access) {
        setMessage({ status: "success", message: "Login successful" })
        form.reset()
        router.push(redirectPath)
      } else {
        setMessage({
          status: "failure",
          message: "Username or password incorrect",
        })
      }
    } catch (error) {
      setMessage({
        status: "failure",
        message: "Login failed",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full text-sm">
        <InputField
          label="Username"
          placeholder="username"
          field={form.register("username")}
        />
        <InputField
          label="Password"
          placeholder="password"
          field={form.register("password")}
          isPassword={true}
        />
        <Button
          type="submit"
          className="mt-4 bg-primary hover:bg-primary-hover py-6 w-full "
        >
          Login
        </Button>

        {message.status && (
          <div
            className={`mt-2 text-center ${
              message.status === "failure" ? "text-red-600" : "text-green-600"
            }`}
          >
            {message.message}
          </div>
        )}
        <Link
          className=" mt-2 text-sm block"
          href="/accounts/resetPassword"
          prefetch={true}
        >
          Forgot Password
        </Link>
        <p className="mt-12 mb-3 text-slate-400">© 2020-2021</p>
      </form>
    </Form>
  )
}

export default Login
