"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ImageUp } from "lucide-react";
import apiInstantce from "@/lib/axios";

export default function PartnerPage() {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    vehicleRegistration: "",
    rentPrice: "",
    securityDeposit: "",
    location: "",
    rating: "",
    tripLimit: "",
    bikeImage: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const uploadImageToCloudinary = async (imageFile) => {
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "Bike-rental-system");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dxcpsmawu/image/upload`,
      { method: "POST", body: data }
    );

    const result = await response.json();
    return result.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";
      if (formData.bikeImage) {
        imageUrl = await uploadImageToCloudinary(formData.bikeImage);
      }

      const payload = { ...formData, bikeImage: imageUrl };
      await apiInstantce.post("/bikes/add-bike", payload);

      toast.success("Bike uploaded successfully!");

      setFormData({
        name: "",
        companyName: "",
        vehicleRegistration: "",
        rentPrice: "",
        securityDeposit: "",
        location: "",
        rating: "",
        tripLimit: "",
        bikeImage: null,
      });
      document.getElementById("bikeImage").value = "";
    } catch (error) {
      toast.error("Upload failed. Please try again.");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-lg">
        <Card className="bg-card border border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-foreground">
              Upload Your Bike
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="name">Bike Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Honda Activa 6G"
                  required
                />
              </div>

              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Honda"
                  required
                />
              </div>

              <div>
                <Label htmlFor="vehicleRegistration">
                  Vehicle Registration
                </Label>
                <Input
                  id="vehicleRegistration"
                  name="vehicleRegistration"
                  value={formData.vehicleRegistration}
                  onChange={handleChange}
                  placeholder="MH12AB1234"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rentPrice">Rent Price (₹/day)</Label>
                  <Input
                    id="rentPrice"
                    name="rentPrice"
                    type="number"
                    value={formData.rentPrice}
                    onChange={handleChange}
                    placeholder="500"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="securityDeposit">Security Deposit (₹)</Label>
                  <Input
                    id="securityDeposit"
                    name="securityDeposit"
                    type="number"
                    value={formData.securityDeposit}
                    onChange={handleChange}
                    placeholder="2000"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Mumbai"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rating">Rating (0-5)</Label>
                  <Input
                    id="rating"
                    name="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={handleChange}
                    placeholder="4.5"
                  />
                </div>
                <div>
                  <Label htmlFor="tripLimit">Trip Limit (km)</Label>
                  <Input
                    id="tripLimit"
                    name="tripLimit"
                    type="number"
                    value={formData.tripLimit}
                    onChange={handleChange}
                    placeholder="100"
                  />
                </div>
              </div>

              <div className="flex">
                <div className="flex mr-3 items-center gap-2 pt-2">
                  <ImageUp />
                </div>
                <Input
                  id="bikeImage"
                  name="bikeImage"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  required
                  className="cursor-pointer"
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload Bike"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
