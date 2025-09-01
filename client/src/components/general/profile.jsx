"use client";

import { useState, useEffect } from "react";
import { X, User, Mail, Shield, Calendar, Edit2, Save } from "lucide-react";
import { Button } from "../ui/button";

const ProfileModal = ({ isOpen, onClose }) => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    if (isOpen) {
      try {
        const storedUserData = localStorage.getItem("user");
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          setUserData(parsedUserData);
          setEditedData({
            fullName: parsedUserData.fullName || "",
            email: parsedUserData.email || "",
          });
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [isOpen]);

  const handleSave = () => {
    try {
      const updatedUserData = {
        ...userData,
        fullName: editedData.fullName,
        email: editedData.email,
      };
      localStorage.setItem("user", JSON.stringify(updatedUserData));
      setUserData(updatedUserData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const handleCancel = () => {
    setEditedData({
      fullName: userData?.fullName || "",
      email: userData?.email || "",
    });
    setIsEditing(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <User className="w-5 h-5" />
            My Profile
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
              {userData?.fullName?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {userData?.fullName || "User"}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                {userData?.role || "Member"}
              </p>
            </div>
          </div>

          {/* Profile Information */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-md font-medium text-gray-900 dark:text-white">
                Profile Information
              </h4>
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleSave}
                    className="flex items-center gap-1"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.fullName}
                    onChange={(e) => setEditedData({ ...editedData, fullName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                  />
                ) : (
                  <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900 dark:text-white">
                      {userData?.fullName || "Not provided"}
                    </span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedData.email}
                    onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                  />
                ) : (
                  <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900 dark:text-white">
                      {userData?.email || "Not provided"}
                    </span>
                  </div>
                )}
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role
                </label>
                <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <Shield className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-900 dark:text-white capitalize">
                    {userData?.role || "Member"}
                  </span>
                </div>
              </div>

              {/* Join Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Member Since
                </label>
                <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-900 dark:text-white">
                    {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;