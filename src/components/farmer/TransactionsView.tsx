import React, { useState } from 'react';
import { TransactionRecord } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  FileText,
  QrCode,
  Printer,
  CheckCircle2,
  Clock,
  Download,
  ShieldCheck,
  Building2,
  Share2
} from 'lucide-react';

export const TransactionsView: React.FC = () => {
  const { user } = useAuth();
  const { tr } = useLanguage();

  const [transactions, setTransactions] = useState<TransactionRecord[]>([
    {
      id: 'tx-1',
      transactionCode: 'KS-2026-000841',
      date: '17 Sep 2026, 09:15 AM',
      sellerName: user?.name || 'Ramesh Kumar Patel',
      sellerMobile: user?.mobile || '+91 98220 12345',
      sellerType: 'Farmer',
      buyerName: 'KisanPure Food Processing Pvt Ltd',
      buyerType: 'Food Processor',
      commodity: 'Tomato',
      variety: 'Hybrid Lakshmi',
      grade: 'Grade A',
      quantityQuintals: 30,
      agreedPricePerQuintal: 2950,
      totalAmount: 88500,
      mandiName: 'Pimpalgaon Baswant APMC Yard',
      status: 'Escrow Funded',
      paymentMode: 'Direct Bank Transfer (e-NAM Escrow)',
      qrPayload: 'https://kisansetu.gov.in/verify/KS-2026-000841'
    },
    {
      id: 'tx-2',
      transactionCode: 'KS-2026-000720',
      date: '10 Sep 2026, 11:30 AM',
      sellerName: user?.name || 'Ramesh Kumar Patel',
      sellerMobile: user?.mobile || '+91 98220 12345',
      sellerType: 'Farmer',
      buyerName: 'AgroFresh Retail Chain',
      buyerType: 'Modern Retail',
      commodity: 'Wheat',
      variety: 'Sharbati 306',
      grade: 'Grade A',
      quantityQuintals: 45,
      agreedPricePerQuintal: 3820,
      totalAmount: 171900,
      mandiName: 'Sehore Krishi Upaj Mandi',
      status: 'Completed',
      paymentMode: 'Instant UPI Settlement',
      qrPayload: 'https://kisansetu.gov.in/verify/KS-2026-000720'
    }
  ]);

  const [activeReceipt, setActiveReceipt] = useState<TransactionRecord | null>(transactions[0]);

  const printReceipt = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit'] tracking-tight text-slate-900 flex items-center gap-2.5">
            <span>📜</span>
            <span>{tr("Digital Mandi Pass & Transactions")}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {tr("Official post-harvest bill of sale, cryptographic QR validation, and settlement tracking.")}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>{tr("e-NAM & APMC Interoperable Pass")}</span>
        </div>
      </div>

      {/* Main Grid: Left Transactions List, Right Printable QR Receipt */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: List of recorded transactions */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
            {tr("Past Trade Contracts & Passes")} ({transactions.length})
          </span>

          {transactions.map((tx) => {
            const isSelected = activeReceipt?.id === tx.id;
            return (
              <button
                key={tx.id}
                onClick={() => setActiveReceipt(tx)}
                className={`w-full text-left p-4 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-50/80 border-emerald-400 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-slate-900">
                    {tx.transactionCode}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      tx.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-amber-50 text-amber-900 border-amber-200'
                    }`}
                  >
                    {tr(tx.status)}
                  </span>
                </div>

                <div className="text-sm font-bold text-slate-900">
                  {tr(tx.commodity)} ({tr(tx.grade)}) • {tx.quantityQuintals} {tr("Quintals")}
                </div>

                <div className="text-xs text-slate-600 mt-1">
                  {tr("Buyer")}: {tr(tx.buyerName)}
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">{tx.date}</span>
                  <span className="font-black text-slate-900 font-['Outfit'] text-sm">
                    ₹{tx.totalAmount.toLocaleString()}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* RIGHT: Digital Receipt & QR Pass Preview */}
        <div className="lg:col-span-7">
          {activeReceipt ? (
            <div className="rounded-2xl p-6 sm:p-8 bg-white border border-slate-200 shadow-xs relative space-y-6">
              {/* Receipt Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black font-['Outfit'] text-slate-900">
                      KISAN<span className="text-emerald-700">SETU</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-700 text-white uppercase">
                      {tr("Official Mandi Bill")}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {tr("Unified Post-Harvest Agricultural Settlement Voucher")}
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-mono text-xs font-bold text-slate-900 block">
                    {activeReceipt.transactionCode}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {activeReceipt.date}
                  </span>
                </div>
              </div>

              {/* Bill Details Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-500 text-[10px] uppercase font-semibold">
                    {tr("Seller (Kisan / FPO)")}
                  </span>
                  <div className="font-bold text-slate-900 text-sm">
                    {activeReceipt.sellerName}
                  </div>
                  <div className="text-slate-700">{activeReceipt.sellerMobile}</div>
                  <div className="text-emerald-800 font-medium">{tr("Certified Seller Profile")}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-500 text-[10px] uppercase font-semibold">
                    {tr("Buyer / Processor")}
                  </span>
                  <div className="font-bold text-slate-900 text-sm">
                    {tr(activeReceipt.buyerName)}
                  </div>
                  <div className="text-slate-700">{tr(activeReceipt.buyerType)}</div>
                  <div className="text-emerald-800 font-medium">{tr("e-NAM Escrow Verified")}</div>
                </div>
              </div>

              {/* Item Details Table */}
              <div className="rounded-xl overflow-hidden border border-slate-200 text-xs">
                <div className="grid grid-cols-4 bg-slate-100 p-2.5 font-bold text-slate-700 text-[11px] uppercase">
                  <span>{tr("Commodity")}</span>
                  <span>{tr("Grade")}</span>
                  <span>{tr("Quantity")}</span>
                  <span className="text-right">{tr("Rate / Quintal")}</span>
                </div>
                <div className="grid grid-cols-4 p-3 bg-white border-t border-slate-100 text-slate-800 font-medium items-center">
                  <span>{tr(activeReceipt.commodity)} ({tr(activeReceipt.variety)})</span>
                  <span>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                      {tr(activeReceipt.grade)}
                    </span>
                  </span>
                  <span>{activeReceipt.quantityQuintals} {tr("Quintals")}</span>
                  <span className="text-right font-bold text-slate-900">
                    ₹{activeReceipt.agreedPricePerQuintal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Financial Total & Settlement Mode */}
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-emerald-900 font-semibold block">
                    {tr("Payment & Settlement Status")}
                  </span>
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    {tr(activeReceipt.status)} {tr("via")} {tr(activeReceipt.paymentMode)}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">
                    {tr("Net Payable Amount")}
                  </span>
                  <div className="text-2xl font-black text-slate-900 font-['Outfit']">
                    ₹{activeReceipt.totalAmount.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* QR Code Validation Box */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
                {/* Visual SVG QR Code */}
                <div className="p-2 bg-white rounded-xl shadow-xs border border-slate-200 shrink-0">
                  <svg width="90" height="90" viewBox="0 0 100 100" fill="none">
                    {/* Outer corners */}
                    <rect x="5" y="5" width="30" height="30" fill="black" />
                    <rect x="10" y="10" width="20" height="20" fill="white" />
                    <rect x="15" y="15" width="10" height="10" fill="black" />

                    <rect x="65" y="5" width="30" height="30" fill="black" />
                    <rect x="70" y="10" width="20" height="20" fill="white" />
                    <rect x="75" y="15" width="10" height="10" fill="black" />

                    <rect x="5" y="65" width="30" height="30" fill="black" />
                    <rect x="10" y="70" width="20" height="20" fill="white" />
                    <rect x="15" y="75" width="10" height="10" fill="black" />

                    {/* Data bits */}
                    <rect x="42" y="10" width="6" height="6" fill="black" />
                    <rect x="50" y="18" width="6" height="6" fill="black" />
                    <rect x="42" y="28" width="6" height="6" fill="black" />
                    <rect x="10" y="42" width="6" height="6" fill="black" />
                    <rect x="25" y="48" width="6" height="6" fill="black" />
                    <rect x="42" y="42" width="16" height="16" fill="black" />
                    <rect x="65" y="45" width="6" height="6" fill="black" />
                    <rect x="80" y="52" width="6" height="6" fill="black" />
                    <rect x="45" y="65" width="6" height="6" fill="black" />
                    <rect x="55" y="75" width="6" height="6" fill="black" />
                    <rect x="70" y="80" width="12" height="6" fill="black" />
                  </svg>
                </div>

                <div className="text-xs space-y-1 text-slate-700 text-center sm:text-left">
                  <span className="font-bold text-slate-900 block">
                    {tr("Cryptographic APMC Gate Pass Verification")}
                  </span>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {tr("Scan at any e-NAM mandi terminal or weighbridge to verify authentic produce quality grade, seller authenticity, and weighbridge allocation.")}
                  </p>
                  <div className="text-[10px] font-mono text-slate-600">
                    HASH: SHA256:{activeReceipt.transactionCode}-09A14B
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={printReceipt}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{tr("Print Receipt")}</span>
                </button>

                <button
                  onClick={printReceipt}
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{tr("Download PDF Pass")}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500">
              {tr("Select a transaction to view digital pass.")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
