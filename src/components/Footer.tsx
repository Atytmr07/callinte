export function Footer() {
    return (
        <footer className="bg-white py-12 border-t border-slate-100">
            <div className="container px-4 md:px-6 mx-auto max-w-5xl">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <img src="/callinte-logo.jpeg" alt="Callinte Logo" className="h-8 w-auto object-contain mix-blend-darken mx-auto md:mx-0" />
                        <p className="text-sm text-slate-500 mt-2">© 2026 Callinte. Tüm hakları saklıdır.</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600">
                        <a href="mailto:info@callinte.com" className="hover:text-blue-600 transition-colors">
                            info@callinte.com
                        </a>
                        <span className="hidden sm:inline text-slate-300">|</span>
                        <span>Antalya, Türkiye</span>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100 flex justify-center gap-8 text-sm text-slate-500">
                    <a href="#" className="hover:text-slate-900 transition-colors">
                        Gizlilik Politikası
                    </a>
                    <a href="#" className="hover:text-slate-900 transition-colors">
                        Kullanım Koşulları
                    </a>
                </div>
            </div>
        </footer>
    );
}
