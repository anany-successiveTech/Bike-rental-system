'use client';

import React, { useState } from 'react';
import { Search, Bike, Users, MapPin, CreditCard, HelpCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from "sonner";

export default function BikeRentalSupport() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    issue: ''
  });
  const [errors, setErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    const { firstName, lastName, email, issue } = formData;
    const newErrors = {};

    // Validation for required fields
    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email address.";
    if (!issue.trim()) newErrors.issue = "Please describe your issue.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    // Success
    toast.success("Thank you for contacting us!");
    setFormData({ firstName: '', lastName: '', email: '', issue: '' });
    setErrors({});
  };

  const supportTopics = [
    { icon: <Bike className="w-6 h-6" />, title: "Bike Issues", description: "Report problems with your rental bike or equipment malfunctions." },
    { icon: <CreditCard className="w-6 h-6" />, title: "Billing & Payments", description: "Questions about charges, payment methods, and refunds." },
    { icon: <MapPin className="w-6 h-6" />, title: "Locations & Availability", description: "Find bike stations and check real-time availability." },
    { icon: <Users className="w-6 h-6" />, title: "Account Management", description: "Manage your profile, subscription, and account settings." },
    { icon: <Clock className="w-6 h-6" />, title: "Rental Duration", description: "Understanding rental periods and time-based pricing." },
    { icon: <HelpCircle className="w-6 h-6" />, title: "General Help", description: "Getting started, app usage, and frequently asked questions." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
          How can we help?
        </h1>
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-12">
        {/* Support Topics */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-8">Common Topics</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportTopics.map((topic, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg mr-3 group-hover:bg-primary/20 transition-colors">
                      {topic.icon}
                    </div>
                    <CardTitle className="text-lg">{topic.title}</CardTitle>
                  </div>
                  <CardDescription>{topic.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Contact Support</CardTitle>
            <CardDescription>Tell us about your issue and we'll help you resolve it quickly.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                  className="mt-1"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
                  className="mt-1"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                className="mt-1"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <Label htmlFor="issue">Issue You Are Facing</Label>
              <Textarea
                id="issue"
                name="issue"
                value={formData.issue}
                onChange={handleInputChange}
                placeholder="Please describe the issue you're experiencing with our bike rental service..."
                className="mt-1 min-h-28"
              />
              {errors.issue && <p className="text-red-500 text-sm mt-1">{errors.issue}</p>}
            </div>
            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-muted-foreground">
                We typically respond within 24 hours
              </p>
              <Button onClick={handleSubmit} size="lg">
                Submit Request
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
