// LeadStatusUpdateForm.tsx
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import filterCategories from "@/components/dashboard/library/filterCategories";
import CustomFormField from "@/components/dashboard/ui/customFormField";
import { FormFieldType } from "@/components/dashboard/library/formFieldEnum";
import { LeadStatusUpdateFormSchema } from "@/lib/validation";
import { SelectItem } from "@/components/ui/select";
import OverlayLoading from "@/components/ui/overlayLoading";
import { Spinner } from "@/components/ui/icons";
import { useToast } from "@/components/ui/use-toast";

const LeadStatusUpdateForm = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof LeadStatusUpdateFormSchema>>({
    resolver: zodResolver(LeadStatusUpdateFormSchema),
    defaultValues: {
      id: id,
      status: "",
      priority: "cold",
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LeadStatusUpdateFormSchema>) => {
    setIsLoading(true);
    console.log({ ...data, id });
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: `Timeline updated!`,
        variant: "dashboard",
      });
    }, 1000);
  };

  // Filter to get only the status field
  const statusCategory = filterCategories.find(
    (category) => category.name === "status"
  );

  return (
    <>
      {isLoading ? (
        <OverlayLoading>
          <Spinner className="w-8 h-8 md:w-14 md:h-16 "></Spinner>
        </OverlayLoading>
      ) : null}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex  gap-4">
            {statusCategory && (
              <CustomFormField
                key={statusCategory.name}
                control={form.control}
                fieldType={FormFieldType.SELECT}
                name="status"
                label={statusCategory.label}
                placeholder={statusCategory.placeholder}
              >
                {statusCategory.options.map((option) => (
                  <SelectItem key={option} value={option.toString()}>
                    {option}
                  </SelectItem>
                ))}
              </CustomFormField>
            )}

            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name="priority"
              label="Priority"
              placeholder="Priority"
            >
              <SelectItem key="cold" value="cold">
                Cold
              </SelectItem>
              <SelectItem key="warm" value="warm">
                Warm
              </SelectItem>
              <SelectItem key="hot" value="hot">
                Hot
              </SelectItem>
            </CustomFormField>
          </div>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="description"
            label="Description"
            placeholder="Description"
          ></CustomFormField>
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              onClick={() => form.reset()}
              className=" text-slate-800 bg-transparent border border-slate-600 hover:border-slate-900 hover:text-slate-900"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className=" bg-dashboard-primary border border-dashboard-primary text-white hover:bg-dashboard-secondary"
            >
              Update
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default LeadStatusUpdateForm;
