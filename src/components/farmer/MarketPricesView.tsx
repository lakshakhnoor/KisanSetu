import React, { useState } from 'react';
import { INITIAL_MARKET_PRICES } from '../../data/marketData';
import { PricePredictionGraph } from './PricePredictionGraph';
import { useLanguage } from '../../context/LanguageContext';
import {
  TrendingUp,
  TrendingDown,
  Clock,
  Building2,
  Database,
  Search,
  Filter,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { motion } from 'motion/react';

export const MarketPricesView: React.FC = () => {
  const { tr } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState<string>('All');
  const [selectedSource, setSelectedSource] = useState<string>('All');

  const commoditiesList = ['All', 'Tomato', 'Wheat', 'Paddy / Basmati', 'Onion', 'Potato', 'Soybean', 'Dry Red Chilli', 'Cotton'];

  const filteredPrices = INITIAL_MARKET_PRICES.filter((p) => {
    const matchesSearch =
      p.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.marketName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.state.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCommodity = selectedCommodity === 'All' || p.commodity === selectedCommodity;
    const matchesSource = selectedSource === 'All' || p.source === selectedSource;
    return matchesSearch && matchesCommodity && matchesSource;
  });

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit'] tracking-tight text-slate-900 flex items-center gap-2.5">
            <span>📈</span>
            <span>{tr("Market Price Intelligence & Forecasts")}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {tr("Live prices from AGMARKNET & e-NAM with 20-day historical and predictive AI trend analysis.")}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>{tr("AGMARKNET Gateway: Connected")}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-sky-600" />
            <span>{tr("e-NAM Live Node")}</span>
          </div>
        </div>
      </div>

      {/* 20-DAY PRICE PREDICTION & HISTORICAL GRAPH */}
      <PricePredictionGraph
        initialCommodity={selectedCommodity === 'All' ? 'Tomato' : selectedCommodity}
        onSelectCommodity={(comm) => setSelectedCommodity(comm)}
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={tr("Search commodity, mandi name, or district...")}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-700 shadow-xs"
          />
        </div>

        {/* Commodity filter pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {commoditiesList.map((comm) => (
            <button
              key={comm}
              onClick={() => setSelectedCommodity(comm)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCommodity === comm
                  ? 'bg-emerald-700 text-white font-bold shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {comm === 'All' ? tr('All Commodities') : tr(comm)}
            </button>
          ))}
        </div>
      </div>

      {/* Official Prices Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPrices.map((record) => (
          <div
            key={record.id}
            className="rounded-2xl p-5 bg-white border border-slate-200 hover:border-slate-300 shadow-xs transition flex flex-col justify-between"
          >
            <div>
              {/* Header: Source, Freshness, Price Change */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider ${
                    record.source === 'AGMARKNET'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-sky-50 text-sky-800 border-sky-200'
                  }`}
                >
                  {record.source}
                </span>

                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-semibold flex items-center">
                    {record.priceChangePercent >= 0 ? (
                      <span className="text-emerald-700 flex items-center">
                        <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
                        +{record.priceChangePercent}%
                      </span>
                    ) : (
                      <span className="text-rose-600 flex items-center">
                        <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
                        {record.priceChangePercent}%
                      </span>
                    )}
                  </span>
                </div>
              </div>

              {/* Commodity & Market Name */}
              <h4 className="text-lg font-bold text-slate-900 font-['Outfit']">
                {tr(record.commodity)}
              </h4>
              <p className="text-xs text-emerald-800 font-medium">
                {tr(record.variety)}
              </p>

              <div className="flex items-center gap-1 text-xs text-slate-600 mt-1">
                <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{tr(record.marketName)} ({tr(record.district)}, {tr(record.state)})</span>
              </div>

              {/* Price Numbers: Modal, Min, Max */}
              <div className="my-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-500">{tr("Modal Price")}</span>
                  <div className="text-2xl font-black text-slate-900 font-['Outfit']">
                    ₹{record.modalPrice.toLocaleString()}
                    <span className="text-xs text-slate-500 font-normal"> / Qtl</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1.5 border-t border-slate-200">
                  <span className="text-slate-500">{tr("Min")}: <strong className="text-slate-800">₹{record.minPrice}</strong></span>
                  <span className="text-slate-500">{tr("Max")}: <strong className="text-emerald-700">₹{record.maxPrice}</strong></span>
                  <span className="text-slate-500">{tr("Arrivals")}: <strong className="text-slate-800">{record.arrivalQuantity} Q</strong></span>
                </div>
              </div>
            </div>

            {/* Mandatory Metadata: Source, Date, Time, Freshness */}
            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>{tr("Updated")}: {record.lastUpdated}</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-medium">
                {tr(record.freshnessStatus)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
