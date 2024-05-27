// src/pages/dashboard.tsx
import { Button } from "@/components/ui/button";
import { Links } from "@/lib/constant";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

export default function Dashboard() {


  return (
    <div className="bg-blue-50 text-center mx-auto min-h-full">
      <div className="flex justify-center md:pt-10">
        <h2>
          If you are not redirected to our homepage automatically, please click
          below
        </h2>
      </div>
      <div className="flex justify-center md:pt-10">
        <Link href={Links.eheWebsiteHome}>
          <Button className="align-middle mx-auto">Home</Button>
        </Link>
      </div>
    </div>
  );
}
