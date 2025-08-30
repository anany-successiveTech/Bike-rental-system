"use client";
import "@/app/globals.css";
import TextAnimation from "@/components/animation/textTransition";
import * as React from "react";

const Home = () => {
  return (
    <div>
      <main className="min-h-screen flex items-center justify-center bg-white dark:bg-black py-16">
        <div className="container max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left: Hero text */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 dark:text-gray-100">
                Rent the perfect ride for every journey
              </h1>

              <div className="mt-1 text-2xl md:text-3xl font-bold text-yellow-500">
                {" "}
                <TextAnimation className="bg-gradient-to-r from-[#f58529] via-[#dd2a7b] via-[#8134af] to-[#515bd4] bg-clip-text text-transparent" />
              </div>

              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Trusted by riders across the city — easy booking, secure
                payments, and 24/7 support.
              </div>
            </div>

            {/* Right: Decorative image */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-xl">
                {" "}
                {/* Increased size from md → xl */}
                <img
                  src="/l-bike.jpg"
                  alt="Riding bike"
                  className="w-full h-auto rounded-2xl shadow-lg object-cover border border-gray-200 dark:border-gray-800"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
