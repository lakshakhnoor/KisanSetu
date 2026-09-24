import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  Layers,
  TrendingUp,
  Warehouse,
  Truck,
  Building,
  CheckCircle2,
  FileCheck,
  PlusCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

export const FpoPortal: React.FC = () => {
  const { user } = useAuth();

  const [activeFpoTab, setActiveFpoTab] = useState<'overview' | 'aggregation' | 'lots' | 'contracts'>('overview');

  const fpoMetrics = {
    fpoName: 'Sahyadri Farmers Agro Producer Co. Ltd.',
    registeredMembers: 142,
    activeVillages: 11,
    aggregatedTomatoTons: 42,
    gradeBreakdown: {
      gradeA: 21,
      gradeB: 15,
      gradeC: 6
    },
    aggregatedWheatTons: 85,
    coldStorageBookedTons: 25,
    activeBuyerDeals: 3
  };

  const memberLots = [
    { id: 'LOT-101', farmerName: 'Ramesh Patil', village: 'Mohadi', crop: 'Tomato', variety: 'Hybrid Lakshmi', qtyQuintals: 45, grade: 'Grade A', status: 'In Aggregation Center' },
    { id: 'LOT-102', farmerName: 'Bhausaheb Shinde', village: 'Pimpalgaon', crop: 'Tomato', variety: 'Himsona', qtyQuintals: 60, grade: 'Grade A', status: 'In Aggregation Center' },
    { id: 'LOT-103', farmerName: 'Vitthal Jadhav', village: 'Dindori', crop: 'Tomato', variety: 'Desi', qtyQuintals: 35, grade: 'Grade B', status: 'Processing Queue' },
    { id: 'LOT-104', farmerName: 'Kailash More', village: 'Janori', crop: 'Wheat', variety: 'Sharbati 306', qtyQuintals: 120, grade: 'Grade A', status: 'CWC Warehouse Allocated' },
    { id: 'LOT-105', farmerName: 'Sunita Gaikwad', village: 'Pimpalgaon', crop: 'Tomato', variety: 'Hybrid Lakshmi', qtyQuintals: 50, grade: 'Grade B', status: 'Dispatched to Processor' }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#1b1c0a] via-[#21240c] to-[#121607] border border-amber-500/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>FPO Enterprise Portal</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black font-['Outfit'] text-white">
            {fpoMetrics.fpoName}
          </h1>

          <p className="text-xs sm:text-sm text-amber-200/80 mt-1 max-w-xl">
            Lead Coordinator: {user?.name || 'Devendra Patil'} • Managing {fpoMetrics.registeredMembers} Farmers across {fpoMetrics.activeVillages} Production Clusters
          </p>
        </div>
      </div>

      {/* Aggregated Produce Overview KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#141a0e] border border-amber-500/25">
          <span className="text-xs text-slate-400 block mb-1">Total Members</span>
          <div className="text-2xl font-black text-white font-['Outfit']">
            {fpoMetrics.registeredMembers} Farmers
          </div>
          <span className="text-[11px] text-amber-400 mt-1 block">11 Village Clusters</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#141a0e] border border-amber-500/25">
          <span className="text-xs text-slate-400 block mb-1">Aggregated Tomato Pool</span>
          <div className="text-2xl font-black text-white font-['Outfit']">
            {fpoMetrics.aggregatedTomatoTons} Tons
          </div>
          <span className="text-[11px] text-emerald-400 mt-1 block">
            Grade A: {fpoMetrics.gradeBreakdown.gradeA}T • Grade B: {fpoMetrics.gradeBreakdown.gradeB}T
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#141a0e] border border-amber-500/25">
          <span className="text-xs text-slate-400 block mb-1">Aggregated Wheat Pool</span>
          <div className="text-2xl font-black text-white font-['Outfit']">
            {fpoMetrics.aggregatedWheatTons} Tons
          </div>
          <span className="text-[11px] text-sky-400 mt-1 block">All Stored at CWC</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#141a0e] border border-amber-500/25">
          <span className="text-xs text-slate-400 block mb-1">Cold Chain Allocation</span>
          <div className="text-2xl font-black text-amber-400 font-['Outfit']">
            {fpoMetrics.coldStorageBookedTons} Tons
          </div>
          <span className="text-[11px] text-slate-300 mt-1 block">At Sahyadri CA Hub</span>
        </div>
      </div>

      {/* Member Harvest Lots Table */}
      <div className="rounded-3xl p-6 bg-[#141a0e]/90 border border-amber-500/25 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
          <div>
            <h3 className="text-lg font-bold text-white font-['Outfit']">
              Member Produce Aggregation & Quality Pooling
            </h3>
            <p className="text-xs text-amber-200/70">
              Individual farmer lots certified with KisanSetu AI vision before bulk pooling.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer">
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Pool New Member Lot</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-amber-300 uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Lot ID</th>
                <th className="py-2.5 px-3">Farmer & Village</th>
                <th className="py-2.5 px-3">Crop & Variety</th>
                <th className="py-2.5 px-3">AI Grade</th>
                <th className="py-2.5 px-3">Quantity</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {memberLots.map((lot) => (
                <tr key={lot.id} className="hover:bg-white/5">
                  <td className="py-3 px-3 font-mono font-bold text-amber-400">{lot.id}</td>
                  <td className="py-3 px-3">
                    <span className="font-semibold text-white block">{lot.farmerName}</span>
                    <span className="text-[11px] text-slate-400">{lot.village}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-medium text-white">{lot.crop}</span>
                    <span className="text-[11px] text-slate-400 block">{lot.variety}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        lot.grade === 'Grade A'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {lot.grade}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-semibold text-white">{lot.qtyQuintals} Q</td>
                  <td className="py-3 px-3 text-slate-300">{lot.status}</td>
                  <td className="py-3 px-3 text-right">
                    <button className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer">
                      View Certificate →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
