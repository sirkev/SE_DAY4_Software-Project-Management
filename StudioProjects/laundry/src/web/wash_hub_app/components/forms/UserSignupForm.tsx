"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { submitUserLead } from "@/lib/api-client";

const serviceOptions = [
    { id: "laundry", label: "Laundry & Ironing" },
    { id: "house_cleaning", label: "House Cleaning" },
    { id: "carpet_cleaning", label: "Carpet Cleaning" },
    { id: "office_cleaning", label: "Office Cleaning" },
    { id: "pest_control", label: "Pest Control & Fumigation" },
    { id: "moving", label: "Moving Services" },
    { id: "deep_cleaning", label: "Deep Cleaning" },
    { id: "renovation", label: "Renovation Services" },
];

const userSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    location: z.string().min(2, "Location is required"),
    frequency: z.string().min(1, "Please select a frequency"),
    services: z.array(z.string()).min(1, "Select at least one service you're interested in"),
});

type UserFormData = z.infer<typeof userSchema>;

export function UserSignupForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            services: [],
        },
    });

    const frequency = watch("frequency");

    const handleServiceToggle = (serviceId: string) => {
        const updated = selectedServices.includes(serviceId)
            ? selectedServices.filter((id) => id !== serviceId)
            : [...selectedServices, serviceId];

        setSelectedServices(updated);
        setValue("services", updated);
    };

    const onSubmit = async (data: UserFormData) => {
        setIsSubmitting(true);

        const result = await submitUserLead(data);

        if (result.error) {
            toast.error("Submission Failed", {
                description: result.error,
            });
        } else {
            toast.success("Success!", {
                description: "Thank you! You've been added to our beta waitlist. We'll notify you when the app launches!",
            });
            reset();
            setSelectedServices([]);
        }

        setIsSubmitting(false);
    };

    return (
        <section id="user-signup" className="py-24 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Benefits */}
                    <div className="text-left">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                            For Busy Individuals & Families
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                            Save time and energy with our convenient service marketplace. Find trusted providers for laundry, cleaning, and more. Schedule services and get things done while you focus on what matters most.
                        </p>
                        <ul className="space-y-3 text-lg">
                            <li className="flex items-center gap-3">
                                <span className="text-green-500 text-xl">✓</span>
                                <span>Schedule pickup & delivery</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-green-500 text-xl">✓</span>
                                <span>Compare prices & services</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-green-500 text-xl">✓</span>
                                <span>Track your service in real-time</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-green-500 text-xl">✓</span>
                                <span>Rate and review providers</span>
                            </li>
                        </ul>
                    </div>

                    {/* Right side - Form */}
                    <Card className="border-2 shadow-2xl">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl font-bold">Join the Beta Waitlist</CardTitle>
                            <CardDescription className="text-lg">
                                Be among the first to experience hassle-free cleaning services
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        {...register("name")}
                                        className={errors.name ? "border-red-500" : ""}
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-500">{errors.name.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        {...register("email")}
                                        className={errors.email ? "border-red-500" : ""}
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-500">{errors.email.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="location">Your Area / Estate</Label>
                                    <Input
                                        id="location"
                                        placeholder="e.g., Kilimani, Westlands"
                                        {...register("location")}
                                        className={errors.location ? "border-red-500" : ""}
                                    />
                                    {errors.location && (
                                        <p className="text-sm text-red-500">{errors.location.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="frequency">How often do you need services?</Label>
                                    <Select
                                        value={frequency}
                                        onValueChange={(value) => setValue("frequency", value)}
                                    >
                                        <SelectTrigger className={errors.frequency ? "border-red-500" : ""}>
                                            <SelectValue placeholder="Select frequency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="weekly">Weekly</SelectItem>
                                            <SelectItem value="biweekly">Bi-weekly</SelectItem>
                                            <SelectItem value="monthly">Monthly</SelectItem>
                                            <SelectItem value="occasionally">Occasionally</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.frequency && (
                                        <p className="text-sm text-red-500">{errors.frequency.message}</p>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <Label>Services You're Interested In</Label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {serviceOptions.map((service) => (
                                            <div key={service.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`user-${service.id}`}
                                                    checked={selectedServices.includes(service.id)}
                                                    onCheckedChange={() => handleServiceToggle(service.id)}
                                                />
                                                <label
                                                    htmlFor={`user-${service.id}`}
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
                                    {isSubmitting ? "Submitting..." : "Join Waitlist"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
