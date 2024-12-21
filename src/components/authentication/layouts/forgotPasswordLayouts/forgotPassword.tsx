/**
 * @path src/components/authentication/layouts/forgotPasswordLayouts/ForgotPasswordLayout.tsx
 */

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { paths } from "../../urls"
import ForgotPassEmailStep from "../../features/forms/forgotPassEmailStep"
import ForgotPassOtpStep from "../../features/forms/forgotPassOtpStep"
import ForgotPassPasswordStep from "../../features/forms/forgotPassPasswordStep"
import LoadingOverlay from "@/components/ui/loadingOverlay"

const ForgotPasswordLayout = ({ name }: { name?: string }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(name !== "unknown user")

  const router = useRouter()

  const handleNextStep = () => setCurrentStep((prevStep) => prevStep + 1)
  const handlePrevStep = () => router.push(paths.login)
  const forgotPassSteps = [
    <ForgotPassEmailStep
      key={0}
      onNext={(email: string) => {
        setEmail(email)
        handleNextStep()
      }}
      setLoading={setIsLoading}
      onBack={handlePrevStep}
      isLoggedIn={isLoggedIn}
    />,
    <ForgotPassOtpStep
      key={1}
      onNext={handleNextStep}
      setLoading={setIsLoading}
      onBack={handlePrevStep}
      isLoggedIn={isLoggedIn}
    />,
    <ForgotPassPasswordStep
      key={2}
      setLoading={setIsLoading}
      onSuccess={() => router.push(paths.login)}
      isLoggedIn={isLoggedIn}
    />,
  ]

  return (
    <>
      {isLoading && <LoadingOverlay />}
      {forgotPassSteps[currentStep]}
    </>
  )
}

export default ForgotPasswordLayout
