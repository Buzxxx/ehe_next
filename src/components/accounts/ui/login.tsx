"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "@/components/accounts/ui/inputField";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full text-sm outline-none shadow-none"
      >
        <h1 className="text-center font-semibold text-2xl mb-4">
          LOGIN
        </h1>
        <InputField
          label="Username"
          placeholder="username"
          field={form.register("username")}
        />
        <InputField
          label="Password"
          placeholder="password"
          field={form.register("password")}
          isPassword={true}
        />
        <Button type="submit" className="mt-4 bg-primary hover:bg-primary-hover py-6 w-full ">
          Login
        </Button>
        <Link
          className=" mt-2 text-sm"
          href="/accounts/resetPassword"
          prefetch={true}
        >
          Forgot Password
        </Link>
        <p className="mt-12 mb-3 text-slate-400">© 2020-2021</p>
      </form>
    </Form>
  );
};

export default Login;
