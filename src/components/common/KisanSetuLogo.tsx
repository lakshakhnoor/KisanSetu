import React from 'react';

interface KisanSetuLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'light' | 'dark' | 'emblem-only';
}

export const KisanSetuLogo: React.FC<KisanSetuLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  variant = 'light'
}) => {
  const pixelSizes = {
    sm: 36,
    md: 48,
    lg: 64,
    xl: 80
  };

  const dim = pixelSizes[size] || 48;

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Handcrafted Ultra-Realistic Vector Emblem */}
      <div
        className="relative shrink-0 flex items-center justify-center rounded-2xl shadow-sm transition-transform hover:scale-105"
        style={{ width: dim, height: dim }}
      >
        <svg
          viewBox="0 0 120 120"
          width={dim}
          height={dim}
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Outer Gold Gradient */}
            <linearGradient id="goldRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="35%" stopColor="#fbbf24" />
              <stop offset="70%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>

            {/* Inner Sky / Dawn Gradient */}
            <linearGradient id="skyDawnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ecfdf5" />
              <stop offset="45%" stopColor="#dcfce7" />
              <stop offset="80%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#fed7aa" />
            </linearGradient>

            {/* Golden Sun Gradient */}
            <radialGradient id="sunRadialGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </radialGradient>

            {/* Fertile Soil Gradient */}
            <linearGradient id="soilFurrowsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#15803d" />
              <stop offset="40%" stopColor="#166534" />
              <stop offset="100%" stopColor="#14532d" />
            </linearGradient>

            {/* Bridge Stone Gradient */}
            <linearGradient id="bridgeStoneGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#047857" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#065f46" />
            </linearGradient>

            {/* Sprout Fresh Emerald Gradient */}
            <linearGradient id="sproutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="50%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>

            {/* Wheat Ear Gold Gradient */}
            <linearGradient id="wheatGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
          </defs>

          {/* Outer Ornamental Seal Ring */}
          <circle cx="60" cy="60" r="57" fill="#ffffff" stroke="url(#goldRingGrad)" strokeWidth="3.5" />
          <circle cx="60" cy="60" r="53" fill="url(#skyDawnGrad)" stroke="#15803d" strokeWidth="1" strokeDasharray="1.5 2.5" />

          {/* Rising Dawn Sun Rays */}
          <g opacity="0.6">
            <line x1="60" y1="42" x2="60" y2="28" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="48" y1="45" x2="40" y2="34" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="72" y1="45" x2="80" y2="34" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="39" y1="52" x2="28" y2="45" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="81" y1="52" x2="92" y2="45" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Golden Sun Disk */}
          <circle cx="60" cy="52" r="14" fill="url(#sunRadialGrad)" />

          {/* Fertile Soil Furrows (Ground Base) */}
          <path
            d="M16 88 C 30 76, 50 78, 60 78 C 70 78, 90 76, 104 88 C 100 102, 85 110, 60 111 C 35 110, 20 102, 16 88 Z"
            fill="url(#soilFurrowsGrad)"
          />

          {/* Soil Contour Lines */}
          <path d="M22 93 Q 60 84 98 93" stroke="#86efac" strokeWidth="0.8" opacity="0.5" fill="none" />
          <path d="M28 99 Q 60 91 92 99" stroke="#86efac" strokeWidth="0.8" opacity="0.4" fill="none" />
          <path d="M36 104 Q 60 97 84 104" stroke="#86efac" strokeWidth="0.8" opacity="0.3" fill="none" />

          {/* Sturdy Arched Stone Bridge ("SETU") */}
          <g>
            {/* Bridge Outer Arch */}
            <path
              d="M24 88 Q 60 66 96 88 L 100 92 Q 60 70 20 92 Z"
              fill="url(#bridgeStoneGrad)"
            />
            {/* Keystone and Arch Spans */}
            <path d="M60 67 L 60 74" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M48 70 L 49 76" stroke="#a7f3d0" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
            <path d="M72 70 L 71 76" stroke="#a7f3d0" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
            <path d="M37 75 L 39 80" stroke="#a7f3d0" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
            <path d="M83 75 L 81 80" stroke="#a7f3d0" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          </g>

          {/* Center Agricultural Twin Sprout ("KISAN") */}
          <g>
            {/* Sprout Stem */}
            <path
              d="M60 82 C 60 68, 59 55, 60 46"
              stroke="#15803d"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Left Leaf */}
            <path
              d="M59 56 C 47 52, 42 62, 58 64 C 59 62, 59 59, 59 56 Z"
              fill="url(#sproutGrad)"
              stroke="#166534"
              strokeWidth="0.8"
            />
            {/* Right Leaf (Higher & Tilted) */}
            <path
              d="M61 48 C 73 43, 79 53, 62 57 C 61 54, 61 51, 61 48 Z"
              fill="url(#sproutGrad)"
              stroke="#166534"
              strokeWidth="0.8"
            />
            {/* Center Shoot Bud */}
            <path
              d="M60 46 C 58 40, 62 40, 60 36 C 58 40, 62 40, 60 46 Z"
              fill="#86efac"
            />
          </g>

          {/* Left Golden Wheat Ear (Handcrafted Spikes) */}
          <g fill="url(#wheatGoldGrad)" stroke="#a16207" strokeWidth="0.5">
            <ellipse cx="19" cy="48" rx="4.5" ry="2.5" transform="rotate(-35 19 48)" />
            <ellipse cx="21" cy="56" rx="4.5" ry="2.5" transform="rotate(-25 21 56)" />
            <ellipse cx="23" cy="65" rx="4.5" ry="2.5" transform="rotate(-15 23 65)" />
            <ellipse cx="27" cy="74" rx="4.5" ry="2.5" transform="rotate(-5 27 74)" />
            {/* Wheat Awns (Fine Beards) */}
            <path d="M19 46 Q 14 36 10 32" stroke="#ca8a04" strokeWidth="0.8" fill="none" />
            <path d="M21 54 Q 15 46 12 40" stroke="#ca8a04" strokeWidth="0.8" fill="none" />
            <path d="M23 63 Q 17 56 14 50" stroke="#ca8a04" strokeWidth="0.8" fill="none" />
          </g>

          {/* Right Golden Wheat Ear (Handcrafted Spikes) */}
          <g fill="url(#wheatGoldGrad)" stroke="#a16207" strokeWidth="0.5">
            <ellipse cx="101" cy="48" rx="4.5" ry="2.5" transform="rotate(35 101 48)" />
            <ellipse cx="99" cy="56" rx="4.5" ry="2.5" transform="rotate(25 99 56)" />
            <ellipse cx="97" cy="65" rx="4.5" ry="2.5" transform="rotate(15 97 65)" />
            <ellipse cx="93" cy="74" rx="4.5" ry="2.5" transform="rotate(5 93 74)" />
            {/* Wheat Awns (Fine Beards) */}
            <path d="M101 46 Q 106 36 110 32" stroke="#ca8a04" strokeWidth="0.8" fill="none" />
            <path d="M99 54 Q 105 46 108 40" stroke="#ca8a04" strokeWidth="0.8" fill="none" />
            <path d="M97 63 Q 103 56 106 50" stroke="#ca8a04" strokeWidth="0.8" fill="none" />
          </g>

          {/* National Tricolor Micro Star Crest at Top */}
          <circle cx="60" cy="11" r="3" fill="#ffffff" stroke="#d97706" strokeWidth="0.8" />
          <circle cx="60" cy="11" r="1.5" fill="#138808" />
        </svg>
      </div>

      {/* Bilingual Dignified Typography */}
      {showText && (
        <div className="flex flex-col justify-center leading-tight">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight font-['Outfit'] ${
                variant === 'dark' ? 'text-white' : 'text-slate-900'
              } ${size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl'}`}
            >
              KISAN<span className="text-emerald-700">SETU</span>
            </span>
            <span className="text-[11px] font-bold text-amber-700 font-hindi px-1.5 py-0.2 bg-amber-50 border border-amber-200 rounded">
              किसान सेतु
            </span>
          </div>

          <span
            className={`text-[10px] tracking-wide font-medium flex items-center gap-1 ${
              variant === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            <span>राष्ट्रीय कृषि बाजार एवं तुड़ाई-उपरांत मंच</span>
            <span className="text-slate-300">•</span>
            <span className="text-emerald-800 font-semibold">Govt. Collaborative</span>
          </span>
        </div>
      )}
    </div>
  );
};
