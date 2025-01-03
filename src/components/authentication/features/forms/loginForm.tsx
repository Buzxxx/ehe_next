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
import { DEFAULT_LOGIN_REDIRECT } from "@/settings/settings";
import { LockKeyhole, PersonIcon } from "@/components/ui/icons";
import Link from "next/link";

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
  const redirectPath = searchParams.get("redirect") || DEFAULT_LOGIN_REDIRECT; // Default redirect path if not set
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
  }

  return (
    <Form {...Loginform}>
      <form
        onSubmit={Loginform.handleSubmit(onSubmit)}
        className="w-full text-sm "
      >
        <div className="space-y-4">
          <InputField
            placeholder="username"
            field={Loginform.register("username")}
            icon={<PersonIcon size={16} color="gray" stroke="gray" />}
          />
          {/* Display the username validation error */}
          {errors.username && (
            <p className="text-red-600 text-xs mt-1">
              {errors.username.message}
            </p>
          )}

          <InputField
            placeholder="password"
            field={Loginform.register("password")}
            isPassword={true}
            icon={<LockKeyhole size={18} fill="gray" stroke="white" />}
          />
          {/* Display the password validation error */}
          {errors.password && (
            <p className="text-red-600 text-xs mt-1">
              {errors.password.message}
            </p>
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
        </div>
        <Link
          className=" text-sm block text-indigo-600 font-semibold w-fit ml-auto"
          href={paths.forgotPassword}
          prefetch={true}
        >
          Forgot Password
        </Link>
        <Button
          type="submit"
          className="py-6 h-5 w-full bg-blue-500 hover:bg-primary-hover rounded-md text-lg mt-6 uppercase font-medium"
        >
          Log in
        </Button>
        <p className="mt-2 text-gray-600 text-center">
          Not a member yet?{" "}
          <Link href="#" className="text-indigo-600 font-medium">
            {" "}
            Sign Up
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;
