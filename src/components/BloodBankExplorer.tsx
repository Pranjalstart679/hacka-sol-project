import React, { useState } from 'react';
import { BloodBank, BloodGroup } from '../types';
import { Search, MapPin, Phone, Clock, Navigation } from 'lucide-react';

interface BloodBankExplorerProps {
  bloodBanks: BloodBank[];
  onSelectGroupForSOS?: (group: BloodGroup) => void;
}

const ALL_GROUPS: BloodGroup[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

export const BloodBankExplorer: React.FC<BloodBankExplorerProps> = ({ bloodBanks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [filterGroup, setFilterGroup] = useState<BloodGroup | 'ALL'>('ALL');

  const filtered = bloodBanks.filter((bank) => {
    const matchesSearch = bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bank.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bank.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = filterCategory === 'ALL' || bank.category === filterCategory;

    const matchesGroup = filterGroup === 'ALL' || bank.stock[filterGroup] > 0;

    return matchesSearch && matchesCategory && matchesGroup;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Editorial Header */}
      <div className="border border-neutral-200 bg-white rounded-xl p-6 sm:p-10 space-y-3">
        <span className="font-mono text-xs uppercase tracking-wider text-red-700 font-semibold block">
          National Storage Registry
        </span>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tightest leading-[1.1]">
          Verified Blood Bank & Hospital Inventory
        </h1>
        <p className="text-sm text-neutral-600 max-w-2xl leading-generous font-sans">
          Real-time unit availability, 24-hour emergency helplines, and distance calculations from your active location.
        </p>

        {/* Search and Filters Bar */}
        <div className="pt-4 border-t border-neutral-200 grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search facility name, district, or hospital..."
              className="w-full pl-10 pr-4 py-2 rounded border border-neutral-300 text-xs font-sans focus:border-neutral-900 outline-none"
            />
          </div>

          {/* Category Filter */}
          <div className="md:col-span-3">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 rounded border border-neutral-300 text-xs font-mono text-neutral-700 bg-white outline-none"
            >
              <option value="ALL">All Categories</option>
              <option value="Government">Government Hospitals</option>
              <option value="Red Cross">Red Cross Society</option>
              <option value="Private">Private / Charitable</option>
            </select>
          </div>

          {/* Blood Group Filter */}
          <div className="md:col-span-3">
            <select
              value={filterGroup}
              onChange={(e) => setFilterGroup(e.target.value as any)}
              className="w-full px-3 py-2 rounded border border-neutral-300 text-xs font-mono text-neutral-700 bg-white outline-none"
            >
              <option value="ALL">All Blood Types</option>
              {ALL_GROUPS.map((g) => (
                <option key={g} value={g}>{g} in Stock</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Registry Count */}
      <div className="flex items-center justify-between text-xs font-mono text-neutral-500 px-1">
        <span>Showing {filtered.length} Indexed Blood Centers</span>
        <span>Verified Inventory Telemetry</span>
      </div>

      {/* Facilities Ledger Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((bank) => (
          <div
            key={bank.id}
            className="border border-neutral-200 rounded-xl p-6 bg-white flex flex-col justify-between space-y-5"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2 font-mono text-[10px]">
                <span className="px-2 py-0.5 rounded uppercase tracking-wider font-semibold border border-neutral-300 bg-neutral-100 text-neutral-800">
                  {bank.category}
                </span>

                <span className="text-neutral-700 font-semibold flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-red-700" />
                  {bank.distanceKm} km away
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-neutral-900 tracking-tightest leading-snug">
                {bank.name}
              </h3>
              <p className="text-xs text-neutral-500 mt-1 line-clamp-2 font-sans">
                {bank.address}
              </p>

              <div className="flex items-center gap-2 mt-2 text-[11px] text-neutral-500 font-mono">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <span>{bank.is24x7 ? '24 Hours Open' : 'Standard Shifts'}</span>
                <span>•</span>
                <span>Updated: {bank.lastUpdated}</span>
              </div>

              {/* Stock Ledger */}
              <div className="mt-4 pt-4 border-t border-neutral-100">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-2">
                  Inventory By Component:
                </span>
                <div className="grid grid-cols-4 gap-1.5 font-mono text-center">
                  {ALL_GROUPS.map((g) => {
                    const count = bank.stock[g];
                    return (
                      <div
                        key={g}
                        className={`p-1.5 rounded border ${
                          count > 0 
                            ? 'bg-neutral-50 border-neutral-200 text-neutral-900' 
                            : 'bg-neutral-50/50 border-neutral-100 text-neutral-400'
                        }`}
                      >
                        <div className="text-[10px] text-neutral-500">{g}</div>
                        <div className={`font-bold text-xs ${count > 0 ? 'text-neutral-900' : 'text-neutral-400'}`}>
                          {count}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 flex items-center gap-2 font-sans">
              <a
                href={`tel:${bank.phone}`}
                className="flex-1 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors border border-neutral-800"
              >
                <Phone className="w-3.5 h-3.5 text-neutral-300" />
                Call Helpline: {bank.phone}
              </a>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${bank.latitude},${bank.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded flex items-center justify-center gap-1 border border-neutral-200 transition-colors"
                title="Directions"
              >
                <Navigation className="w-3.5 h-3.5 text-neutral-600" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};