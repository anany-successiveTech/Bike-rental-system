import React from 'react';
import { Star, MapPin, Clock } from 'lucide-react';

const BikeCard = ({ bike, onBookNow, onViewDetails, className = "" }) => {
  const formatPrice = (price) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);

  // Default sample data if no bike prop is provided
  const sampleBike = {
    "name": "City Commuter",
    "rating": 4,
    "tripLimit": 150,
    "securityDeposit": 2000,
    "rentPrice": 3214.29,
    "location": "Boston, MA",
    "companyName": "Urban Riders",
    "vehicleRegistration": "MA-CC150",
    "createdAt": "8/31/2025, 10:13:43 AM",
    "updatedAt": "8/31/2025, 10:13:43 AM",
    "id": "68b3d2ff3eb6fe6e8c246115",
    "image": "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop&crop=center",
    "trips": 0,
    "availableTime": "9am - 9pm"
  };

  const bikeData = bike || sampleBike;

  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow();
    } else {
      console.log('Book Now clicked for:', bikeData.name);
    }
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails();
    } else {
      console.log('View Details clicked for:', bikeData.name);
    }
  };

  return (
    <div className={`w-full max-w-md mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Top Image Section */}
      <div className="relative h-40 bg-gray-50 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
        {bikeData.image ? (
          <img
            src={bikeData.image}
            alt={bikeData.name}
            className="w-full h-full object-contain p-4"
          />
        ) : (
          <div className="text-6xl opacity-50">🏍</div>
        )}
       
        {/* Badges Overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-1">
          <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-3 py-1 rounded-full font-medium shadow-sm">
            Pay at Pickup
          </span>
          <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-3 py-1 rounded-full font-medium shadow-sm">
            Gearless
          </span>
          <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-3 py-1 rounded-full font-medium shadow-sm">
            Noiseless
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Header with Title and Rating */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{bikeData.name}</h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold text-sm text-gray-900 dark:text-white">{bikeData.rating}.00</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">• {bikeData.trips} Trips</span>
          </div>
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Trip Limit
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{bikeData.tripLimit}km</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Security Deposit
            </p>
            <p className="text-base font-semibold text-gray-900 dark:text-white">
              Rs. {bikeData.securityDeposit.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Location Timings */}
        <div className="mb-6">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
            Location Timings
          </p>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <p className="text-base font-semibold text-gray-900 dark:text-white">
              {bikeData.availableTime || "9am - 9pm"}
            </p>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-gray-200 dark:bg-gray-700 my-4"></div>

        {/* Price and Action Buttons */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatPrice(bikeData.rentPrice)}
            </p>
            <button
              className="text-xs text-blue-600 dark:text-blue-400 underline hover:no-underline mt-1 transition-colors"
              onClick={handleViewDetails}
            >
              View Packages
            </button>
          </div>
          <button
            className="bg-black dark:bg-white dark:text-black text-white hover:bg-gray-800 dark:hover:bg-gray-100 rounded-full px-8 py-3 font-semibold text-sm transition-colors duration-200 shadow-md hover:shadow-lg"
            onClick={handleBookNow}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Bottom Location Selector */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <button className="w-full flex items-center justify-between p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Select Location</span>
          </div>
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BikeCard;