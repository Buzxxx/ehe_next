"use client";
import { useState } from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues, FieldPath } from "react-hook-form";
import dynamic from "next/dynamic";

const ClosedEye = dynamic(() => import("@/components/ui/icons/closedEye"));
const OpenEye = dynamic(() => import("@/components/ui/icons/openEye"));

interface InputFieldProps<TFieldValues extends FieldValues> {
  label: string;
  placeholder: string;
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  isPassword?: boolean;
}

const InputField = <TFieldValues extends FieldValues>({
  label,
  placeholder,
  name,
  control,
  isPassword = false,
}: InputFieldProps<TFieldValues>) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible((prev) => !prev);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          <FormLabel className="md:text-sm text-xs text-foreground">
            {label}
          </FormLabel>
          <FormControl>
            <div className={isPassword ? "relative" : ""}>
              <Input
                placeholder={placeholder}
                {...field}
                type={isPassword ? (visible ? "text" : "password") : "text"}
                className="py-6 mb-2 md:text-sm text-xs"
              />
              {isPassword && (
                <>
                  <span
                    className="absolute right-4 cursor-pointer w-fit ml-auto h-fit top-1/2 -translate-y-1/2 text-slate-400"
                    onClick={toggleVisibility}
                  >
                    <ClosedEye className={!visible ? "" : "hidden"} />
                  </span>
                  <span
                    className="absolute right-4 cursor-pointer w-fit ml-auto h-fit top-1/2 -translate-y-1/2 text-slate-400"
                    onClick={toggleVisibility}
                  >
                    <OpenEye className={!visible ? "hidden" : ""} />
                  </span>
                </>
              )}
            </div>
          </FormControl>
          <div className="min-h-[1.5rem]">
            <FormMessage className={error ? "visible" : "invisible"}>
              {error?.message}
            </FormMessage>
          </div>
        </FormItem>
      )}
    />
  );
};

export default InputField;
