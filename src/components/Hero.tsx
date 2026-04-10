"use client";

import { motion } from "framer-motion";
import { Phone, Sparkles, Mic } from "lucide-react";

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
            {/* Premium Grid Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                {/* Top glow and bottom fade mask */}
                <div className="absolute inset-0 bg-white/40" style={{ maskImage: "linear-gradient(to bottom, transparent, white 80%)", WebkitMaskImage: "linear-gradient(to bottom, transparent, white 80%)" }}></div>

                {/* Animated glowing orbs */}
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-300/30 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-blob"></div>
                <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-300/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-50 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/3 w-[600px] h-[600px] bg-sky-200/40 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 animate-blob animation-delay-4000"></div>
            </div>

            <div className="container px-4 md:px-6 z-10 mx-auto max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Left Column: Content */}
                    <div className="flex flex-col space-y-8 text-center lg:text-left">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-tight"
                        >
                            Müşteri İletişimini Yapay Zeka ile{" "}
                            <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                                Uçtan Uca Yönetin.
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-xl md:text-2xl text-slate-600 max-w-2xl leading-relaxed font-light mx-auto lg:mx-0"
                        >
                            Tüm ölçeklerdeki işletmeler için tasarlanmış; telefon, WhatsApp ve web kanallarını tek merkezden yöneten otonom yapay zeka platformu.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start"
                        >
                            <motion.button
                                onClick={() => window.dispatchEvent(new Event("open-contact-modal"))}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full sm:w-auto h-14 px-8 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20"
                            >
                                Demoyu Keşfet
                            </motion.button>
                            <motion.button
                                onClick={() => {
                                    const el = document.getElementById("pricing");
                                    if (el) el.scrollIntoView({ behavior: "smooth" });
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full sm:w-auto h-14 px-8 rounded-full bg-white border border-slate-200 text-slate-900 font-medium hover:bg-slate-50 transition-all hover:border-slate-300 hover:shadow-sm"
                            >
                                Fiyatlandırmayı Gör
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Right Column: Hero Visual / Mock Interface */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                        transition={{ duration: 0.7, delay: 0.3, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
                        className="relative mx-auto w-full max-w-lg lg:ml-auto"
                    >
                        {/* The Glassmorphism Device Container */}
                        <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl shadow-slate-200/50 rounded-3xl p-6 relative overflow-hidden">

                            {/* Top Bar: Caller Info */}
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center shadow-inner">
                                            {/* Logo CSS blocks */}
                                            <div className="flex gap-[3px] items-center justify-center transform -skew-x-[20deg]">
                                                <div className="w-[10px] h-[22px] bg-white rounded-[1px]"></div>
                                                <div className="w-[10px] h-[22px] bg-white rounded-[1px]"></div>
                                            </div>
                                        </div>
                                        {/* Ring animation */}
                                        <div className="absolute inset-0 rounded-full border-2 border-slate-900 animate-ping opacity-20"></div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-lg leading-tight">Gelen Çağrı</h3>
                                        <p className="text-slate-500 font-mono text-sm tracking-widest">+90 543 *** ** 21</p>
                                    </div>
                                </div>
                            </div>

                            {/* Chat Conversation Area */}
                            <div className="space-y-6">

                                {/* User Message */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                    className="bg-slate-50 p-4 rounded-2xl rounded-tl-sm text-slate-800 shadow-sm border border-slate-100 mr-8"
                                >
                                    <p className="text-[15px] leading-relaxed">
                                        Merhaba, siparişimin durumunu öğrenebilir miyim? Kargo takip numaram: 48923
                                    </p>
                                </motion.div>

                                {/* AI Message */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.5 }}
                                    className="bg-slate-900 text-white p-5 rounded-2xl rounded-br-sm shadow-xl shadow-slate-900/10 ml-8 relative overflow-hidden"
                                >
                                    <p className="text-[15px] leading-relaxed relative z-10">
                                        Tabii ki. Siparişiniz şu an dağıtıma çıkmış görünüyor, bugün saat <strong className="text-white font-bold tracking-wide">14:00 - 16:00</strong> arasında teslim edilecektir. Başka yardımcı olabileceğim bir konu var mı?
                                    </p>
                                </motion.div>

                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
