import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
  status: z.string(),
  user: z.string(),
});

const FilterForm = ({className}:{ className:string }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  return (
    <Form {...form}>
      <form method="GET" className={`w-1/4 ml-auto space-y-4 absolute right-0 border-x h-screen border-slate-300 p-4 duration-300 transition-all ${className}`}>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="17">Closed</SelectItem>
                  <SelectItem value="16">RnR</SelectItem>
                  <SelectItem value="15">BBA</SelectItem>
                  <SelectItem value="14">Meeting Planned</SelectItem>
                  <SelectItem value="13">Follow up meeting</SelectItem>
                  <SelectItem value="12">Site Visit</SelectItem>
                  <SelectItem value="11">Invalid</SelectItem>
                  <SelectItem value="10">Already Purchased</SelectItem>
                  <SelectItem value="9">ATS In-Progress</SelectItem>
                  <SelectItem value="8">Token Done</SelectItem>
                  <SelectItem value="7">Meeting Done</SelectItem>
                  <SelectItem value="6">Not Interested</SelectItem>
                  <SelectItem value="5">Different Requirement</SelectItem>
                  <SelectItem value="4">Postponed</SelectItem>
                  <SelectItem value="3">Follow Up Needed</SelectItem>
                  <SelectItem value="2">Call Back</SelectItem>
                  <SelectItem value="1">New</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="user"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User</FormLabel>
              <Select name="user">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="User" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Self">Self</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="user"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Source</FormLabel>
              <Select name="source">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Source" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="magicBricks">Magic Bricks</SelectItem>
                  <SelectItem value="magicBricks_bangalore">
                    Magic Brick Bangalore
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="user"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <Select name="location">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="user"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <Select name="date">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Date" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Today">Today</SelectItem>
                  <SelectItem value="Custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button type="submit" className="py-1 ml-1">
          Filter
        </Button>
      </form>
    </Form>
  );
};

export default FilterForm;
