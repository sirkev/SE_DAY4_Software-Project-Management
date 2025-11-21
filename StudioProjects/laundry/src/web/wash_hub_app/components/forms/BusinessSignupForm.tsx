"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { submitBusinessLead } from "@/lib/api-client";

const businessSchema = z.object({
    business_name: z.string().min(2, "Business name is required"),
    owner_name: z.string().min(2, "Owner name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Valid phone number is required"),
    location: z.string().min(2, "Location is required"),
    services: z.array(z.string()).min(1, "Select at least one service"),
});

type BusinessFormData = z.infer<typeof businessSchema>;

const serviceOptions = [
    { id: "laundry", label: "Laundry & Ironing" },
    { id: "carpet_cleaning", label: "Carpet Cleaning" },
    { id: "house_cleaning", label: "House Cleaning" },
    { id: "office_cleaning", label: "Office Cleaning" },
    { id: "pest_control", label: "Pest Control & Fumigation" },
    { id: "moving", label: "Moving Services" },
    { id: "construction_cleaning", label: "Post-Construction Cleaning" },
    { id: "renovation", label: "Renovation Services" },
];

export function BusinessSignupForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<BusinessFormData>({
        resolver: zodResolver(businessSchema),
        defaultValues: {
            services: [],
        },
    });

    const handleServiceToggle = (serviceId: string) => {
        const updated = selectedServices.includes(serviceId)
            ? selectedServices.filter((id) => id !== serviceId)
            : [...selectedServices, serviceId];

        setSelectedServices(updated);
        setValue("services", updated);
    };

    const onSubmit = async (data: BusinessFormData) => {
        setIsSubmitting(true);

        const result = await submitBusinessLead(data);

        if (result.error) {
            toast.error("Submission Failed", {
                description: result.error,
            });
        } else {
            toast.success("Success!", {
                description: "Thank you! We'll contact you soon with partnership details and onboarding information.",
            });
            reset();
            setSelectedServices([]);
        }

        setIsSubmitting(false);
    };

    return (
        <section id="business-signup" className="py-24 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Benefits */}
                    <div className="text-left">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                            For Service Providers
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                            Grow your business and connect with a wide range of customers needing your skills. From laundry and cleaning to pest control and moving, our platform helps you manage bookings and build your reputation.
                        </p>
                        <ul className="space-y-3 text-lg">
                            <li className="flex items-center gap-3">
                                <span className="text-green-500 text-xl">✓</span>
                                <span>Reach more customers</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-green-500 text-xl">✓</span>
                                <span>Manage bookings easily</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-green-500 text-xl">✓</span>
                                <span>Set your own prices & schedule</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-green-500 text-xl">✓</span>
                                <span>Get paid securely</span>
                            </li>
                        </ul>
                    </div>

                    {/* Right side - Form */}
                    <Card className="border-2 shadow-2xl">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl font-bold">List Your Business</CardTitle>
                            <CardDescription className="text-lg">
                                Join our network of verified cleaning service providers
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="business_name">Business Name</Label>
                                    <Input
                                        id="business_name"
                                        placeholder="Sparkle Cleaners Ltd"
                                        {...register("business_name")}
                                        className={errors.business_name ? "border-red-500" : ""}
                                    />
                                    {errors.business_name && (
                                        <p className="text-sm text-red-500">{errors.business_name.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="owner_name">Owner/Manager Name</Label>
                                    <Input
                                        id="owner_name"
                                        placeholder="Jane Doe"
                                        {...register("owner_name")}
                                        className={errors.owner_name ? "border-red-500" : ""}
                                    />
                                    {errors.owner_name && (
                                        <p className="text-sm text-red-500">{errors.owner_name.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Business Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="info@sparkle.com"
                                        {...register("email")}
                                        className={errors.email ? "border-red-500" : ""}
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-500">{errors.email.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="0700000000"
                                        {...register("phone")}
                                        className={errors.phone ? "border-red-500" : ""}
                                    />
                                    {errors.phone && (
                                        <p className="text-sm text-red-500">{errors.phone.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="location">Business Location</Label>
                                    <Input
                                        id="location"
                                        placeholder="e.g., Nairobi, Kenya"
                                        {...register("location")}
                                        className={errors.location ? "border-red-500" : ""}
                                    />
                                    {errors.location && (
                                        <p className="text-sm text-red-500">{errors.location.message}</p>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <Label>Services Offered (Select all that apply)</Label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {serviceOptions.map((service) => (
                                            <div key={service.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={service.id}
                                                    checked={selectedServices.includes(service.id)}
                                                    onCheckedChange={() => handleServiceToggle(service.id)}
                                                />
                                                <label
                                                    htmlFor={service.id}
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                                >
                                                    {service.label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.services && (
                                        <p className="text-sm text-red-500">{errors.services.message}</p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full text-lg py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Submitting..." : "Join Partner Waitlist"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
