"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Mic, PhoneOff, Calendar, User, Activity, PhoneCall, Sparkles, AlertCircle, Play, CheckCircle2 } from "lucide-react";

// Mock scenarios
const scenarios = [
    {
        id: "sales",
        name: "Satış & Rezervasyon",
        steps: [
            { text: "Callinte AI, size nasıl yardımcı olabilirim?", isBot: true, time: 1000 },
            { text: "Merhaba, ürün paketleriniz hakkında bilgi almak ve randevu oluşturmak istiyorum.", isBot: false, time: 4000 },
            { text: "Tabii ki! İşletmeniz için en uygun olan Premium paketimizin aylık bedeli 5.000 TL'dir. İsterseniz sizi satış ekibiyle görüşmeniz için perşembe gününe takvime ekleyebilirim.", isBot: true, time: 8000 },
            { text: "Evet, perşembe saat 14:00 benim için çok uygun olur.", isBot: false, time: 14000 },
            { text: "İşlem tamamlandı! Randevunuzu CRM sisteminize kaydettim ve onay mesajını WhatsApp'tan ilettim.", isBot: true, time: 18000 },
        ],
        cardInfo: {
            title: "Yeni Satış Fırsatı (Lead) Kaydedildi",
            icon: <CheckCircle2 className="w-5 h-5 text-emerald-100" />,
            bgColor: "from-emerald-500 to-teal-500",
            shadowColor: "shadow-emerald-500/20",
            row1Item1: "Kurumsal Müşteri",
            row1Item1Icon: <User className="w-3 h-3 opacity-75" />,
            row1Item2: "Perşembe 14:00",
            row1Item2Icon: <Calendar className="w-3 h-3 opacity-75" />,
            row2Item1: "Premium Paket",
            row2Item1Icon: <Activity className="w-3 h-3 opacity-75" />,
            row2PriceLabel: "Aylık Tutar",
            row2Price: "5.000 TL"
        }
    },
    {
        id: "support",
        name: "Teknik Servis & Şikayet",
        steps: [
            { text: "Callinte Destek. Lütfen yaşadığınız problemi kısaca özetleyin.", isBot: true, time: 1000 },
            { text: "Dün sizden aldığımız yazılım terminali sürekli internet bağlantısını koparıyor. Çalışamıyoruz.", isBot: false, time: 4000 },
            { text: "Anlıyorum, bu durum iş akışınızı bozduğu için üzgünüm. Sorunu çözmek adına sisteminize uzaktan bir reset komutu gönderiyorum. Lütfen bekleyin.", isBot: true, time: 9000 },
            { text: "Cihaz kapanıp açıldı. Evet, şu an internet geldi süper.", isBot: false, time: 15000 },
            { text: "Harika! Teknik servis talebinizi (Ticket #942) çözüldü olarak CRM'e kapatıyorum. İyi çalışmalar dileriz.", isBot: true, time: 19000 },
        ],
        cardInfo: {
            title: "Destek Talebi (Ticket) Çözüldü",
            icon: <AlertCircle className="w-5 h-5 text-indigo-100" />,
            bgColor: "from-indigo-500 to-blue-500",
            shadowColor: "shadow-indigo-500/20",
            row1Item1: "Bağlantı Sorunu",
            row1Item1Icon: <AlertCircle className="w-3 h-3 opacity-75" />,
            row1Item2: "Uzaktan Reset",
            row1Item2Icon: <Activity className="w-3 h-3 opacity-75" />,
            row2Item1: "Ticket #942",
            row2Item1Icon: <Calendar className="w-3 h-3 opacity-75" />,
            row2PriceLabel: "Durum",
            row2Price: "Kapatıldı"
        }
    }
];

// Typewriter Component
const TypewriterText = ({ text }: { text: string }) => {
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        let isMounted = true;
        setDisplayed("");
        let i = 0;

        const typingId = setInterval(() => {
            if (isMounted) {
                if (i <= text.length) {
                    setDisplayed(text.slice(0, i));
                    i++;
                } else {
                    clearInterval(typingId);
                }
            }
        }, 15); // very fast typing

        return () => {
            isMounted = false;
            clearInterval(typingId);
        };
    }, [text]);

    return (
        <span>
            {displayed}
            {displayed.length < text.length && <span className="animate-pulse ml-1 opacity-50">|</span>}
        </span>
    );
};

export function ProductShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -5]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

    const [activeScenarioId, setActiveScenarioId] = useState(scenarios[0].id);
    const activeScenario = scenarios.find(s => s.id === activeScenarioId)!;

    const [isCalling, setIsCalling] = useState(false);
    const [conversationIndex, setConversationIndex] = useState(-1);
    const [showNewReservation, setShowNewReservation] = useState(false);

    // Random fake metrics for the HUD
    const [metrics, setMetrics] = useState({ latency: 0, sentiment: 0 });

    useEffect(() => {
        let metricInterval: NodeJS.Timeout;
        if (isCalling) {
            metricInterval = setInterval(() => {
                setMetrics({
                    latency: Math.floor(Math.random() * 40) + 120, // 120-160ms
                    sentiment: Math.floor(Math.random() * 20) + 80 // 80-100% positive
                });
            }, 800);
        }
        return () => clearInterval(metricInterval);
    }, [isCalling]);

    // Call progression logic
    useEffect(() => {
        let timeouts: NodeJS.Timeout[] = [];
        if (isCalling) {
            setConversationIndex(-1);
            setShowNewReservation(false);

            activeScenario.steps.forEach((step, index) => {
                const timeout = setTimeout(() => {
                    setConversationIndex(index);
                }, step.time);
                timeouts.push(timeout);
            });

            const resTimeout = setTimeout(() => {
                setShowNewReservation(true);
            }, activeScenario.steps[activeScenario.steps.length - 1].time + 1000);
            timeouts.push(resTimeout);

            const endTimeout = setTimeout(() => {
                setIsCalling(false);
            }, activeScenario.steps[activeScenario.steps.length - 1].time + 4000);
            timeouts.push(endTimeout);

        } else {
            setConversationIndex(-1);
        }

        return () => timeouts.forEach(clearTimeout);
    }, [isCalling, activeScenario]);

    return (
        <section id="showcase" ref={containerRef} className="py-32 bg-slate-50 overflow-hidden relative border-y border-slate-100">
            <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
            <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-emerald-300/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

            <div className="container px-4 md:px-6 mx-auto max-w-7xl relative z-10">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-6"
                    >
                        <Sparkles className="w-4 h-4" />
                        Platform Deneyimi
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight"
                    >
                        Yapay Zekanın Gücünü <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                            Hemen Test Edin
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-600 font-light"
                    >
                        Farklı senaryolar seçerek, Callinte'nin şirketinizin tüm kanallarını nasıl yöneteceğini canlı olarak izleyin. Sesin token token işlenme anına şahit olun.
                    </motion.p>
                </div>

                <div className="relative mx-auto w-full max-w-6xl flex justify-center py-10" style={{ perspective: "2000px" }}>
                    <motion.div
                        style={{ rotateX, scale }}
                        className="w-full bg-white/80 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(37,99,235,0.15)] border border-white flex flex-col md:flex-row overflow-hidden transform-gpu"
                    >
                        {/* LEFT COLUMN: Voice Assistant UI */}
                        <div className="w-full md:w-[45%] bg-slate-50/50 border-r border-slate-100 p-8 flex flex-col">

                            <div className="flex flex-col gap-4 mb-8 relative z-20">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${isCalling ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                                        <span className="text-sm font-semibold text-slate-700">{isCalling ? 'Canlı Çağrı' : 'Sistem Hazır'}</span>
                                    </div>
                                    <div className="text-xs bg-white border border-slate-200 px-2 py-1 rounded-md text-slate-500 font-mono">
                                        v1.0 (Retell AI Core)
                                    </div>
                                </div>

                                <div className="flex gap-2 p-1 bg-slate-200/50 backdrop-blur-md rounded-xl">
                                    {scenarios.map(scen => (
                                        <button
                                            key={scen.id}
                                            disabled={isCalling}
                                            onClick={() => setActiveScenarioId(scen.id)}
                                            className={`flex-1 text-xs sm:text-sm font-medium py-2 px-3 rounded-lg transition-all ${activeScenarioId === scen.id ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'} ${isCalling ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            {scen.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Voice Visualizer Area */}
                            <div className="flex-1 flex flex-col items-center justify-center min-h-[300px] mb-8 relative">

                                {/* Real-time HUD */}
                                <AnimatePresence>
                                    {isCalling && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute top-0 right-0 left-0 mx-auto w-48 mt-[-20px] bg-white/90 backdrop-blur-sm border border-slate-100 shadow-sm rounded-lg p-3 text-[10px] font-mono text-slate-600 z-20 pointer-events-none"
                                        >
                                            <div className="flex justify-between mb-1">
                                                <span>Latency (LLM)</span>
                                                <span className="text-blue-600 font-bold">{metrics.latency}ms</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Sentiment</span>
                                                <span className="text-emerald-500 font-bold">% {metrics.sentiment}</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="relative w-24 h-24 flex items-center justify-center">
                                    {isCalling && (
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            {[...Array(3)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ width: 80, height: 80, opacity: 0.8 }}
                                                    animate={{ width: 300, height: 300, opacity: 0 }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        delay: i * 0.6,
                                                        ease: "easeOut"
                                                    }}
                                                    className="absolute border-2 border-blue-400 rounded-full"
                                                />
                                            ))}
                                        </div>
                                    )}

                                    <motion.div
                                        className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-colors duration-500 ${isCalling ? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/50' : 'bg-white border border-slate-200'}`}
                                    >
                                        {isCalling ? (
                                            <Activity className="w-10 h-10 text-white animate-pulse" />
                                        ) : (
                                            <Mic className="w-8 h-8 text-slate-400" />
                                        )}
                                    </motion.div>
                                </div>
                                <div className="mt-8 text-center z-10">
                                    <h3 className="text-xl font-bold text-slate-900">{isCalling ? 'Asistan Dinliyor...' : 'Çağrı Asistanı'}</h3>
                                    <p className="text-sm text-slate-500 mt-1">{isCalling ? 'Uçtan uca şifreli ses işleme' : 'Demoyu başlatmak için butona tıklayın'}</p>
                                </div>
                            </div>

                            <div className="flex justify-center mt-auto">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsCalling(!isCalling)}
                                    className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white shadow-lg transition-all ${isCalling
                                        ? 'bg-red-500 hover:bg-red-600 shadow-red-500/30'
                                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-600/30'
                                        }`}
                                >
                                    {isCalling ? (
                                        <>
                                            <PhoneOff className="w-5 h-5" />
                                            Çağrıyı Sonlandır
                                        </>
                                    ) : (
                                        <>
                                            <Play className="w-5 h-5" fill="currentColor" />
                                            Demoyu Başlat
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Chat Transcript & CRM */}
                        <div className="w-full md:w-[55%] p-8 flex flex-col bg-white">
                            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-indigo-500" />
                                    Gerçek Zamanlı Veri Akışı
                                </h3>
                                <div className="flex gap-2">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200"></div>
                                    <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200"></div>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col gap-6 relative">
                                <div className="space-y-4 max-h-[350px] overflow-auto pr-2 relative scrollbar-hide">
                                    {!isCalling && conversationIndex === -1 && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 mt-10">
                                            <PhoneCall className="w-8 h-8 mb-2 opacity-50" />
                                            <p className="text-sm font-medium">Çağrı başlatıldığında diyalog buraya düşecek</p>
                                        </div>
                                    )}

                                    <AnimatePresence>
                                        {activeScenario.steps.map((step, idx) => (
                                            idx <= conversationIndex && (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    className={`flex ${step.isBot ? 'justify-start' : 'justify-end'}`}
                                                >
                                                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${step.isBot
                                                        ? 'bg-blue-50 text-blue-900 border border-blue-100 rounded-tl-sm'
                                                        : 'bg-slate-800 text-white border border-slate-700 rounded-tr-sm'
                                                        }`}>
                                                        <span className="font-bold text-[10px] uppercase opacity-60 block mb-1">
                                                            {step.isBot ? 'AI Asistan' : 'Müşteri'}
                                                        </span>
                                                        <TypewriterText text={step.text} />
                                                    </div>
                                                </motion.div>
                                            )
                                        ))}

                                        {/* Typing Indication if we are between steps */}
                                        {isCalling && conversationIndex < activeScenario.steps.length - 1 && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className={`flex ${activeScenario.steps[conversationIndex + 1].isBot ? 'justify-start' : 'justify-end'} mt-2`}
                                            >
                                                <div className="bg-slate-100 px-4 py-3 rounded-2xl flex gap-1 items-center">
                                                    <motion.div className="w-2 h-2 bg-slate-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                                                    <motion.div className="w-2 h-2 bg-slate-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                                                    <motion.div className="w-2 h-2 bg-slate-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Dynamic CRM Card Pop-in */}
                                <div className="mt-auto pt-6 border-t border-slate-100 min-h-[140px]">
                                    <AnimatePresence>
                                        {showNewReservation ? (
                                            <motion.div
                                                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                                className={`bg-gradient-to-r ${activeScenario.cardInfo.bgColor} rounded-xl p-4 text-white shadow-xl ${activeScenario.cardInfo.shadowColor} relative overflow-hidden`}
                                            >
                                                <div className="absolute -right-6 -top-6 w-24 h-24 bg-white opacity-20 rounded-full"></div>

                                                <div className="flex items-center gap-3 mb-3 relative z-10">
                                                    {activeScenario.cardInfo.icon}
                                                    <h4 className="font-bold text-sm">{activeScenario.cardInfo.title}</h4>
                                                </div>

                                                <div className="grid grid-cols-2 gap-2 text-xs relative z-10">
                                                    <div className="bg-white/20 px-3 py-2 rounded-lg backdrop-blur-sm flex items-center gap-2">
                                                        {activeScenario.cardInfo.row1Item1Icon} {activeScenario.cardInfo.row1Item1}
                                                    </div>
                                                    <div className="bg-white/20 px-3 py-2 rounded-lg backdrop-blur-sm flex items-center gap-2">
                                                        {activeScenario.cardInfo.row1Item2Icon} {activeScenario.cardInfo.row1Item2}
                                                    </div>
                                                    <div className="bg-white/20 px-3 py-2 rounded-lg backdrop-blur-sm flex items-center gap-2">
                                                        {activeScenario.cardInfo.row2Item1Icon} {activeScenario.cardInfo.row2Item1}
                                                    </div>
                                                    <div className="bg-white/20 px-3 py-2 rounded-lg backdrop-blur-sm flex items-center justify-between">
                                                        <span className="opacity-75">{activeScenario.cardInfo.row2PriceLabel}</span>
                                                        <span className="font-bold">{activeScenario.cardInfo.row2Price}</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 text-slate-400 text-sm font-medium">
                                                Arama sonucuna göre sistem senkronizasyonu bekleniyor...
                                            </div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
