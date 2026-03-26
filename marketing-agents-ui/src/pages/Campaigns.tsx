import React from 'react';
import { 
  Megaphone, 
  Plus, 
  MoreVertical, 
  Calendar,
  Users,
  Settings
} from 'lucide-react';
import SchedulePicker from './SchedulePicker';

const Campaigns = () => {
  const campaigns = [
    { id: 1, name: 'Product Launch 2026', client: 'Acme Corp', status: 'Active', runs: 24, date: 'Mar 26, 2026', schedule: { hour: 9, day_of_week: 'monday' } },
    { id: 2, name: 'Seasonal Promo', client: 'Globex', status: 'Paused', runs: 12, date: 'Mar 20, 2026', schedule: { hour: 14, day_of_week: 'friday' } },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Campaign Management</h2>
          <p className="text-slate-500">Create and track marketing campaigns for your clients.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition">
          <Plus size={20} />
          Create New Campaign
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <th className="px-6 py-4">Campaign Name</th>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Total Runs</th>
              <th className="px-6 py-4">Created Date</th>
              <th className="px-6 py-4">Automation Schedule (UTC)</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 italic-last-row">
            {campaigns.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50 transition drop-shadow-sm">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-50 text-brand-600 rounded-lg">
                      <Megaphone size={18} />
                    </div>
                    <span className="font-bold text-slate-900">{c.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 font-medium">{c.client}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${c.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 text-center pr-12">{c.runs}</td>
                <td className="px-6 py-4 text-sm text-slate-500">
                   <div className="flex items-center gap-1.5"><Calendar size={14} /> {c.date}</div>
                </td>
                <td className="px-6 py-4">
                   <SchedulePicker currentConfig={c.schedule} onChange={(val) => console.log('PATCH client schedule:', val)} />
                </td>
                <td className="px-6 py-4 text-slate-400 hover:text-slate-600 cursor-pointer text-right">
                  <MoreVertical size={20} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Campaigns;
