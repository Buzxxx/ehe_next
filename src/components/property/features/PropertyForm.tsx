"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";

const formSchema = z.object({
  propertyName: z
    .string()
    .min(4, { message: "Property Name must be at least 4 characters." }),
  propertyType: z.string(),
  propertySize: z.string(),
  propertyBHK: z.string().max(2, "Invalid BHK"),
  propertyCategory: z.string(),
  propertyRent: z.string(),
  propertyMaintance: z.string(),
  propertyValue: z.string(),
  propertyAvaiablefrom: z.date({
    required_error: "Please tell us from when this property is Avialable.",
  }),
});

type UpdateForm = z.infer<typeof formSchema> & {
  updateFields: (fields: Partial<z.infer<typeof formSchema>>) => void;
};

export default function PropertyForm({
  propertyName,
  propertyType,
  propertySize,
  propertyBHK,
  propertyCategory,
  propertyRent,
  propertyMaintance,
  propertyValue,
  propertyAvaiablefrom,
  updateFields,
}: UpdateForm) {
  const [isPropertyBHK, SetIsPropertyBHK] = useState(true);
  const [isRent, SetIsRent] = useState(true);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyName: propertyName,
      propertyType: propertyType,
      propertySize: propertySize,
      propertyBHK: propertyBHK,
      propertyCategory: propertyCategory,
      propertyRent: propertyRent,
      propertyMaintance: propertyMaintance,
      propertyValue: propertyValue,
      propertyAvaiablefrom: propertyAvaiablefrom,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateFields({
      propertyName: values.propertyName,
      propertyType: values.propertyType,
      propertySize: values.propertySize,
      propertyBHK: values.propertyBHK,
      propertyCategory: values.propertyCategory,
      propertyRent: values.propertyRent,
      propertyMaintance: values.propertyMaintance,
      propertyValue: values.propertyValue,
      propertyAvaiablefrom: values.propertyAvaiablefrom,
    });
  }

  const PropertyTypeValues: {
    [key: string]: { svalue: string; BHK: boolean };
  } = {
    apartment: { svalue: "Apartment", BHK: true },
    individual: { svalue: "Individual house", BHK: true },
    plot: { svalue: "Plot", BHK: false },
    commercial: { svalue: "Commercial", BHK: false },
  };

  function dynamicCategory(e: string) {
    if (e == "rent") {
      SetIsRent(true);
    } else {
      SetIsRent(false);
    }
  }

  function dynamicType(e: string) {
    SetIsPropertyBHK(PropertyTypeValues[e].BHK);
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Property Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="propertyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property name</FormLabel>
                  <FormControl>
                    <Input placeholder="Whitefield..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    required
                    onValueChange={(e) => {
                      dynamicType(e);
                      field.onChange(e);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem key="val1" value="val1">
                        val1
                      </SelectItem>
                      <SelectItem key="val2" value="val2">
                        val2
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="propertySize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="3000 square feet "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isPropertyBHK ? (
              <FormField
                control={form.control}
                name="propertyBHK"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>BHK</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="3 BHK" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}

            <FormField
              control={form.control}
              name="propertyCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    required
                    defaultValue={field.value}
                    onValueChange={(e) => {
                      dynamicCategory(e);
                      field.onChange(e);
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="rent">Rent</SelectItem>
                      <SelectItem value="sale">Sale</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isRent ? (
              <>
                <FormField
                  control={form.control}
                  name="propertyRent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rent Amount</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="₹ 18000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="propertyMaintance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maintance</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="₹ 3000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <FormField
                control={form.control}
                name="propertyValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Base Property Value</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="₹ 5000000" {...field} />
                    </FormControl>
                    <FormDescription>Without regist</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="propertyAvaiablefrom"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Property available from</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date: Date) =>
                          date < new Date() || date > new Date("2025-12-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                    <FormMessage />
                  </Popover>
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
