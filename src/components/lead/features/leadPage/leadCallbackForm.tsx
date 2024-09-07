// /components/lead/feature/LeadProfileUpdateForm.tsx

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/dashboard/ui/customFormField";
import { FormFieldType } from "@/components/dashboard/library/formFieldEnum";
import { LeadCallbackFormValidation } from "@/lib/validation";
import { useToast } from "@/components/ui/use-toast";
import OverlayLoading from "@/components/ui/overlayLoading";
import { Spinner } from "@/components/ui/icons";
import { formatDate } from "@/utility/formatDate";

const LeadCallbackForm = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof LeadCallbackFormValidation>>({
    resolver: zodResolver(LeadCallbackFormValidation),
    defaultValues: {
      id: id,
      date: new Date(Date.now()),
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LeadCallbackFormValidation>) => {
    setIsLoading(true);
    console.log({ ...data, id });
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: `Callback Set for ${formatDate(data.date.toISOString())} hrs`,
        variant: "dashboard",
      });
    }, 1000);
  };

  return (
    <div className="form-wrapper py-2 max-md:px-4">
      {isLoading ? (
        <OverlayLoading>
          <Spinner className="w-8 h-8 md:w-14 md:h-16 "></Spinner>
        </OverlayLoading>
      ) : null}
      <Form {...form}>
        <h2 className="pt-4 font-bold">Follow Up Call</h2>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 py-8 px-4"
        >
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.DATE_PICKER}
            name="date"
            label="Preferred Date & Time"
            showTimeSelect
            placeholder="dd-mm-yyyy h:mm"
            dateFormat="dd-MM-yyyy h:mm aa"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="description"
            label="Description"
            placeholder="Add a description (if required)"
          ></CustomFormField>
          <div className="flex gap-2 justify-end">
            {/* <Button
              type="button"
              onClick={() => form.reset()}
              className=" text-slate-800 bg-transparent border border-slate-600 hover:border-slate-900 hover:text-slate-900"
            >
              Reset All
            </Button> */}

            <Button
              type="submit"
              className=" bg-dashboard-primary border border-dashboard-primary text-white hover:bg-dashboard-secondary"
            >
              Set a callback
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LeadCallbackForm;
