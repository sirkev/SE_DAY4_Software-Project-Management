"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const partners = [
    "CleanCo", "LaundryPro", "FreshStart", "SparkleClean", "EcoWash", "QuickDry", "PressPerfect"
];

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Homeowner",
        content: "Wash Hub has completely transformed how I manage my household chores. The cleaners are professional and always on time!",
        avatar: "SJ",
        color: "bg-blue-100 text-blue-600"
    },
    {
        name: "David Chen",
        role: "Business Owner",
        content: "Since listing my laundry business on Wash Hub, my customer base has doubled. The platform is incredibly easy to use.",
        avatar: "DC",
        color: "bg-purple-100 text-purple-600"
    },
    {
        name: "Emily Davis",
        role: "Busy Professional",
        content: "I love the convenience of scheduling pickups. The quality of service is consistently excellent.",
        avatar: "ED",
        color: "bg-pink-100 text-pink-600"
    }
];

export function Testimonials() {
    return (
        <section className="py-24 bg-white dark:bg-gray-950 overflow-hidden">
            {/* Partners Strip */}
            <div className="mb-24">
                <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8">
                    Trusted by Leading Cleaning Businesses
                </p>
                <div className="relative flex overflow-x-hidden group">
                    <div className="animate-marquee whitespace-nowrap flex items-center gap-16">
                        {[...partners, ...partners, ...partners].map((partner, index) => (
                            <span key={index} className="text-2xl font-bold text-gray-300 dark:text-gray-700 hover:text-gray-400 dark:hover:text-gray-500 transition-colors cursor-default">
                                {partner}
                            </span>
                        ))}
                    </div>
                    <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-16">
                        {[...partners, ...partners, ...partners].map((partner, index) => (
                            <span key={index} className="text-2xl font-bold text-gray-300 dark:text-gray-700 hover:text-gray-400 dark:hover:text-gray-500 transition-colors cursor-default">
                                {partner}
                            </span>
                        ))}
                    </div>
                    {/* Fade edges */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10" />
                </div>
            </div>

            {/* Testimonials */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Loved by Users and Businesses
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Don't just take our word for it
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <Card className="h-full bg-gray-50 dark:bg-gray-900 border-none shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="p-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${testimonial.color}`}>
                                            {testimonial.avatar}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                                            <p className="text-sm text-gray-500">{testimonial.role}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed">
                                        "{testimonial.content}"
                                    </p>
                                    <div className="mt-6 flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
