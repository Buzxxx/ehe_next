import React from "react";
import { Input } from "@/components/ui/input";

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  id: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ type, label, required, id, name }) => {
  return (
    <div className="mb-2">
      <label htmlFor={id}>{label}</label>
      <Input
        type={type}
        name={name}
        required={required}
        id={id}
        className="w-full px-6 py-3 my-2 inline-block border-2 border-slate-200 outline-none"
      />
    </div>
  );
};

export default InputField;
