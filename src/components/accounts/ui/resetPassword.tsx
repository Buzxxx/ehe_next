"use client";

import { z } from "zod";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import InputFieldPlaceholder from "@/components/accounts/ui/inputFieldPlaceholder";

const InputField = dynamic(
  () => import("@/components/accounts/ui/inputField"),
  {
    loading: () => <InputFieldPlaceholder />,
  }
);

const formSchema = z
  .object({
    oldPassword: z.string().nonempty("Old password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ResetPassword = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to reset password");
      }

      const result = await response.json();
      console.log("Password reset successful", result);
    } catch (error) {
      console.error("Error resetting password", error);
    }
  };

  const handleCancel = () => {
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <InputField
          name="oldPassword"
          label="Old Password"
          placeholder="old password"
          control={form.control}
          isPassword={true}
        />
        <InputField
          name="newPassword"
          label="New Password"
          placeholder="new password"
          control={form.control}
          isPassword={true}
        />
        <InputField
          name="confirmPassword"
          label="Confirm New Password"
          placeholder="confirm new password"
          control={form.control}
          isPassword={true}
        />

        <div className="mt-4 text-slate-400 space-y-2 text-sm">
          <p>New password must contain:</p>
          <ul className="md:text-sm text-xs">
            <li>- At least 8 characters</li>
            <li>- At least 1 lowercase letter (a-z)</li>
            <li>- At least 1 uppercase letter (A-Z)</li>
            <li>- At least 1 number (0-9)</li>
            <li>- At least 1 special character</li>
          </ul>
        </div>
        <div className="gap-2 w-fit flex flex-row justify-between mt-4 h-10 items-center">
          <Button type="submit" className="btn-primary">
            Change
          </Button>
          <Button
            type="button"
            className="btn-revert bg-transparent hover:bg-muted/70 duration-500"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ResetPassword;
