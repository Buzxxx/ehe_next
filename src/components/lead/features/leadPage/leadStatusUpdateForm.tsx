import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useLeadProfile } from "../context/leadProfileContext";
import {
  LeadStatus,
  DefaultLeadStatus,
  get_lead_status_controller,
} from "../statusObject";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const LeadStatusUpdateFormSchema = z.object({
  id: z.string(),
  status: z.string(),
  priority: z.string(),
  description: z.string().min(2),
});

const LeadStatusUpdateForm = ({
  id,
  setOpen,
}: {
  id: string;
  setOpen?: (arg0: boolean) => void;
}) => {
  const { leadProfile, setLeadProfile } = useLeadProfile();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [statusList, setStatusList] = useState<LeadStatus[]>([
    DefaultLeadStatus,
  ]);

  useEffect(() => {
    const fetchStatusList = async () => {
      try {
        setIsLoading(true);
        const statusList = await get_lead_status_controller();
        setStatusList(statusList.statusList);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStatusList();
    setLeadProfile(leadProfile);
  }, [id, toast]);

  const form = useForm<z.infer<typeof LeadStatusUpdateFormSchema>>({
    resolver: zodResolver(LeadStatusUpdateFormSchema),
    defaultValues: {
      id: id,
      status: "",
      priority: "",
      description: "",
    },
  });

  // Update `status` default value if `leadProfile` updates
  useEffect(() => {
    form.reset({
      id: id,
      status: leadProfile.status.id.toString() || DefaultLeadStatus.status,
      priority: "cold",
      description: "",
    });
  }, [leadProfile, form, id]);

  const onSubmit = async (data: z.infer<typeof LeadStatusUpdateFormSchema>) => {
    setIsLoading(true);
    console.log({ ...data, id });
    setIsLoading(false);
    setOpen && setOpen(false);
    toast({
      title: `Timeline updated!`,
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full  h-fit my-auto  p-4 rounded-md"
        >
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      {statusList.map((status) => (
                        <SelectItem
                          key={status.id}
                          value={status.id.toString()}
                          disabled={status.status === "New"}
                        >
                          {status.status}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem key="cold" value="cold">
                        Cold
                      </SelectItem>
                      <SelectItem key="warm" value="warm">
                        Warm
                      </SelectItem>
                      <SelectItem key="hot" value="hot">
                        Hot
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid w-full gap-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Type activity comment"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Comment and description are manadatory to update{"  "}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-slate-500">
              Comment
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default LeadStatusUpdateForm;
