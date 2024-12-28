import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/dashboard/ui/customFormField";
import { FormFieldType } from "@/components/dashboard/library/formFieldEnum";
import { useToast } from "@/components/ui/use-toast";
import OverlayLoading from "@/components/ui/overlayLoading";
import { Spinner } from "@/components/ui/icons";
import { formatDate } from "@/lib/formatDate";

// Define validation schema directly in the component
const LeadCallbackFormSchema = z.object({
  id: z.string(),
  date: z.date(),
  description: z.string().optional(),
});

type LeadCallbackFormData = z.infer<typeof LeadCallbackFormSchema>;

const LeadCallbackForm = ({
  id,
  setOpen,
}: {
  id: string;
  setOpen: (arg0: boolean) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<LeadCallbackFormData>({
    resolver: zodResolver(LeadCallbackFormSchema),
    defaultValues: {
      id: id,
      date: new Date(),
      description: "",
    },
  });

  const onSubmit = async (data: LeadCallbackFormData) => {
    setIsLoading(true);
    console.log({ ...data, id });
    setTimeout(() => {
      setIsLoading(false);
      setOpen(false);
      toast({
        title: `Callback Set for ${formatDate(data.date.toISOString())} hrs`,
      });
    }, 1000);
  };

  return (
    <div className="form-wrapper py-2 max-md:px-4">
      {isLoading ? (
        <OverlayLoading>
          <Spinner className="w-8 h-8 md:w-14 md:h-16" />
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
          />
          <div className="flex gap-2 justify-end">
            <Button
              type="submit"
              className="bg-sky-600 border border-sky-600 text-white hover:bg-sky-500"
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
