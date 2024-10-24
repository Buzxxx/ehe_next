import Image from "next/image"
import Link from "next/link"
import React from "react"

import { Twitter, Linkedin, Instagram } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="md:px-20 px-2 py-4 bg-slate-900 text-white flex flex-col justify-between items-stretch gap-4">
      <div className="flex justify-between items-center py-4 border-b border-slate-700">
        <Link href={"/"}>
          <Image
            src={"/property/icons/logo_white.svg"}
            alt="logo"
            width={120}
            height={80}
          />
        </Link>
        <div className="flex items-center justify-between text-white gap-2">
          <p className="font-semibold ">Follow Us:</p>
          <Link href="#" className="p-1.5 bg-slate-700 rounded-full">
            <Linkedin color="white" size={20} />
          </Link>
          <Link href="#" className="p-1.5 bg-slate-700 rounded-full">
            <Instagram size={20} />
          </Link>
          <Link href="#" className="p-1.5 bg-slate-700 rounded-full">
            <Twitter color="white" size={20} />
          </Link>
        </div>
      </div>

      <div className="flex md:flex-row flex-col flex-wrap gap-6 justify-between py-8 border-b border-slate-700 ">
        <div>
          <h4 className="md:text-xl text-lg font-semibold md:mb-4 mb-2">
            Subscribe
          </h4>
          <div className="relative h-10 border-b border-slate-800">
            <Input
              placeholder="Email"
              className="w-80 bg-transparent border-0"
            />
            <Button className="bg-slate-700 hover:bg-slate-600 absolute right-0 top-1/2 -translate-y-1/2 h-8 text-sm">
              Subscribe
            </Button>
          </div>
          <p className="mt-2 text-xs text-slate-500 px-2">
            Subscribe to our newsletter to receive our weekly feed.
          </p>
        </div>
        <div>
          <h4 className="md:text-xl text-lg font-semibold md:mb-4 mb-2">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="hover:text-slate-500">
              <Link href="#">Home</Link>
            </li>
            <li className="hover:text-slate-500">
              <Link href="#">About Us</Link>
            </li>
            <li className="hover:text-slate-500">
              <Link href="#">Properties</Link>
            </li>
            <li className="hover:text-slate-500">
              <Link href="#">Agents</Link>
            </li>
            <li className="hover:text-slate-500">
              <Link href="#">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="md:text-xl text-lg font-semibold md:mb-4 mb-2">
            Contact Us
          </h4>
          <p className="text-slate-400 text-sm">
            95th Avenue, Gurugram, Harayana 400001
          </p>
          <p className="text-slate-400 text-sm">+91 1234567890</p>
        </div>
        <div>
          <h4 className="md:text-xl text-lg font-semibold md:mb-4 mb-2">
            Discover
          </h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="hover:text-slate-500">
              <Link href="#">Delhi</Link>
            </li>
            <li className="hover:text-slate-500">
              <Link href="#">Mumbai</Link>
            </li>
            <li className="hover:text-slate-500">
              <Link href="#">Kolkata</Link>
            </li>
            <li className="hover:text-slate-500">
              <Link href="#">Chennai</Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="text-slate-500 text-sm text-center">
        Copyright &copy; 2024
      </p>
    </footer>
  )
}
