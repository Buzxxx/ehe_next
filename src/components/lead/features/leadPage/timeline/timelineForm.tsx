import React, { useEffect, useState } from "react";
import { useLeadProfile } from "@/components/lead/features/leadPage/context/leadProfileContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { get_lead_status_controller } from "../../statusObject";
import { set_timeline_controller } from "../../timelineObject";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { set_lead_status_priority_on_server } from "../../leadObject";
import { get_all_active_employee_list_controller } from "@/components/lead/features/userObject";

export const TimelineFormSchema = z.object({
  id: z.string(),
  assigned_to: z.string(),
  status: z.string(),
  priority: z.string(),
  description: z.string().min(4),
});

const TimelineForm = () => {
  const {
    leadProfile,
    setLeadProfile,
    statusList,
    setStatusList,
    users,
    setUsers,
  } = useLeadProfile();
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const id = leadProfile.id?.toString() || "";
  const form = useForm<z.infer<typeof TimelineFormSchema>>({
    resolver: zodResolver(TimelineFormSchema),
    defaultValues: {
      id: id,
      assigned_to: "",
      status: "",
      priority: "",
      description: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch status list if it's not already available
        if (!statusList || statusList.length === 0) {
          const statusListResponse = await get_lead_status_controller();
          setStatusList(statusListResponse.statusList);
          console.log("called status");
        }
        const employeeListResponse =
          await get_all_active_employee_list_controller();
        setUsers(employeeListResponse);
        console.log("called users");
        // Fetch profile data after status list is set or already available
        if (leadProfile) {
          form.reset({
            id: leadProfile?.id?.toString() || "",
            assigned_to: leadProfile?.assigned_to?.id?.toString() || "",
            status: leadProfile?.status?.id?.toString() || "",
            priority: leadProfile?.priority || "",
            description: "",
          });
        }
      } catch (error) {
        console.error("Error during fetch:", error);
        toast({
          title: "Error",
          description: "Failed to load profile or status data.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [leadProfile, form, statusList, setStatusList, toast]);

  const onSubmit = async (data: {
    status: string;
    assigned_to: string;
    priority: string;
    description: string;
  }) => {
    setIsLoading(true);
    // Save data on server
    const isLeadSaved = await set_lead_status_priority_on_server(data);
    const isTimelineUpdated = await set_timeline_controller(data);
    if (isLeadSaved && isTimelineUpdated) {
      try {
        // Update lead profile locally
        setLeadProfile((prev) => {
          const matchedStatus = statusList.find(
            (item) => item.id.toString() === data.status
          );
          const matchedUser = users.find(
            (item) => item.id.toString() === data.assigned_to
          );
          return {
            ...prev,
            status: matchedStatus
              ? {
                  id: matchedStatus.id.toString(),
                  status: matchedStatus.status,
                }
              : { id: "default-id", status: "Unknown" },
            assigned_to: matchedUser
              ? {
                  id: Number(matchedUser.id), // Convert id to number
                  name: matchedUser.name,
                }
              : { id: 0, name: "Unknown" }, // Default id as number
            priority: data.priority,
          };
        });

        toast({ title: "Timeline updated successfully!" });
      } catch (error) {
        console.error("Failed to update timeline:", error);
        toast({ title: "Error updating timeline", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    } else {
      toast({
        title: "Error updating database, please contact your Admin",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full h-fit my-auto p-4 rounded-md"
      >
        {/* Assigned to Field */}
        <FormField
          control={form.control}
          name="assigned_to"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs text-gray-500">
                Assigned to
              </FormLabel>
              <Select
                value={form.watch("assigned_to")}
                onValueChange={(value) => {
                  form.setValue("assigned_to", value);
                  field.onChange(value);
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select someone (Unassigned)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Status Field */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs text-gray-500">Status</FormLabel>
              <Select
                value={form.watch("status")}
                onValueChange={(value) => {
                  form.setValue("status", value);
                  field.onChange(value);
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
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
        {/* Priority Field */}
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs text-gray-500">Priority</FormLabel>
              <Select
                value={form.watch("priority")}
                onValueChange={(value) => field.onChange(value)}
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
        {/* Description Field */}
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
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-slate-500" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TimelineForm;
