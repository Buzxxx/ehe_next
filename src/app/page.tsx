import { Button } from "@/components/ui/button";
import { Links } from "@/lib/constant";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-blue-50">
        <div className="flex justify-center md:pt-10">
          <h2>
            If you are not redirected to our homepage automatically, please
            click below
          </h2>
        </div>
        <div className="flex justify-center md:pt-10">
          <Link href={Links.eheWebsiteHome}>
            <Button className="align-middle mx-auto">Home</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
