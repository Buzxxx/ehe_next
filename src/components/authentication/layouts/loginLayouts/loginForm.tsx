"use client";

import { z } from "zod";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "@/components/authentication/ui/inputField";
import { paths } from "@/components/authentication/urls";
import { login } from "../../features/UserObject";

// Defined is the schema for the form
const loginFormSchema = z.object({
  username: z.string().min(1, {
    message: "Username cannot be empty",
  }),
  password: z.string().min(1, {
    message: "Password cannot be empty",
  }),
});

interface LoginFormProps {
  setLoading: (loading: boolean) => void;
}

const LoginForm = ({ setLoading }: LoginFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || paths.loginRedirect; // Default redirect path if not set
  const [message, setMessage] = useState({ status: "", message: "" });

  const Loginform = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const {
    formState: { errors },
  } = Loginform;

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setLoading(true);
    const loginResponse = await login(values);
    if (loginResponse.access) {
      Loginform.reset();
      router.push(redirectPath);
    }
    setMessage({
      status: loginResponse.status,
      message: loginResponse.message,
    });
    setLoading(false);
  }

  return (
    <Form {...Loginform}>
      <form
        onSubmit={Loginform.handleSubmit(onSubmit)}
        className="w-full text-sm space-y-4"
      >
        <InputField
          label="Username"
          placeholder="username"
          field={Loginform.register("username")}
        />
        {/* Display the username validation error */}
        {errors.username && (
          <p className="text-red-600 text-xs mt-1">{errors.username.message}</p>
        )}

        <InputField
          label="Password"
          placeholder="password"
          field={Loginform.register("password")}
          isPassword={true}
        />
        {/* Display the password validation error */}
        {errors.password && (
          <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>
        )}
        {message.message && (
          <div className="relative py-4">
            <div
              className={`absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-center items-center space-x-2 p-4 rounded-lg ${
                message.status === "failed"
                  ? " text-red-600"
                  : " text-green-600"
              }`}
            >
              <span className="font-medium">{message.message}</span>
            </div>
          </div>
        )}
        <Button
          type="submit"
          className="py-6 h-5 w-full bg-blue-500 hover:bg-primary-hover rounded-lg text-lg"
        >
          Log in
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
