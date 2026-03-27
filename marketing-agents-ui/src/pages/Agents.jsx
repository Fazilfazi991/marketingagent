import React, { useState, useEffect } from 'react'
import { Play, CheckCircle2, RotateCw, AlertCircle, Search, Brain, PenTool, Mail, ImageIcon, Globe, Database, Megaphone } from "lucide-react"

const AGENTS = [
  { name: 'ResearchAgent', desc: 'Trend analysis & data mining', icon: Search, stage: 1 },
  { name: 'StrategyAgent', desc: 'GTM & campaign planning', icon: Brain, stage: 1 },
  { name: 'BlogWriter', desc: 'Long-form SEO content', icon: PenTool, stage: 2 },
  { name: 'SocialAgent', desc: 'Multi-platform posts', icon: Megaphone, stage: 2 },
  { name: 'EmailAgent', desc: 'Nurture sequences', icon: Mail, stage: 2 },
  { name: 'ImageBriefAgent', desc: 'Visual design briefs', icon: Image, stage: 3 },
  { name: 'SEOAgent', desc: 'Search optimisation', icon: Globe, stage: 3 },
  { name: 'PublisherAgent', desc: 'Content distribution', icon: Database, stage: 4 },
]

const STATUS_SEQUENCE = ['idle','idle','idle','idle','idle','idle','idle','idle']

export default function Agents() {
  const [statuses, setStatuses] = useState(STATUS_SEQUENCE)
  const [running, setRunning] = useState(false)
  const [logs, setLogs] = useState([
    { time: '—', agent: 'SYSTEM', msg: 'WebSocket ready. Click "Trigger Pipeline" to start.' }
  ])

  const triggerPipeline = () => {
    if (running) return
    setRunning(true)
    setStatuses(Array(8).fill('idle'))
    setLogs([{ time: new Date().toLocaleTimeString(), agent: 'ORCHESTRATOR', msg: 'Pipeline started — running Research + Strategy first...' }])

    const sequence = [
      { idx: 0, delay: 400, msg: '[ResearchAgent] Scanning trends and competitor data...' },
      { idx: 1, delay: 1200, msg: '[StrategyAgent] Generating GTM plan for tier: Enterprise' },
      { idx: 2, delay: 2200, msg: '[BlogWriter] Writing SEO article: "The Rise of Agentic AI"...' },
      { idx: 3, delay: 2400, msg: '[SocialAgent] Drafting LinkedIn + X thread...' },
      { idx: 4, delay: 2600, msg: '[EmailAgent] Building 3-email nurture sequence...' },
      { idx: 5, delay: 4000, msg: '[ImageBriefAgent] Generating DALL-E prompts...' },
      { idx: 6, delay: 4200, msg: '[SEOAgent] Running keyword + schema analysis...' },
      { idx: 7, delay: 5400, msg: '[PublisherAgent] Publishing to WordPress + LinkedIn...' },
    ]

    sequence.forEach(({ idx, delay, msg }) => {
      setTimeout(() => {
        setStatuses(prev => { const n=[...prev]; n[idx]='running'; return n })
        setLogs(prev => [{ time: new Date().toLocaleTimeString(), agent: AGENTS[idx].name, msg }, ...prev].slice(0,20))
        setTimeout(() => {
          setStatuses(prev => { const n=[...prev]; n[idx]='done'; return n })
          if (idx === 7) setRunning(false)
        }, 1400)
      }, delay)
    })
  }

  const statusIcon = (s) => {
    if (s === 'done') return <CheckCircle2 size={19} className="text-emerald-500" />
    if (s === 'running') return <RotateCw size={19} className="text-brand-500 animate-spin" />
    if (s === 'error') return <AlertCircle size={19} className="text-red-500" />
    return <div className="w-5 h-5 rounded-full border-2 border-slate-200" />
  }

  const statusColor = (s) => {
    if (s === 'running') return 'border-brand-400 ring-4 ring-brand-50 bg-white'
    if (s === 'done') return 'border-emerald-200 bg-emerald-50/30'
    return 'border-slate-200 bg-white'
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">AI Agent Pipeline</h2>
          <p className="text-slate-500 text-sm mt-0.5">Orchestrate and monitor your autonomous marketing team.</p>
        </div>
        <button onClick={triggerPipeline} disabled={running}
          className="btn-primary flex items-center gap-2 disabled:opacity-60">
          {running ? <RotateCw size={15} className="animate-spin" /> : <Play size={15} fill="currentColor" />}
          {running ? 'Running...' : 'Trigger Pipeline'}
        </button>
      </div>

      {/* Stage labels */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">
        <span>Stage 1 — Strategy</span>
        <span>Stage 2 — Content</span>
        <span>Stage 3 — Optimise</span>
        <span>Stage 4 — Publish</span>
      </div>

      {/* Agent cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {AGENTS.map((a, i) => (
          <div key={a.name} className={`rounded-xl border p-5 transition-all duration-300 ${statusColor(statuses[i])}`}>
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2.5 rounded-lg ${statuses[i]==='done'?'bg-emerald-100 text-emerald-700':statuses[i]==='running'?'bg-brand-100 text-brand-700':'bg-slate-100 text-slate-600'}`}>
                <a.icon size={18} />
              </div>
              {statusIcon(statuses[i])}
            </div>
            <h3 className="font-bold text-slate-900 text-sm">{a.name}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{a.desc}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${statuses[i]==='done'?'bg-emerald-100 text-emerald-700':statuses[i]==='running'?'bg-brand-100 text-brand-700':'bg-slate-100 text-slate-500'}`}>
                {statuses[i]}
              </span>
              <span className="text-[10px] text-slate-400">v1.0</span>
            </div>
          </div>
        ))}
      </div>

      {/* Live log */}
      <div className="bg-slate-900 rounded-xl p-5 font-mono text-xs text-slate-300 h-52 overflow-y-auto">
        <div className="flex items-center gap-2 mb-3 text-slate-500 text-[10px] uppercase tracking-widest">
          <div className={`w-2 h-2 rounded-full ${running ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'}`} />
          LIVE AGENT STREAM
        </div>
        {logs.map((l, i) => (
          <div key={i} className="flex gap-3 mb-1.5">
            <span className="text-slate-600 shrink-0">{l.time}</span>
            <span className={l.agent === 'ORCHESTRATOR' ? 'text-amber-400' : 'text-emerald-400'}>[{l.agent}]</span>
            <span>{l.msg}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
