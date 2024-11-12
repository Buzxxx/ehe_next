import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/dashboard/ui/customFormField";
import { FormFieldType } from "@/components/dashboard/library/formFieldEnum";
import { LeadMeetingFormValidation } from "@/lib/validation";
import { SelectItem } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { formatDate } from "@/utility/formatDate";
import OverlayLoading from "@/components/ui/overlayLoading";
import { Spinner } from "@/components/ui/icons";

const LeadMeetingForm = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof LeadMeetingFormValidation>>({
    resolver: zodResolver(LeadMeetingFormValidation),
    defaultValues: {
      id: id,
      date: new Date(Date.now()),
      location: "",
      meeting_reason: "",
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LeadMeetingFormValidation>) => {
    {
      setIsLoading(true);
      console.log({ ...data, id });
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: `Meeting Set for ${formatDate(data.date.toISOString())} hrs`,
        });
      }, 1000);
    }
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
          <Spinner className="w-8 h-8 md:w-14 md:h-16 "></Spinner>
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
          ></CustomFormField>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="location"
            label="Location(Optional)"
            placeholder="Add a location (if required)"
          ></CustomFormField>
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
            label="Description(Optional)"
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
              className=" bg-sky-600 border border-sky-600 text-white hover:bg-sky-500"
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
