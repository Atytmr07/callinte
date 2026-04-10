"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm py-3" : "bg-transparent py-5"}`}>
            <div className="container px-4 md:px-6 mx-auto max-w-6xl flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-1">
                    <img src="/callinte-logo.jpeg" alt="Callinte Logo" className="h-8 w-auto object-contain mix-blend-darken" />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <button onClick={() => {
                        const el = document.getElementById("showcase");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                    }} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Altyapı</button>
                    <button onClick={() => {
                        const el = document.getElementById("modules");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                    }} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Çözümler</button>
                    <button onClick={() => {
                        const el = document.getElementById("pricing");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                    }} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Fiyatlandırma</button>
                </nav>

                {/* CTA */}
                <div className="flex items-center gap-4">
                    <button onClick={() => window.dispatchEvent(new Event("open-contact-modal"))} className="hidden sm:block text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Giriş Yap</button>
                    <button onClick={() => window.dispatchEvent(new Event("open-contact-modal"))} className="h-10 px-5 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-all shadow-sm">
                        Demoyu İncele
                    </button>
                </div>
            </div>
        </header>
    );
}
