import React from "react"
import Link from "next/link"
import Image from "next/image"
import Avataar from "@/components/dashboard/ui/avataar"

type NavLink = {
  label: string
  href: string
}

type User = {
  isLoggedIn: boolean
  avatarUrl?: string
}

interface NavbarProps {
  logo: string // Logo URL
  navLinks: NavLink[] // Array of nav links
  user: User // User object for login state
}

const Navbar: React.FC<NavbarProps> = ({ logo, navLinks, user }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200/80">
      <nav className="container mx-auto flex items-center justify-between py-4 md:px-20">
        {/* Logo */}
        <Link href="/">
          <Image
            src={logo}
            alt="Property Logo"
            width={120}
            height={36}
            className="h-8 object-cover"
          />
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-8 font-medium">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className="text-gray-600 hover:text-gray-900 transition-all text-sm"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* User Section */}
        <div className="flex items-center space-x-4 text-sm font-medium">
          {user.isLoggedIn ? (
            // Display Avatar if user is logged in
            <Link href="/profile" className="flex items-center">
              {user.avatarUrl ? (
                <Image
                  src={user.avatarUrl}
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              ) : (
                <Avataar className="text-3xl text-gray-600" />
              )}
            </Link>
          ) : (
            // Display Login/Signup if user is not logged in
            <>
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900 transition-all"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-all "
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
