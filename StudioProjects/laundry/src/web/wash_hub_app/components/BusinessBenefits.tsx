"use client";

import { motion } from "framer-motion";
import { BusinessGrowthAnimation } from "./ParallaxEffects";

export function BusinessBenefits() {
    const benefits = [
        {
            icon: "📈",
            title: "Expand Your Reach",
            description: "Get discovered by new customers in your area without spending a fortune on marketing.",
        },
        {
            icon: "📱",
            title: "Manage with Ease",
            description: "Use our provider app to manage bookings, schedule staff, and track earnings in real-time.",
        },
        {
            icon: "💰",
            title: "Guaranteed Payments",
            description: "Secure, automated payments directly to your account. No more chasing invoices.",
        },
    ];

    return (
        <section className="py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
            <BusinessGrowthAnimation />
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
                <motion.div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                        backgroundSize: "50px 50px",
                    }}
                    animate={{
                        backgroundPosition: ["0px 0px", "50px 50px"],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-5xl font-bold text-white mb-4">
                        Grow Your Cleaning Business
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Join Wash Hub and connect with thousands of customers looking for your services.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            className="relative group"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                        >
                            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300">
                                <motion.div
                                    className="text-6xl mb-4"
                                    animate={{
                                        rotate: [0, 10, -10, 0],
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    {benefit.icon}
                                </motion.div>
                                <h3 className="text-2xl font-bold text-white mb-3">{benefit.title}</h3>
                                <p className="text-gray-300">{benefit.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
