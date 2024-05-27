// src/components/accounts/ui/login.tsx
"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import dynamic from "next/dynamic";
import InputFieldPlaceholder from "@/components/accounts/ui/inputFieldPlaceholder";
import Spinner from "@/components/ui/icons/spinner";

// Dynamic import with placeholder
const InputField = dynamic(
  () => import("@/components/accounts/ui/inputField"),
  {
    loading: () => <InputFieldPlaceholder />,
  }
);

// Form schema definition using zod
const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

type FormSchemaType = z.infer<typeof formSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormSchemaType) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/accounts/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        console.log("Login successful:", data);
        setIsLoading(false);
        router.push("/dashboard");
      } else {
        const errorData = await response.json();
        console.error("Login error:", errorData.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full text-sm space-y-2"
      >
        <InputField
          name="username"
          label="Username"
          placeholder="username"
          control={form.control}
        />
        <InputField
          name="password"
          label="Password"
          placeholder="password"
          isPassword={true}
          control={form.control}
        />
        {isLoading ? (
          <Button
            type="button"
            className="bg-muted gap-4 mt-4 py-6 w-full flex items-center justify-center text-slate-300"
            disabled={true}
          >
            <Spinner className="w-6 h-6" />
            Processing...
          </Button>
        ) : (
          <Button
            type="submit"
            className="mt-4 bg-primary hover:bg-primary-hover py-6 w-full"
          >
            Login
          </Button>
        )}
        <Link
          className="mt-2 text-sm mx-auto"
          href="/accounts/forgotPassword"
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
