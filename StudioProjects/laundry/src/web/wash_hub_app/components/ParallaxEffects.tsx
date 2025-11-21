"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";

interface ParallaxSectionProps {
    children: React.ReactNode;
    speed?: number;
}

export function ParallaxSection({ children, speed = 0.5 }: ParallaxSectionProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

    return (
        <div ref={ref} className="relative overflow-hidden">
            <motion.div style={{ y }}>{children}</motion.div>
        </div>
    );
}

interface FloatingBubble {
    id: number;
    size: number;
    x: number;
    delay: number;
    duration: number;
}

export function LiquidGlassSection({ children }: { children: React.ReactNode }) {
    const [windowHeight, setWindowHeight] = useState(1000); // Default fallback
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Set window height on client side only
        setWindowHeight(window.innerHeight);
        setMounted(true);

        const handleResize = () => setWindowHeight(window.innerHeight);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Generate random bubbles only on client side to avoid hydration mismatch
    const bubbles: FloatingBubble[] = useMemo(() => {
        if (!mounted) return []; // Return empty array during SSR
        return Array.from({ length: 20 }, (_, i) => ({
            id: i,
            size: Math.random() * 60 + 20, // 20-80px
            x: Math.random() * 100, // 0-100%
            delay: Math.random() * 5,
            duration: Math.random() * 10 + 15, // 15-25s
        }));
    }, [mounted]);

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Liquid Glass Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/60 to-purple-50/80 backdrop-blur-xl dark:from-gray-900/90 dark:via-gray-800/90 dark:to-purple-950/90">
                {/* Glass effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/20 dark:from-white/10 dark:to-white/5" />

                {/* Soapy churning effect */}
                <div className="absolute inset-0 opacity-30 dark:opacity-20">
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-blue-200/50 via-purple-200/30 to-blue-100/50 dark:from-blue-500/20 dark:via-purple-500/10 dark:to-blue-400/20"
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                </div>

                {/* Floating bubbles */}
                {bubbles.map((bubble) => (
                    <motion.div
                        key={bubble.id}
                        className="absolute rounded-full bg-gradient-to-br from-white/60 to-blue-200/40 backdrop-blur-sm border border-white/30 dark:from-white/10 dark:to-blue-500/20 dark:border-white/10"
                        style={{
                            width: bubble.size,
                            height: bubble.size,
                            left: `${bubble.x}%`,
                            bottom: -100,
                        }}
                        animate={{
                            y: [0, -windowHeight - 200],
                            x: [0, Math.sin(bubble.id) * 50, 0],
                            scale: [1, 1.2, 0.8, 1],
                            opacity: [0, 0.8, 0.8, 0],
                        }}
                        transition={{
                            duration: bubble.duration,
                            delay: bubble.delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        {/* Bubble highlight */}
                        <div className="absolute top-2 left-2 w-1/3 h-1/3 bg-white/60 rounded-full blur-sm dark:bg-white/20" />
                    </motion.div>
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10">{children}</div>
        </div>
    );
}

interface FloatingIcon {
    icon: React.ReactNode;
    delay: number;
    duration: number;
    startX: number;
    endX: number;
}

export function FloatingCleaningIcons() {
    const [windowHeight, setWindowHeight] = useState(1000); // Default fallback
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setWindowHeight(window.innerHeight);
        setMounted(true);

        const handleResize = () => setWindowHeight(window.innerHeight);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const icons: FloatingIcon[] = useMemo(() => [
        {
            icon: (
                <svg className="w-12 h-12 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    {/* Washing machine icon */}
                    <path d="M18 2.01L6 2c-1.11 0-2 .89-2 2v16c0 1.11.89 2 2 2h12c1.11 0 2-.89 2-2V4c0-1.11-.89-1.99-2-1.99zM10 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM7 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm5 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
                </svg>
            ),
            delay: 0,
            duration: 15,
            startX: 10,
            endX: 20,
        },
        {
            icon: (
                <svg className="w-10 h-10 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    {/* Soap/cleaning icon */}
                    <path d="M9.5 3C8.67 3 8 3.67 8 4.5S8.67 6 9.5 6 11 5.33 11 4.5 10.33 3 9.5 3zm-3 5.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5S8 10.83 8 10s-.67-1.5-1.5-1.5zM5 16c0 3.87 3.13 7 7 7s7-3.13 7-7c0-1.93-.78-3.68-2.05-4.95C15.68 9.78 13.93 9 12 9s-3.68.78-4.95 2.05C5.78 12.32 5 14.07 5 16z" />
                </svg>
            ),
            delay: 2,
            duration: 18,
            startX: 70,
            endX: 80,
        },
        {
            icon: (
                <svg className="w-11 h-11 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                    {/* Sparkle/clean icon */}
                    <path d="M12 .587l3.668 7.568L24 9.423l-6.064 5.828 1.48 8.279L12 19.446l-7.416 4.084 1.48-8.279L0 9.423l8.332-1.268z" />
                </svg>
            ),
            delay: 4,
            duration: 20,
            startX: 40,
            endX: 50,
        },
        {
            icon: (
                <svg className="w-9 h-9 text-purple-300" fill="currentColor" viewBox="0 0 24 24">
                    {/* Spray bottle icon */}
                    <path d="M16 2v2h-1V2h-2v2h-1c-.55 0-1 .45-1 1v1h6V5c0-.55-.45-1-1-1zm-4 5v14c0 .55.45 1 1 1h2c.55 0 1-.45 1-1V7h-4z" />
                </svg>
            ),
            delay: 1,
            duration: 16,
            startX: 85,
            endX: 90,
        },
    ], []);

    if (!mounted) return null; // Don't render during SSR

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {icons.map((item, index) => (
                <motion.div
                    key={index}
                    className="absolute"
                    style={{
                        left: `${item.startX}%`,
                        bottom: -60,
                    }}
                    animate={{
                        y: [0, -windowHeight - 100],
                        x: [0, (item.endX - item.startX) * 10],
                        rotate: [0, 360],
                        opacity: [0, 0.6, 0.6, 0],
                    }}
                    transition={{
                        duration: item.duration,
                        delay: item.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    {item.icon}
                </motion.div>
            ))}
        </div>
    );
}

export function SparkleEffect() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: Math.random() * 2 + 1,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}

export function BackgroundBlobs() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Large colorful blobs */}
            <motion.div
                className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-purple-300/30 dark:bg-purple-900/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen"
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute top-[10%] -right-[10%] w-[60vw] h-[60vw] bg-blue-300/30 dark:bg-blue-900/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen"
                animate={{
                    x: [0, -50, 0],
                    y: [0, 100, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />
            <motion.div
                className="absolute -bottom-[20%] left-[20%] w-[80vw] h-[80vw] bg-pink-300/30 dark:bg-pink-900/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen"
                animate={{
                    x: [0, 50, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5,
                }}
            />
        </div>
    );
}

export function FloatingParticles() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 40 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full border border-white/40 bg-white/10 backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
                    style={{
                        width: Math.random() * 30 + 10,
                        height: Math.random() * 30 + 10,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    }}
                    animate={{
                        y: [0, -Math.random() * 200 - 100],
                        x: [0, Math.random() * 100 - 50],
                        opacity: [0, 0.8, 0],
                        scale: [0.5, 1.2, 0.5],
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        delay: Math.random() * 10,
                        ease: "linear",
                    }}
                >
                    {/* Bubble shine */}
                    <div className="absolute top-[20%] left-[20%] w-[30%] h-[30%] bg-white/80 rounded-full blur-[1px]" />
                </motion.div>
            ))}
        </div>
    );
}

export function BusinessGrowthAnimation() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const coins = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 5 + 5,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Floating Coins/Symbols */}
            {coins.map((coin) => (
                <motion.div
                    key={coin.id}
                    className="absolute text-2xl opacity-20 dark:opacity-10"
                    style={{
                        left: `${coin.x}%`,
                        bottom: -50,
                    }}
                    animate={{
                        y: [0, -800],
                        rotate: [0, 360],
                        opacity: [0, 0.3, 0],
                    }}
                    transition={{
                        duration: coin.duration,
                        delay: coin.delay,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {["💰", "📈", "💎", "✨"][coin.id % 4]}
                </motion.div>
            ))}

            {/* Rising Graph Line Effect */}
            <svg className="absolute inset-0 w-full h-full opacity-10 dark:opacity-5" preserveAspectRatio="none">
                <motion.path
                    d="M0,1000 Q250,900 500,500 T1000,0"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="20"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4F46E5" />
                        <stop offset="100%" stopColor="#9333EA" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}
