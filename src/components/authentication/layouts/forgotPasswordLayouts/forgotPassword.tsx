/**
 * @path src/components/authentication/layouts/forgotPasswordLayouts/forgotPassword.tsx
 */

"use client"

import { z } from "zod"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import StepForm from "../../features/forms/stepForm"
import LoadingSpinner from "@/components/contracts/ui/loadingSpinner"
import { paths } from "../../urls"
import ReactDOM from "react-dom"
import { Mail, LockKeyhole } from "@/components/ui/icons"
import { InputOTPForm } from "../../features/forms/InputOtpForm"

const emailSchema = z.object({
  email: z.string().email().min(1, {
    message: "Email cannot be empty",
  }),
})

const otpSchema = z.object({
  otp: z.string().min(6, { message: "OTP must be 6 characters" }),
})

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(6, {
      message: "Password confirmation must be at least 6 characters",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

const LoadingOverlay = () => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex justify-center items-center bg-gray-100 bg-opacity-75 z-50">
      <LoadingSpinner />
    </div>,
    document.body
  )
}

const ForgotPassword = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")

  const router = useRouter()

  const handleNextStep = () => setCurrentStep((prevStep) => prevStep + 1)
  const handlePrevStep = () => router.push(paths.login)

  const handleEmailSubmit = async (values: { email: string }) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))
      setEmail(values.email)
      handleNextStep()
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpSubmit = async (values: { otp: string }) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))
      handleNextStep()
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordSubmit = async (values: {
    password: string
    confirmPassword: string
  }) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))
      router.push(paths.login)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading && <LoadingOverlay />}

      {currentStep === 0 && (
        <StepForm
          schema={emailSchema}
          onSubmit={handleEmailSubmit}
          title="Password Reset"
          description="
            Please enter your registered email address to reset your password
          "
          onBack={handlePrevStep}
          fields={[
            {
              name: "email",
             
              type: "email",
              placeholder: "Enter your email",
              icon: <Mail color="gray" size={16} />,
            },
          ]}
        />
      )}

      {currentStep === 1 && (
        <InputOTPForm onBack={handlePrevStep} onSubmit={handleOtpSubmit} />
      )}

      {currentStep === 2 && (
        <StepForm
          schema={passwordSchema}
          onSubmit={handlePasswordSubmit}
          title="Reset your password"
          description="Please set your new password"
          fields={[
            {
              name: "password",
          
              type: "password",
              placeholder: "Enter your new password",
            },
            {
              name: "confirmPassword",
             
              type: "password",
              placeholder: "Re-enter your new password to confirm",
            },
          ]}
          onBack={handlePrevStep}
        />
      )}

      <p className=" text-slate-400 text-sm mt-auto">© 2020-2021</p>
    </>
  )
}

export default ForgotPassword
