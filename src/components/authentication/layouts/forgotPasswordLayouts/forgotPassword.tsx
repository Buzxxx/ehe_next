"use client"

import { z } from "zod"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import StepForm from "../../features/forms/stepForm"
import LoadingSpinner from "@/components/contracts/ui/loadingSpinner"
import { paths } from "../../urls"

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

const ForgotPassword = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")

  const router = useRouter()

  const handleNextStep = () => setCurrentStep((prevStep) => prevStep + 1)
  const handlePrevStep = () => setCurrentStep((prevStep) => prevStep - 1)

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
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-75 z-50">
          <LoadingSpinner />
        </div>
      )}

      {currentStep === 0 && (
        <StepForm
          schema={emailSchema}
          onSubmit={handleEmailSubmit}
          title="Enter your email address"
          fields={[{ name: "email", label: "Email", type: "email" }]}
        />
      )}

      {currentStep === 1 && (
        <StepForm
          schema={otpSchema}
          onSubmit={handleOtpSubmit}
          title="Enter the OTP"
          fields={[{ name: "otp", label: "OTP", type: "text" }]}
          onBack={handlePrevStep}
        />
      )}

      {currentStep === 2 && (
        <StepForm
          schema={passwordSchema}
          onSubmit={handlePasswordSubmit}
          title="Reset your password"
          fields={[
            { name: "password", label: "New Password", type: "password" },
            {
              name: "confirmPassword",
              label: "Confirm Password",
              type: "password",
            },
          ]}
          onBack={handlePrevStep}
        />
      )}
    </>
  )
}

export default ForgotPassword
