"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  User,
  IndianRupee,
  ChevronDown,
  MoveRight,
  LogOut,
} from "lucide-react";
import getStatusStyle from "@/lib/components/bookingStatusStyle";
import decodeToken from "@/lib/components/decodeToken";

// Status style mapping

getStatusStyle(status);

// Function to decode JWT token
const token = localStorage.getItem("token");
const decoded = decodeToken(token);

// Function to check if token is expired

const isTokenExpired = (token) => {
  if (!token || !token.exp) return true;
  return Date.now() / 1000 > token.exp;
};

// API service functions
const apiService = {
  // Get all bookings (for providers) or user-specific bookings (for customers)
  async getBookings(userEmail, userRole) {
    try {
      const token = localStorage.getItem("token");
      const endpoint =
        userRole === "provider"
          ? "/api/bookings"
          : `/api/bookings/user/${encodeURIComponent(userEmail)}`;

      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw error;
    }
  },

  // Update booking status (only for providers)
  async updateBookingStatus(bookingId, newStatus) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/bookings/${bookingId}/status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating booking status:", error);
      throw error;
    }
  },
};

const BookingsPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [bookingList, setBookingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const statusOptions = ["Confirmed", "Pending", "Completed", "Cancelled"];

  // Check authentication and load user data on component mount
  useEffect(() => {
    const checkAuthAndLoadData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          // Redirect to login page
          window.location.href = "/login";
          return;
        }

        const decodedToken = decodeToken(token);

        if (!decodedToken || isTokenExpired(decodedToken)) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }

        setCurrentUser(decodedToken);

        // Load bookings based on user role
        const bookings = await apiService.getBookings(
          decodedToken.email,
          decodedToken.role
        );
        setBookingList(bookings);
      } catch (error) {
        console.error("Error loading data:", error);
        setError("Failed to load bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndLoadData();
  }, []);

  // Calculate status counts dynamically
  const getStatusCounts = () => {
    const counts = bookingList.reduce((acc, booking) => {
      const status = booking.status.toLowerCase();
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return [
      {
        label: "Completed",
        count: counts.completed || 0,
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-50 dark:bg-green-900/30",
      },
      {
        label: "Total Bookings",
        count: bookingList.length,
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-50 dark:bg-blue-900/30",
      },
      {
        label: "Pending",
        count: counts.pending || 0,
        color: "text-yellow-600 dark:text-yellow-400",
        bgColor: "bg-yellow-50 dark:bg-yellow-900/30",
      },
      {
        label: "Confirmed",
        count: counts.confirmed || 0,
        color: "text-purple-600 dark:text-purple-400",
        bgColor: "bg-purple-50 dark:bg-purple-900/30",
      },
    ];
  };

  const handleStatusChange = async (booking, newStatus) => {
    if (currentUser?.role !== "provider") {
      return; // Only providers can change status
    }

    setUpdatingStatus(booking.id);

    try {
      await apiService.updateBookingStatus(booking.id, newStatus.toLowerCase());

      // Update local state
      const updatedBookings = bookingList.map((b) =>
        b.id === booking.id ? { ...b, status: newStatus.toLowerCase() } : b
      );

      setBookingList(updatedBookings);
    } catch (error) {
      console.error("Error updating status:", error);
      setError("Failed to update booking status. Please try again.");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Show loading while checking token and fetching data
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading bookings...
          </p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md w-full mx-4 text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const statusCards = getStatusCounts();

  return (
    <div className="p-4 max-w-7xl mx-auto min-h-screen bg-background text-foreground flex flex-col space-y-6">
      {/* Header with user info and logout */}
      <div className="flex justify-between items-center">
        <div className="text-center flex-1">
          <h1 className="text-2xl font-bold">Booking Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome, {currentUser.fullName}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right text-sm">
            <div className="font-medium">{currentUser.email}</div>
            <div
              className={`text-xs px-2 py-1 rounded-full ${
                currentUser.role === "provider"
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
              }`}
            >
              {currentUser.role.charAt(0).toUpperCase() +
                currentUser.role.slice(1)}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Role-based permission indicator */}
      <div className="text-center">
        <div
          className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
            currentUser.role === "provider"
              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
              : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
          }`}
        >
          {currentUser.role === "provider"
            ? "🔓 Provider Access - Can modify all booking statuses"
            : "👁️ Customer View - Can only view your bookings"}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4 sticky top-0 z-10 bg-background py-2">
        {statusCards.map((card, i) => (
          <div
            key={i}
            className={`${card.bgColor} rounded-lg border border-gray-200 dark:border-gray-700`}
          >
            <div className="p-4 text-center space-y-1">
              <p className={`text-2xl font-bold ${card.color}`}>{card.count}</p>
              <p className="text-xs font-medium">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bookings List */}
      <div className="overflow-y-auto max-h-[calc(100vh-300px)] space-y-4">
        {bookingList.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400">
              {currentUser.role === "customer"
                ? "No bookings found for your account"
                : "No bookings available"}
            </div>
          </div>
        ) : (
          bookingList.map((booking, index) => (
            <div
              key={booking.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-4 flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Bike Image */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-lg overflow-hidden">
                    <img
                      src={booking.bikeImage || booking.vehicleImage}
                      alt={booking.vehicle}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/96x96/cccccc/666666?text=Bike";
                      }}
                    />
                  </div>
                </div>

                {/* Bike Name + Price */}
                <div className="flex flex-col min-w-[150px]">
                  <h3 className="text-lg font-semibold">{booking.vehicle}</h3>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    <span className="mr-1">Total Price:</span>
                    <span className="font-semibold">{booking.price}</span>
                  </div>
                </div>

                {/* Duration */}
                <div className="flex flex-col min-w-[200px]">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Calendar className="h-4 w-4 mr-2" />
                    <div className="flex items-center gap-3">
                      <div>{booking.duration?.start || booking.startDate}</div>
                      <MoveRight className="h-4 w-4 text-gray-400" />
                      <div>{booking.duration?.end || booking.endDate}</div>
                    </div>
                  </div>
                </div>

                {/* Distance */}
                <div className="flex flex-col min-w-[100px]">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{booking.distance}</span>
                  </div>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Status - Editable for providers, read-only for customers */}
                <div className="min-w-[160px]">
                  {currentUser.role === "provider" ? (
                    <div className="relative">
                      <select
                        value={booking.status}
                        onChange={(e) =>
                          handleStatusChange(booking, e.target.value)
                        }
                        disabled={updatingStatus === booking.id}
                        className={`w-full px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer appearance-none ${getStatusStyle(
                          booking.status
                        )} border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {statusOptions.map((option) => (
                          <option key={option} value={option.toLowerCase()}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none opacity-70" />
                      {updatingStatus === booking.id && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      className={`px-4 py-2 rounded-lg text-sm font-medium text-center ${getStatusStyle(
                        booking.status
                      )}`}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </div>
                  )}
                </div>

                {/* User Info */}
                <div className="flex items-center gap-3 min-w-[180px]">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">
                      {booking.user || booking.customerName}
                    </div>
                    {currentUser.role === "provider" && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        ID: {booking.id}
                      </div>
                    )}
                    {currentUser.role === "customer" && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Booking ID: {booking.id}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Error display */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-500 hover:text-red-700 ml-2"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
