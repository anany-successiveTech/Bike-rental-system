"use client";

import { createContext, useState, useEffect } from "react";

export const FavoritesContext = createContext({
  favoriteBikes: [],
  favoriteCount: 0,
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
});

export const FavoritesProvider = ({ children }) => {
  const [favoriteBikes, setFavoriteBikes] = useState([]);
  const [favoriteCount, setFavoriteCount] = useState(0);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteBikes");
    if (storedFavorites) {
      const parsedFavorites = JSON.parse(storedFavorites);
      setFavoriteBikes(parsedFavorites);
      setFavoriteCount(parsedFavorites.length);
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("favoriteBikes", JSON.stringify(favoriteBikes));
    setFavoriteCount(favoriteBikes.length);
  }, [favoriteBikes]);

  // Add a bike to favorites
  const addFavorite = (bike) => {
    if (!favoriteBikes.find((b) => b.id === bike.id)) {
      setFavoriteBikes([...favoriteBikes, bike]);
      console.log(favoriteBikes, "This is favoriteBikes");
      
    }
  };

  // Remove bike from favorites
  const removeFavorite = (id) => {
    setFavoriteBikes(favoriteBikes.filter((b) => b.id !== id));
  };

  // Check if bike is in favorites
  const isFavorite = (id) => favoriteBikes.some((b) => b.id === id);

  return (
    <FavoritesContext.Provider
      value={{
        favoriteBikes,
        favoriteCount,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
