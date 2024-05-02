import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  ownerName: z
    .string()
    .min(2, { message: "Name must be at least 4 characters." }),
  ownerPhonenumber: z
    .string()
    .min(10, { message: "Phonenumber must be at least 10 digits." })
    .max(13, "Phonenumber should not be more than 13 digits."),
  ownerEmail: z.string().email().min(5),
});

type UpdateForm = z.infer<typeof formSchema> & {
  updateFields: (fields: Partial<z.infer<typeof formSchema>>) => void;
};

export default function OwnerForm({
  ownerName,
  ownerPhonenumber,
  ownerEmail,
  updateFields,
}: UpdateForm) {
  const precode = "+91";
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ownerName: ownerName,
      ownerPhonenumber: ownerPhonenumber,
      ownerEmail: ownerEmail,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateFields({
      ownerName: values.ownerName,
      ownerPhonenumber: precode + values.ownerPhonenumber,
      ownerEmail: values.ownerEmail,
    });
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Owner Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="ownerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ownerPhonenumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <div className="flex items-center mb-4">
                      <Input
                        className="appearance-none px-3 py-2 w-14"
                        disabled
                        placeholder={precode}
                      />
                      <Input
                        type="number"
                        placeholder="91********"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ownerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="ABC@GMAIL.COM" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Next</Button>
          </form>
        </Form>
      </CardContent>
    </>
  );
}
