import React, { useState } from 'react';
import {
  Shield,
  Server,
  Activity,
  Database,
  Cpu,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Clock,
  TrendingUp,
  Users,
  FileCheck
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('17 Sep 2026, 08:30:14 IST');

  const systemMetrics = {
    totalFarmers: 18450,
    totalFpos: 312,
    totalTraders: 840,
    aiAnalysesRun: 49210,
    totalMandisCovered: 580,
    activeTransactions: 1240,
    totalTradingVolumeCr: 28.6
  };

  const serviceStatuses = [
    { name: 'AGMARKNET Direct API Gateway', status: 'Operational', latency: '42ms', uptime: '99.94%', lastSync: '2 mins ago' },
    { name: 'e-NAM Interoperable Auction Node', status: 'Operational', latency: '68ms', uptime: '99.88%', lastSync: '1 min ago' },
    { name: 'KisanVision Vision AI Inference Cluster', status: 'Operational (GPU-T4)', latency: '180ms', uptime: '99.98%', lastSync: 'Active' },
    { name: 'PostgreSQL Primary Cluster (TimescaleDB)', status: 'Healthy (Connections: 42/200)', latency: '3ms', uptime: '100%', lastSync: 'Continuous Replication' },
    { name: 'Redis Real-time Price Cache', status: 'Healthy (Memory: 38%)', latency: '1ms', uptime: '100%', lastSync: 'Real-time' },
    { name: 'Indian Languages Speech TTS/STT Engine', status: 'Operational (22 Languages)', latency: '95ms', uptime: '99.91%', lastSync: 'Ready' }
  ];

  const auditLogs = [
    { time: '09:22:15', event: 'AGMARKNET price stream fetched 1,420 mandi arrivals successfully', level: 'INFO' },
    { time: '09:20:41', event: 'AI Quality Grading inference executed for produce batch #LOT-9821 (Grade A certified)', level: 'INFO' },
    { time: '09:18:02', event: 'e-NAM Escrow transaction settlement completed for #KS-2026-000841 (₹88,500)', level: 'INFO' },
    { time: '09:12:33', event: 'New FPO Lead registration verified: Sahyadri Farmers Producer Co.', level: 'SUCCESS' },
    { time: '09:05:18', event: 'Cold storage inventory sync updated for Nashik and Agra clusters', level: 'INFO' }
  ];

  const triggerManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncTime(new Date().toLocaleString());
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#170e28] via-[#1e1335] to-[#10091d] border border-purple-500/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Shield className="w-3.5 h-3.5" />
              <span>National Operations & System Administration</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black font-['Outfit'] text-white">
              KisanSetu Platform Telemetry
            </h1>

            <p className="text-xs sm:text-sm text-purple-200/80 mt-1">
              Real-time monitoring of Government Mandi Gateways, AI Quality Models, and Trade Settlement Nodes.
            </p>
          </div>

          <button
            onClick={triggerManualSync}
            disabled={isSyncing}
            className="px-5 py-3 rounded-2xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition cursor-pointer self-start sm:self-auto disabled:opacity-60"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>Force Mandi Sync Now</span>
          </button>
        </div>
      </div>

      {/* Platform Macro Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#140e22] border border-purple-500/25">
          <span className="text-xs text-slate-400 block mb-1">Registered Farmers</span>
          <div className="text-2xl font-black text-white font-['Outfit']">
            {systemMetrics.totalFarmers.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-400 mt-1 block">Across 28 States & UTs</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#140e22] border border-purple-500/25">
          <span className="text-xs text-slate-400 block mb-1">Total FPOs & Traders</span>
          <div className="text-2xl font-black text-white font-['Outfit']">
            {systemMetrics.totalFpos} FPOs / {systemMetrics.totalTraders} Traders
          </div>
          <span className="text-[11px] text-sky-400 mt-1 block">APMC Licensed</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#140e22] border border-purple-500/25">
          <span className="text-xs text-slate-400 block mb-1">AI Produce Scans</span>
          <div className="text-2xl font-black text-white font-['Outfit']">
            {systemMetrics.aiAnalysesRun.toLocaleString()}
          </div>
          <span className="text-[11px] text-purple-300 mt-1 block">91.4% Avg Grade Accuracy</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#140e22] border border-purple-500/25">
          <span className="text-xs text-slate-400 block mb-1">Total Trade Volume</span>
          <div className="text-2xl font-black text-emerald-400 font-['Outfit']">
            ₹{systemMetrics.totalTradingVolumeCr} Crores
          </div>
          <span className="text-[11px] text-emerald-300 mt-1 block">100% Digital e-NAM Escrow</span>
        </div>
      </div>

      {/* Microservice & Gateway Health */}
      <div className="rounded-3xl p-6 bg-[#140e22]/90 border border-purple-500/25 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h3 className="text-lg font-bold text-white font-['Outfit']">
              Service Health & Government Gateway Infrastructure
            </h3>
            <p className="text-xs text-purple-200/70">
              Live status, ping latency, and synchronization logs with Central Government endpoints.
            </p>
          </div>

          <span className="text-xs text-slate-400">
            Last Sync: <strong className="text-emerald-300">{lastSyncTime}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {serviceStatuses.map((svc) => (
            <div
              key={svc.name}
              className="p-4 rounded-2xl bg-black/40 border border-purple-500/20 flex items-start justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{svc.name}</span>
                </div>
                <div className="text-slate-400">
                  Latency: <span className="text-slate-200 font-mono">{svc.latency}</span> • Uptime: <span className="text-emerald-400 font-bold">{svc.uptime}</span>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold uppercase tracking-wider shrink-0">
                {svc.status.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time System Audit Logs */}
      <div className="rounded-3xl p-6 bg-[#140e22]/90 border border-purple-500/25 shadow-xl space-y-3">
        <h3 className="text-lg font-bold text-white font-['Outfit']">
          Live System & Gateway Audit Log
        </h3>

        <div className="font-mono text-xs space-y-2 bg-black/50 p-4 rounded-2xl border border-white/5 max-h-56 overflow-y-auto">
          {auditLogs.map((log, i) => (
            <div key={i} className="flex items-center gap-3 text-slate-300 border-b border-white/5 pb-1.5">
              <span className="text-slate-500 text-[11px] shrink-0">[{log.time}]</span>
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                  log.level === 'SUCCESS' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-sky-500/20 text-sky-300'
                }`}
              >
                {log.level}
              </span>
              <span className="truncate">{log.event}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
