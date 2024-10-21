"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Avataar from "@/components/dashboard/ui/avataar"
import NavMenu from "../ui/navMenu" // Importing the NavMenu component
import { ChevronUp, MenuIcon } from "@/components/ui/icons"

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
  openFrom?: "left" | "right" | "top" // Prop to control from which side the menu opens
}

const Navbar: React.FC<NavbarProps> = ({
  logo,
  navLinks,
  user,
  openFrom = "top",
}) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200/80 z-50 max-md:shadow-xl ">
      <nav className="container mx-auto flex items-center justify-between md:py-4 py-3 md:px-20 px-4 ">
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

        {/* Hamburger Menu Button (Visible on mobile) */}

        {/* Navigation Links (Using the NavMenu Component) */}
        <NavMenu
          navLinks={navLinks}
          isOpen={menuOpen}
          openFrom={openFrom}
          onClose={() => setMenuOpen(false)} // Close menu on link click
        />

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
                className="text-gray-600 hover:text-gray-900 transition-all hidden md:block"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-all hidden md:block"
              >
                Sign Up
              </Link>

              {/* Show buttons on mobile */}
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900 transition-all block md:hidden"
                onClick={() => setMenuOpen(false)}
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-all block md:hidden "
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
              <button
                className="md:hidden block text-gray-600 focus:outline-none"
                onClick={toggleMenu}
              >
                {menuOpen ? <ChevronUp /> : <MenuIcon />}
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
