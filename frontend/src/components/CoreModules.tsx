"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall, MessageCircle, Bot, Globe } from "lucide-react";

const modules = [
    {
        id: "sell",
        title: "Sell",
        icon: <PhoneCall className="w-5 h-5" />,
        description: "Gelen çağrı ve mesajları 7/24 karşılayan, teknik bilgi veren ve CRM/ERP sistemlerinize hedefli kayıt giren sesli yapay zeka.",
        color: "blue"
    },
    {
        id: "manage",
        title: "Manage",
        icon: <MessageCircle className="w-5 h-5" />,
        description: "Müşteri yolculuğu boyunca WhatsApp ve web üzerinden çok dilli destek veren, talepleri ve operasyonu anlık yöneten sistem.",
        color: "emerald"
    },
    {
        id: "resell",
        title: "Resell",
        icon: <Bot className="w-5 h-5" />,
        description: "Geçmiş müşterilere ulaşarak bağlılık yaratan, ek kapasite dolduran ve çapraz/yukarı (cross-sell) satış yapan proaktif motor.",
        color: "purple"
    },
    {
        id: "connect",
        title: "Connect",
        icon: <Globe className="w-5 h-5" />,
        description: "Çağrı merkezleri ve acenteler için sunulan, kendi alt alan adlarından yönettikleri (subdomain) White-Label lisanslama modülü.",
        color: "slate"
    }
];

export function CoreModules() {
    const [activeTab, setActiveTab] = useState(modules[0].id);

    return (
        <section id="modules" className="py-24 bg-white relative">
            <div className="container px-4 md:px-6 mx-auto max-w-5xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
                        Uçtan Uca Platform Motoru
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Her iletişim noktası için özel olarak eğitilmiş, sorunsuz bir şekilde birbiriyle konuşan yapay zeka modülleri.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-start">
                    {/* Tabs Navigation */}
                    <div className="flex flex-row md:flex-col gap-2 w-full md:w-1/3 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
                        {modules.map((m) => (
                            <button
                                key={m.id}
                                onClick={() => setActiveTab(m.id)}
                                className={`flex items-center gap-3 px-5 py-4 rounded-xl font-medium transition-all text-left whitespace-nowrap md:whitespace-normal
                  ${activeTab === m.id
                                        ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10"
                                        : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                    }`}
                            >
                                <div className={`${activeTab === m.id ? "text-white" : "text-slate-400"}`}>
                                    {m.icon}
                                </div>
                                {m.title}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="w-full md:w-2/3 min-h-[300px] flex items-center">
                        <AnimatePresence mode="wait">
                            {modules.map((m) => {
                                if (m.id !== activeTab) return null;
                                return (
                                    <motion.div
                                        key={m.id}
                                        initial={{ opacity: 0, x: 20, scale: 0.95 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: -20, scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/40 relative overflow-hidden group"
                                    >
                                        <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-8 text-slate-700 transition-transform group-hover:scale-110">
                                            {m.icon}
                                        </div>
                                        <h3 className="text-3xl font-bold text-slate-900 mb-4">{m.title} Modülü</h3>
                                        <p className="text-xl text-slate-600 leading-relaxed relative z-10">
                                            {m.description}
                                        </p>
                                        <motion.button
                                            onClick={() => window.dispatchEvent(new Event("open-contact-modal"))}
                                            whileHover={{ x: 5 }}
                                            className="relative z-10 mt-8 text-blue-600 font-medium flex items-center gap-2 hover:text-blue-700 transition-colors"
                                        >
                                            Detaylı Bilgi Alın →
                                        </motion.button>
                                        {/* Background hover blob element */}
                                        <div className="absolute -right-8 -top-8 w-64 h-64 bg-blue-100 rounded-full blur-[80px] opacity-0 group-hover:opacity-50 transition-opacity duration-700"></div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
