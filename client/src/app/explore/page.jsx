"use client";

import React, { useState } from "react";
import BikeCard from "@/components/general/BikeCrad";
import bikes from "@/sampleData/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Combobox from "@/components/ui/comboBox";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-gray-900 text-white p-6 rounded-2xl w-11/12 max-w-md shadow-lg">
        <button
          className="text-white mb-4 hover:text-red-500"
          onClick={onClose}
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

const ExplorePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filterContent = (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-white">Filters</h2>

      {/* Price Sorting */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">
          Price Sorting
        </label>
        <Select>
          <SelectTrigger className="w-full bg-gray-800 text-white border-gray-700">
            <SelectValue placeholder="Select Price Order" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white border-gray-700">
            <SelectItem value="high-to-low">High to Low</SelectItem>
            <SelectItem value="low-to-high">Low to High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Company Name */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">
          Company Name
        </label>
        <Select>
          <SelectTrigger className="w-full bg-gray-800 text-white border-gray-700">
            <SelectValue placeholder="Select Company" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white border-gray-700">
            <SelectItem value="yamaha">Yamaha</SelectItem>
            <SelectItem value="honda">Honda</SelectItem>
            <SelectItem value="suzuki">Suzuki</SelectItem>
            <SelectItem value="hero">Hero</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Combobox */}
      <div>
        <Combobox className="bg-gray-800 text-white border border-gray-700" />
      </div>

      {/* Apply Filters Button */}
      <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white">
        Apply Filters
      </Button>
    </div>
  );

  return (
    <div className="p-4">
      {/* Mobile: Filter Button */}
      <div className="lg:hidden mb-4">
        <Button
          className="w-full"
          onClick={() => setIsModalOpen(true)}
        >
          Filters
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left: Filter Section (desktop only) */}
        <div className="hidden lg:block w-1/5 bg-gray-900 p-4 rounded-2xl shadow-md border border-gray-700">
          {filterContent}
        </div>

        {/* Right: Bike Cards */}
        <div className="w-full lg:w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-2">
          {bikes.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      </div>

      {/* Mobile Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {filterContent}
      </Modal>
    </div>
  );
};

export default ExplorePage;
