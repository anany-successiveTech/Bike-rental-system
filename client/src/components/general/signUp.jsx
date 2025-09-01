"use client";

import { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Building,
  FileText,
  CreditCard,
  Hash,
  Users,
  Store,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import apiInstantce from "@/lib/axios";
import axios from "axios";

export default function SignupPage() {
  const [activeTab, setActiveTab] = useState("customer");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  // Customer form state
  const [customerData, setCustomerData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    gender: "",
    address: {
      city: "",
      state: "",
      country: "India",
      zipCode: "",
    },
  });

  // Provider form state
  const [providerData, setProviderData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    gender: "",
    address: {
      city: "",
      state: "",
      country: "India",
      zipCode: "",
    },
    businessName: "",
    document: {
      panNo: "",
      aadhar: "",
      GST: "",
      registrationNo: "",
    },
  });

  const handleCustomerChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setCustomerData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setCustomerData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleProviderChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setProviderData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setProviderData((prev) => ({ ...prev, [field]: value }));
    }
  };
  const handleSubmit = async (e, userType) => {
    e.preventDefault();
    setIsLoading(true);

    const data =
      userType === "customer"
        ? { ...customerData, role: "customer" }
        : { ...providerData, role: "provider" };

    try {
      //  API call
      const response = await axios.post("http://localhost:3900/api/v1/auth/register", data);

      console.log("Registration response:", response.data);

      toast.success(`${userType} registration successful!`);

      // Optionally, store token/user if returned
      if (response.data.user?.token) {
        localStorage.setItem("token", response.data.user.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
    } catch (error) { 
      if (error.response) {
        toast.error(error.response.data.message || "Registration failed");
      } else {
        toast.error("Network error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white py-8">
      <div className="max-w-4xl mx-auto  px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-gray-300">
            Join BikeRental
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create your account and start your adventure
          </p>
        </div>

        {/* Signup Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger
                  value="customer"
                  className="flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  Customer
                </TabsTrigger>
                <TabsTrigger
                  value="provider"
                  className="flex items-center gap-2"
                >
                  <Store className="w-4 h-4" />
                  Provider
                </TabsTrigger>
              </TabsList>

              <div className="text-center">
                <CardTitle className="text-xl">
                  {activeTab === "customer" ? "Rent a Bike" : "List Your Bikes"}
                </CardTitle>
                <CardDescription>
                  {activeTab === "customer"
                    ? "Join thousands of adventurers exploring on two wheels"
                    : "Start earning by renting out your motorcycles"}
                </CardDescription>
              </div>

              {/* Customer Registration */}
              <TabsContent value="customer" className="mt-6">
                <div className="space-y-4">
                  {/* Personal Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="firstName"
                          value={customerData.firstName}
                          onChange={(e) =>
                            handleCustomerChange("firstName", e.target.value)
                          }
                          placeholder="Anany"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={customerData.lastName}
                        onChange={(e) =>
                          handleCustomerChange("lastName", e.target.value)
                        }
                        placeholder="more"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={customerData.email}
                        onChange={(e) =>
                          handleCustomerChange("email", e.target.value)
                        }
                        placeholder="anany.sharma@example.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="mobile"
                        value={customerData.mobileNumber}
                        onChange={(e) =>
                          handleCustomerChange("mobileNumber", e.target.value)
                        }
                        placeholder=" 9876543210"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={customerData.gender}
                      onValueChange={(value) =>
                        handleCustomerChange("gender", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Address */}
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-medium text-gray-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Address Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={customerData.address.city}
                          onChange={(e) =>
                            handleCustomerChange("address.city", e.target.value)
                          }
                          placeholder="Chhindwara"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={customerData.address.state}
                          onChange={(e) =>
                            handleCustomerChange(
                              "address.state",
                              e.target.value
                            )
                          }
                          placeholder="Madhya Pradesh"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={customerData.address.country}
                          onChange={(e) =>
                            handleCustomerChange(
                              "address.country",
                              e.target.value
                            )
                          }
                          placeholder="India"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          value={customerData.address.zipCode}
                          onChange={(e) =>
                            handleCustomerChange(
                              "address.zipCode",
                              e.target.value
                            )
                          }
                          placeholder="474001"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="password"
                          type="password"
                          value={customerData.password}
                          onChange={(e) =>
                            handleCustomerChange("password", e.target.value)
                          }
                          placeholder="Password@123"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={customerData.confirmPassword}
                        onChange={(e) =>
                          handleCustomerChange(
                            "confirmPassword",
                            e.target.value
                          )
                        }
                        placeholder="Confirm password"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    onClick={(e) => handleSubmit(e, "customer")}
                    className="w-full h-11 bg-blue-500 text-white hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "Create Customer Account"
                    )}
                  </Button>
                </div>
              </TabsContent>

              {/* Provider Registration */}
              <TabsContent value="provider" className="mt-6">
                <div className="space-y-4">
                  {/* Personal Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="providerFirstName">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="providerFirstName"
                          value={providerData.firstName}
                          onChange={(e) =>
                            handleProviderChange("firstName", e.target.value)
                          }
                          placeholder="Rohit"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="providerLastName">Last Name</Label>
                      <Input
                        id="providerLastName"
                        value={providerData.lastName}
                        onChange={(e) =>
                          handleProviderChange("lastName", e.target.value)
                        }
                        placeholder="Verma"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="providerEmail">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="providerEmail"
                        type="email"
                        value={providerData.email}
                        onChange={(e) =>
                          handleProviderChange("email", e.target.value)
                        }
                        placeholder="rohit.verma@example.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="providerMobile">Mobile Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="providerMobile"
                          value={providerData.mobileNumber}
                          onChange={(e) =>
                            handleProviderChange("mobileNumber", e.target.value)
                          }
                          placeholder="9123456789"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="providerGender">Gender</Label>
                      <Select
                        value={providerData.gender}
                        onValueChange={(value) =>
                          handleProviderChange("gender", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Business Info */}
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-medium text-gray-900 flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Business Information
                    </h3>
                    <div>
                      <Label htmlFor="businessName">Business Name</Label>
                      <div className="relative">
                        <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="businessName"
                          value={providerData.businessName}
                          onChange={(e) =>
                            handleProviderChange("businessName", e.target.value)
                          }
                          placeholder="Verma Bike Rentals"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-medium text-gray-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Address Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="providerCity">City</Label>
                        <Input
                          id="providerCity"
                          value={providerData.address.city}
                          onChange={(e) =>
                            handleProviderChange("address.city", e.target.value)
                          }
                          placeholder="Noida"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="providerState">State</Label>
                        <Input
                          id="providerState"
                          value={providerData.address.state}
                          onChange={(e) =>
                            handleProviderChange(
                              "address.state",
                              e.target.value
                            )
                          }
                          placeholder="Uttar Pradesh"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="providerCountry">Country</Label>
                        <Input
                          id="providerCountry"
                          value={providerData.address.country}
                          onChange={(e) =>
                            handleProviderChange(
                              "address.country",
                              e.target.value
                            )
                          }
                          placeholder="India"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="providerZipCode">ZIP Code</Label>
                        <Input
                          id="providerZipCode"
                          value={providerData.address.zipCode}
                          onChange={(e) =>
                            handleProviderChange(
                              "address.zipCode",
                              e.target.value
                            )
                          }
                          placeholder="201301"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Documents */}
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-medium text-gray-900 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Business Documents
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="panNo">PAN Number</Label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            id="panNo"
                            value={providerData.document.panNo}
                            onChange={(e) =>
                              handleProviderChange(
                                "document.panNo",
                                e.target.value
                              )
                            }
                            placeholder="ABCDE1234F"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="aadhar">Aadhar Number</Label>
                        <div className="relative">
                          <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            id="aadhar"
                            value={providerData.document.aadhar}
                            onChange={(e) =>
                              handleProviderChange(
                                "document.aadhar",
                                e.target.value
                              )
                            }
                            placeholder="123412341234"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="gst">GST Number</Label>
                        <Input
                          id="gst"
                          value={providerData.document.GST}
                          onChange={(e) =>
                            handleProviderChange("document.GST", e.target.value)
                          }
                          placeholder="09ABCDE1234F1Z5"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="registration">
                          Registration Number
                        </Label>
                        <Input
                          id="registration"
                          value={providerData.document.registrationNo}
                          onChange={(e) =>
                            handleProviderChange(
                              "document.registrationNo",
                              e.target.value
                            )
                          }
                          placeholder="UP16AB1234"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <Label htmlFor="providerPassword">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="providerPassword"
                          type="password"
                          value={providerData.password}
                          onChange={(e) =>
                            handleProviderChange("password", e.target.value)
                          }
                          placeholder="SecurePass@456"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="providerConfirmPassword">
                        Confirm Password
                      </Label>
                      <Input
                        id="providerConfirmPassword"
                        type="password"
                        value={providerData.confirmPassword}
                        onChange={(e) =>
                          handleProviderChange(
                            "confirmPassword",
                            e.target.value
                          )
                        }
                        placeholder="Confirm password"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    onClick={(e) => handleSubmit(e, "provider")}
                    className="w-full h-11 bg-green-600 text-white hover:bg-green-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Provider Account...
                      </>
                    ) : (
                      "Create Provider Account"
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-md text-gray-600">
            <span className="mr-1"> Already have an account ?{"  "}</span>
            <button
              onClick={() => {
                setLoginOpen(true);
                setIsOpen(false);
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
