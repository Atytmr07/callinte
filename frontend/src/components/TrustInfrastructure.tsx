"use client";

import { ShieldCheck } from "lucide-react";

const partners = ["HotelRunner", "Mews", "Cloudbeds", "360dialog", "Retell AI", "Claude API", "Firebase"];

export function TrustInfrastructure() {
    return (
        <section id="trust" className="py-20 bg-white border-t border-slate-100 overflow-hidden">
            <div className="container px-4 md:px-6 mx-auto max-w-6xl text-center">

                <div className="inline-flex items-center gap-2 mb-10 px-4 py-2 bg-slate-50 text-slate-700 rounded-full border border-slate-200 text-sm font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    KVKK Uyumlu ve Güvenli Altyapı
                </div>

                <h3 className="text-slate-500 font-medium mb-8">Sektörün Öncü Platformlarıyla Tam Entegrasyon</h3>

                <div
                    className="relative flex overflow-x-hidden p-6 max-w-4xl mx-auto"
                    style={{ maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}
                >
                    <div className="py-2 animate-[marquee_25s_linear_infinite] whitespace-nowrap flex items-center gap-12 sm:gap-24">
                        {partners.map((partner, index) => (
                            <span key={index} className="text-2xl sm:text-3xl font-bold text-slate-300">
                                {partner}
                            </span>
                        ))}
                    </div>
                    <div className="absolute top-0 py-2 animate-[marquee2_25s_linear_infinite] whitespace-nowrap flex items-center gap-12 sm:gap-24 mt-6">
                        {partners.map((partner, index) => (
                            <span key={index + partners.length} className="text-2xl sm:text-3xl font-bold text-slate-300">
                                {partner}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
