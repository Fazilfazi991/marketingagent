import React, { useState } from 'react'
import { Megaphone, Plus, Calendar, MoreVertical, Play, Pause } from 'lucide-react'

const DAYS = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']

const CAMPAIGNS = [
  { id:1, name:'Enterprise SaaS Launch', client:'Acme Corp', status:'Active', runs:24, date:'Mar 15, 2026', schedule:{hour:9,day:'monday'} },
  { id:2, name:'Q2 Content Push', client:'Globex', status:'Active', runs:18, date:'Mar 10, 2026', schedule:{hour:14,day:'wednesday'} },
  { id:3, name:'Seasonal Promo', client:'Soylent Corp', status:'Paused', runs:6, date:'Mar 1, 2026', schedule:{hour:10,day:'friday'} },
]

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState(CAMPAIGNS)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Campaigns</h2>
          <p className="text-slate-500 text-sm mt-0.5">Create and manage marketing pipelines for your clients.</p>
        </div>
        <button className="btn-primary flex items-center gap-2"><Plus size={16} /> New Campaign</button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">Campaign</th>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Runs</th>
              <th className="px-6 py-4">Schedule (UTC)</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {campaigns.map(c => (
              <tr key={c.id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-50 text-brand-600 rounded-lg"><Megaphone size={16} /></div>
                    <span className="font-semibold text-slate-900">{c.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">{c.client}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${c.status==='Active'?'bg-emerald-100 text-emerald-700':'bg-slate-100 text-slate-500'}`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600 font-medium">{c.runs}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <select defaultValue={c.schedule.day}
                      className="text-xs bg-slate-100 border border-slate-200 rounded-lg px-2 py-1.5 capitalize focus:outline-none">
                      {DAYS.map(d => <option key={d} value={d}>{d.charAt(0).toUpperCase()+d.slice(1)}</option>)}
                    </select>
                    <select defaultValue={c.schedule.hour}
                      className="text-xs bg-slate-100 border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none">
                      {Array.from({length:24},(_,i)=>i).map(h => <option key={h} value={h}>{String(h).padStart(2,'0')}:00</option>)}
                    </select>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-slate-700 transition"><MoreVertical size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
