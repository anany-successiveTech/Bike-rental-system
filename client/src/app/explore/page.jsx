"use client";
import React, { useState } from "react";
import BikeCard from "@/components/general/BikeCrad";
import bikes from "@/sampleData/Bikedata";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Combobox from "@/components/ui/comboBox";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Reusable modal
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-background border p-6 rounded-lg w-11/12 max-w-md shadow-lg">
        <button
          className="text-muted-foreground hover:text-foreground mb-4 transition-colors"
          onClick={onClose}
        >
          ✕ Close
        </button>
        {children}
      </div>
    </div>
  );
};

// Pagination component
const PaginationDemo = () => {
  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

const ExplorePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filterContent = (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Filters</h2>

      {/* Price Sorting */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Price Sorting</Label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Price Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high-to-low">High to Low</SelectItem>
            <SelectItem value="low-to-high">Low to High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Company Name */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Company</Label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yamaha">Yamaha</SelectItem>
            <SelectItem value="honda">Honda</SelectItem>
            <SelectItem value="suzuki">Suzuki</SelectItem>
            <SelectItem value="hero">Hero</SelectItem>
            <SelectItem value="ktm">KTM</SelectItem>
            <SelectItem value="tvs">TVS</SelectItem>
            <SelectItem value="kawasaki">Kawasaki</SelectItem>
            <SelectItem value="royal-enfield">Royal Enfield</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Combobox */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Search Models</Label>
        <Combobox />
      </div>

      {/* Apply Filters Button */}
      <Button className="w-full">Apply Filters</Button>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      {/* Mobile: Filter Button */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsModalOpen(true)}
        >
          Show Filters
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left: Filter Section (desktop only) */}
        <div className="hidden lg:block w-1/5 min-w-[250px]">
          <div className="bg-card border rounded-lg p-4 shadow-sm sticky top-4">
            {filterContent}
          </div>
        </div>

        {/* Right: Bike Cards */}
        <div className="w-full lg:w-4/5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bikes.map((bike) => (
              <BikeCard key={bike.id} bike={bike} />
            ))}
          </div>

          {/* Pagination placed here */}
          <PaginationDemo />
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
