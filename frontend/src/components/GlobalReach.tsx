"use client";

import { motion } from "framer-motion";
import { GlobePulse } from "@/components/ui/globe-pulse";

export function GlobalReach() {
    return (
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden" id="global-reach">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen opacity-50"></div>
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen opacity-50"></div>
            </div>

            <div className="container px-4 md:px-6 mx-auto max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    {/* Left content: Globe */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full flex items-center justify-center lg:justify-start"
                    >
                        <div className="w-full max-w-md h-[400px] sm:h-[500px]">
                            {/* We customize the markers inside GlobePulse to match the blue theme earlier */}
                            <GlobePulse speed={0.005} />
                        </div>
                    </motion.div>

                    {/* Right content: Copy */}
                    <div className="flex flex-col space-y-8 text-center lg:text-left">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2"
                        >
                            Dünyanın Her Yerinde, <br />
                            <span className="text-blue-400">7/24 Kesintisiz Hizmet</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-slate-300 font-light leading-relaxed max-w-xl mx-auto lg:mx-0"
                        >
                            İşletmeniz nerede olursa olsun, Callinte'nin gelişmiş yapay zekası sayesinde farklı zaman dilimlerinden gelen çağrıları veya mesajları anında yanıtlayabilirsiniz. Müşteri iletişiminde zaman ve mekan sınırlarını ortadan kaldırın.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="grid grid-cols-2 gap-6 pt-4 max-w-xl mx-auto lg:mx-0"
                        >
                            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
                                <h4 className="text-3xl font-bold text-white mb-1">50+</h4>
                                <p className="text-sm text-slate-400">Desteklenen Dil</p>
                            </div>
                            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
                                <h4 className="text-3xl font-bold text-white mb-1">%100</h4>
                                <p className="text-sm text-slate-400">Global Ulaşılabilirlik</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
