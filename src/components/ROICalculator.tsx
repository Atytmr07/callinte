"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Calculator, TrendingDown, ArrowRight } from "lucide-react";

export function ROICalculator() {
    const [monthlyCalls, setMonthlyCalls] = useState(2500);
    const [callDuration, setCallDuration] = useState(3);
    const [agentCost, setAgentCost] = useState(2000);

    // Hesaplama Mantığı
    // 1 Personel aylık ortalama 160 saat çalışır (9600 dakika). 
    // %60 verimlilikle çağrıda geçen süre kapasitesi = ~5760 dk/ay.
    const totalMinutes = monthlyCalls * callDuration;
    const agentCapacityMinutes = 5760;
    const agentsNeeded = Math.ceil(totalMinutes / agentCapacityMinutes);

    // Klasik maliyet: Personel sayısı * Personel maliyeti (Maaş + Donanım + Lisans vb. - USD Bazlı)
    const traditionalMonthlyCost = agentsNeeded * agentCost;

    // Callinte Maliyeti: Dakikası ortalama 0.35 USD
    const callinteMonthlyCost = totalMinutes * 0.35;

    // Kazançlar
    const monthlySavings = Math.max(0, traditionalMonthlyCost - callinteMonthlyCost);
    const yearlySavings = monthlySavings * 12;
    const savingsPercentage = traditionalMonthlyCost > 0
        ? Math.round((monthlySavings / traditionalMonthlyCost) * 100)
        : 0;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(value);
    };

    return (
        <section className="py-24 bg-white relative border-t border-slate-100">
            {/* Arka plan süsleri */}
            <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-blue-50/50 rounded-bl-[100px] -z-10 blur-3xl"></div>

            <div className="container px-4 md:px-6 mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-2xl mb-4 text-blue-600">
                        <Calculator className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
                        Ne Kadar Tasarruf Edeceksiniz?
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Mevcut çağrı hacminizi girin, geleneksel çağrı merkezi maliyetleriyle Callinte AI arasındaki devasa farkı kendi gözlerinizle görün.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Sol Kısım: Sürgüler */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm"
                    >
                        <h3 className="text-xl font-bold text-slate-900 mb-8">Senaryonuzu Oluşturun</h3>

                        <div className="space-y-8">
                            {/* Sürgü 1 */}
                            <div>
                                <div className="flex justify-between items-end mb-4">
                                    <label className="text-sm font-semibold text-slate-700">Aylık Toplam Çağrı Sayısı</label>
                                    <span className="text-lg font-bold text-blue-600">{monthlyCalls.toLocaleString('en-US')} Adet</span>
                                </div>
                                <input
                                    type="range"
                                    min="100"
                                    max="30000"
                                    step="100"
                                    value={monthlyCalls}
                                    onChange={(e) => setMonthlyCalls(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                            </div>

                            {/* Sürgü 2 */}
                            <div>
                                <div className="flex justify-between items-end mb-4">
                                    <label className="text-sm font-semibold text-slate-700">Ortalama Çağrı Süresi</label>
                                    <span className="text-lg font-bold text-blue-600">{callDuration} Dakika</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="15"
                                    step="1"
                                    value={callDuration}
                                    onChange={(e) => setCallDuration(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                            </div>

                            {/* Sürgü 3 */}
                            <div>
                                <div className="flex justify-between items-end mb-4">
                                    <label className="text-sm font-semibold text-slate-700">1 Personelin Aylık Maliyeti</label>
                                    <span className="text-lg font-bold text-blue-600">{formatCurrency(agentCost)}</span>
                                </div>
                                <p className="text-xs text-slate-500 mb-3">(Maaş, SGK, Yol, Yemek, Yazılım lisansları vb. dahil - USD Bazlı)</p>
                                <input
                                    type="range"
                                    min="200"
                                    max="8000"
                                    step="200"
                                    value={agentCost}
                                    onChange={(e) => setAgentCost(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Sağ Kısım: Sonuçlar */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl"
                    >
                        {/* Glow Efekti */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/30 rounded-full blur-[80px] pointer-events-none"></div>

                        <h3 className="text-xl font-bold mb-8 relative z-10">Maliyet Karşılaştırması</h3>

                        <div className="space-y-6 relative z-10">
                            <div className="flex justify-between items-center pb-6 border-b border-white/10">
                                <div>
                                    <p className="text-slate-400 text-sm mb-1">Geleneksel Çağrı Merkezi</p>
                                    <p className="text-xs text-slate-500">Tahmini {agentsNeeded} Personel Gerektirir</p>
                                </div>
                                <span className="text-xl md:text-2xl font-bold line-through text-slate-500 decoration-red-500/50">
                                    {formatCurrency(traditionalMonthlyCost)} <span className="text-sm font-normal text-slate-500">/ay</span>
                                </span>
                            </div>

                            <div className="flex justify-between items-center pb-6 border-b border-white/10">
                                <div>
                                    <p className="text-blue-300 font-medium mb-1">Callinte AI Otomasyonu</p>
                                    <p className="text-xs text-blue-200/50">Sadece Tüketim Kadarı ({totalMinutes.toLocaleString('tr-TR')} dk)</p>
                                </div>
                                <span className="text-2xl md:text-3xl font-bold text-white">
                                    {formatCurrency(callinteMonthlyCost)} <span className="text-sm font-normal text-white/60">/ay</span>
                                </span>
                            </div>

                            <div className="pt-4 space-y-4">
                                <div className={`${savingsPercentage > 0 ? 'bg-gradient-to-r from-emerald-500/20 to-emerald-500/5 border-emerald-500/20' : 'bg-slate-800/50 border-slate-700/50'} border p-6 rounded-2xl`}>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={`p-2 rounded-lg ${savingsPercentage > 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
                                            <TrendingDown className="w-5 h-5" />
                                        </div>
                                        <p className={`${savingsPercentage > 0 ? 'text-emerald-400' : 'text-slate-400'} font-semibold text-sm`}>Toplam Yıllık Tasarruf</p>
                                    </div>
                                    <div className="flex items-end gap-3">
                                        <span className={`text-4xl md:text-5xl font-extrabold tracking-tight ${savingsPercentage > 0 ? 'text-white' : 'text-slate-300'}`}>
                                            {formatCurrency(yearlySavings)}
                                        </span>
                                    </div>
                                    <div className={`mt-4 inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${savingsPercentage > 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-400'}`}>
                                        {savingsPercentage > 0 ? `Maliyetlerinizde %${savingsPercentage} düşüş` : `Avantaj sağlamak için çağrı hacminizi artırmalısınız`}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => window.dispatchEvent(new Event("open-contact-modal"))}
                            className="mt-8 w-full h-12 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
                        >
                            Tasarruf Etmeye Başlayın <ArrowRight className="w-4 h-4" />
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
