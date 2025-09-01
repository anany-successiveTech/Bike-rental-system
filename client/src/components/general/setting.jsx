"use client";

import { useState, useEffect } from "react";
import { X, Settings, Bell, Lock, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

const SettingsModal = ({ isOpen, onClose }) => {
  const [userData, setUserData] = useState(null);
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    emailUpdates: true,
    bikeAlerts: true,
  });

  useEffect(() => {
    if (isOpen) {
      try {
        const storedUserData = localStorage.getItem("user");
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          setUserData(parsedUserData);
        }

        // Load settings from localStorage
        const storedSettings = localStorage.getItem("userSettings");
        if (storedSettings) {
          setSettings(JSON.parse(storedSettings));
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    }
  }, [isOpen]);

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem("userSettings", JSON.stringify(newSettings));
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("userSettings");
      sessionStorage.clear();
      onClose();
      window.location.href = "/";
    }
  };

  const handleChangePassword = () => {
    // This would typically open a password change modal or redirect
    alert("Password change functionality would be implemented here");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Settings
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
          {/* User Info */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Account Information
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Logged in as: <span className="font-medium">{userData?.email}</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Role: <span className="font-medium capitalize">{userData?.role}</span>
            </p>
          </div>

          {/* Notification Settings */}
          <div className="space-y-4">
            <h3 className="text-md font-medium text-gray-900 dark:text-white flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Push Notifications
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={(e) => handleSettingChange("notifications", e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-11 h-6 rounded-full transition-colors ${
                    settings.notifications ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                  }`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                      settings.notifications ? "translate-x-5" : "translate-x-0"
                    } mt-0.5 ml-0.5`}></div>
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Email Updates
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailUpdates}
                    onChange={(e) => handleSettingChange("emailUpdates", e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-11 h-6 rounded-full transition-colors ${
                    settings.emailUpdates ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                  }`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                      settings.emailUpdates ? "translate-x-5" : "translate-x-0"
                    } mt-0.5 ml-0.5`}></div>
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Bike Alerts
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.bikeAlerts}
                    onChange={(e) => handleSettingChange("bikeAlerts", e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-11 h-6 rounded-full transition-colors ${
                    settings.bikeAlerts ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                  }`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                      settings.bikeAlerts ? "translate-x-5" : "translate-x-0"
                    } mt-0.5 ml-0.5`}></div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="space-y-4">
            <h3 className="text-md font-medium text-gray-900 dark:text-white flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Security
            </h3>
            
            <Button
              variant="outline"
              onClick={handleChangePassword}
              className="w-full justify-start"
            >
              Change Password
            </Button>
          </div>

          {/* Danger Zone */}
          <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-md font-medium text-red-600 dark:text-red-400 flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Danger Zone
            </h3>
            
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              className="w-full"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;