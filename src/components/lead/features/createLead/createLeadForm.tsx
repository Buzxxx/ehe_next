"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/dashboard/ui/customFormField";
import { FormFieldType } from "@/components/dashboard/library/formFieldEnum";
import { SelectItem } from "@/components/ui/select";
import { create_lead_controller } from "@/components/lead/features/leadObject";
import { useToast } from "@/components/ui/use-toast";
import {
  get_all_active_employee_list_controller,
  get_user_data_from_cookie,
} from "../userObject";

const userData = await get_user_data_from_cookie();

export const CreateLeadFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  contact: z.string().min(10, "Phone number must be at least 10 digits"),
  lead_type: z.string().optional(),
  query: z.string().optional(),
  interested_in: z.string().min(10),
  assigned_to: z.string().min(1, "Assigned To is required"),
  product_code: z.string().optional(),
  product_type: z.string().optional(),
  status: z.number().optional().default(1),
  source: z.string().optional().default("4"),
  priority: z.enum(["cold", "warm", "hot"]),
});

const CreateLeadForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof CreateLeadFormSchema>>({
    resolver: zodResolver(CreateLeadFormSchema),
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      lead_type: "",
      query: "",
      interested_in: "",
      assigned_to: userData.id.toString(),
      product_code: "",
      product_type: "",
      priority: "cold",
      status: 1,
    },
  });

  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchActiveEmployees = async () => {
      try {
        const result = await get_all_active_employee_list_controller();
        if (result) {
          setUsers(result);
        } else {
          toast({
            title: "Error fetching users",
            variant: "destructive",
            description: "Could not load active employees.",
          });
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        toast({
          title: "Error",
          variant: "destructive",
          description: "Failed to fetch active employees.",
        });
      }
    };

    fetchActiveEmployees();
  }, [toast]);

  async function onSubmit(values: z.infer<typeof CreateLeadFormSchema>) {
    const leadData = {
      ...values,
      status: values.status ?? 1,
      source: values.source ?? "Lead Form",
    };

    try {
      const result = await create_lead_controller(leadData);
      if (result.lead) {
        toast({
          title: "Lead created successfully",
          description: `LeadId: ${result.lead}`,
        });
      } else {
        toast({
          title: "Something went wrong",
          variant: "destructive",
          description: "Please try again later or contact the administrator.",
        });
      }
    } catch (error) {
      console.error("Error creating lead:", error);
    } finally {
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 px-4 py-8 md:shadow-md md:px-12 md:mx-8 mt-4 md:border-t border-gray-300"
      >
        <div className="grid grid-cols-fr md:grid-cols-3 sm:grid-cols-2 gap-4">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="name"
            label="Name"
            placeholder="Enter full name (e.g., Kapil Dev)"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="email"
            label="Email"
            placeholder="Enter a valid email address (e.g., example@user.com)"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.PHONE}
            name="contact"
            label="Phone Number"
            placeholder="Enter phone number with country code (e.g., +91 12345 67890)"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="lead_type"
            label="Lead Type"
            placeholder="Specify lead type (e.g., New, Follow-up)"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="query"
            label="Query"
            placeholder="Provide details about the query or request"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SELECT}
            name="assigned_to"
            label="Assigned to"
            placeholder="Select team member to assign the lead"
          >
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id.toString()}>
                {user.name}
              </SelectItem>
            ))}
          </CustomFormField>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="product_code"
            label="Product Code"
            placeholder="Enter the product code (e.g., P12345)"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="product_type"
            label="Product Type"
            placeholder="Enter the product type (e.g., Software, Hardware)"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SELECT}
            name="priority"
            label="Priority"
            placeholder="Select lead priority"
          >
            <SelectItem key="cold" value="cold">
              <div className="flex items-center">
                <span className="w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
                Cold
              </div>
            </SelectItem>
            <SelectItem key="warm" value="warm">
              <div className="flex items-center">
                <span className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></span>
                Warm
              </div>
            </SelectItem>
            <SelectItem key="hot" value="hot">
              <div className="flex items-center">
                <span className="w-4 h-4 bg-red-500 rounded-full mr-2"></span>
                Hot
              </div>
            </SelectItem>
          </CustomFormField>

          <div className="col-span-1 md:col-span-3">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.TEXTAREA}
              name="interested_in"
              label="Interested In"
              placeholder="Provide details on the lead's interest (e.g., product features, demo)"
              rows={1}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="mx-auto block bg-sky-600 border border-sky-600 text-white hover:text-sky-600"
        >
          Create
        </Button>
      </form>
    </Form>
  );
};

export default CreateLeadForm;
