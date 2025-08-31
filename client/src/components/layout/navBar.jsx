"use client";

import { useState, useContext } from "react";
import { Menu, X, Bike } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import LoginModal from "@/components/general/loginModal";
import ContactModal from "@/components/general/contactModal";
import { ModeToggle } from "../global/themeButton";
import { FavoritesContext } from "@/context/favoriteCount";
import { useRouter } from "next/navigation";

const links = [
  { name: "Home", href: "/" },
  { name: "Blogs", href: "/blogs" },
  { name: "Support", href: "/support" },
  { name: "Contact" }, // no href, only a navbar action
  { name: "Partner", href: "/partner" },
  { name: "Explore", href: "/explore" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const { favoriteCount } = useContext(FavoritesContext);
  const router = useRouter();

  return (
    <nav className="bg-white dark:bg-black shadow-lg fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
      <div className="max-w-full mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
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

          {/* Desktop Links */}
          <div className="hidden ml-20 lg:flex items-center space-x-6">
            {links.map((link) =>
              link.name === "Contact" ? (
                <button
                  key={link.name}
                  onClick={() => setContactOpen(true)}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
                >
                  {link.name}
                </Link>
              )
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <ModeToggle />
          </div>

          <Button
            variant="googleBlue"
            onClick={() => router.push("/explore/favorite")}
            className="flex items-center gap-2"
          >
            <Bike /> <span>{favoriteCount}</span>
          </Button>

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

          {/* Mobile Menu Toggle */}
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
        <div className="md:hidden fixed top-0 left-0 w-full h-screen bg-white dark:bg-black z-40 transition-all duration-300 overflow-auto">
          {/* Header */}
          <div className="flex items-center justify-end px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-700 dark:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col space-y-4 py-6 px-6">
            {links.map((link) =>
              link.name === "Contact" ? (
                <button
                  key={link.name}
                  onClick={() => {
                    setContactOpen(true);
                    setIsOpen(false);
                  }}
                  className="w-full text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2 px-3 rounded-md transition-colors duration-200"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="w-full text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2 px-3 rounded-md transition-colors duration-200"
                >
                  {link.name}
                </Link>
              )
            )}
          </div>

          {/* Actions + Theme Toggle */}
          <div className="flex items-center justify-between py-4 px-6 border-t border-gray-200 dark:border-gray-800">
            <div className="flex space-x-3">
              <Button
                variant="googleBlue"
                onClick={() => {
                  setLoginOpen(true);
                  setIsOpen(false);
                }}
                className="font-medium"
              >
                Login
              </Button>
              <Button variant="googleBlue" asChild className="font-medium">
                <Link href="/signup" onClick={() => setIsOpen(false)}>
                  Sign Up
                </Link>
              </Button>
            </div>
            <ModeToggle />
          </div>
        </div>
      )}

      {/* Modals */}
      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
