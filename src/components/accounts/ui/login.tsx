// /components/accounts/ui/login

"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import InputField from "./inputField"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import Spinner from "@/components/ui/icons/spinner"
import { loginUser } from "@/app/actions/auth.actions"

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState({ status: "", message: "" })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const response = await loginUser(values)

      if (!response) {
        throw new Error("Login failed")
      }


      if (response.access) {
        setMessage({ status: "success", message: "Login successful" })
        form.reset()
        router.push(redirectPath)
      } else {
        setMessage({
          status: "failure",
          message: "Username or password incorrect",
        })
      }

      setIsSubmitting(false)
    } catch (error) {
      setMessage({
        status: "failure",
        message: "Username of Password Incorrect",
      })
      setIsSubmitting(false)

    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full text-sm space-y-4">
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
          className={` py-6 h-5 w-full ${
            !isSubmitting ? "bg-primary hover:bg-primary-hover" : "bg-secondary border border-primary"
          } `}
          disabled={isSubmitting}
        >
          {!isSubmitting ? "Login" : <Spinner  />}
        </Button>

        <div className="relative py-4">
          {!isSubmitting && (
            <div
              className={` text-center absolute top-1/2 -translate-y-1/2 ${
                message.status === "failure" ? "text-red-600" : "text-green-600"
              }`}
            >
              {message.message}
            </div>
          )}
        </div>
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
