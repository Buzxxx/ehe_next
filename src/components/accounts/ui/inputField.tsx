"use client";
import { useState } from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormRegisterReturn } from "react-hook-form";
import dynamic from "next/dynamic";

const ClosedEye = dynamic(() => import("@/components/ui/icons/closedEye"));
const OpenEye = dynamic(() => import("@/components/ui/icons/openEye"));

interface InputFieldProps {
  label: string;
  placeholder: string;
  field: UseFormRegisterReturn;
  isPassword?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  field,
  isPassword = false,
}) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible((prev) => !prev);
  };

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className={isPassword ? "relative" : ""}>
          <Input
            placeholder={placeholder}
            {...field}
            type={isPassword ? (visible ? "text" : "password") : "text"}
            className="py-6"
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
      <FormMessage />
    </FormItem>
  );
};

export default InputField;
