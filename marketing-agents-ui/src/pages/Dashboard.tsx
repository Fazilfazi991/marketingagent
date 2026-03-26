import React from 'react';
import { 
  TrendingUp, 
  Target, 
  FileText, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight 
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Active Campaigns', value: '12', icon: Target, trend: '+2', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Content Units', value: '148', icon: FileText, trend: '+24', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Avg. Engagement', value: '4.2%', icon: TrendingUp, trend: '+0.5%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Total Reach', value: '48.5k', icon: CheckCircle2, trend: '+12%', color: 'text-sky-600', bg: 'bg-sky-50' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">System Overview</h2>
          <p className="text-slate-500 font-medium">Real-time performance metrics across all connected agents.</p>
        </div>
        <button className="btn-primary">
          NEW CAMPAIGN
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card p-8 rounded-3xl group hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-start justify-between mb-6">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={26} />
              </div>
              <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs bg-emerald-50 px-2 py-1 rounded-lg">
                <span>{stat.trend}</span>
                <ArrowUpRight size={14} />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="glass-card p-10 rounded-3xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Active Pipelines</h3>
            <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full uppercase">8 RUNNING NOW</span>
          </div>
          <div className="space-y-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white border border-slate-100 hover:border-brand-200 hover:shadow-md transition-all group">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black group-hover:bg-brand-600 transition-colors">
                    C{i}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Campaign {i}: Enterprise SaaS Launch</h4>
                    <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mt-0.5">
                      <Clock size={12} /> Last update: 14 mins ago
                    </p>
                  </div>
                </div>
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-10 rounded-3xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Recent Content</h3>
            <button className="text-xs font-bold text-slate-400 hover:text-brand-600 transition-colors">VIEW ALL</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <th className="pb-5">Type</th>
                  <th className="pb-5">Target Platform</th>
                  <th className="pb-5">Efficiency</th>
                </tr>
              </thead>
              <tbody className="text-sm italic">
                {[1, 2, 3, 4].map((i) => (
                  <tr key={i} className="group cursor-pointer">
                    <td className="py-5 border-b border-slate-50">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-wider group-hover:bg-brand-100 group-hover:text-brand-600 transition-colors">
                        {['Blog', 'Thread', 'Email', 'Post'][i % 4]}
                      </span>
                    </td>
                    <td className="py-5 border-b border-slate-50 font-bold text-slate-700">LinkedIn Corp Page</td>
                    <td className="py-5 border-b border-slate-50">
                      <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                        <CheckCircle2 size={16} /> 
                        <span className="text-xs">HIGH</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
