import { AdapterLogicSection } from "@/components/sections/adapter-logic-section";
import { CleanApiSection } from "@/components/sections/clean-api-section";
import { LegacyApiSection } from "@/components/sections/legacy-api-section";
import { ArrowRight, CheckCircle, ZapIcon } from "lucide-react";

const DemoPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-gray-200">
      {/* --- Header --- */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                <ZapIcon size="16" />
              </span>
            </div>
            <span className="font-semibold tracking-tight">
              PMS Adapter Demo
            </span>
          </div>
          {/* <nav className="flex gap-6 text-sm font-medium text-gray-500">
            <span className="text-black cursor-pointer">Overview</span>
            <span className="hover:text-black cursor-pointer transition-colors">
              Documentation
            </span>
            <span className="hover:text-black cursor-pointer transition-colors">
              GitHub
            </span>
          </nav> */}
        </div>
      </header>

      {/* --- Hero Section --- */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs font-medium text-gray-600 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            System Status: Operational
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600">
            Universal PMS Adapter
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
            Ingest "messy" data from legacy sources and transform it into a
            clean, standardized API response. The middleware layer that brings
            order to legacy chaos.
          </p>
        </div>

        {/* --- Section 1: The Problem (Legacy Source) --- */}
        <LegacyApiSection />

        {/* --- Transition Arrow --- */}
        <div className="flex justify-center mb-24">
          <div className="flex flex-col items-center gap-2">
            <div className="h-12 w-px bg-linear-to-b from-gray-200 to-gray-400"></div>
            <div className="p-2 rounded-full border border-gray-300 bg-white shadow-sm">
              <ArrowRight className="w-4 h-4 text-gray-600 rotate-90" />
            </div>
          </div>
        </div>

        {/* --- Section 2: The Adapter Logic --- */}
        <AdapterLogicSection />

        {/* --- Transition Arrow --- */}
        <div className="flex justify-center mb-24">
          <div className="flex flex-col items-center gap-2">
            <div className="h-12 w-px bg-linear-to-b from-gray-400 to-green-500"></div>
            <div className="p-2 rounded-full border border-green-200 bg-green-50 shadow-sm">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
          </div>
        </div>

        {/* --- Section 3: The Clean API (Result) --- */}
        <CleanApiSection />
      </main>

      {/* --- Footer --- */}
      <footer className="bg-white border-t border-gray-200 py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>PMS Adapter Demo</p>
          {/* <div className="flex gap-6">
            <span className="hover:text-black cursor-pointer">Privacy</span>
            <span className="hover:text-black cursor-pointer">Terms</span>
            <span className="hover:text-black cursor-pointer">Contact</span>
          </div> */}
        </div>
      </footer>
    </div>
  );
};

export default DemoPage;
