import { Hero } from "@/components/Hero";
import { ProductShowcase } from "@/components/ProductShowcase";
import { ProblemSolution } from "@/components/ProblemSolution";
import { CoreModules } from "@/components/CoreModules";
import { GlobalReach } from "@/components/GlobalReach";
import { Comparison } from "@/components/Comparison";
import { Pricing } from "@/components/Pricing";
import { ROICalculator } from "@/components/ROICalculator";
import { TrustInfrastructure } from "@/components/TrustInfrastructure";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { ContactModal } from "@/components/ContactModal";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full overflow-x-hidden">
      <ContactModal />
      <Hero />
      <ProductShowcase />
      <ProblemSolution />
      <CoreModules />
      <GlobalReach />
      <Comparison />
      <Pricing />
      <ROICalculator />
      <FAQ />
      <TrustInfrastructure />
      <Footer />
    </main>
  );
}
