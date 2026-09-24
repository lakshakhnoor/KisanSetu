import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Role } from '../../types';
import { KisanSetuLogo } from '../common/KisanSetuLogo';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Shield, X } from 'lucide-react';

interface RoleSelectionModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  currentRole?: Role | null;
  onSelectRole?: (role: Role) => void;
}

export const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({
  onClose,
  onSelectRole
}) => {
  const { selectRole, user } = useAuth();
  const { t, tr } = useLanguage();

  const handleChoose = (role: Role) => {
    selectRole(role);
    if (onSelectRole) {
      onSelectRole(role);
    }
    if (onClose) {
      onClose();
    }
  };

  const roles: {
    id: Role;
    icon: string;
    title: string;
    subtitle: string;
    description: string;
    badge: string;
    borderColor: string;
    accentText: string;
  }[] = [
    {
      id: 'farmer',
      icon: '👨‍🌾',
      title: tr('KISAN / FARMER'),
      subtitle: tr('FARMER'),
      description: tr(
        'AI Produce Grading, AGMARKNET/e-NAM Market Price Intelligence, Best Action Advisory (Sell / Store / Process), Nearby Cold Storage, and Verified Direct Buyers.'
      ),
      badge: tr('Primary Post-Harvest Suite'),
      borderColor: 'hover:border-emerald-600',
      accentText: 'text-emerald-800'
    },
    {
      id: 'fpo',
      icon: '🌾',
      title: tr('FPO LEAD'),
      subtitle: tr('PRODUCER ORGANIZATION'),
      description: tr(
        'Aggregate farm harvest across 120+ member farmers, form standardized bulk lots, negotiate premium corporate contracts, and manage collective storage.'
      ),
      badge: tr('Bulk Aggregation & Scale'),
      borderColor: 'hover:border-amber-600',
      accentText: 'text-amber-800'
    },
    {
      id: 'trader',
      icon: '🏪',
      title: tr('MANDI TRADER'),
      subtitle: tr('COMMISSION AGENT & BUYER'),
      description: tr(
        'Discover AI-graded farm lots in real-time, broadcast specific commodity demand, secure guaranteed quality specifications, and execute e-NAM compliant digital trades.'
      ),
      badge: tr('B2B Trade & Sourcing'),
      borderColor: 'hover:border-sky-600',
      accentText: 'text-sky-800'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs overflow-y-auto select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-4xl rounded-2xl p-6 sm:p-10 bg-white border border-slate-200 shadow-xl text-slate-900 relative"
      >
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 hover:text-slate-900 transition cursor-pointer"
            title={tr("Close")}
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="text-center mb-8 flex flex-col items-center">
          <div className="mb-3">
            <KisanSetuLogo size="sm" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>{tr("Authenticated")}: {user?.name || tr("Verified")}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] tracking-tight text-slate-900">
            {t.chooseRole}
          </h2>

          <p className="text-slate-500 text-sm mt-2 max-w-xl mx-auto">
            {tr("Choose your post-harvest operational mode. Your workspace, AI tools, and market feeds will be tailored for your role.")}
          </p>
        </div>

        {/* 3 LARGE ROLE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {roles.map((r) => (
            <motion.button
              key={r.id}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleChoose(r.id)}
              className={`text-left rounded-2xl p-6 bg-white hover:bg-slate-50/80 border border-slate-200 ${r.borderColor} transition-all cursor-pointer flex flex-col justify-between group shadow-xs relative overflow-hidden`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl p-2.5 rounded-xl bg-slate-50 border border-slate-200 group-hover:scale-105 transition-transform">
                    {r.icon}
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 uppercase tracking-wider">
                    {r.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-slate-900">
                  {r.title}
                </h3>
                <h4 className={`text-xs font-semibold ${r.accentText} tracking-wider mb-2`}>
                  {r.subtitle}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {r.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-emerald-800">
                <span>{tr("Enter Portal")}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* ADMIN OPTION TOGGLE */}
        <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>{tr("Need system-level telemetry and AGMARKNET sync metrics?")}</span>
          <button
            type="button"
            onClick={() => handleChoose('admin')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 hover:text-slate-900 transition cursor-pointer font-medium"
          >
            <Shield className="w-3.5 h-3.5 text-slate-600" />
            <span>{tr("Open Admin & System Monitor")}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
