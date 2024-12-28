import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/dashboard/ui/customFormField";
import { FormFieldType } from "@/components/dashboard/library/formFieldEnum";
import { SelectItem } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { formatDate } from "@/lib/formatDate";
import OverlayLoading from "@/components/ui/overlayLoading";
import { Spinner } from "@/components/ui/icons";

// Define validation schema using zod directly
const LeadMeetingFormSchema = z.object({
  id: z.string(),
  date: z.date(),
  location: z.string().optional(),
  meeting_reason: z.string(),
  description: z.string().optional(),
});

type LeadMeetingFormData = z.infer<typeof LeadMeetingFormSchema>;

const LeadMeetingForm = ({
  id,
  setOpen,
}: {
  id: string;
  setOpen: (arg0: boolean) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<LeadMeetingFormData>({
    defaultValues: {
      id: id,
      date: new Date(),
      location: "",
      meeting_reason: "",
      description: "",
    },
  });

  const onSubmit = async (data: LeadMeetingFormData) => {
    setIsLoading(true);
    console.log({ ...data, id });
    setTimeout(() => {
      setIsLoading(false);
      setOpen(false);
      toast({
        title: `Meeting Set for ${formatDate(data.date.toISOString())} hrs`,
      });
    }, 1000);
  };

  const meetingReasons = [
    "Meeting Requested",
    "Meeting Planned",
    "Follow up meeting",
    "Site Visit",
  ];

  return (
    <div className="form-wrapper py-2">
      {isLoading ? (
        <OverlayLoading>
          <Spinner className="w-8 h-8 md:w-14 md:h-16 " />
        </OverlayLoading>
      ) : null}
      <Form {...form}>
        <h2 className="pt-4 font-bold">Set Meeting</h2>
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
            placeholder="dd-MM-yyyy h-mm"
            dateFormat="dd-MM-yyyy h:mm aa"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="location"
            label="Location (Optional)"
            placeholder="Add a location (if required)"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SELECT}
            name="meeting_reason"
            label="Reason for Meet"
            placeholder={meetingReasons[0]}
          >
            {meetingReasons.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </CustomFormField>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="description"
            label="Description (Optional)"
            placeholder="Add a description (if required)"
          />
          <div className="flex gap-2 justify-end">
            <Button
              type="submit"
              className="bg-sky-600 border border-sky-600 text-white hover:bg-sky-500"
            >
              Set a follow up
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LeadMeetingForm;
