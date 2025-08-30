"use client";
import { useState, useContext } from "react";
import bikesData from "@/sampleData/data.js";
import { FavoritesContext } from "@/context/favoriteCount";
import { Heart } from "lucide-react";

const BikesPage = () => {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [animateHeart, setAnimateHeart] = useState(null);
  const [selectedBike, setSelectedBike] = useState(null);
  const { addFavorite, removeFavorite, isFavorite } =
    useContext(FavoritesContext);

  // Filtering & Sorting
  const filteredBikes = bikesData
    .filter((bike) => bike.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-black dark:via-gray-900 dark:to-black text-gray-900 dark:text-white p-6 transition-all duration-500">
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Search + Sort Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 max-w-7xl mx-auto">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Search your dream bike..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-6 py-4 bg-white dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg dark:shadow-black/30 focus:outline-none focus:ring-4 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <svg
              className="w-5 h-5 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-6 py-4 bg-white dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg dark:shadow-black/30 focus:outline-none focus:ring-4 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-white"
        >
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
        </select>
      </div>

      {/* Results Count */}
      <div className="mb-6 max-w-7xl mx-auto">
        <p className="text-gray-600 dark:text-gray-400">
          Showing {filteredBikes.length} bike
          {filteredBikes.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Bikes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {filteredBikes.map((bike) => (
          <div
            key={bike.id}
            className="group bg-white dark:bg-gray-900/95 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-lg dark:shadow-black/40 hover:shadow-2xl dark:hover:shadow-white/10 transition-all duration-300 transform hover:scale-[1.02] hover:border-blue-300 dark:hover:border-blue-600"
          >
            {/* Bike Icon */}
            <div className="text-center mb-4">
              <div className="text-5xl mb-2">🏍️</div>
              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/70 text-blue-800 dark:text-blue-300 text-xs font-semibold rounded-full border border-blue-200 dark:border-blue-700">
                {bike.category}
              </span>
            </div>

            {/* Bike Details */}
            <div>
              <button
                onClick={() =>
                  isFavorite(bike.id)
                    ? removeFavorite(bike.id)
                    : addFavorite(bike)
                }
                className="flex justify-center items-center mx-auto mb-2 transition-transform duration-200 hover:scale-110"
              >
                <Heart
                  size={24}
                  strokeWidth={1.5}
                  className={`transition-all duration-300 ${
                    isFavorite(bike.id)
                      ? "text-red-500 dark:text-red-400"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                  fill={isFavorite(bike.id) ? "red" : "none"}
                />
              </button>

              <h2 className="text-xl font-bold mb-4 text-center leading-tight text-gray-900 dark:text-white">
                {bike.name} <span>{}</span>
              </h2>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Price
                </span>
                <span className="font-bold text-green-600 dark:text-green-400 text-lg">
                  ₹{bike.price.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Engine
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {bike.engine}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Mileage
                </span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {bike.mileage}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedBike(bike)}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 shadow-lg dark:shadow-black/40 hover:shadow-xl transform hover:scale-[1.02]"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredBikes.length === 0 && (
        <div className="text-center py-16 max-w-md mx-auto">
          <div className="text-6xl mb-4">😔</div>
          <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
            No bikes found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search terms to find your perfect ride
          </p>
        </div>
      )}

      {/* Bike Modal */}
      {selectedBike && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2">
          <div className="bg-white dark:bg-gray-900/95 rounded-2xl shadow-2xl dark:shadow-black/50 max-w-xl w-full max-h-[80vh] overflow-y-auto border border-gray-200 dark:border-gray-800 scrollbar-hide">
            {/* Modal Header */}
            <div className="relative p-6 text-center border-b border-gray-100 dark:border-gray-700">
              <button
                onClick={() => setSelectedBike(null)}
                className="absolute top-3 right-3 w-8 h-8 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-200"
              >
                <svg
                  className="w-4 h-4 text-gray-900 dark:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="text-5xl mb-2">🏍️</div>
              <h2 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">
                {selectedBike.name}
              </h2>
              <div className="flex justify-center gap-1 text-sm">
                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/70 text-blue-800 dark:text-blue-300 font-semibold rounded-full border border-blue-200 dark:border-blue-700">
                  {selectedBike.category}
                </span>
                <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white font-semibold rounded-full">
                  {selectedBike.brand}
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 md:p-6 space-y-4">
              {/* Price Highlight */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 text-center">
                <p className="text-xs text-green-700 dark:text-green-300 font-medium mb-1">
                  Starting Price
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  ₹{selectedBike.price.toLocaleString()}
                </p>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-2 md:grid-cols-2 mb-4">
                {[
                  {
                    label: "Engine",
                    value: selectedBike.engine,
                    icon: "⚙️",
                    color: "text-gray-900 dark:text-white",
                  },
                  {
                    label: "Mileage",
                    value: selectedBike.mileage,
                    icon: "⛽",
                    color: "text-blue-600 dark:text-blue-400",
                  },
                  {
                    label: "Top Speed",
                    value: selectedBike.topSpeed,
                    icon: "🚀",
                    color: "text-red-600 dark:text-red-400",
                  },
                  {
                    label: "Fuel Tank",
                    value: selectedBike.fuelCapacity,
                    icon: "⛽",
                    color: "text-orange-600 dark:text-orange-400",
                  },
                ].map((spec) => (
                  <div
                    key={spec.label}
                    className="bg-gray-50 dark:bg-gray-800/70 rounded-lg p-2 text-center text-xs md:text-sm"
                  >
                    <div className="text-xl mb-1">{spec.icon}</div>
                    <div className="text-gray-600 dark:text-gray-400 font-medium">
                      {spec.label}
                    </div>
                    <div className={`font-bold ${spec.color}`}>
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 text-sm md:text-base">
                <h3 className="font-semibold mb-1 text-blue-900 dark:text-blue-300">
                  About this bike
                </h3>
                <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                  The {selectedBike.name} is a premium{" "}
                  {selectedBike.category.toLowerCase()} motorcycle from{" "}
                  {selectedBike.brand}, delivering exceptional performance with
                  its {selectedBike.engine} engine. Perfect for riders seeking
                  the ideal balance of power, efficiency, and style.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedBike(null)}
                  className="flex-1 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-semibold py-2 px-4 rounded-lg text-sm transition-all duration-300"
                >
                  Close
                </button>
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-all duration-300 shadow-lg dark:shadow-black/40 hover:shadow-xl">
                  Contact Dealer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExplorePage;