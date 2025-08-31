import React, { useContext, useState } from "react";
import { Star, MapPin, Heart, Info, X } from "lucide-react";
import { Button } from "../ui/button";
import { FavoritesContext } from "@/context/favoriteCount";

const BikeCard = ({ bike, onBookNow, className = "" }) => {
  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);
  const [showModal, setShowModal] = useState(false);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);

  const handleBookNow = () => {
    if (onBookNow) onBookNow(bike);
    else console.log("Book Now clicked for:", bike.name);
  };

  const toggleFavorite = () => {
    if (isFavorite(bike.id)) removeFavorite(bike.id);
    else addFavorite(bike);
  };

  return (
    <>
      {/* Bike Card */}
      <div className={`w-full max-w-sm mx-auto bg-background rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-border ${className}`}>
        {/* Image */}
        <div className="relative h-32 bg-muted flex items-center justify-center overflow-hidden">
          {bike.image ? (
            <img src={bike.image} alt={bike.name} className="w-full h-full object-contain p-4" />
          ) : (
            <div className="text-6xl opacity-50">🏍</div>
          )}
          <button onClick={toggleFavorite} className="absolute top-3 right-3 focus:outline-none">
            <Heart className={`w-6 h-6 transition-transform duration-200 ease-out ${isFavorite(bike.id) ? "text-red-500 fill-red-500 scale-110" : "text-gray-400 scale-100"}`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-foreground mb-2 truncate">{bike.name}</h3>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold text-sm text-foreground">{bike.rating}.00</span>
            </div>
            <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">Pay at Pickup</span>
          </div>

          <div className="flex gap-2">
            <Button onClick={() => setShowModal(true)} variant="outline" className="flex-1 rounded-xl py-2 text-sm font-semibold">
              <Info className="w-4 h-4 mr-1" /> Details
            </Button>
            <Button onClick={handleBookNow} className="flex-1 rounded-xl py-2 text-sm font-semibold shadow-md hover:shadow-lg">
              Book Now
            </Button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
          <div className="bg-background dark:border border-border rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-foreground">{bike.name}</h2>
              <button onClick={() => setShowModal(false)} className="text-foreground hover:text-red-500">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image */}
              {bike.image && (
                <div className="flex-shrink-0 w-full md:w-1/3 h-64 bg-muted rounded-xl flex items-center justify-center p-4 shadow-md">
                  <img src={bike.image} alt={bike.name} className="w-full h-full object-contain" />
                </div>
              )}

              {/* Info */}
              <div className="flex-1 space-y-4">
                <p><span className="font-medium">Trip Limit:</span> {bike.tripLimit} km</p>
                <p><span className="font-medium">Rent Price:</span> {formatPrice(bike.rentPrice)}</p>
                <p><span className="font-medium">Security Deposit:</span> {formatPrice(bike.securityDeposit)}</p>
                <p><span className="font-medium">Vehicle Registration:</span> {bike.vehicleRegistration}</p>
                <p className="flex items-center gap-2"><MapPin /> {bike.location}</p>
                <p className="flex items-center gap-2"><Star className="text-yellow-500" /> {bike.rating}.0 Rating</p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 mt-6">
              <Button onClick={toggleFavorite} variant="outline" className="flex-1">
                <Heart className={`w-4 h-4 mr-2 ${isFavorite(bike.id) ? "text-red-500 fill-red-500" : "text-gray-400"}`} />
                {isFavorite(bike.id) ? "Favorited" : "Add to Favorite"}
              </Button>
              <Button onClick={() => { handleBookNow(); setShowModal(false); }} className="flex-1">
                Book Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BikeCard;
