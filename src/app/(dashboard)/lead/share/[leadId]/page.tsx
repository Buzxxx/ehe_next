"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/dashboard/ui/customFormField";
import React, { useState } from "react";
import { FormFieldType } from "@/components/dashboard/library/formFieldEnum";

const leadShareValidation = z.object({
  from: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  to: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  crm: z.string(),
});

const LeadSharePage = () => {
  const form = useForm<z.infer<typeof leadShareValidation>>({
    resolver: zodResolver(leadShareValidation),
    defaultValues: {
      from: "",
      to: "",
      crm: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit({
    from,
    to,
    crm,
  }: z.infer<typeof leadShareValidation>) {
    setIsLoading(true);
    try {
      const userData = {
        from,
        to,
        crm,
      };
    } catch (error) {
      console.log(error);
    }
  }

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="from"
          label="From"
          placeholder="John Doe"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="to"
          label="To"
          placeholder="Doe John"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="crm"
          label="CRM"
          placeholder=""
        />
      </form>
    </Form>
  );
};

export default LeadSharePage;
