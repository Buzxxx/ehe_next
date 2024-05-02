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
  addressNumber: z.string().min(2, "Please enter a valid street number"),
  addressStreetname: z.string().min(2, "Please enter a valid street name"),
  addressCity: z.string().min(2, "Please enter a valid city"),
  addressState: z.string().min(2, "Please enter a valid state"),
});

type UpdateForm = z.infer<typeof formSchema> & {
  updateFields: (fields: Partial<z.infer<typeof formSchema>>) => void;
};

export default function AddressForm({
  addressNumber,
  addressStreetname,
  addressCity,
  addressState,
  updateFields,
}: UpdateForm) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      addressNumber: addressNumber,
      addressStreetname: addressStreetname,
      addressCity: addressCity,
      addressState: addressState,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateFields({
      addressNumber: values.addressNumber,
      addressStreetname: values.addressStreetname,
      addressCity: values.addressCity,
      addressState: values.addressState,
    });
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Address Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="addressNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street number</FormLabel>
                  <FormControl>
                    <Input placeholder="Street number" {...field} />
                  </FormControl>
                  <FormDescription>
                    <FormMessage />
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="addressStreetname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street name</FormLabel>
                  <FormControl>
                    <Input placeholder="Street Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    <FormMessage />
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="addressCity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormDescription>
                    <FormMessage />
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="addressState"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="State" {...field} />
                  </FormControl>
                  <FormDescription>
                    <FormMessage />
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </>
  );
}
