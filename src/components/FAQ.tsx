"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQ() {
    const faqs = [
        {
            question: "Sistem mevcut CRM/ERP altyapımıza nasıl entegre oluyor?",
            answer: "API tabanlı mimarimiz sayesinde Salesforce, HubSpot, SAP, Zendesk ve diğer tüm modern CRM/ERP sistemleriyle sorunsuz entegrasyon sağlıyoruz. Webhook'lar ve REST API'miz ile verileriniz saniyeler içinde senkronize edilir.",
        },
        {
            question: "Müşteriler robotla konuştuklarını anlar mı?",
            answer: "Callinte AI, 200 milisaniyenin altındaki tepki süresi, doğal duraksamaları (mmm, hıhı gibi), nefes alma sesleri ve duygu durumuna göre değişen ses tonuyla gerçeğe en yakın sesli iletişim deneyimini sunar. Çoğu kullanıcı bir yapay zeka ile konuştuğunu fark etmez.",
        },
        {
            question: "Hangi dilleri destekliyorsunuz?",
            answer: "Şu anda Türkçe, İngilizce, Almanca, Fransızca, İspanyolca, Rusça ve Arapça başta olmak üzere 30'dan fazla dilde ve 100'ün üzerinde farklı şive/aksan türünde native (anadil) seviyesinde hizmet verebilmekteyiz.",
        },
        {
            question: "Veri güvenliği ve gizliliği nasıl sağlanıyor?",
            answer: "Tüm sistemlerimiz ISO 27001 ve GDPR/KVKK standartlarıyla tam uyumludur. Müşteri ses kayıtları ve metin verileri end-to-end (uçtan uca) şifrelenerek saklanır, onayınız olmadan hiçbir veriniz yapay zeka model eğitiminde kullanılmaz.",
        },
        {
            question: "Kurulum süreci ne kadar sürüyor?",
            answer: "Standart bir senaryo ve bilgi tabanı eğitimi ortalama 2-3 iş günü içinde tamamlanarak sistem test ortamınıza sunulur. Özel CRM entegrasyonları gerektiren karmaşık yapılarda bu süre maksimum 1 haftayı bulabilmektedir.",
        },
        {
            question: "Sistemin birden fazla çağrı geldiğinde kapasite sorunu olur mu?",
            answer: "Hayır. Geleneksel çağrı merkezlerinin aksine sistemimiz bulut tabanlıdır ve anında ölçeklenebilir. İster aynı anda 10 çağrı, ister 10.000 çağrı gelsin, hiçbir müşteriniz bekleme müziği dinlemeden anında yanıt alır.",
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleOpen = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-24 bg-slate-50 relative border-t border-slate-200">
            <div className="container px-4 md:px-6 mx-auto max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
                        Sıkça Sorulan Sorular
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Callinte AI hakkında aklınıza takılan tüm detaylar için hızlı yanıtlar.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={index}
                                className={`border rounded-2xl overflow-hidden transition-colors ${isOpen ? 'bg-white border-blue-200 shadow-sm' : 'bg-white/60 border-slate-200 hover:bg-white'}`}
                            >
                                <button
                                    onClick={() => toggleOpen(index)}
                                    className="flex w-full items-center justify-between p-6 text-left"
                                >
                                    <span className="font-semibold text-slate-900 pr-8">{faq.question}</span>
                                    <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-colors ${isOpen ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                                    </span>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-6 pt-0 text-slate-600 leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-slate-600 mb-4">
                        Aradığınız cevabı bulamadınız mı?
                    </p>
                    <button
                        onClick={() => window.dispatchEvent(new Event("open-contact-modal"))}
                        className="inline-flex items-center justify-center h-11 px-8 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors"
                    >
                        Bizimle İletişime Geçin
                    </button>
                </div>
            </div>
        </section>
    );
}
