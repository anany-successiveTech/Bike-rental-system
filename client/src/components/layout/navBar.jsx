"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Bike } from "lucide-react";
import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import LoginModal from "@/components/general/loginModal";
import { ModeToggle } from "../global/themeButton";
import { useContext } from "react";
import { FavoritesContext } from "@/context/favoriteCount";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { favoriteCount } = useContext(FavoritesContext);
  const router = useRouter();

  return (
    <nav className="bg-white dark:bg-black shadow-lg fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex-shrink-0">
                <img
                  src="/logo-light.png"
                  alt="Bikers Logo"
                  className="block dark:hidden w-full h-full object-contain"
                />

                <img
                  src="/logo-dark.png"
                  alt="Bikers Logo"
                  className="hidden dark:block w-full h-full object-contain"
                />
              </div>

              <Link href="/" className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-600 text-transparent bg-clip-text">
                  Bikers
                </span>
              </Link>
            </div>

            <div className="hidden ml-20 lg:flex items-center space-x-6 gap-2">
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                href="/blogs"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
              >
                Blogs
              </Link>
              <Link
                href="/support"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
              >
                Support
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
              >
                Contact
              </Link>
              <Link
                href="/partner"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
              >
                Partner
              </Link>
              <Link
                href="/explore"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
              >
                Explore
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div>
              <div className="hidden md:block">
                <ModeToggle />
              </div>
            </div>
            <div className="flex items-center mx-2 gap-1">
              <Button
                variant="googleBlue"
                onClick={() => {
                  router.push("/favorites");
                }}
              >
                <Bike />
                <p>{favoriteCount}</p>
              </Button>
            </div>

            <div className="hidden md:flex items-center space-x-3">
              <Button
                variant="google"
                onClick={() => setLoginOpen(true)}
                className="font-medium border"
              >
                Login
              </Button>
              <Button variant="google" asChild className="font-medium border">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-800">
            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-3 pt-4 mb-4">
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/blogs"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Blogs
              </Link>
              <Link
                href="/support"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Support
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/partner"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Become a Partner
              </Link>
              <Link
                href="/explore"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Explore
              </Link>
            </div>

            {/* Mobile Theme Toggle */}
            <div className="flex items-center justify-between mb-4 pt-3 border-t border-gray-200 dark:border-gray-800">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Theme
              </span>
              <ModeToggle />
            </div>

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col space-y-3">
              <Button
                variant="googleBlue"
                onClick={() => {
                  setLoginOpen(true);
                  setIsOpen(false);
                }}
              >
                Login
              </Button>
              <Button variant="google-blue" asChild>
                <Link href="/signup" onClick={() => setIsOpen(false)}>
                  Sign Up
                </Link>
              </Button>
              <Heart />
            </div>
          </div>
        )}
      </div>

      {/* Login Modal */}
      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </nav>
  );
};

export default Navbar;
