import InputField from "@/components/accounts/ui/inputField";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ProfileForm } from "@/components/accounts/feature/form";

export default function Home() {
  return (
    <div className="shadow-lg mt-20 rounded-md bg-slate-100 w-1/4 mx-auto  p-4 border-2">
      <div className="image w-20 mb-4 mx-auto">
        <Image
          className="mx-auto w-full h-auto"
          src="/base/logo.png"
          alt=""
          height={125}
          width={160}
        />
      </div>
      <ProfileForm />
    </div>
  );
}
