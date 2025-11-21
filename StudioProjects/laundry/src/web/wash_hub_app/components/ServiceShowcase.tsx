"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { LiquidGlassSection, FloatingCleaningIcons } from "./ParallaxEffects";

export function ServiceShowcase() {
    const showcaseItems = [
        {
            title: "Quality Service",
            description: "Professional cleaning with attention to detail and care for your garments",
            gradient: "from-blue-500 to-cyan-400",
            image: "/quality-service.jpg",
        },
        {
            title: "Modern Facilities",
            description: "State-of-the-art equipment and eco-friendly cleaning solutions",
            gradient: "from-purple-500 to-pink-400",
            image: "/modern-facilities.jpg",
        },
        {
            title: "Convenient Pickup",
            description: "Schedule pickup and delivery at your convenience, right to your door",
            gradient: "from-indigo-500 to-blue-400",
            image: "/convenient-pickup.jpg",
        },
    ];

    return (
        <LiquidGlassSection>
            <FloatingCleaningIcons />

            <div className="relative z-20 py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <motion.div
                        className="text-center mb-20"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            Professional Services{" "}
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                You Can Trust
                            </span>
                        </h2>
                        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                            Discover the quality and convenience that our platform brings to modern home care
                        </p>
                    </motion.div>

                    {/* Showcase Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {showcaseItems.map((item, index) => (
                            <motion.div
                                key={index}
                                className="group relative"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                whileHover={{ scale: 1.05, rotate: 1 }}
                            >
                                {/* Glass card */}
                                <div className="relative h-96 rounded-3xl overflow-hidden backdrop-blur-xl bg-white/40 border border-white/50 shadow-2xl dark:bg-gray-900/40 dark:border-white/10">
                                    {/* Image Background */}
                                    <div className="absolute inset-0">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                    </div>

                                    {/* Gradient overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300 mix-blend-overlay`} />

                                    {/* Content */}
                                    <div className="relative h-full flex flex-col justify-end p-8">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.2 + 0.3 }}
                                        >
                                            <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">
                                                {item.title}
                                            </h3>
                                            <p className="text-lg text-gray-100 drop-shadow-md">
                                                {item.description}
                                            </p>
                                        </motion.div>
                                    </div>

                                    {/* Floating bubble effect on hover */}
                                    <motion.div
                                        className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/30 backdrop-blur-sm border border-white/40"
                                        animate={{
                                            y: [0, -10, 0],
                                            scale: [1, 1.1, 1],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    >
                                        <div className="absolute top-2 left-2 w-8 h-8 bg-white/50 rounded-full blur-sm" />
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </LiquidGlassSection>
    );
}
