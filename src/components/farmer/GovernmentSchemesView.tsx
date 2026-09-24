import React, { useState } from 'react';
import { GOVERNMENT_SCHEMES } from '../../data/governmentSchemes';
import { GovernmentScheme } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import {
  Landmark,
  ExternalLink,
  ShieldCheck,
  FileText,
  Calendar,
  CheckCircle2,
  Filter,
  ChevronDown
} from 'lucide-react';

export const GovernmentSchemesView: React.FC = () => {
  const { tr } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedSchemeId, setExpandedSchemeId] = useState<string | null>(null);

  const categories = [
    'All',
    'Post-Harvest Infrastructure',
    'Processing & Value Addition',
    'Price Support & Insurance'
  ];

  const filteredSchemes = GOVERNMENT_SCHEMES.filter((s) => {
    return selectedCategory === 'All' || s.category === selectedCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit'] tracking-tight text-slate-900 flex items-center gap-2.5">
            <span>🏛️</span>
            <span>{tr("Government Schemes & Subsidies")}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {tr("Official post-harvest subsidies, interest subvention, and infrastructure grants. Direct links to official portals.")}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>{tr("Verified Government Portals Only (.gov.in / .nic.in)")}</span>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              selectedCategory === cat
                ? 'bg-emerald-700 text-white font-bold shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat === 'All' ? tr('All Schemes') : tr(cat)}
          </button>
        ))}
      </div>

      {/* Scheme Cards */}
      <div className="space-y-4">
        {filteredSchemes.map((scheme) => {
          const isExpanded = expandedSchemeId === scheme.id;

          return (
            <div
              key={scheme.id}
              className="rounded-2xl p-6 bg-white border border-slate-200 hover:border-slate-300 shadow-xs transition space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
                      {tr(scheme.category)}
                    </span>
                    <span className="text-[11px] font-semibold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      {tr(scheme.subsidyPercentage)}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-['Outfit'] text-slate-900">
                    {tr(scheme.name)} ({scheme.shortCode})
                  </h3>

                  <p className="text-xs text-emerald-800 font-medium mt-0.5">
                    {tr(scheme.ministry)}
                  </p>
                </div>

                <a
                  href={scheme.officialPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shrink-0 shadow-xs"
                >
                  <span>{tr("Official Portal")}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Benefits Summary */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-1">
                  {tr("Scheme Benefits")}:
                </strong>
                {tr(scheme.benefits)}
              </div>

              {/* Accordion Toggle for Detailed Eligibility & Documents */}
              <div>
                <button
                  onClick={() => setExpandedSchemeId(isExpanded ? null : scheme.id)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-900 transition cursor-pointer"
                >
                  <span>{isExpanded ? tr('Hide Eligibility & Documents') : tr('View Eligibility Criteria & Required Documents')}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block mb-1.5">
                        {tr("Who is Eligible?")}
                      </span>
                      <ul className="space-y-1 text-slate-700">
                        {scheme.eligibility.map((el, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                            <span>{tr(el)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block mb-1.5">
                        {tr("Mandatory Documents")}
                      </span>
                      <ul className="space-y-1 text-slate-700">
                        {scheme.documentsRequired.map((doc, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                            <span>{tr(doc)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Freshness */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>{tr("Last Verified on Government Gazette")}: {scheme.lastVerifiedDate}</span>
                </span>
                <span>Portal: {scheme.officialPortalUrl.replace('https://', '')}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
