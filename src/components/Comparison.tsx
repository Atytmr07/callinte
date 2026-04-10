"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

export function Comparison() {
    const features = [
        {
            name: "7/24 Kesintisiz Hizmet",
            traditional: false,
            callinte: true,
        },
        {
            name: "Bekleme Süresi",
            traditional: "Ortalama 2-5 Dakika",
            callinte: "Anında Yanıt",
        },
        {
            name: "Kapasite",
            traditional: "Sınırlı (Personel Sayısı Kadar)",
            callinte: "Sınırsız Eşzamanlı Çağrı",
        },
        {
            name: "Maliyet",
            traditional: "Yüksek Sabit Giderler",
            callinte: "Düşük (Kullandıkça Öde)",
        },
        {
            name: "Duygu & Ton Standardı",
            traditional: "Değişken",
            callinte: "Her Zaman Profesyonel",
        },
        {
            name: "Çoklu Dil Desteği",
            traditional: "Sınırlı (TR/EN)",
            callinte: "30+ Dil Anadil Seviyesi",
        },
        {
            name: "Ölçeklenebilirlik",
            traditional: "Yavaş ve Zor",
            callinte: "Anında Ölçeklenebilir",
        },
    ];

    return (
        <section className="py-24 bg-white relative">
            <div className="container px-4 md:px-6 mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
                        Neden Callinte AI?
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Geleneksel çağrı merkezlerinin sınırlarını aşın, müşteri deneyimini geleceğe taşıyın.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                        {/* Header */}
                        <div className="grid grid-cols-3 bg-white border-b border-slate-200 p-6 md:p-8">
                            <div className="flex items-center">
                                <span className="font-semibold text-slate-900">Karşılaştırma Noktası</span>
                            </div>
                            <div className="flex flex-col items-center justify-center text-center">
                                <span className="text-sm font-medium text-slate-500 mb-1">Geleneksel</span>
                                <span className="font-semibold text-slate-700">Çağrı Merkezi</span>
                            </div>
                            <div className="flex flex-col items-center justify-center text-center relative">
                                <div className="absolute -top-4 -right-2">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                        Yeni Nesil
                                    </span>
                                </div>
                                <span className="text-sm font-medium text-blue-600 mb-1">Otonom</span>
                                <span className="font-bold text-slate-900">Callinte AI</span>
                            </div>
                        </div>

                        {/* Rows */}
                        <div className="divide-y divide-slate-200/60">
                            {features.map((feature, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                                    key={idx}
                                    className="grid grid-cols-3 p-6 md:p-8 hover:bg-white transition-colors"
                                >
                                    <div className="flex items-center">
                                        <span className="font-medium text-slate-700">{feature.name}</span>
                                    </div>
                                    <div className="flex items-center justify-center text-center">
                                        {typeof feature.traditional === 'boolean' ? (
                                            feature.traditional ? (
                                                <Check className="w-5 h-5 text-emerald-500" />
                                            ) : (
                                                <X className="w-5 h-5 text-slate-300" />
                                            )
                                        ) : (
                                            <span className="text-sm text-slate-500">{feature.traditional}</span>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-center text-center bg-blue-50/50 -m-6 md:-m-8 p-6 md:p-8 border-l border-r border-blue-100/50">
                                        {typeof feature.callinte === 'boolean' ? (
                                            feature.callinte ? (
                                                <Check className="w-5 h-5 text-blue-600" />
                                            ) : (
                                                <X className="w-5 h-5 text-slate-300" />
                                            )
                                        ) : (
                                            <span className="text-sm font-medium text-blue-700">{feature.callinte}</span>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
