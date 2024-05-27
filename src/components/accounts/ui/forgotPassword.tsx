"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

// Import dynamic from next/dynamic and InputFieldPlaceholder
import dynamic from "next/dynamic";
import InputFieldPlaceholder from "@/components/accounts/ui/inputFieldPlaceholder";

const InputField = dynamic(
  () => import("@/components/accounts/ui/inputField"),
  {
    loading: () => <InputFieldPlaceholder />,
  }
);
const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required.",
  }),
  email: z
    .string()
    .min(1, {
      message: "Email is required.",
    })
    .email("This is not a valid email.")
    .refine((e) => e === "abcd@fg.com", "This email is not in our database"),
});

const ForgotPassword = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full text-sm">
        <InputField
          label="Username"
          placeholder="username"
          control={form.control}
          name="username"
        />
        <InputField
          label="Email"
          placeholder="example@email.com"
          control={form.control}
          name="email"
        />
        <Button
          type="submit"
          className="mt-4 bg-primary hover:bg-primary-hover py-6 w-full "
        >
          Send
        </Button>
        <p className="mt-12 mb-3 text-slate-400">© 2020-2021</p>
      </form>
    </Form>
  );
};

export default ForgotPassword;
