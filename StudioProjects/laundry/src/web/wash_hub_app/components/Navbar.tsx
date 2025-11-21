"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function Navbar() {
    const [isDark, setIsDark] = useState(false);

    // Apply dark class to html element
    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [isDark]);

    const sections = [
        { id: "hero", label: "Home" },
        { id: "services", label: "Services" },
        { id: "features", label: "Why Choose Us" },
        { id: "partners", label: "Partners" },
        { id: "testimonials", label: "Testimonials" },
    ];

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md border-b border-white/20 dark:border-gray-700/20 transition-colors">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
                <div className="text-2xl font-bold text-gray-800 dark:text-white cursor-pointer" onClick={() => scrollTo('hero')}>
                    WashHub
                </div>
                <div className="flex items-center space-x-4">
                    {sections.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => scrollTo(s.id)}
                            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
                        >
                            {s.label}
                        </button>
                    ))}
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                        aria-label="Toggle dark mode"
                    >
                        {isDark ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 2a1 1 0 011 1v2a1 1 0 01-2 0V3a1 1 0 011-1zM4.22 4.22a1 1 0 011.42 0L7.05 5.64a1 1 0 01-1.42 1.42L4.22 5.64a1 1 0 010-1.42zM2 10a1 1 0 011-1h2a1 1 0 010 2H3a1 1 0 01-1-1zm8 5a1 1 0 011 1v2a1 1 0 01-2 0v-2a1 1 0 011-1zm5.78-1.78a1 1 0 010 1.42l-1.42 1.42a1 1 0 01-1.42-1.42l1.42-1.42a1 1 0 011.42 0zM17 9a1 1 0 100 2h2a1 1 0 100-2h-2zM10 14a4 4 0 100-8 4 4 0 000 8z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 2a8 8 0 000 16 8 8 0 000-16zM8 14a6 6 0 010-12 6 6 0 010 12z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
}
