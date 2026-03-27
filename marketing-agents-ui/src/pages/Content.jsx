// Content.jsx
import React, { useState } from 'react'
import { Search, Filter, FileText, Mail, Eye, ExternalLink, MoreHorizontal } from "lucide-react"

const CONTENT = [
  { id:1, title:'The Future of AI Marketing', platform:'Blog', client:'Acme Corp', date:'Mar 24', status:'Approved', type:'blog' },
  { id:2, title:'Q1 Performance Thread', platform:'X (Twitter)', client:'Globex', date:'Mar 23', status:'Draft', type:'social' },
  { id:3, title:'Product Launch Announcement', platform:'LinkedIn', client:'Soylent Corp', date:'Mar 22', status:'Approved', type:'social' },
  { id:4, title:'Growth Strategies 2026', platform:'Blog', client:'Umbrella Co', date:'Mar 21', status:'Review', type:'blog' },
  { id:5, title:'Welcome Email Sequence', platform:'Mailchimp', client:'Acme Corp', date:'Mar 20', status:'Approved', type:'email' },
  { id:6, title:'Feature Spotlight Post', platform:'LinkedIn', client:'Globex', date:'Mar 19', status:'Draft', type:'social' },
]

const typeIcon = (t) => {
  if (t==='blog') return <FileText className="text-brand-600" size={28} />
  if (t==='email') return <Mail className="text-amber-600" size={28} />
  return <Linkedin className="text-blue-600" size={28} />
}

const statusColor = (s) => {
  if (s==='Approved') return 'bg-emerald-500 text-white'
  if (s==='Draft') return 'bg-slate-400 text-white'
  return 'bg-amber-500 text-white'
}

export function Content() {
  const [q, setQ] = useState('')
  const filtered = CONTENT.filter(c => c.title.toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Content Library</h2>
          <p className="text-slate-500 text-sm mt-0.5">Manage and distribute your AI-generated assets.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search content..."
              className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 w-60" />
          </div>
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-brand-600 transition"><Filter size={17} /></button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(item => (
          <div key={item.id} className="glass-card rounded-2xl overflow-hidden flex hover:shadow-md transition-all">
            <div className="w-32 bg-slate-100 flex items-center justify-center relative shrink-0">
              {typeIcon(item.type)}
              <span className={`absolute top-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-black uppercase ${statusColor(item.status)}`}>{item.status}</span>
            </div>
            <div className="flex-1 p-5 flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.platform}</p>
                <h3 className="font-black text-slate-900 leading-snug">{item.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{item.client} · {item.date}</p>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-brand-600 transition">
                  <Eye size={12} /> Preview
                </button>
                <button className="p-2 bg-slate-100 text-slate-500 rounded-lg hover:text-brand-600 transition">
                  <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Content
