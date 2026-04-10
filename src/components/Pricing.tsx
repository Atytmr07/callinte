"use client";

import { useState, useEffect } from "react";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { Check } from "lucide-react";

function Counter({ value }: { value: number }) {
    const count = useMotionValue(value);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        const controls = animate(count, value, { duration: 0.5, ease: "easeOut" });
        return controls.stop;
    }, [value, count]);

    return <motion.span>{rounded}</motion.span>;
}

export function Pricing() {
    const [minutes, setMinutes] = useState(1000);
    const price = Math.round(minutes * 0.35);

    return (
        <section id="pricing" className="py-24 bg-slate-50 relative">
            <div className="container px-4 md:px-6 mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
                        Şeffaf ve Esnek Fiyatlandırma
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        İşletmenizin hacmine göre ölçeklenebilen adil modeller.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
                    {/* Card 1: Standart Paket */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)" }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col relative overflow-hidden"
                    >
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Standart Paket</h3>
                        <p className="text-slate-500 mb-6">Kullandıkça öde modeli ile esneklik sağlayın.</p>

                        <div className="flex items-baseline gap-1 mb-8">
                            <span className="text-5xl font-bold text-slate-900">$<Counter value={price} /></span>
                            <span className="text-slate-500">/ ay</span>
                        </div>

                        <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="flex justify-between items-center mb-4">
                                <label htmlFor="minutes" className="font-medium text-slate-700">Aylık Kullanım (Dakika)</label>
                                <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold shadow-inner">
                                    {minutes} dk
                                </div>
                            </div>
                            <input
                                id="minutes"
                                type="range"
                                min="100"
                                max="5000"
                                step="20"
                                value={minutes}
                                onChange={(e) => setMinutes(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 transition-all hover:h-3"
                            />
                        </div>

                        <div className="flex-grow space-y-4 mb-8">
                            <div className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <span className="text-slate-600"><strong className="text-slate-900">Sell</strong> modülü dahil.</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <span className="text-slate-600"><strong className="text-slate-900">Manage</strong> ve <strong className="text-slate-900">Resell</strong> modülleri eklenebilir.</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <span className="text-slate-600">7/24 Kesintisiz çalışma.</span>
                            </div>
                        </div>

                        <motion.button
                            onClick={() => window.dispatchEvent(new Event("open-contact-modal"))}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full h-14 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                        >
                            Hemen Başlayın
                        </motion.button>
                    </motion.div>

                    {/* Card 2: Kurumsal Paket */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(37,99,235,0.25)" }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                        className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl flex flex-col relative overflow-hidden"
                    >
                        <h3 className="text-2xl font-bold text-white mb-2">Kurumsal Paket</h3>
                        <p className="text-slate-400 mb-6">Çağrı merkezleri, acenteler ve devasa hacimler için.</p>

                        <div className="flex items-center gap-2 mb-8">
                            <span className="text-4xl font-bold text-white">Özel Teklif</span>
                        </div>

                        <div className="mb-8 p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 invisible sm:visible">
                            <div className="flex items-center gap-3">
                                <div className="h-6 w-full bg-transparent"></div>
                            </div>
                        </div>

                        <div className="flex-grow space-y-4 mb-8 mt-[-3.5rem] sm:mt-0">
                            <div className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                <span className="text-slate-300">Sınırsız tenant yapılandırması.</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                <span className="text-slate-300">White-Label (<strong className="text-white">Connect</strong>) lisanslama.</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                <span className="text-slate-300">Özel Onboarding hizmeti.</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                <span className="text-slate-300">Tam API erişimi.</span>
                            </div>
                        </div>

                        <motion.button
                            onClick={() => window.dispatchEvent(new Event("open-contact-modal"))}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full h-14 bg-white text-slate-900 rounded-full font-medium hover:bg-slate-100 transition-colors"
                        >
                            Satış Ekibiyle İletişime Geçin
                        </motion.button>

                        {/* Decorative background for dark card */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/30 rounded-full blur-[80px] -z-10 -translate-y-1/3 translate-x-1/3 transition-transform duration-700" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
