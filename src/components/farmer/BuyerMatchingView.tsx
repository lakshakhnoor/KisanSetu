import React, { useState } from 'react';
import { VERIFIED_BUYERS } from '../../data/buyersData';
import { BuyerRequirement } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import {
  Users,
  ShieldCheck,
  CheckCircle2,
  Phone,
  ArrowRight,
  TrendingUp,
  MapPin,
  FileCheck,
  Building,
  Navigation
} from 'lucide-react';

interface BuyerMatchingViewProps {
  onInitiateDeal?: (buyer: BuyerRequirement) => void;
}

export const BuyerMatchingView: React.FC<BuyerMatchingViewProps> = ({ onInitiateDeal }) => {
  const { tr } = useLanguage();
  const [selectedBuyerType, setSelectedBuyerType] = useState<string>('All');
  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [contactRevealedId, setContactRevealedId] = useState<string | null>(null);

  const filteredBuyers = VERIFIED_BUYERS.filter((b) => {
    const matchesType = selectedBuyerType === 'All' || b.buyerType === selectedBuyerType;
    const matchesCrop = selectedCrop === 'All' || b.requiredCrop === selectedCrop;
    return matchesType && matchesCrop;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit'] tracking-tight text-slate-900 flex items-center gap-2.5">
            <span>🤝</span>
            <span>{tr("Direct Buyer Matching")}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {tr("AI-matched verified food processors, exporters, and retail procurement agents looking for your harvest.")}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>{tr("KYC Verified Procurement Agents")}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <span className="text-xs font-semibold text-slate-700">{tr("Filter Buyers")}:</span>

        <select
          value={selectedBuyerType}
          onChange={(e) => setSelectedBuyerType(e.target.value)}
          className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-700 cursor-pointer"
        >
          <option value="All">{tr("All Buyer Categories")}</option>
          <option value="Processor">{tr("Food Processor (Puree/Flour/Chips)")}</option>
          <option value="Retailer / AgTech">{tr("Retailer / AgTech Supply Chain")}</option>
          <option value="Institutional">{tr("Institutional (ITC e-Choupal / Corporates)")}</option>
          <option value="Exporter">{tr("Global Exporter")}</option>
          <option value="Mandi Commission Agent">{tr("APMC Commission Agent")}</option>
        </select>

        <select
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
          className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-700 cursor-pointer"
        >
          <option value="All">{tr("All Commodities")}</option>
          <option value="Tomato">{tr("Tomato")}</option>
          <option value="Wheat">{tr("Wheat")}</option>
          <option value="Potato">{tr("Potato")}</option>
          <option value="Onion">{tr("Onion")}</option>
        </select>
      </div>

      {/* Buyer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBuyers.map((buyer) => (
          <div
            key={buyer.id}
            className="rounded-2xl p-5 bg-white border border-slate-200 hover:border-slate-300 shadow-xs transition flex flex-col justify-between"
          >
            <div>
              {/* Top Tag & Match Score */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
                  {tr(buyer.buyerType)}
                </span>

                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-700 text-white shadow-xs">
                  {buyer.matchScore}% {tr("Match")}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <h4 className="text-lg font-bold text-slate-900 font-['Outfit'] line-clamp-1">
                  {tr(buyer.buyerName)}
                </h4>
                {buyer.verified && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                )}
              </div>

              <div className="flex items-center gap-1 text-xs text-slate-600 mt-1 mb-3">
                <Navigation className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>{buyer.distanceKm} km • {tr(buyer.district)}, {tr(buyer.state)}</span>
              </div>

              {/* Requirement & Offered Price Box */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 mb-3 text-xs">
                <div className="flex justify-between items-baseline">
                  <span className="text-slate-500">{tr("Offered Price")}:</span>
                  <div className="text-xl font-black text-slate-900 font-['Outfit']">
                    ₹{buyer.offeredPricePerQuintal.toLocaleString()}
                    <span className="text-xs text-slate-500 font-normal"> / Qtl</span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">{tr("Required Produce")}:</span>
                  <span className="text-slate-900 font-semibold">
                    {tr(buyer.requiredCrop)} ({tr(buyer.requiredGrade)})
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">{tr("Demand Lot")}:</span>
                  <span className="text-slate-700 font-medium">
                    {buyer.quantityRequiredQuintals} {tr("Quintals")}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">{tr("Payment Terms")}:</span>
                  <span className="text-emerald-800 font-semibold">
                    {tr(buyer.paymentTerms)}
                  </span>
                </div>
              </div>

              {/* Contact Representative */}
              <div className="text-xs text-slate-600 mb-2">
                <span className="text-slate-500 block text-[11px]">{tr("Representative")}:</span>
                <span className="font-semibold text-slate-800">{buyer.contactPerson}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              {contactRevealedId === buyer.id ? (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center text-xs text-emerald-800 font-bold flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-700" />
                  <span>{tr("Call Buyer")}: {buyer.phone}</span>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setContactRevealedId(buyer.id)}
                    className="py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    <span>{tr("View Phone")}</span>
                  </button>

                  <button
                    onClick={() => onInitiateDeal && onInitiateDeal(buyer)}
                    className="py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1 shadow-xs"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>{tr("Initiate Deal")}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
