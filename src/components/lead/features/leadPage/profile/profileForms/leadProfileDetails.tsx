import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLeadProfile } from "@/components/lead/features/leadPage/context/leadProfileContext";
import { update_lead_on_server } from "@/components/lead/features/leadObject";
import { useToast } from "@/components/ui/use-toast";

// Define schema with `id`
const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().nonempty("Name is required"),
  contact: z.string().nonempty("Contact is required"),
  email: z.string().email("Invalid email address").optional(),
});

const LeadProfileDetails = () => {
  const { leadProfile, setLeadProfile } = useLeadProfile();
  const { toast } = useToast();

  // Initialize the form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: leadProfile.name || "",
      contact: leadProfile.contact || "",
      email: leadProfile.email || "",
      id: leadProfile.id.toString(),
    },
  });

  useEffect(() => {
    if (leadProfile) {
      form.reset({
        id: leadProfile?.id?.toString() || "",
        name: leadProfile?.name || "",
        contact: leadProfile?.contact?.toString() || "",
        email: leadProfile?.email || "",
      });
    }
  }, []);

  const onSubmit = async (data: any) => {
    console.log(data); // `id` will be included here
    try {
      const isLeadSaved = await update_lead_on_server(data);

      if (isLeadSaved) {
        // Update lead profile locally
        setLeadProfile((prev) => ({
          ...prev,
          id: data.id || prev.id,
          name: data.name || prev.name,
          contact: data.contact || prev.contact,
          email: data.email || prev.email,
        }));

        toast({ title: "Profile updated successfully!" });
      } else {
        toast({
          title: "Error updating database, please contact your Admin",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4">
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Contact Field */}
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter contact"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter email"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default LeadProfileDetails;
