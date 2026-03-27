import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { TrendingUp, Users, MousePointer2, Target, ArrowUpRight } from 'lucide-react'

const weekly = [
  { day: 'Mon', sessions: 420, conv: 18 },
  { day: 'Tue', sessions: 380, conv: 14 },
  { day: 'Wed', sessions: 650, conv: 28 },
  { day: 'Thu', sessions: 820, conv: 38 },
  { day: 'Fri', sessions: 510, conv: 22 },
  { day: 'Sat', sessions: 940, conv: 42 },
  { day: 'Sun', sessions: 730, conv: 31 },
]

const topPages = [
  { page: '/home', sessions: 1200, conv: 25 },
  { page: '/pricing', sessions: 800, conv: 42 },
  { page: '/blog/ai-marketing', sessions: 600, conv: 18 },
  { page: '/features', sessions: 450, conv: 9 },
]

const kpis = [
  { label: 'Total Sessions', value: '4,450', change: '+12.5%', icon: Users, color: 'text-brand-600', bg: 'bg-brand-50' },
  { label: 'Conversions', value: '193', change: '+8.2%', icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'CTR (LinkedIn)', value: '3.4%', change: '+0.5%', icon: MousePointer2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { label: 'Avg. ROAS', value: '8.4×', change: '+2.1%', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
]

export default function Analytics() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Performance Analytics</h2>
          <p className="text-slate-500 text-sm mt-0.5">Real-time insights from GA4 and social integrations.</p>
        </div>
        <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> LIVE · LAST 7 DAYS
        </span>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map(k => (
          <div key={k.label} className="stat-card">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2.5 ${k.bg} ${k.color} rounded-xl`}><k.icon size={20} /></div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg flex items-center gap-0.5">
                <ArrowUpRight size={12} />{k.change}
              </span>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{k.label}</p>
            <h3 className="text-3xl font-black text-slate-900">{k.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sessions trend */}
        <div className="card">
          <h3 className="font-black text-slate-900 mb-5">Weekly Sessions</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={weekly}>
              <defs>
                <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284c7" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{fontSize:11,fill:'#94a3b8'}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:'#94a3b8'}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{borderRadius:10,border:'0.5px solid #e2e8f0',fontSize:12}}/>
              <Area type="monotone" dataKey="sessions" stroke="#0284c7" strokeWidth={2} fill="url(#sg)"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Conversions bar */}
        <div className="card">
          <h3 className="font-black text-slate-900 mb-5">Daily Conversions</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weekly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{fontSize:11,fill:'#94a3b8'}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:'#94a3b8'}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{borderRadius:10,border:'0.5px solid #e2e8f0',fontSize:12}}/>
              <Bar dataKey="conv" fill="#10b981" radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top pages */}
      <div className="card">
        <h3 className="font-black text-slate-900 mb-5">Top Performing Pages</h3>
        <div className="space-y-3">
          {topPages.map((p, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-xs font-black">{i+1}</div>
                <span className="font-medium text-slate-700 text-sm">{p.page}</span>
              </div>
              <div className="flex items-center gap-8 text-right">
                <div><p className="text-[10px] text-slate-400 uppercase tracking-widest">Sessions</p><p className="font-black text-slate-900 text-sm">{p.sessions.toLocaleString()}</p></div>
                <div><p className="text-[10px] text-slate-400 uppercase tracking-widest">Conv.</p><p className="font-black text-emerald-600 text-sm">{p.conv}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
