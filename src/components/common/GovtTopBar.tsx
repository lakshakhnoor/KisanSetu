import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  PhoneCall,
  Languages,
  Eye,
  Volume2,
  ChevronDown,
  ShieldCheck,
  Check
} from 'lucide-react';

export const GovtTopBar: React.FC = () => {
  const { currentLanguage, setLanguage, availableLanguages, currentLangInfo, tr } = useLanguage();
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'larger'>('normal');
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [showLangDropdown, setShowLangDropdown] = useState<boolean>(false);

  // Apply font size adjustment to document root
  const handleFontSizeChange = (level: 'normal' | 'large' | 'larger') => {
    setFontSizeLevel(level);
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (level === 'large') {
        root.style.fontSize = '17px';
      } else if (level === 'larger') {
        root.style.fontSize = '18.5px';
      } else {
        root.style.fontSize = '16px';
      }
    }
  };

  // Apply high-contrast class to document body
  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('high-contrast-mode');
    }
  };

  return (
    <div className="w-full bg-slate-900 text-slate-200 text-xs border-b border-slate-800 select-none">
      {/* Micro Government Masthead Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex flex-col md:flex-row md:items-center justify-between gap-2">
        {/* Left: Official Government of India & Ministry Identification */}
        <div className="flex items-center gap-3">
          {/* Ashoka Stambh / State Emblem Silhouette */}
          <div className="flex items-center gap-2 shrink-0">
            <svg
              viewBox="0 0 24 32"
              width="16"
              height="22"
              fill="#fbbf24"
              className="shrink-0 drop-shadow-xs"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Government of India Emblem"
            >
              {/* Simplified Ashoka Lion Capital Vector Crest */}
              <path d="M12 2 C9 2, 7 4, 7 7 C7 8.5, 7.8 9.8, 9 10.5 C8.2 11.2, 7.5 12.2, 7.5 13.5 C7.5 15.5, 9.5 17, 12 17 C14.5 17, 16.5 15.5, 16.5 13.5 C16.5 12.2, 15.8 11.2, 15 10.5 C16.2 9.8, 17 8.5, 17 7 C17 4, 15 2, 12 2 Z" opacity="0.95" />
              <rect x="6" y="18" width="12" height="3" rx="1" fill="#f59e0b" />
              <circle cx="12" cy="19.5" r="1.2" fill="#ffffff" />
              <path d="M4 22 C4 21.5, 20 21.5, 20 22 L 22 28 C 22 29, 2 29, 2 28 Z" fill="#d97706" />
              <rect x="5" y="29" width="14" height="2" rx="0.5" fill="#fef08a" />
            </svg>

            <div className="flex flex-col leading-tight">
              <span className="font-hindi text-[11px] text-amber-300 font-semibold tracking-wide">
                भारत सरकार | <span className="font-sans text-[10px] text-slate-300 font-normal">GOVERNMENT OF INDIA</span>
              </span>
              <span className="text-[10px] text-slate-400">
                कृषि एवं किसान कल्याण मंत्रालय | Ministry of Agriculture & Farmers Welfare
              </span>
            </div>
          </div>

          <span className="hidden lg:inline text-slate-600">|</span>

          {/* e-NAM & AGMARKNET Verification Tag */}
          <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/50 text-[10px] text-emerald-300">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>e-NAM & AGMARKNET Interoperable Gateway</span>
          </div>
        </div>

        {/* Right: Accessibility Toolbar, Toll-Free Helpline & Instant Language Switcher */}
        <div className="flex items-center flex-wrap justify-between md:justify-end gap-3 text-[11px]">
          {/* Kisan Call Centre Toll Free */}
          <a
            href="tel:18001801551"
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition font-medium"
            title="Kisan Call Centre Toll Free 1800-180-1551 (6 AM to 10 PM IST)"
          >
            <PhoneCall className="w-3 h-3" />
            <span className="hidden sm:inline text-slate-400">किसान हेल्प / Help:</span>
            <span className="font-bold font-mono tracking-wider text-emerald-300">1800-180-1551</span>
          </a>

          <span className="text-slate-700">|</span>

          {/* Accessibility Font Size Buttons */}
          <div className="flex items-center gap-1 bg-slate-800/90 px-1.5 py-0.5 rounded-md border border-slate-700">
            <button
              onClick={() => handleFontSizeChange('normal')}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                fontSizeLevel === 'normal' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Standard Font Size"
            >
              A-
            </button>
            <button
              onClick={() => handleFontSizeChange('large')}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                fontSizeLevel === 'large' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Medium Font Size"
            >
              A
            </button>
            <button
              onClick={() => handleFontSizeChange('larger')}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                fontSizeLevel === 'larger' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Large Font Size"
            >
              A+
            </button>
          </div>

          {/* High Contrast Mode Toggle */}
          <button
            onClick={toggleHighContrast}
            className={`p-1 rounded-md transition cursor-pointer flex items-center gap-1 text-[10px] ${
              highContrast ? 'bg-amber-400 text-slate-900 font-bold' : 'text-slate-400 hover:text-white'
            }`}
            title="Toggle High Contrast for Visual Accessibility"
          >
            <Eye className="w-3 h-3" />
            <span className="hidden xl:inline">{highContrast ? 'Standard' : 'Contrast'}</span>
          </button>

          <span className="text-slate-700">|</span>

          {/* Quick Indic Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-200 text-[11px] font-medium transition cursor-pointer"
            >
              <Languages className="w-3 h-3 text-emerald-400" />
              <span className="font-semibold">{currentLangInfo.nativeName}</span>
              <span className="text-[10px] text-emerald-400">({currentLangInfo.code.toUpperCase()})</span>
              <ChevronDown className="w-2.5 h-2.5 text-emerald-400" />
            </button>

            {showLangDropdown && (
              <div className="absolute right-0 mt-1.5 w-60 max-h-80 overflow-y-auto rounded-xl bg-slate-900 border border-slate-700 p-1.5 shadow-2xl z-50 divide-y divide-slate-800">
                <div className="px-2 py-1 text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                  22 भारतीय राजभाषाएं / 22 Official Languages
                </div>
                <div className="py-1 space-y-0.5">
                  {availableLanguages.map((lang) => {
                    const isSelected = lang.code === currentLanguage;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setShowLangDropdown(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-xs transition cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-600 text-white font-bold'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <div className="flex flex-col leading-tight">
                          <span className="font-semibold">{lang.nativeName}</span>
                          <span className="text-[10px] opacity-75">{lang.name}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Official National Tricolor Ribbon (Saffron, White, Green) */}
      <div className="w-full flex h-[3px]">
        <div className="w-1/3 bg-[#FF9933]" />
        <div className="w-1/3 bg-[#FFFFFF]" />
        <div className="w-1/3 bg-[#138808]" />
      </div>
    </div>
  );
};
