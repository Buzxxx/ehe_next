/**
 * @path src/components/lead/features/forms/leadReassignForm.tsx
 */

import CustomFormField from "@/components/dashboard/ui/customFormField";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { FormFieldType } from "@/components/dashboard/library/formFieldEnum";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const LeadReassignFormSchema = z.object({
  assignTo: z.string().min(1, "Please select a user"),
});

interface LeadReassignFormProps {
  leadIds: number[];
  setShowLeadReassignModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const LeadReassignForm: React.FC<LeadReassignFormProps> = ({
  leadIds,
  setShowLeadReassignModal,
}) => {
  const form = useForm<z.infer<typeof LeadReassignFormSchema>>({
    resolver: zodResolver(LeadReassignFormSchema),
  });
  const { toast } = useToast();

  const onSubmit = async (data: z.infer<typeof LeadReassignFormSchema>) => {
    console.log(data, leadIds);
    setShowLeadReassignModal(() => false);
    toast({
      title: `Lead: ${leadIds} reassigned to ${data.assignTo}`,
      className: "bg-green-400 text-white",
    });
  };

  const users = Array.from({ length: 5 }, (_, i) => `User ${i + 1}`);

  return (
    <Form {...form}>
      <h2 className="text-2xl font-bold md:p-4">Reassign</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4">
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name="assignTo"
          label="Assign to"
          placeholder="Select User"
        >
          {users.map((user) => (
            <SelectItem key={user} value={user}>
              {user}
            </SelectItem>
          ))}
        </CustomFormField>
        <div className="flex gap-2 justify-end">
          <Button
            type="reset"
            onClick={() => setShowLeadReassignModal(() => false)}
            className="bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 "
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className=" text-white border border-sky-600  bg-sky-600 hover:bg-sky-500"
          >
            Confirm
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LeadReassignForm;
