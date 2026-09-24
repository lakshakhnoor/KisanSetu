import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Store,
  TrendingUp,
  Search,
  PlusCircle,
  ShieldCheck,
  CheckCircle2,
  Filter,
  ArrowRight,
  FileCheck,
  Building2
} from 'lucide-react';

export const TraderPortal: React.FC = () => {
  const { user } = useAuth();

  const [showPostDemandModal, setShowPostDemandModal] = useState(false);
  const [demands, setDemands] = useState([
    { id: 'DEM-301', crop: 'Tomato', grade: 'Grade A', qty: 250, targetMandi: 'Pimpalgaon Baswant', maxPrice: 3100, date: '17 Sep 2026' },
    { id: 'DEM-302', crop: 'Wheat', grade: 'Grade A', qty: 1500, targetMandi: 'Khanna Grain Market', maxPrice: 2420, date: '16 Sep 2026' }
  ]);

  const [newCrop, setNewCrop] = useState('Tomato');
  const [newGrade, setNewGrade] = useState('Grade A');
  const [newQty, setNewQty] = useState('300');
  const [newPrice, setNewPrice] = useState('3150');
  const [newMandi, setNewMandi] = useState('Pimpalgaon Baswant Mandi');

  const handlePostDemand = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = {
      id: `DEM-${Date.now().toString().slice(-3)}`,
      crop: newCrop,
      grade: newGrade,
      qty: Number(newQty),
      targetMandi: newMandi,
      maxPrice: Number(newPrice),
      date: 'Today'
    };
    setDemands([newEntry, ...demands]);
    setShowPostDemandModal(false);
  };

  const availableFarmerLots = [
    { id: 'LOT-F-881', farmer: 'Sitaram Jadhav', mandi: 'Pimpalgaon APMC', crop: 'Tomato', variety: 'Hybrid Lakshmi', grade: 'Grade A', score: 93, qty: 65, askPrice: 2950 },
    { id: 'LOT-F-882', farmer: 'Devendra Patil (Sahyadri FPO)', mandi: 'Nashik Central', crop: 'Tomato', variety: 'Himsona', grade: 'Grade A', score: 91, qty: 140, askPrice: 3050 },
    { id: 'LOT-F-883', farmer: 'Gopal Verma', mandi: 'Sehore Mandi', crop: 'Wheat', variety: 'Sharbati 306', grade: 'Grade A', score: 95, qty: 450, askPrice: 3900 },
    { id: 'LOT-F-884', farmer: 'Harvinder Singh', mandi: 'Khanna Mandi', crop: 'Paddy / Basmati', variety: 'Pusa 1121', grade: 'Grade A', score: 94, qty: 800, askPrice: 4680 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#0b1b26] via-[#0d2232] to-[#07131b] border border-sky-500/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Store className="w-3.5 h-3.5" />
              <span>Mandi APMC Commission & Trader Portal</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black font-['Outfit'] text-white">
              Khurana Agro Trading Corp
            </h1>

            <p className="text-xs sm:text-sm text-sky-200/80 mt-1">
              APMC License #MH-NSK-2024-412 • e-NAM Integrated B2B Trading Hub
            </p>
          </div>

          <button
            onClick={() => setShowPostDemandModal(true)}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition cursor-pointer self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post Commodity Demand</span>
          </button>
        </div>
      </div>

      {/* Available AI-Graded Farmer Lots */}
      <div className="rounded-3xl p-6 bg-[#091b26]/85 border border-sky-500/25 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
          <div>
            <h3 className="text-lg font-bold text-white font-['Outfit']">
              Live AI-Certified Farm Produce Lots Available for Bidding
            </h3>
            <p className="text-xs text-sky-200/70">
              Verified surface quality, moisture index, and defect grades uploaded directly by farmers and FPOs.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableFarmerLots.map((lot) => (
            <div
              key={lot.id}
              className="p-4 rounded-2xl bg-black/40 border border-sky-500/20 hover:border-sky-400/40 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-sky-400">{lot.id}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    AI {lot.grade} ({lot.score}/100)
                  </span>
                </div>

                <h4 className="text-base font-bold text-white">
                  {lot.crop} ({lot.variety}) • {lot.qty} Quintals
                </h4>

                <div className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-sky-400" />
                  <span>{lot.mandi} • Seller: {lot.farmer}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Asking Rate</span>
                  <span className="text-lg font-black text-white font-['Outfit']">
                    ₹{lot.askPrice.toLocaleString()} / Q
                  </span>
                </div>

                <button className="px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition cursor-pointer">
                  Initiate e-NAM Trade
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Trader Demands */}
      <div className="rounded-3xl p-6 bg-[#091b26]/85 border border-sky-500/25 shadow-xl space-y-4">
        <h3 className="text-lg font-bold text-white font-['Outfit']">
          Your Broadcasted Commodity Demand ({demands.length})
        </h3>

        <div className="space-y-3">
          {demands.map((d) => (
            <div
              key={d.id}
              className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono font-bold text-sky-400">{d.id}</span>
                  <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-semibold">
                    {d.crop} • {d.grade}
                  </span>
                </div>
                <div className="text-sm font-bold text-white">
                  Demand: {d.qty} Quintals • Target Mandi: {d.targetMandi}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <span className="text-slate-400 block text-[10px]">Maximum Buying Offer</span>
                  <span className="text-base font-black text-sky-300 font-['Outfit']">
                    ₹{d.maxPrice.toLocaleString()} / Q
                  </span>
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  Open for Farmer Bids
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL: POST DEMAND */}
      {showPostDemandModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl p-6 bg-[#091f2c] border border-sky-500/30 text-white shadow-2xl space-y-4">
            <h3 className="text-xl font-bold font-['Outfit']">
              Post Procurement Demand
            </h3>

            <form onSubmit={handlePostDemand} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Commodity Crop</label>
                <input
                  type="text"
                  value={newCrop}
                  onChange={(e) => setNewCrop(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-sky-500/30 text-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Required Quality Grade</label>
                <select
                  value={newGrade}
                  onChange={(e) => setNewGrade(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-sky-500/30 text-white focus:outline-none"
                >
                  <option value="Grade A">Grade A (Premium / Export)</option>
                  <option value="Grade B">Grade B (Processing / Puree)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Quantity (Quintals)</label>
                <input
                  type="number"
                  value={newQty}
                  onChange={(e) => setNewQty(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-sky-500/30 text-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Max Offer Price (₹/Quintal)</label>
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-sky-500/30 text-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Target Mandi Yard</label>
                <input
                  type="text"
                  value={newMandi}
                  onChange={(e) => setNewMandi(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-sky-500/30 text-white focus:outline-none"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPostDemandModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold cursor-pointer"
                >
                  Broadcast Demand
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
