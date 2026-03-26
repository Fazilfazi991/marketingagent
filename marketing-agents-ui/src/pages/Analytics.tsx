import React from 'react';
// import { 
//   BarChart, 
//   Bar, 
//   XAxis, 
//   YAxis, 
//   CartesianGrid, 
//   Tooltip, 
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   AreaChart,
//   Area 
// } from 'recharts';
import { 
  TrendingUp, 
  Users, 
  MousePointer2, 
  Target,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const Analytics = () => {
  // const data = [
  //   { name: 'Mon', sessions: 400, conv: 20 },
  //   { name: 'Tue', sessions: 300, conv: 15 },
  //   { name: 'Wed', sessions: 600, conv: 25 },
  //   { name: 'Thu', sessions: 800, conv: 35 },
  //   { name: 'Fri', sessions: 500, conv: 22 },
  //   { name: 'Sat', sessions: 900, conv: 40 },
  //   { name: 'Sun', sessions: 700, conv: 30 },
  // ];

  const kpis = [
    { title: 'Total Sessions', value: '4,210', change: '+12.5%', icon: Users, color: 'text-brand-600', bg: 'bg-brand-50' },
    { title: 'Conversions', value: '182', change: '+8.2%', icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'CTR (LinkedIn)', value: '3.4%', change: '+0.5%', icon: MousePointer2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Ad Performance', value: '8.4x', change: '-2.1%', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50', negative: true },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Performance Analytics</h2>
          <p className="text-slate-500 font-medium">Real-time insights from GA4 and social integrations.</p>
        </div>
        <div className="flex gap-2">
           <span className="px-4 py-2 bg-white border border-slate-200 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              DATA LIVE: LAST 7 DAYS
           </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {kpis.map((kpi) => (
          <div key={kpi.title} className="glass-card p-8 rounded-3xl group hover:scale-[1.02] transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
               <div className={`p-3 ${kpi.bg} ${kpi.color} rounded-2xl`}>
                  <kpi.icon size={24} />
               </div>
               <div className={`flex items-center gap-0.5 text-xs font-black ${kpi.negative ? 'text-rose-500 bg-rose-50' : 'text-emerald-500 bg-emerald-50'} px-2 py-1 rounded-lg`}>
                  {kpi.negative ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
                  {kpi.change}
               </div>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{kpi.title}</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">{kpi.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="glass-card p-10 rounded-3xl min-h-[400px] flex items-center justify-center bg-slate-50/50">
           <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center mx-auto">
                 <TrendingUp size={32} />
              </div>
              <p className="text-slate-400 font-bold text-sm">Visual charts are temporarily optimizing.<br/>Metrics are available in the scorecards above.</p>
           </div>
        </div>

        <div className="glass-card p-10 rounded-3xl overflow-hidden">
           <h3 className="text-xl font-black text-slate-900 mb-8">Top Performing Pages</h3>
           <div className="space-y-4">
              {[
                { path: '/home', sessions: '1,200', rate: '2.5%' },
                { path: '/pricing', sessions: '800', rate: '4.2%' },
                { path: '/blog/ai-marketing-2026', sessions: '600', rate: '1.8%' },
                { path: '/features', sessions: '450', rate: '0.9%' },
              ].map((page, i) => (
                <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white border border-slate-50 hover:border-brand-100 hover:shadow-md transition-all group">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center text-xs font-black group-hover:bg-brand-600 transition-colors">
                         {i+1}
                      </div>
                      <span className="text-sm font-bold text-slate-700">{page.path}</span>
                   </div>
                   <div className="flex items-center gap-10">
                      <div className="text-right">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sessions</p>
                         <p className="text-sm font-black text-slate-900">{page.sessions}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Conv Rate</p>
                         <p className="text-sm font-black text-emerald-600">{page.rate}</p>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
