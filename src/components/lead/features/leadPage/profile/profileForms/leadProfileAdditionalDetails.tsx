import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLeadProfile } from "@/components/lead/features/leadPage/context/leadProfileContext"
import { update_lead_on_server } from "@/components/lead/features/leadObject"
import { useToast } from "@/components/ui/use-toast"
import { Edit, Save, X } from "@/components/ui/icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const formSchema = z.object({
  id: z.string().optional(),
  lead_type: z.string().optional(),
  budget: z.string().optional(),
  follow_up_current_status: z.string().optional(),
  interested_in: z.string().optional(),
  product_code: z.string().optional(),
  product_type: z.string().optional(),
  query: z.string().optional(),
})

const LeadProfileAdditionalDetails = () => {
  const { leadProfile, setLeadProfile } = useLeadProfile()
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lead_type: leadProfile.lead_type || "",
      budget: leadProfile.budget || "",
      follow_up_current_status: leadProfile.follow_up_current_status || "",
      interested_in: leadProfile.interested_in || "",
      product_code: leadProfile.product_code || "",
      product_type: leadProfile.product_type || "",
      query: leadProfile.query || "",
      id: leadProfile.id.toString(),
    },
  })

  useEffect(() => {
    if (leadProfile) {
      form.reset({
        id: leadProfile?.id?.toString() || "",
      })
    }
  }, [])

  const onSubmit = async (data: any) => {
    const hasFormDataChanged = (data: any, leadProfile: any): boolean => {
      for (const key in data) {
        if (
          data[key]
            ? String(data[key]).toLowerCase()
            : "" !== leadProfile[key]
            ? String(leadProfile[key]).toLowerCase()
            : ""
        ) {
          return true;
        }
      }
      return false;
    };

    if (!hasFormDataChanged(data, leadProfile)) {
      console.log("No changes made");
      return;
    }
    try {
      setIsEditing(false)
      const isLeadSaved = await update_lead_on_server(data)

      if (isLeadSaved) {
        setLeadProfile((prev) => ({
          ...prev,
          id: data.id || prev.id,
          lead_type: data.lead_type || prev.lead_type,
          budget: data.budget || prev.budget,
          follow_up_current_status:
            data.follow_up_current_status || prev.follow_up_current_status,
          interested_in: data.interested_in || prev.interested_in,
          product_code: data.product_code || prev.product_code,
          product_type: data.product_type || prev.product_type,
          query: data.query || prev.query,
        }))
        toast({ title: "Profile updated successfully!", variant: "success" })
      } else {
        setIsEditing(false)
        toast({
          title: "Error updating database, please contact your Admin",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "An unexpected error occurred",
        variant: "destructive",
      })
      setIsEditing(false)
    }
  }

  return (
    <Card className="h-full shadow-none">
      <CardHeader className="space-y-0 py-4 border-b flex-row justify-between">
        <CardTitle className="text-lg font-medium text-gray-700">
          Additional Info
        </CardTitle>
        {!isEditing ? (
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={() => setIsEditing(true)}>
                  <Edit size={16} color="grey" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-500 text-gray-100">
                <p className="text-sm">Edit </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <div className="flex items-center gap-2">
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button onClick={() => setIsEditing(false)}>
                    <X
                      size={18}
                      color="grey"
                      className="hover:stroke-red-700"
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-500 text-gray-100">
                  <p className="text-sm">Cancel </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button onClick={form.handleSubmit(onSubmit)}>
                    <Save size={16} color="grey" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-500 text-gray-100">
                  <p className="text-sm">Save </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </CardHeader>
      <CardContent className="max-md:px-2 pb-8 mt-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full"
          >
            {/* Responsive Flex Container */}
            <div className="flex md:flex-row flex-col gap-2 mx-2">
              {/* First Column */}
              <div className="w-full md:w-1/2 px-2 space-y-6">
                {/* Lead Type */}
                <FormField
                  control={form.control}
                  name="lead_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Lead Type</FormLabel>
                      <FormControl>
                        <Input
                          disabled={!isEditing}
                          placeholder="Enter lead type"
                          {...field}
                          className="w-full disabled:cursor-default"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Budget */}
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Budget</FormLabel>
                      <FormControl>
                        <Input
                          disabled={!isEditing}
                          placeholder="Enter budget"
                          {...field}
                          className="w-full disabled:cursor-default"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Follow-up Current Status */}
                <FormField
                  control={form.control}
                  name="follow_up_current_status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">
                        Follow-up Current Status
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={!isEditing}
                          placeholder="Enter current status"
                          {...field}
                          className="w-full disabled:cursor-default"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Second Column */}
              <div className="w-full md:w-1/2 px-2 space-y-6">
                {/* Query */}
                <FormField
                  control={form.control}
                  name="query"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">Query</FormLabel>
                      <FormControl>
                        <Input
                          disabled={!isEditing}
                          placeholder="Enter query"
                          {...field}
                          className="w-full disabled:cursor-default"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Product Code */}
                <FormField
                  control={form.control}
                  name="product_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">
                        Product Code
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={!isEditing}
                          placeholder="Enter product code"
                          {...field}
                          className="w-full disabled:cursor-default"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Product Type */}
                <FormField
                  control={form.control}
                  name="product_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600">
                        Product Type
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={!isEditing}
                          placeholder="Enter product type"
                          {...field}
                          className="w-full disabled:cursor-default"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="mx-4">
              {/* Interested In */}
              <FormField
                control={form.control}
                name="interested_in"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600">
                      Interested In
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={!isEditing}
                        placeholder="Enter interest"
                        {...field}
                        className="w-full disabled:cursor-default"
                        rows={8}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default LeadProfileAdditionalDetails
