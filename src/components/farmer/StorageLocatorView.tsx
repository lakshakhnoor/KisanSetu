import React, { useState } from 'react';
import { STORAGE_FACILITIES } from '../../data/storageFacilities';
import { StorageFacility } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import {
  Warehouse,
  MapPin,
  Phone,
  Thermometer,
  ShieldCheck,
  CheckCircle2,
  Filter,
  Navigation,
  ExternalLink,
  Search
} from 'lucide-react';

export const StorageLocatorView: React.FC = () => {
  const { tr } = useLanguage();
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [bookingSuccessId, setBookingSuccessId] = useState<string | null>(null);

  const filteredFacilities = STORAGE_FACILITIES.filter((f) => {
    const matchesType = selectedType === 'All' || f.type === selectedType;
    const matchesCrop = selectedCrop === 'All' || f.supportedCrops.includes(selectedCrop);
    return matchesType && matchesCrop;
  });

  const handleBookSpace = (id: string) => {
    setBookingSuccessId(id);
    setTimeout(() => {
      setBookingSuccessId(null);
    }, 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit'] tracking-tight text-slate-900 flex items-center gap-2.5">
            <span>🏬</span>
            <span>{tr("Storage & Warehousing Locator")}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {tr("Verified cold storages, CA multi-chamber units, and WDRA accredited grain warehouses.")}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>{tr("WDRA & State Regulated Facilities")}</span>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 text-xs text-slate-700">
          <Filter className="w-4 h-4 text-emerald-700" />
          <span className="font-semibold">{tr("Filter Facilities")}:</span>
        </div>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-700 cursor-pointer"
        >
          <option value="All">{tr("All Facility Types")}</option>
          <option value="Cold Storage">{tr("Cold Storage")}</option>
          <option value="CA Controlled Atmosphere">{tr("CA Controlled Atmosphere")}</option>
          <option value="Warehouse (Dry)">{tr("Dry Warehouse (Grain/Pulses)")}</option>
          <option value="Pack House">{tr("Pack House & Ripening")}</option>
        </select>

        <select
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
          className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-700 cursor-pointer"
        >
          <option value="All">{tr("All Crops")}</option>
          <option value="Tomato">{tr("Tomato")}</option>
          <option value="Potato">{tr("Potato")}</option>
          <option value="Onion">{tr("Onion")}</option>
          <option value="Wheat">{tr("Wheat")}</option>
          <option value="Soybean">{tr("Soybean")}</option>
        </select>
      </div>

      {/* Facility Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFacilities.map((facility) => (
          <div
            key={facility.id}
            className="rounded-2xl p-5 bg-white border border-slate-200 hover:border-slate-300 shadow-xs transition flex flex-col justify-between"
          >
            <div>
              {/* Header Badge & Distance */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-sky-50 text-sky-800 border border-sky-200 uppercase tracking-wider">
                  {tr(facility.type)}
                </span>

                <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                  <Navigation className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{facility.distanceKm} km {tr("away")}</span>
                </span>
              </div>

              <h4 className="text-lg font-bold text-slate-900 font-['Outfit'] line-clamp-1">
                {tr(facility.name)}
              </h4>

              <div className="flex items-center gap-1 text-xs text-slate-600 mt-1 mb-3">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{tr(facility.district)}, {tr(facility.state)}</span>
              </div>

              {/* Metrics Box */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 mb-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">{tr("Rate / Quintal")}:</span>
                  <span className="text-emerald-800 font-bold">
                    ₹{facility.costPerQuintalPerMonth} / {tr("month")}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">{tr("Available Space")}:</span>
                  <span className="text-slate-900 font-semibold">
                    {facility.availableCapacityQuintals.toLocaleString()} Q / {facility.totalCapacityQuintals.toLocaleString()} Q
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">{tr("Temperature")}:</span>
                  <span className="text-slate-700 font-medium">
                    {facility.temperatureRangeCelsius}
                  </span>
                </div>
              </div>

              {/* Supported Crops */}
              <div className="mb-4">
                <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                  {tr("Supported Produce")}:
                </span>
                <div className="flex flex-wrap gap-1">
                  {facility.supportedCrops.map((crop) => (
                    <span
                      key={crop}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                    >
                      {tr(crop)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions: Direct Call & Reserve Space */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{facility.contactNumber}</span>
                </span>

                {facility.verifiedGovtRegistry && (
                  <span className="text-[10px] text-emerald-800 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                    <span>{tr("WDRA Verified")}</span>
                  </span>
                )}
              </div>

              {bookingSuccessId === facility.id ? (
                <div className="w-full py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs text-center shadow-xs">
                  {tr("Space Reservation Request Sent! Mandi Manager will call you.")}
                </div>
              ) : (
                <button
                  onClick={() => handleBookSpace(facility.id)}
                  className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Warehouse className="w-3.5 h-3.5" />
                  <span>{tr("Reserve Storage Slot")}</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
