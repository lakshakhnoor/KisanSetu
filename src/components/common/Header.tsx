import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { INDIAN_STATES } from '../../data/locations';
import { KisanSetuLogo } from './KisanSetuLogo';
import {
  LogOut,
  Mic,
  MapPin,
  Languages,
  Shield,
  Sparkles,
  Users,
  Store,
  Sprout,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  onOpenVoiceModal: () => void;
  onOpenRoleModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenVoiceModal, onOpenRoleModal }) => {
  const { user, role, logout, updateLocation } = useAuth();
  const { currentLanguage, setLanguage, availableLanguages, currentLangInfo, t, tr } = useLanguage();

  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showLocationMenu, setShowLocationMenu] = useState(false);

  const currentState = INDIAN_STATES.find(s => s.name === user?.state) || INDIAN_STATES[12]; // Default Maharashtra
  const currentDistrict = user?.district || currentState.districts[0]?.name || 'Nashik';

  const roleLabels = {
    farmer: { title: tr('KISAN / FARMER'), icon: '👨‍🌾', color: 'bg-emerald-50 text-emerald-800 border-emerald-300' },
    fpo: { title: tr('FPO LEAD'), icon: '🌾', color: 'bg-amber-50 text-amber-800 border-amber-300' },
    trader: { title: tr('MANDI TRADER'), icon: '🏪', color: 'bg-sky-50 text-sky-800 border-sky-300' },
    admin: { title: tr('SYSTEM ADMIN'), icon: '🛡️', color: 'bg-purple-50 text-purple-800 border-purple-300' }
  };

  const currentRoleBadge = roleLabels[role || 'farmer'];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-900 select-none shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* BRAND & OFFICIAL LOGO */}
        <div className="flex items-center gap-3">
          <KisanSetuLogo size="md" />

          <button
            onClick={onOpenRoleModal}
            className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition cursor-pointer shadow-2xs ${currentRoleBadge.color}`}
            title={tr("Click to Switch Role")}
          >
            <span>{currentRoleBadge.icon}</span>
            <span>{currentRoleBadge.title}</span>
            <ChevronDown className="w-3 h-3 ml-0.5" />
          </button>
        </div>

        {/* RIGHT CONTROLS: Location, Language, Voice, Logout */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* LOCATION SELECTOR */}
          <div className="relative">
            <button
              onClick={() => {
                setShowLocationMenu(!showLocationMenu);
                setShowLangMenu(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs text-slate-700 transition cursor-pointer font-medium"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span className="font-semibold">{currentDistrict}, {currentState.code}</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {showLocationMenu && (
              <div className="absolute right-0 mt-2 w-72 max-h-80 overflow-y-auto rounded-2xl bg-white border border-slate-200 p-2 shadow-xl z-50">
                <div className="px-2 py-1 text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                  {t.selectStateDistrict}
                </div>
                {INDIAN_STATES.slice(0, 15).map((state) => (
                  <div key={state.code} className="mb-2">
                    <div className="px-2 py-0.5 text-[10px] font-bold text-slate-400 uppercase">
                      {state.name}
                    </div>
                    {state.districts.map((d) => (
                      <button
                        key={d.name}
                        onClick={() => {
                          updateLocation(state.name, d.name);
                          setShowLocationMenu(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition cursor-pointer flex items-center justify-between ${
                          currentDistrict === d.name && currentState.name === state.name
                            ? 'bg-emerald-700 text-white font-bold'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{d.name}</span>
                        <span className="text-[10px] opacity-70">
                          {d.majorMandis[0]?.split(' ')[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 22 SCHEDULED LANGUAGES PICKER */}
          <div className="relative">
            <button
              onClick={() => {
                setShowLangMenu(!showLangMenu);
                setShowLocationMenu(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs text-slate-700 transition cursor-pointer font-medium"
              title={t.changeLanguage}
            >
              <Languages className="w-3.5 h-3.5 text-emerald-700" />
              <span className="font-semibold">{currentLangInfo.nativeName}</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-64 max-h-80 overflow-y-auto rounded-2xl bg-white border border-slate-200 p-2 shadow-xl z-50">
                <div className="px-2 py-1 text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                  22 Scheduled Indian Languages
                </div>
                {availableLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition cursor-pointer flex items-center justify-between ${
                      currentLanguage === lang.code
                        ? 'bg-emerald-700 text-white font-bold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{lang.name}</span>
                    <span className="text-xs opacity-70">{lang.nativeName}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* VOICE ASSISTANT BUTTON */}
          <button
            onClick={onOpenVoiceModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-xs transition cursor-pointer"
          >
            <Mic className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{tr(t.askKisanSetuHeader || 'Ask KisanSetu')}</span>
          </button>

          {/* USER PROFILE BADGE WITH ENTERED NAME */}
          <div
            className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-100 border border-slate-200"
            title={`${tr('Logged in as')} ${user?.name || 'Kisan Mitra'}`}
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-900 border border-emerald-200 flex items-center justify-center text-xs font-black">
              {user?.name ? user.name.trim().charAt(0).toUpperCase() : 'K'}
            </div>
            <div className="text-left hidden sm:block">
              <span className="text-xs font-bold text-slate-800 block max-w-[130px] truncate leading-tight">
                {user?.name || 'Kisan Mitra'}
              </span>
              <span className="text-[10px] text-emerald-700 font-medium block leading-tight">
                {user?.mobile || tr('Verified')}
              </span>
            </div>
          </div>

          {/* LOGOUT */}
          <button
            onClick={logout}
            className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 transition cursor-pointer"
            title={tr("Logout")}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
