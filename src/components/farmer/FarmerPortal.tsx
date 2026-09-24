import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { QualityAnalysisResult, BuyerRequirement } from '../../types';
import { AiGradingView } from './AiGradingView';
import { MarketPricesView } from './MarketPricesView';
import { PricePredictionGraph } from './PricePredictionGraph';
import { BestActionView } from './BestActionView';
import { StorageLocatorView } from './StorageLocatorView';
import { BuyerMatchingView } from './BuyerMatchingView';
import { GovernmentSchemesView } from './GovernmentSchemesView';
import { TransactionsView } from './TransactionsView';
import { FarmerCommunityTrust } from '../common/FarmerCommunityTrust';
import {
  Camera,
  TrendingUp,
  Target,
  Warehouse,
  Users,
  Landmark,
  FileCheck,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  History,
  LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type FarmerTab =
  | 'overview'
  | 'grading'
  | 'market'
  | 'best-action'
  | 'storage'
  | 'buyers'
  | 'schemes'
  | 'transactions';

interface FarmerPortalProps {
  initialTab?: FarmerTab;
  currentTab?: FarmerTab;
  onTabChange?: (tab: FarmerTab) => void;
}

export const FarmerPortal: React.FC<FarmerPortalProps> = ({
  initialTab = 'overview',
  currentTab,
  onTabChange
}) => {
  const { user } = useAuth();
  const { t, tr } = useLanguage();

  const [internalTab, setInternalTab] = useState<FarmerTab>(initialTab);
  const activeTab = currentTab !== undefined ? currentTab : internalTab;

  const setActiveTab = (tab: FarmerTab) => {
    setInternalTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  const [lastGradingResult, setLastGradingResult] = useState<QualityAnalysisResult | null>(null);

  const handleGradingDone = (result: QualityAnalysisResult) => {
    setLastGradingResult(result);
  };

  const handleProceedToBestAction = (result: QualityAnalysisResult) => {
    setLastGradingResult(result);
    setActiveTab('best-action');
  };

  const tabs: { id: FarmerTab; label: string; icon: any }[] = [
    { id: 'overview', label: tr(t.tabDashboard || 'Dashboard'), icon: LayoutDashboard },
    { id: 'grading', label: tr(t.tabGrading || 'AI Quality Grading'), icon: Camera },
    { id: 'market', label: tr(t.tabMarket || 'Price Prediction & Mandis'), icon: TrendingUp },
    { id: 'best-action', label: tr(t.tabBestAction || 'Best Action Engine'), icon: Target },
    { id: 'storage', label: tr(t.tabStorage || 'Storage Locator'), icon: Warehouse },
    { id: 'buyers', label: tr(t.tabBuyers || 'Find Buyers'), icon: Users },
    { id: 'schemes', label: tr(t.tabSchemes || 'Govt Schemes'), icon: Landmark },
    { id: 'transactions', label: tr(t.tabTransactions || 'Digital Mandi Passes'), icon: FileCheck }
  ];

  return (
    <div className="space-y-6">
      {/* Navigation Sub-bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200 select-none bg-white p-1.5 rounded-2xl shadow-xs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                isActive
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW DASHBOARD */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Welcome Banner */}
          <div className="rounded-2xl p-6 sm:p-8 bg-white border border-slate-200 shadow-xs relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>{t.harvestDecisionActive || 'Harvest Decision Assistant Active'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black font-['Outfit'] tracking-tight text-slate-900">
                {t.goodMorning}, {user?.name || 'Kisan Mitra'}!
              </h1>

              <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                {t.howCanHelp} Your harvest quality directly drives your recommended decision: whether to sell immediately to top buyers, store in nearby cold storage for peak prices, or process.
              </p>

              {/* PRIMARY CTA: ANALYZE MY PRODUCE */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab('grading')}
                  className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm tracking-wide transition shadow-xs flex items-center gap-2.5 cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>{t.analyzeProduce}</span>
                </button>

                <button
                  onClick={() => setActiveTab('market')}
                  className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <TrendingUp className="w-4 h-4 text-emerald-700" />
                  <span>{t.viewMandiPrices || 'View Mandi Prices (AGMARKNET)'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl p-4 bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block mb-1">
                {tr("Today's Benchmark Mandi Price")}
              </span>
              <div className="text-2xl font-black text-slate-900 font-['Outfit']">
                ₹2,850<span className="text-xs text-slate-500 font-normal"> / Q</span>
              </div>
              <span className="text-[11px] text-emerald-700 font-semibold mt-1 inline-flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +4.8% at {tr("Pimpalgaon Mandi")}
              </span>
            </div>

            <div className="rounded-2xl p-4 bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block mb-1">
                {tr("Available Nearby Storage")}
              </span>
              <div className="text-2xl font-black text-slate-900 font-['Outfit']">
                12,400<span className="text-xs text-slate-500 font-normal"> Q {tr("Space")}</span>
              </div>
              <span className="text-[11px] text-sky-700 font-semibold mt-1 block">
                MahaAgro Cold Chain (8.5 km)
              </span>
            </div>

            <div className="rounded-2xl p-4 bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block mb-1">
                {tr("Matching Verified Buyers")}
              </span>
              <div className="text-2xl font-black text-slate-900 font-['Outfit']">
                6<span className="text-xs text-slate-500 font-normal"> {tr("In Your District")}</span>
              </div>
              <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
                {tr("Top Offer")}: ₹3,150 / Qtl
              </span>
            </div>

            <div className="rounded-2xl p-4 bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-medium block mb-1">
                {tr("Active Government Subsidy")}
              </span>
              <div className="text-2xl font-black text-amber-700 font-['Outfit']">
                3%<span className="text-xs text-slate-500 font-normal"> {tr("Subvention")}</span>
              </div>
              <span className="text-[11px] text-amber-800 font-semibold mt-1 block">
                {tr("Agri Infrastructure Fund (AIF)")}
              </span>
            </div>
          </div>

          {/* Quick Action Decision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: AI Produce Grading Status */}
            <div className="rounded-2xl p-6 bg-white border border-slate-200 hover:border-slate-300 shadow-xs transition flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-xl mb-3">
                  📷
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
                  {tr("AI Produce Quality Grading")}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {tr("Take a photo or upload from camera. The AI detects surface defects, calculates Grade A/B/C, and measures shelf life.")}
                </p>
                {lastGradingResult && (
                  <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <span className="text-emerald-700 font-bold block">
                      {tr("Last Scan")}: {tr(lastGradingResult.crop)} • {tr(lastGradingResult.grade)}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {tr("Quality Score")}: {lastGradingResult.qualityScore}/100
                    </span>
                  </div>
                )}
              </div>
              <button
                onClick={() => setActiveTab('grading')}
                className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center justify-between cursor-pointer"
              >
                <span>{tr("Launch Camera & Scanner")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Card 2: Best Action Engine */}
            <div className="rounded-2xl p-6 bg-white border border-slate-200 hover:border-slate-300 shadow-xs transition flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-xl mb-3">
                  🎯
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
                  {tr("Best Action Recommendation")}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {tr("Considers commodity quality, 7-day predicted price rise, storage unit cost, and food processing demand to recommend: SELL NOW vs STORE vs PROCESS.")}
                </p>
              </div>
              <button
                onClick={() => setActiveTab('best-action')}
                className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-sky-700 hover:text-sky-800 flex items-center justify-between cursor-pointer"
              >
                <span>{tr("Evaluate Best Post-Harvest Action")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Card 3: Buyer & Storage Hub */}
            <div className="rounded-2xl p-6 bg-white border border-slate-200 hover:border-slate-300 shadow-xs transition flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-xl mb-3">
                  🤝
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
                  {tr("Verified Buyers & Storage")}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {tr("Connect directly with verified corporate food processors, wholesalers, and nearby cold storage facilities with transparent prices.")}
                </p>
              </div>
              <button
                onClick={() => setActiveTab('buyers')}
                className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center justify-between cursor-pointer"
              >
                <span>{tr("Find Buyers & Storage")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 20-DAY PRICE PREDICTION & MANDI TRAJECTORY */}
          <div className="pt-2">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900 font-['Outfit'] flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-700" />
                  <span>{tr("20-Day Price Trajectory & Mandi Prediction")}</span>
                </h3>
                <p className="text-xs text-slate-500">
                  {tr("Visualizing last 10 days AGMARKNET spot prices and next 10 days AI arrival & demand forecasting corridor.")}
                </p>
              </div>
              <button
                onClick={() => setActiveTab('market')}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 cursor-pointer transition"
              >
                <span>{tr("View Full Mandi Board")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <PricePredictionGraph
              initialCommodity="Tomato"
              onProceedToStorage={() => setActiveTab('storage')}
              onProceedToBestAction={() => setActiveTab('best-action')}
            />
          </div>

          {/* HUMANIZED MANDI VOICES & REAL FARMER EXPERIENCES */}
          <div className="pt-2">
            <FarmerCommunityTrust />
          </div>
        </div>
      )}

      {/* TAB 2: AI GRADING */}
      {activeTab === 'grading' && (
        <AiGradingView
          onGradingComplete={handleGradingDone}
          onProceedToBestAction={handleProceedToBestAction}
        />
      )}

      {/* TAB 3: MARKET PRICES */}
      {activeTab === 'market' && <MarketPricesView />}

      {/* TAB 4: BEST ACTION ENGINE */}
      {activeTab === 'best-action' && (
        <BestActionView
          currentGradingResult={lastGradingResult}
          onNavigateToStorage={() => setActiveTab('storage')}
          onNavigateToBuyers={() => setActiveTab('buyers')}
          onGenerateTransaction={() => setActiveTab('transactions')}
        />
      )}

      {/* TAB 5: STORAGE LOCATOR */}
      {activeTab === 'storage' && <StorageLocatorView />}

      {/* TAB 6: BUYER MATCHING */}
      {activeTab === 'buyers' && (
        <BuyerMatchingView
          onInitiateDeal={(buyer) => {
            setActiveTab('transactions');
          }}
        />
      )}

      {/* TAB 7: GOVERNMENT SCHEMES */}
      {activeTab === 'schemes' && <GovernmentSchemesView />}

      {/* TAB 8: TRANSACTIONS & DIGITAL PASSES */}
      {activeTab === 'transactions' && <TransactionsView />}
    </div>
  );
};
