import React, { useState } from 'react';
import { QualityAnalysisResult, BestActionRecommendation, BestActionType } from '../../types';
import { PricePredictionGraph } from './PricePredictionGraph';
import { useLanguage } from '../../context/LanguageContext';
import {
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Warehouse,
  Factory,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Clock
} from 'lucide-react';
import { motion } from 'motion/react';

interface BestActionViewProps {
  currentGradingResult?: QualityAnalysisResult | null;
  onNavigateToStorage?: () => void;
  onNavigateToBuyers?: () => void;
  onGenerateTransaction?: () => void;
}

export const BestActionView: React.FC<BestActionViewProps> = ({
  currentGradingResult,
  onNavigateToStorage,
  onNavigateToBuyers,
  onGenerateTransaction
}) => {
  const { tr } = useLanguage();
  const [activeCommodity, setActiveCommodity] = useState(
    currentGradingResult?.crop || 'Tomato'
  );
  const [produceGrade, setProduceGrade] = useState<'Grade A' | 'Grade B' | 'Grade C'>(
    (currentGradingResult?.grade as any) || 'Grade A'
  );
  const [lotQuantity, setLotQuantity] = useState<number>(30); // quintals

  // Algorithmic Decision Engine
  const calculateRecommendation = (): BestActionRecommendation => {
    if (activeCommodity === 'Tomato') {
      if (produceGrade === 'Grade A') {
        // Cold storage 7-10 days to capture expected price rise from 2850 -> 3120
        return {
          action: 'STORE',
          title: 'STORE IN LOCAL COLD STORAGE (7 to 10 Days)',
          headline: 'High Grade A Firmness + 8.5% Predicted Price Increase',
          netEstimatedReturnPerQuintal: 2995,
          confidenceScore: 88,
          reasons: [
            'Your produce has verified Grade A firmness (4.6 N/cm²) and an estimated cold-storage shelf life of 11 days.',
            'AI Price Forecast models tomato price rising from ₹2,850 to ₹3,120/Q in the next 7 days due to declining South Indian arrivals.',
            'MahaAgro Cold Chain has 12,400 Quintals available capacity at ₹125/Quintal/month (approx. ₹30 for 7 days).',
            'Net Estimated Return: ₹3,120 sale price - ₹30 storage - ₹95 handling = ₹2,995/Q vs ₹2,850 today (+₹145/Q net profit gain).'
          ],
          storageOption: {
            facilityName: 'MahaAgro Cold Chain & Packhouse (8.5 km away)',
            costPerMonth: 125,
            recommendedDurationDays: 8,
            expectedPriceAfterStorage: 3120,
            netGainAfterStorageCost: 145
          },
          immediateSaleOption: {
            buyerName: 'AgroFresh Retail Chain',
            immediatePrice: 2850,
            paymentWindow: 'Immediate UPI'
          }
        };
      } else if (produceGrade === 'Grade B') {
        // Grade B has lower storage life -> Sell directly to puree/processing or fresh mandi
        return {
          action: 'SELL_NOW',
          title: 'SELL NOW TO FOOD PROCESSOR',
          headline: 'Grade B Shelf Life Moderate + Strong Processing Demand at ₹2,950/Q',
          netEstimatedReturnPerQuintal: 2950,
          confidenceScore: 92,
          reasons: [
            'Shelf life for Grade B is 4-5 days; storage risks rot and moisture loss.',
            'KisanPure Food Processing Pvt Ltd is currently offering ₹2,950/Q for Grade B processing tomatoes with 24-hour direct bank transfer.',
            'Selling immediately avoids ₹35/Q transport & storage risk while capturing a ₹100/Q premium over local mandi spot rate (₹2,850).'
          ],
          immediateSaleOption: {
            buyerName: 'KisanPure Food Processing Pvt Ltd (12.5 km)',
            immediatePrice: 2950,
            paymentWindow: '24-hour Direct Bank Transfer'
          }
        };
      } else {
        // Grade C -> Process locally
        return {
          action: 'PROCESS',
          title: 'LOCAL VALUE ADDITION / PUREE PROCESSING',
          headline: 'Severe Mandi Discount for Grade C; Processing Yields ₹3,400 Equivalent Value',
          netEstimatedReturnPerQuintal: 3400,
          confidenceScore: 84,
          reasons: [
            'Grade C spot prices at APMC are currently discounted to ₹1,400/Q.',
            'Local tomato paste / puree conversion yields 18 kg paste per quintal, valued at ₹220/kg = ₹3,960.',
            'Processing and packaging cost is estimated at ₹560/quintal, giving net realization of ₹3,400/Q vs ₹1,400/Q distress sale.'
          ],
          processingOption: {
            processedProduct: 'Tomato Puree (28-30° Brix)',
            yieldRatio: '100 kg fresh -> 18 kg concentrated paste',
            processingCostPerQuintal: 560,
            processedValuePerQuintal: 3960,
            netGain: 2000
          }
        };
      }
    } else if (activeCommodity === 'Wheat') {
      return {
        action: 'STORE',
        title: 'STORE IN WAREHOUSE & RECEIVE e-NWR PLEDGE LOAN',
        headline: 'Non-perishable Grain + FCI Procurement Expected to Push Prices to ₹2,470',
        netEstimatedReturnPerQuintal: 2422,
        confidenceScore: 91,
        reasons: [
          'Wheat has long hermetic shelf life (365 days); zero risk of perishable spoilage.',
          'CWC Malegaon dry warehouse charges only ₹48/Q per month.',
          'You can obtain an electronic Negotiable Warehouse Receipt (e-NWR) loan up to 75% value at 7% interest while waiting for terminal market peak.'
        ],
        storageOption: {
          facilityName: 'Central Warehousing Corporation (CWC) Malegaon (32 km)',
          costPerMonth: 48,
          recommendedDurationDays: 30,
          expectedPriceAfterStorage: 2470,
          netGainAfterStorageCost: 62
        }
      };
    } else {
      return {
        action: 'SELL_NOW',
        title: 'SELL NOW TO VERIFIED WHOLESALE BUYER',
        headline: 'Market Price at 3-Month High with Robust Cash Settlement',
        netEstimatedReturnPerQuintal: 2850,
        confidenceScore: 89,
        reasons: [
          'Arrival volumes at terminal mandis are currently balanced.',
          'Immediate sale minimizes weather and pest risks while ensuring zero financing cost.'
        ]
      };
    }
  };

  const rec = calculateRecommendation();

  const actionThemes: Record<BestActionType, { border: string; bg: string; badge: string; icon: any; color: string }> = {
    SELL_NOW: {
      border: 'border-emerald-200',
      bg: 'bg-emerald-50/60',
      badge: 'bg-emerald-700 text-white',
      icon: DollarSign,
      color: 'text-emerald-800'
    },
    STORE: {
      border: 'border-sky-200',
      bg: 'bg-sky-50/60',
      badge: 'bg-sky-700 text-white',
      icon: Warehouse,
      color: 'text-sky-800'
    },
    PROCESS: {
      border: 'border-amber-200',
      bg: 'bg-amber-50/60',
      badge: 'bg-amber-700 text-white',
      icon: Factory,
      color: 'text-amber-800'
    }
  };

  const currentTheme = actionThemes[rec.action];
  const ActionIcon = currentTheme.icon;

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit'] tracking-tight text-slate-900 flex items-center gap-2.5">
            <span>🎯</span>
            <span>{tr("Best Action Decision Engine")}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {tr("Transparent post-harvest optimization: SELL NOW vs STORE vs PROCESS based on AI quality & price forecast.")}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>{tr("Multi-factor Optimization Matrix")}</span>
        </div>
      </div>

      {/* Inputs Strip (Select produce & grade to see decisions change dynamically) */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {tr("Current Produce")}
          </label>
          <select
            value={activeCommodity}
            onChange={(e) => setActiveCommodity(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-700 cursor-pointer"
          >
            <option value="Tomato">{tr("Tomato")} ({tr("Perishable")})</option>
            <option value="Wheat">{tr("Wheat")} ({tr("Grain / Storable")})</option>
            <option value="Onion">{tr("Onion")} ({tr("Semi-Perishable")})</option>
            <option value="Potato">{tr("Potato")} ({tr("Cold-Chain Storable")})</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {tr("Produce Grade")}
          </label>
          <select
            value={produceGrade}
            onChange={(e) => setProduceGrade(e.target.value as any)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-700 cursor-pointer"
          >
            <option value="Grade A">{tr("Grade A")} ({tr("Firm, Premium")})</option>
            <option value="Grade B">{tr("Grade B")} ({tr("Standard Mandi Quality")})</option>
            <option value="Grade C">{tr("Grade C")} ({tr("Minor Defect / Processing")})</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {tr("Lot Size (Quintals)")}
          </label>
          <input
            type="number"
            value={lotQuantity}
            onChange={(e) => setLotQuantity(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-700"
          />
        </div>
      </div>

      {/* RECOMMENDED ACTION CARD */}
      <div
        className={`rounded-2xl p-6 sm:p-8 ${currentTheme.bg} border ${currentTheme.border} shadow-xs relative overflow-hidden`}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${currentTheme.badge}`}>
                {tr("RECOMMENDED ACTION")}
              </span>
              <span className="text-xs text-slate-600 font-semibold">
                {tr("Confidence")}: {rec.confidenceScore}%
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-slate-900">
              {tr(rec.title)}
            </h3>

            <p className="text-sm text-slate-700 mt-1.5 font-medium">
              {tr(rec.headline)}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 text-right min-w-[200px] shadow-xs">
            <span className="text-xs text-slate-500 block mb-0.5">
              {tr("Net Estimated Realization")}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit']">
              ₹{rec.netEstimatedReturnPerQuintal.toLocaleString()}
              <span className="text-xs text-slate-500 font-normal"> / Qtl</span>
            </div>
            <span className="text-xs text-emerald-800 font-semibold block mt-0.5">
              {tr("Total")}: ₹{(rec.netEstimatedReturnPerQuintal * lotQuantity).toLocaleString()} {tr("for")} {lotQuantity} Q
            </span>
          </div>
        </div>

        {/* TRANSPARENT REASONS WHY? */}
        <div className="my-6">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-700 mb-3 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-emerald-700" />
            <span>{tr("WHY THIS RECOMMENDATION? (TRANSPARENT MATHEMATICAL BREAKDOWN)")}</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {rec.reasons.map((reason, index) => (
              <div
                key={index}
                className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5 leading-relaxed shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>{tr(reason)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contextual Action Execution CTAs */}
        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-3">
          {rec.action === 'STORE' && (
            <button
              onClick={onNavigateToStorage}
              className="px-5 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition cursor-pointer shadow-xs"
            >
              <Warehouse className="w-4 h-4" />
              <span>{tr("Book Nearby Storage Unit")} ({rec.storageOption?.facilityName.split(' ')[0]})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {rec.action === 'SELL_NOW' && (
            <button
              onClick={onNavigateToBuyers}
              className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition cursor-pointer shadow-xs"
            >
              <DollarSign className="w-4 h-4" />
              <span>{tr("Connect with Verified Buyer")} ({rec.immediateSaleOption?.buyerName.split(' ')[0]})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {rec.action === 'PROCESS' && (
            <button
              onClick={onNavigateToBuyers}
              className="px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition cursor-pointer shadow-xs"
            >
              <Factory className="w-4 h-4" />
              <span>{tr("Find Local Processing Hub & Puree Mills")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {onGenerateTransaction && (
            <button
              onClick={onGenerateTransaction}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <span>{tr("Generate Digital Mandi Pass / Bill")}</span>
            </button>
          )}
        </div>
      </div>

      {/* 20-DAY PRICE PREDICTION TRAJECTORY GRAPH */}
      <div className="pt-2">
        <div className="mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-700" />
            <h3 className="text-lg sm:text-xl font-bold font-['Outfit'] text-slate-900">
              {tr("Price Prediction Trajectory (-10d to +10d) for")} {tr(activeCommodity)}
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {tr("AI Mandi Forecast Corridor & Historical Trend")}
          </span>
        </div>
        <PricePredictionGraph
          initialCommodity={activeCommodity}
          onSelectCommodity={(c) => setActiveCommodity(c)}
        />
      </div>
    </div>
  );
};
