import Link from "next/link";
import Logo from "../ui/logo";
import { Links } from "@/lib/constant";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white py-4 px-6">
      <div className="w-full md:w-11/12 mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href={Links.eheWebsiteHome}>
          <Logo />
        </Link>
        {/* Navigation */}
        <ul className="md:flex md:space-x-4">
          <Link className="hover:text-gray-400" href={Links.eheWebsiteHome}>
            Home
          </Link>
          <Link
            className="hover:text-gray-400 hidden md:block"
            href={Links.eheWebsiteProperties}
          >
            Properties
          </Link>
          <Link
            className="hover:text-gray-400 hidden md:block"
            href={Links.eheWebsiteAbout}
          >
            About
          </Link>
          <Link
            className="hover:text-gray-400 hidden md:block"
            href={Links.eheWebsiteContact}
          >
            Contact
          </Link>
        </ul>
      </div>
    </header>
  );
}
