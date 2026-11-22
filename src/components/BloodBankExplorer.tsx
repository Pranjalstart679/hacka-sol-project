import React, { useState } from 'react';
import { BloodBank, BloodGroup } from '../types';
import { Building2, Search, MapPin, Phone, ShieldCheck, Clock, Filter } from 'lucide-react';

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
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-800 mb-2">
          <Building2 className="w-3.5 h-3.5 text-red-600" /> Live Inventory Registry
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Blood Bank & Component Centers
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Real-time verified stock and 24x7 helpline contacts across regional centers.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search hospital name, city, or district..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-red-500 outline-none"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white outline-none"
          >
            <option value="ALL">All Categories</option>
            <option value="Government">Government Hospitals</option>
            <option value="Red Cross">Red Cross Society</option>
            <option value="Private">Private / Charitable</option>
          </select>

          {/* Blood Group Filter */}
          <select
            value={filterGroup}
            onChange={(e) => setFilterGroup(e.target.value as any)}
            className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white outline-none"
          >
            <option value="ALL">All Blood Types</option>
            {ALL_GROUPS.map((g) => (
              <option key={g} value={g}>{g} in Stock</option>
            ))}
          </select>
        </div>
      </div>

      {/* Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((bank) => (
          <div
            key={bank.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  bank.category === 'Government' ? 'bg-blue-100 text-blue-800' :
                  bank.category === 'Red Cross' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-800'
                }`}>
                  {bank.category}
                </span>

                <span className="text-xs font-extrabold text-slate-700 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-red-600" />
                  {bank.distanceKm} km away
                </span>
              </div>

              <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                {bank.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {bank.address}
              </p>

              <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-600">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{bank.is24x7 ? '24 Hours Emergency' : 'Standard Shifts'}</span>
                <span>•</span>
                <span className="text-slate-400">{bank.lastUpdated}</span>
              </div>

              {/* Stock Matrix Grid */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
                  Units in Stock:
                </div>
                <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
                  {ALL_GROUPS.map((g) => {
                    const count = bank.stock[g];
                    return (
                      <div
                        key={g}
                        className={`p-1.5 rounded-lg border ${
                          count > 0 
                            ? 'bg-slate-50 border-slate-200 text-slate-800' 
                            : 'bg-red-50/50 border-red-100 text-slate-400'
                        }`}
                      >
                        <div className="text-[10px] font-bold text-slate-500">{g}</div>
                        <div className={`font-black text-xs ${count > 0 ? 'text-slate-900' : 'text-red-400'}`}>
                          {count}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <a
                href={`tel:${bank.phone}`}
                className="w-full py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                {bank.phone}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
