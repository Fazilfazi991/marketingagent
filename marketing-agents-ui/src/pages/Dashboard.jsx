import React from 'react'
import { Target, FileText, TrendingUp, Users, ArrowUpRight, Clock, CheckCircle2, Play } from 'lucide-react'

const stats = [
  { label: 'Active Campaigns', value: '12', trend: '+2 this week', icon: Target, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Content Units', value: '148', trend: '+24 today', icon: FileText, color: 'text-violet-600', bg: 'bg-violet-50' },
  { label: 'Avg. Engagement', value: '4.2%', trend: '+0.5% vs last week', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Total Reach', value: '48.5k', trend: '+12% this month', icon: Users, color: 'text-sky-600', bg: 'bg-sky-50' },
]

const pipelines = [
  { id: 'C1', name: 'Enterprise SaaS Launch — Acme Corp', status: 'running', updated: '8 mins ago' },
  { id: 'C2', name: 'Q2 Content Push — Globex Industries', status: 'done', updated: '1 hr ago' },
  { id: 'C3', name: 'Seasonal Promo — Soylent Corp', status: 'running', updated: '22 mins ago' },
]

const recentContent = [
  { type: 'Blog', platform: 'WordPress', eff: 'HIGH' },
  { type: 'Thread', platform: 'X (Twitter)', eff: 'HIGH' },
  { type: 'Email', platform: 'Mailchimp', eff: 'MED' },
  { type: 'Post', platform: 'LinkedIn', eff: 'HIGH' },
]

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">System Overview</h2>
          <p className="text-slate-500 text-sm mt-0.5">Real-time performance across all connected agents.</p>
        </div>
        <button className="btn-primary flex items-center gap-2"><Play size={14} fill="currentColor" /> New Campaign</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2.5 rounded-xl ${s.bg} ${s.color}`}><s.icon size={20} /></div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg flex items-center gap-0.5">
                <ArrowUpRight size={12} />{s.trend.split(' ')[0]}
              </span>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
            <h3 className="text-3xl font-black text-slate-900">{s.value}</h3>
            <p className="text-xs text-slate-400 mt-1">{s.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Pipelines */}
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-black text-slate-900">Active Pipelines</h3>
            <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
              {pipelines.filter(p => p.status === 'running').length} RUNNING
            </span>
          </div>
          <div className="space-y-3">
            {pipelines.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-transparent hover:border-brand-100 hover:bg-white transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-slate-900 text-white rounded-lg flex items-center justify-center text-xs font-black">{p.id}</div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 leading-tight">{p.name}</p>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5"><Clock size={10} /> {p.updated}</p>
                  </div>
                </div>
                {p.status === 'running'
                  ? <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
                  : <CheckCircle2 size={18} className="text-emerald-500" />
                }
              </div>
            ))}
          </div>
        </div>

        {/* Recent Content */}
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-black text-slate-900">Recent Content</h3>
            <button className="text-xs font-bold text-slate-400 hover:text-brand-600 transition">VIEW ALL</button>
          </div>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="pb-3">Type</th>
                <th className="pb-3">Platform</th>
                <th className="pb-3">Efficiency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentContent.map((c, i) => (
                <tr key={i} className="hover:bg-slate-50 transition cursor-pointer">
                  <td className="py-3">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-black uppercase tracking-wide">{c.type}</span>
                  </td>
                  <td className="py-3 font-medium text-slate-700">{c.platform}</td>
                  <td className="py-3">
                    <span className={`flex items-center gap-1 text-xs font-bold ${c.eff === 'HIGH' ? 'text-emerald-600' : 'text-amber-600'}`}>
                      <CheckCircle2 size={13} /> {c.eff}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
