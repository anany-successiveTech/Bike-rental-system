"use client";
import React, { useContext } from "react";
import { FavoritesContext } from "@/context/favoriteCount";
import BikeCard from "@/components/general/BikeCrad";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

const FavoritesPage = () => {
  const router = useRouter();
  const { favoriteBikes, favoriteCount, removeFavorite } =
    useContext(FavoritesContext);

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
        <Heart className="w-12 h-12 text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">No Favorites Yet</h2>
        <p className="text-muted-foreground max-w-md">
          Start exploring bikes and add them to your favorites
        </p>
      </div>
      <Button className="mt-4" onClick={() => router.push("/explore")}>
        <ShoppingCart className="w-4 h-4 mr-2" />
        Explore Bikes
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <div className="mb-8 flex items-center gap-6">
        <div className="flex items-center justify-between">
          {favoriteCount > 0 && (
            <div className="bg-primary/10 text-primary px-4 py-2 rounded-full">
              <Heart className="w-4 h-4 inline mr-2" />
              {favoriteCount}
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      {favoriteCount === 0 ? (
        <EmptyState />
      ) : (
        <>
          {/* Bikes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteBikes.map((bike) => (
              <div key={bike.id} className="relative">
                <BikeCard bike={bike} />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 z-10 transform transition-transform duration-300 hover:scale-130 "
                  onClick={() => removeFavorite(bike.id)}
                >
                  <Heart className="w-4 h-4 text-red-500 stroke-current" />
                </Button>
              </div>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="google" onClick={() => router.push("/explore")}>
              Continue Exploring
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default FavoritesPage;
