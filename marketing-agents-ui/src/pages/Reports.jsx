import React from 'react'
import { BarChart3, Download, FileText, ArrowRight, Layers } from 'lucide-react'

const reports = [
  { name: 'Campaign_Report_Week_12.pdf', client: 'Acme Corp', size: '4.2MB', date: 'Mar 27, 2026' },
  { name: 'Campaign_Report_Week_11.pdf', client: 'Acme Corp', size: '3.8MB', date: 'Mar 20, 2026' },
  { name: 'Campaign_Report_Week_10.pdf', client: 'Globex', size: '5.1MB', date: 'Mar 13, 2026' },
]

export default function Reports() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-slate-900">Weekly Reports</h2>
        <p className="text-slate-500 text-sm mt-0.5">AI-generated PDF reports with analytics, wins, and recommendations.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card relative overflow-hidden group cursor-pointer hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition"><BarChart3 size={100} /></div>
          <h3 className="text-lg font-black text-slate-900 mb-2">Performance Summary</h3>
          <p className="text-slate-500 text-sm mb-5">Deep dive into agent efficiency, engagement rates, and conversion metrics.</p>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl font-semibold text-sm hover:bg-brand-600 transition">Generate Report <ArrowRight size={16} /></button>
        </div>
        <div className="bg-brand-600 p-6 rounded-2xl shadow-xl text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition"><Layers size={100} /></div>
          <h3 className="text-lg font-black mb-2">ROI Tracker</h3>
          <p className="text-brand-100 text-sm mb-5">Track cost vs. estimated value generated across all tiers.</p>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white text-brand-600 rounded-xl font-semibold text-sm hover:bg-brand-50 transition">View Analytics <ArrowRight size={16} /></button>
        </div>
      </div>
      <div className="card">
        <h3 className="font-black text-slate-900 mb-5 flex items-center gap-2"><FileText className="text-brand-500" size={18} /> Download History</h3>
        <div className="space-y-2">
          {reports.map((r, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 text-slate-500 rounded-lg flex items-center justify-center text-[10px] font-black">PDF</div>
                <div>
                  <p className="font-medium text-slate-900 text-sm">{r.name}</p>
                  <p className="text-xs text-slate-400">{r.client} · {r.size} · {r.date}</p>
                </div>
              </div>
              <button className="p-2 text-slate-400 hover:text-brand-600 transition"><Download size={18} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
