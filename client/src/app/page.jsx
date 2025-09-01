"use client";
import "@/app/globals.css";
import TextAnimation from "@/components/animation/textTransition";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bike, CalendarCheck, Smile } from "lucide-react";
import cities from "@/sampleData/citiesList";

const test = [
  { name: "Activa i", imageSrc: "/activa.png" },
  { name: "Bullet 350", imageSrc: "/bullet.png" },
  { name: "Activa", imageSrc: "/activa-pro.png" },
  { name: "Z 900", imageSrc: "/z900.png" },
];

const Home = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-black py-16">
      <div className="container max-w-7xl mx-auto px-6 space-y-20">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Hero text */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 dark:text-gray-100">
              Rent the perfect ride for every journey
            </h1>

            <div className="text-2xl md:text-3xl font-bold text-yellow-500">
              <TextAnimation className="bg-gradient-to-r from-[#f58529] via-[#dd2a7b] via-[#8134af] to-[#515bd4] bg-clip-text text-transparent" />
            </div>

            <p className="text-base md:text-sm text-gray-600 dark:text-gray-400">
              Trusted by riders across the city - easy booking, secure payments,
              and 24/7 support.
            </p>
          </div>

          {/* Right: Hero Image */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-3xl">
              <img
                src="https://media.tacdn.com/media/attractions-splice-spp-674x446/15/c7/d4/9b.jpg"
                alt="Riding bike"
                className="w-full aspect-[16/9] rounded-xl shadow-xl object-cover border border-gray-200 dark:border-gray-800"
              />
            </div>
          </div>
        </div>

        {/* Bikes Section */}
        <section className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 text-center">
            Explore Most Rented Bikes in India
          </h2>

          <Carousel
            opts={{ align: "start" }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent>
              {test.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <Card className="h-full flex flex-col">
                      <CardContent className="flex flex-col items-center p-4 flex-grow">
                        {/* Bike Image */}
                        <img
                          src={item.imageSrc}
                          alt={item.name}
                          className="w-60 h-44 object-contain mb-4"
                        />

                        {/* Bike Name */}
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 text-center">
                          {item.name}
                        </h3>
                      </CardContent>

                      {/* Book Now Button */}
                      <div className="p-4">
                        <Button variant="outline" className="w-full">
                          Book Now
                        </Button>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        {/* Cities Section */}
        <section className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 text-center">
            Popular Cities We Serve
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {cities.map((city, i) => (
              <div
                key={i}
                className="flex flex-col items-center bg-white dark:bg-gray-900 shadow-sm rounded-lg p-2 hover:shadow-lg transition-all"
              >
                {/* City Image */}
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-38 object-cover border-rose-600 rounded-lg mb-2"
                />

                {/* City Name */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 text-center">
                  {city.name}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* Horizontal Step Cards Section */}
        <section className="mt-16 py-12 px-6 rounded-2xl bg-gray-50 dark:bg-gray-900">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 text-center mb-12">
            How It Works
          </h2>

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 max-w-6xl mx-auto">
            {/* Dotted connecting road */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dotted border-gray-300 dark:border-gray-600 z-0"></div>

            {/* Step 1 */}
            <div className="relative flex-1 z-10">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
                <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                  <Bike className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Choose Your Ride
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Browse our fleet and pick the perfect bike for your journey.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex-1 z-10">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
                <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400">
                  <CalendarCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Book Instantly
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Secure your bike in just a few clicks with fast and safe
                  booking.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex-1 z-10">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
                <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
                  <Smile className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Ride & Enjoy
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Pick up your bike, ride safely, and return hassle-free.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
