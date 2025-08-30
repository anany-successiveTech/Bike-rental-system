"use client";

import { useState } from "react";
import { Menu, X, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed top-0 left-0 right-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl flex align-center font-bold text-blue-600 dark:text-blue-400">
          <div className="mt-4">
            <Link
              href="/"
              className="bg-gradient-to-r from-[#feda75] via-[#d62976] via-[#962fbf] via-[#4f5bd5] to-[#4f5bd5] text-transparent bg-clip-text font-bold"
            >
              Bikers
            </Link>
          </div>

          <div className="w-14 h-14 mx-3">
            {/* Logo for light mode */}
            <img
              src="/logo-light.png"
              alt="Product Logo"
              className="block dark:hidden"
            />

            {/* Logo for dark mode */}
            <img
              src="/logo-dark.png"
              alt="Product Logo"
              className="hidden dark:block"
            />
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 text-gray-800 dark:text-gray-200">
          <Link
            href="/"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            Home
          </Link>
          <Link
            href="/blogs"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            Blogs
          </Link>
          <Link
            href="/support"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            Support
          </Link>
          <Link
            href="/contact"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            Contact
          </Link>
          <Link
            href="/partner"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            Become a Partner
          </Link>
          <Link
            href="/explore"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            Explore
          </Link>
          <div className="relative group"></div>{" "}
          {/* Location Dropdown Placeholder */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden text-gray-800 dark:text-gray-200">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div>
          <div className="">
            <Link href="/">Home</Link>
            <Link href="/blogs">Blogs</Link>
            <Link href="/support">Support</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/partner">Become a Partner</Link>
            <Link href="/explore">Explore</Link>
          </div>

          <div className="md:hidden bg-white dark:bg-gray-900 shadow-md px-6 py-4 space-y-4 text-gray-800 dark:text-gray-200">
            <div className="flex gap-3">
              <Button>login</Button>
              <Button>signup</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
