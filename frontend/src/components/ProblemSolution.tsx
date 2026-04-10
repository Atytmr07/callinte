"use client";

import { motion } from "framer-motion";
import { PhoneMissed, DollarSign, Clock, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";

const painPoints = [
    {
        icon: <PhoneMissed className="w-6 h-6 text-red-500" />,
        title: "Cevapsız Kalan Çağrılar",
        desc: "Yoğun saatlerde ulaşılamayan müşteriler ve kaybolan anlık rezervasyon fırsatları.",
    },
    {
        icon: <DollarSign className="w-6 h-6 text-red-500" />,
        title: "Yüksek Personel Maliyeti",
        desc: "7/24 resepsiyon ve gece vardiyası zorlukları nedeniyle artan operasyonel giderler.",
    },
    {
        icon: <Clock className="w-6 h-6 text-red-500" />,
        title: "İnsan Kaynaklı Hatalar",
        desc: "Farklı kanallar (telefon, WhatsApp, web) arasında parçalı iletişim, yanlış rezervasyon ve unutulan müşteri talepleri.",
    },
];

const solutions = [
    {
        icon: <CheckCircle2 className="w-6 h-6 text-blue-600" />,
        title: "%100 Yanıtlama Oranı",
        colSpan: "md:col-span-2",
    },
    {
        icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
        title: "Artan Dönüşüm",
        colSpan: "md:col-span-1",
    },
    {
        icon: <Sparkles className="w-6 h-6 text-blue-600" />,
        title: "Kusursuz Müşteri Deneyimi",
        colSpan: "md:col-span-3",
    },
];

export function ProblemSolution() {
    return (
        <section className="py-24 bg-slate-50 relative">
            <div className="container px-4 md:px-6 mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
                        Manuel İletişimin Yarattığı Engeller
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        İşletmelerin büyük çoğunluğu müşteri iletişimini manuel olarak yönetirken fırsatları kaçırıyor ve maliyetleri artırıyor.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Pain Points */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold text-slate-800 mb-6">Mevcut Sorunlar</h3>
                        <div className="space-y-4">
                            {painPoints.map((point, i) => (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    whileHover={{ scale: 1.02, x: 5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25, delay: i * 0.05 }}
                                    key={i}
                                    className="flex items-start p-5 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow-sm"
                                >
                                    <div className="p-3 bg-red-50/80 rounded-xl mr-4 flex-shrink-0">
                                        {point.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-900">{point.title}</h4>
                                        <p className="text-sm text-slate-500 mt-1">{point.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Solution Bento Box */}
                    <div>
                        <h3 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center">
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm mr-3 font-medium">✨ Callinte</span>
                            Otonom Çözüm
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                className="md:col-span-3 bg-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-900/10 relative overflow-hidden"
                            >
                                <div className="relative z-10">
                                    <h4 className="text-2xl font-bold mb-2">Uçtan Uca Müşteri Döngüsü</h4>
                                    <p className="text-blue-100 max-w-md">Sadece bir rezervasyon botu değil. Konaklama öncesi, sırası ve sonrasında devreye giren entegre Sell, Manage ve Resell ekosistemi.</p>
                                </div>
                                {/* Decorative blob */}
                                <div className="absolute -right-8 -bottom-16 w-48 h-48 bg-blue-500 rounded-full blur-2xl opacity-50"></div>
                            </motion.div>

                            {solutions.map((sol, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    whileHover={{ scale: 1.05, y: -5, boxShadow: "0 15px 35px -5px rgba(37,99,235,0.15)" }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25, delay: i * 0.05 + 0.1 }}
                                    key={i}
                                    className={`${sol.colSpan} bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-sm flex flex-col justify-center cursor-pointer`}
                                >
                                    <div className="mb-4 bg-blue-50/80 w-12 h-12 rounded-xl flex items-center justify-center shadow-inner">
                                        {sol.icon}
                                    </div>
                                    <h4 className="font-medium text-slate-900">{sol.title}</h4>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
