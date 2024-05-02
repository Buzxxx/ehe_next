import Link from "next/link";
import CheckIcon from "@/components/property/ui/icons/checkIcon";
import { Links } from "@/lib/constant";

export default function Success() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="">
        <div className="flex items-center justify-center mb-6">
          <CheckIcon className="w-20 h-20"></CheckIcon>
        </div>
        <h1 className="text-3xl font-bold text-center mb-4">Thank you</h1>
        <p className="text-lg text-center mb-6">
          The form was submitted successfully.
        </p>
        <Link
          className="block w-full text-center bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          href={Links.eheWebsiteHome}
        >
          Go back to homepage
        </Link>
      </div>
    </div>
  );
}
