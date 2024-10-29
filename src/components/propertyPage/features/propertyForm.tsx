// PropertyForm.tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import PropertyFormUI from "../ui/propertyFormUI"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

// Define the form schema
const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name should not exceed 50 characters."),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." })
    .max(13, "Phone number should not exceed 13 digits."),
  question: z.string().optional(), // Make it optional
})

const PropertyForm = ({
  bgClassName,
  wrapperClassName,
  title,
  formClassName,
  onSuccess,
  showQuestionField = false, // Add new prop here
}: {
  bgClassName?: string
  wrapperClassName?: string
  title?: string
  formClassName?: string
  onSuccess?: () => void
  showQuestionField?: boolean // New prop type
}) => {
  const { toast } = useToast()

  // Initialize form with validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log("Submitting values:", values)
      // Simulate an async API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Show success toast
      toast({
        title: "Success",
        description: "Your inquiry has been submitted successfully!",
        className: "bg-green-500 text-white",
      })
      form.reset()
      onSuccess?.()
    } catch (error) {
      console.error("Submission failed:", error)

      // Show failure toast
      toast({
        title: "Error",
        description: "Failed to submit the form. Please try again.",
        className: "bg-red-500 text-white",
      })
    }
  }

  return (
    <div className={cn("md:mt-10 mt-4 flex-1", wrapperClassName)}>
      {title && (
        <h2 className="text-lg md:text-xl font-bold  mb-4"> {title}</h2>
      )}
      <PropertyFormUI
        form={form}
        onSubmit={onSubmit}
        bgClassName={bgClassName}
        formClassName={formClassName}
        showQuestionField={showQuestionField} // Pass prop down to UI component
      />
    </div>
  )
}

export default PropertyForm
