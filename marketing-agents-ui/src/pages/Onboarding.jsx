import React, { useState } from 'react'
import { Building2, Settings, Link, CreditCard, Rocket, CheckCircle2, ArrowRight, ArrowLeft, Check } from 'lucide-react'

const STEPS = [
  { title: 'Company', icon: Building2 },
  { title: 'Brand Voice', icon: Settings },
  { title: 'Integrations', icon: Link },
  { title: 'Plan', icon: CreditCard },
  { title: 'Launch', icon: Rocket },
]

const TRAITS = ['Professional', 'Witty', 'Empathetic', 'Bold', 'Scientific', 'Minimalist']
const INTEGRATIONS = [
  { name: 'LinkedIn', desc: 'Post to company page automatically.', color: 'text-blue-600 bg-blue-50' },
  { name: 'WordPress', desc: 'Auto-publish SEO blog posts.', color: 'text-indigo-600 bg-indigo-50' },
  { name: 'Mailchimp', desc: 'Sync email marketing campaigns.', color: 'text-amber-600 bg-amber-50' },
]

export default function Onboarding() {
  const [step, setStep] = useState(1)
  const [traits, setTraits] = useState([])
  const [connected, setConnected] = useState([])

  const toggleTrait = (t) => setTraits(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t])
  const toggleConnect = (n) => setConnected(p => p.includes(n) ? p.filter(x => x !== n) : [...p, n])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-brand-50/30 flex items-center justify-center p-6">
      <div className="w-full max-w-xl">

        {/* Progress */}
        <div className="flex justify-between mb-10 relative">
          <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-200 -z-0" />
          {STEPS.map((s, i) => {
            const done = step > i + 1
            const active = step === i + 1
            return (
              <div key={i} className={`relative z-10 flex flex-col items-center gap-2 ${step > i ? 'text-brand-600' : 'text-slate-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all ${done ? 'bg-brand-600 border-brand-100 text-white' : active ? 'bg-white border-brand-500 text-brand-600' : 'bg-white border-slate-200 text-slate-400'}`}>
                  {done ? <CheckCircle2 size={18} /> : <s.icon size={18} />}
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest hidden sm:block">{s.title}</span>
              </div>
            )
          })}
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="p-8 min-h-80">

            {step === 1 && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <div><h2 className="text-2xl font-black text-slate-900">Tell us about your business</h2>
                  <p className="text-slate-500 text-sm mt-1">This powers your AI agents' research and content strategy.</p></div>
                <input placeholder="Company name *" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm" />
                <input placeholder="Website URL *" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm" />
                <select className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-sm text-slate-700">
                  <option value="">Select your niche...</option>
                  {['SaaS', 'E-commerce', 'Fintech', 'Healthcare', 'Real Estate', 'Agency', 'Consulting', 'Education', 'Other'].map(n => <option key={n}>{n}</option>)}
                </select>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div><h2 className="text-2xl font-black text-slate-900">Define your brand voice</h2>
                  <p className="text-slate-500 text-sm mt-1">Select traits that describe how your brand communicates.</p></div>
                <div className="grid grid-cols-2 gap-3">
                  {TRAITS.map(t => (
                    <label key={t} className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition ${traits.includes(t) ? 'border-brand-500 bg-brand-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${traits.includes(t) ? 'bg-brand-600 border-brand-600' : 'border-slate-300'}`}>
                        {traits.includes(t) && <Check size={10} className="text-white" strokeWidth={3} />}
                      </div>
                      <span className="font-semibold text-slate-700 text-sm">{t}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-400 mb-2"><span>Casual</span><span>Formal</span></div>
                  <input type="range" min="0" max="100" defaultValue="50" className="w-full accent-brand-600" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <div><h2 className="text-2xl font-black text-slate-900">Connect your channels</h2>
                  <p className="text-slate-500 text-sm mt-1">Link your platforms so agents can publish directly.</p></div>
                {INTEGRATIONS.map(p => (
                  <div key={p.name} className={`flex items-center justify-between p-5 border-2 rounded-xl transition ${connected.includes(p.name) ? 'border-emerald-300 bg-emerald-50/50' : 'border-slate-200'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl ${p.color} flex items-center justify-center font-black`}>{p.name[0]}</div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{p.name}</h4>
                        <p className="text-xs text-slate-500">{p.desc}</p>
                      </div>
                    </div>
                    <button onClick={() => toggleConnect(p.name)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition ${connected.includes(p.name) ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'border border-slate-200 text-slate-600 hover:border-brand-400 hover:text-brand-600'}`}>
                      {connected.includes(p.name) ? '✓ Connected' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {step === 4 && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-2xl font-black text-slate-900 mb-1">Choose your plan</h2>
                <p className="text-slate-500 text-sm mb-6">Start with a 7-day free trial on any plan.</p>
                <div className="space-y-3">
                  {[{n:'Starter',p:'$299/mo',f:'5 campaigns · Blog + Social + Email'},
                    {n:'Growth',p:'$699/mo',f:'20 campaigns · + Images, SEO, Publisher',rec:true},
                    {n:'Agency Pro',p:'$1,499/mo',f:'Unlimited · All 40 agents · White-label'}].map(pl => (
                    <label key={pl.n} className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition ${pl.rec ? 'border-brand-500 bg-brand-50' : 'border-slate-200 hover:border-slate-300'}`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" name="plan" defaultChecked={pl.rec} className="accent-brand-600" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{pl.n}</span>
                            {pl.rec && <span className="text-[9px] font-black bg-brand-600 text-white px-2 py-0.5 rounded-full uppercase tracking-widest">Recommended</span>}
                          </div>
                          <p className="text-xs text-slate-500">{pl.f}</p>
                        </div>
                      </div>
                      <span className="font-black text-slate-900 text-sm">{pl.p}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="text-center space-y-6 py-8 animate-in fade-in duration-300">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Rocket size={36} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">You're all set! 🎉</h2>
                  <p className="text-slate-500 mt-2">Your first pipeline is launching now.<br />Watch your agents work in real time.</p>
                </div>
                <a href="/agents"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition">
                  Open Agent Dashboard <ArrowRight size={16} />
                </a>
              </div>
            )}
          </div>

          {step < 5 && (
            <div className="px-8 py-5 border-t border-slate-100 flex justify-between items-center">
              <button onClick={() => setStep(s => s - 1)} disabled={step === 1}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-700 disabled:opacity-30 transition">
                <ArrowLeft size={15} /> Back
              </button>
              <div className="flex items-center gap-2">
                {step < 4 && <span className="text-xs text-slate-400">Step {step} of 5</span>}
                <button onClick={() => setStep(s => s + 1)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white rounded-xl font-bold text-sm hover:bg-brand-700 transition">
                  {step === 4 ? 'Start Trial' : 'Continue'} <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
