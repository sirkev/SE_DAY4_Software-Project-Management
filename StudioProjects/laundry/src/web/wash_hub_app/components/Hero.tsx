"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FloatingParticles, BackgroundBlobs } from "./ParallaxEffects";

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-950">
            {/* Dynamic Background */}
            <BackgroundBlobs />

            {/* Overlay Pattern */}
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />

            <FloatingParticles />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
                {/* Main Headline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 drop-shadow-sm">
                        Professional Cleaning
                    </h1>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x bg-300%">
                            At Your Fingertips
                        </span>
                    </h1>
                </motion.div>

                {/* Subheadline */}
                <motion.p
                    className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Connect with trusted cleaning service providers in your area. Quality cleaning, laundry, fumigation, and more - all in one app.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row gap-6 justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <Button
                        size="lg"
                        className="text-lg px-10 py-7 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        onClick={() => document.getElementById('user-signup')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Join as User
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="text-lg px-10 py-7 rounded-full border-2 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300 hover:-translate-y-1"
                        onClick={() => document.getElementById('business-signup')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        List Your Business
                    </Button>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                    className="mt-20 flex flex-wrap justify-center gap-8 text-sm font-medium text-gray-500 dark:text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                >
                    <div className="flex items-center gap-2 bg-white/50 dark:bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm border border-gray-100 dark:border-gray-800">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Verified Providers</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/50 dark:bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm border border-gray-100 dark:border-gray-800">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Secure Payments</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/50 dark:bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm border border-gray-100 dark:border-gray-800">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>24/7 Support</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
