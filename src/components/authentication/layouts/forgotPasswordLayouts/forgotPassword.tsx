/**
 * @path src/components/authentication/layouts/forgotPasswordLayouts/ForgotPasswordLayout.tsx
 */

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { paths } from "../../urls"
import LoadingSpinner from "@/components/contracts/ui/loadingSpinner"
import ReactDOM from "react-dom"
import ForgotPassEmailStep from "../../features/forms/forgotPassEmailStep"
import ForgotPassOtpStep from "../../features/forms/forgotPassOtpStep"
import ForgotPassPasswordStep from "../../features/forms/forgotPassPasswordStep"

const LoadingOverlay = () => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex justify-center items-center bg-gray-100 bg-opacity-75 z-50">
      <LoadingSpinner />
    </div>,
    document.body
  )
}

const ForgotPasswordLayout = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")

  const router = useRouter()

  const handleNextStep = () => setCurrentStep((prevStep) => prevStep + 1)
  const handlePrevStep = () => router.push(paths.login)

  return (
    <>
      {isLoading && <LoadingOverlay />}
      
      

      {currentStep === 0 && (
        <ForgotPassEmailStep
          onNext={(email: string) => {
            setEmail(email)
            handleNextStep()
          }}
          setLoading={setIsLoading}
          onBack={handlePrevStep}
        />
      )}

      {currentStep === 1 && (
        <ForgotPassOtpStep
          onNext={handleNextStep}
          setLoading={setIsLoading}
          onBack={handlePrevStep}
        />
      )}

      {currentStep === 2 && (
        <ForgotPassPasswordStep
          setLoading={setIsLoading}
          onBack={handlePrevStep}
          onSuccess={() => router.push(paths.login)}
        />
      )}

      
    </>
  )
}

export default ForgotPasswordLayout
