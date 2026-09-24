import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { KisanSetuLogo } from './KisanSetuLogo';
import {
  ShieldCheck,
  PhoneCall,
  ExternalLink,
  ChevronUp,
  FileText,
  HelpCircle,
  Building,
  Heart
} from 'lucide-react';

export const GovtFooter: React.FC = () => {
  const { tr } = useLanguage();

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-slate-900 text-slate-300 text-xs border-t border-slate-800 select-none mt-12">
      {/* Tricolor Ribbon on Top of Footer */}
      <div className="w-full flex h-[3px]">
        <div className="w-1/3 bg-[#FF9933]" />
        <div className="w-1/3 bg-[#FFFFFF]" />
        <div className="w-1/3 bg-[#138808]" />
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: Branding & Official Purpose */}
          <div className="lg:col-span-2 space-y-4">
            <KisanSetuLogo size="md" variant="dark" />
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {tr(
                'KisanSetu is a national unified agri-decision & mandi marketplace initiative connecting Indian farmers directly to verified APMC mandis, WDRA registered cold storages, and verified food processors with AI-powered quality grading and price forecasting.'
              )}
            </p>

            <div className="pt-2 flex flex-col gap-1.5 text-[11px] text-slate-400">
              <span className="font-semibold text-amber-300">
                कृषि भवन, डॉ. राजेन्द्र प्रसाद रोड, नई दिल्ली - 110001
              </span>
              <span>Krishi Bhawan, Dr. Rajendra Prasad Road, New Delhi - 110001</span>
              <span className="text-emerald-400 font-mono font-bold">
                Toll-Free Helpline: 1800-180-1551 (Kisan Call Centre)
              </span>
            </div>
          </div>

          {/* Col 3: Portal Navigation */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm font-['Outfit'] border-b border-slate-800 pb-2">
              {tr('Portal Services')}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <span className="hover:text-emerald-400 transition cursor-pointer">
                  {tr('AI Produce Quality Grading')}
                </span>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition cursor-pointer">
                  {tr('ML Mandi Price Predictor')}
                </span>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition cursor-pointer">
                  {tr('Post-Harvest Best Action Engine')}
                </span>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition cursor-pointer">
                  {tr('WDRA Cold Storage Directory')}
                </span>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition cursor-pointer">
                  {tr('Verified Corporate Buyer Connect')}
                </span>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition cursor-pointer">
                  {tr('PM-AIF Subsidy Calculator')}
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Portals & Affiliates */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm font-['Outfit'] border-b border-slate-800 pb-2">
              {tr('Govt Portals & Links')}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a
                  href="https://enam.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition flex items-center gap-1"
                >
                  <span>e-NAM (National Agri Market)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://agmarknet.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition flex items-center gap-1"
                >
                  <span>AGMARKNET (DMI Prices)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://wdra.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition flex items-center gap-1"
                >
                  <span>WDRA (Warehouse Authority)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://pmkisan.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition flex items-center gap-1"
                >
                  <span>PM-KISAN Samman Nidhi</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://agriwelfare.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition flex items-center gap-1"
                >
                  <span>Dept. of Agriculture & Farmers Welfare</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Governance & Compliance */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm font-['Outfit'] border-b border-slate-800 pb-2">
              {tr('Legal & Compliance')}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <span className="hover:text-emerald-400 transition cursor-pointer">
                  {tr('Terms & Conditions (नियम व शर्तें)')}
                </span>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition cursor-pointer">
                  {tr('Privacy Policy (गोपनीयता नीति)')}
                </span>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition cursor-pointer">
                  {tr('Copyright Policy (कॉपीराइट नीति)')}
                </span>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition cursor-pointer">
                  {tr('Hyperlink Policy (हाइपरलिंक नीति)')}
                </span>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition cursor-pointer">
                  {tr('GIGW Accessibility Compliance')}
                </span>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition cursor-pointer">
                  {tr('RTI Portal (सूचना का अधिकार)')}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Official Government of India & NIC Certification Strip */}
        <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            {/* Digital India and NIC Badge representation */}
            <div className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 font-bold text-[10px] tracking-wider uppercase">
              🇮🇳 Digital India
            </div>
            <div className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 font-bold text-[10px] tracking-wider uppercase">
              NIC Interoperable
            </div>
            <span>
              Designed, Developed and Hosted for the Indian Farming Community.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">
              {tr('Portal Version')}: <strong className="text-emerald-400 font-mono">v4.2.0</strong> (2026 Release)
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer flex items-center gap-1 font-semibold"
              title="Back to Top"
            >
              <span>{tr('Top')}</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Humanized Dedication Line */}
        <div className="text-center text-[11px] text-slate-400 pt-2 border-t border-slate-800/60 flex items-center justify-center gap-1.5">
          <span>समर्पित भारत के अन्नदाता किसानों को • Dedicated with deep respect to India's farming families</span>
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
        </div>
      </div>
    </footer>
  );
};
