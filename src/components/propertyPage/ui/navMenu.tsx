"use client"

import React, { useEffect, useRef } from "react"
import Link from "next/link"

type NavLink = {
  label: string
  href: string
}

interface NavMenuProps {
  navLinks: NavLink[]
  isOpen: boolean
  openFrom: "left" | "right" | "top"
  onClose: () => void // To handle closing the menu when an item is clicked
}

const NavMenu: React.FC<NavMenuProps> = ({
  navLinks,
  isOpen,
  openFrom,
  onClose,
}) => {
  const menuRef = useRef<HTMLUListElement>(null)

  // Close menu on clicking outside (for mobile view)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  const getTransformClass = () => {
    switch (openFrom) {
      case "left":
        return isOpen ? "translate-x-0" : "max-md:-translate-x-full"
      case "right":
        return isOpen ? "translate-x-0" : "max-md:translate-x-full"
      case "top":
      default:
        return isOpen ? "translate-y-16" : "max-md:-translate-y-full"
    }
  }

  return (
    <ul
      ref={menuRef}
      className={`md:flex block md:items-center md:space-x-8 font-medium max-md:absolute left-0 top-0  w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none pt-0 pb-4 px-8 md:p-0 transition-transform transform z-40 space-y-4 md:space-y-0 ${getTransformClass()}`}
    >
      {navLinks.map((link, index) => (
        <li key={index}>
          <Link
            href={link.href}
            className="text-gray-600 hover:text-gray-900 transition-all text-sm block py-2 md:inline"
            onClick={onClose} // Close menu on link click
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default NavMenu
