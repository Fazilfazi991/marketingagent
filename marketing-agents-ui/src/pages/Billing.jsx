import React, { useState } from 'react'
import { Check, Zap, ShieldCheck, Crown, Loader2 } from 'lucide-react'

const plans = [
  {
    name: 'Starter', price: '$299', tier: 'starter', icon: Zap,
    desc: 'Perfect for solo marketers and small brands.',
    features: ['5 campaigns/month','Blog + Social + Email agents','Basic analytics','Content approval queue','Email support'],
    style: 'border-slate-200 bg-white',
    btn: 'bg-slate-900 text-white hover:bg-slate-800',
  },
  {
    name: 'Growth', price: '$699', tier: 'growth', icon: ShieldCheck, recommended: true,
    desc: 'Full automation for growing teams.',
    features: ['20 campaigns/month','All Starter agents','AI image generation (DALL-E)','SEO + Publisher agents','PDF weekly reports','Priority support'],
    style: 'border-brand-500 ring-4 ring-brand-500/10 bg-white',
    btn: 'bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-500/20',
  },
  {
    name: 'Agency Pro', price: '$1,499', tier: 'agency_pro', icon: Crown,
    desc: 'Full 40-agent system. White-label ready.',
    features: ['Unlimited campaigns','All 40 agents active','CRM + HubSpot sync','A/B testing agent','White-label dashboard','Dedicated account manager'],
    style: 'border-slate-200 bg-slate-900',
    btn: 'bg-white text-slate-900 hover:bg-slate-100',
    dark: true,
  },
]

export default function Billing() {
  const [loading, setLoading] = useState(null)

  const upgrade = async (tier) => {
    setLoading(tier)
    setTimeout(() => {
      alert(`Stripe checkout opens here for: ${tier}\n\nConnect your backend + Stripe keys to activate.`)
      setLoading(null)
    }, 1200)
  }

  const params = new URLSearchParams(window.location.search)

  return (
    <div className="space-y-10 max-w-5xl mx-auto py-6">
      {params.get('success') && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-800 text-sm font-medium flex items-center gap-2">
          <Check size={16} /> Payment successful! Your plan is upgrading — may take a moment.
        </div>
      )}

      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-slate-900">Simple, Transparent Pricing</h2>
        <p className="text-slate-500">Scale your marketing with AI agents. Cancel anytime.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-brand-50 text-brand-600 rounded-xl"><ShieldCheck size={26} /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">Current Plan</p>
            <h3 className="font-bold text-slate-900">Free Tier — Research &amp; Strategy agents only</h3>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400 mb-1.5">Usage this month</p>
          <div className="flex items-center gap-2">
            <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-brand-600 rounded-full w-3/5" />
            </div>
            <span className="text-sm font-bold text-slate-700">12 / 20</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p) => {
          const Icon = p.icon
          return (
            <div key={p.name} className={`relative p-7 rounded-2xl border-2 transition-all hover:shadow-xl hover:-translate-y-1 ${p.style}`}>
              {p.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                  Most Popular
                </div>
              )}
              <div className={`inline-flex p-2.5 rounded-xl mb-4 ${p.dark ? 'bg-white/10' : 'bg-slate-50'}`}>
                <Icon size={22} className={p.dark ? 'text-white' : 'text-brand-600'} />
              </div>
              <h4 className={`font-black text-xl mb-1 ${p.dark ? 'text-white' : 'text-slate-900'}`}>{p.name}</h4>
              <p className={`text-sm mb-4 ${p.dark ? 'text-slate-400' : 'text-slate-500'}`}>{p.desc}</p>
              <div className="flex items-baseline gap-1 mb-5">
                <span className={`text-4xl font-black ${p.dark ? 'text-white' : 'text-slate-900'}`}>{p.price}</span>
                <span className={p.dark ? 'text-slate-400' : 'text-slate-400'}>/mo</span>
              </div>
              <div className="space-y-2.5 mb-6">
                {p.features.map((f) => (
                  <div key={f} className="flex items-start gap-2.5 text-sm">
                    <div className={`p-0.5 rounded-full shrink-0 mt-0.5 ${p.dark ? 'bg-white/20' : 'bg-emerald-50'}`}>
                      <Check size={12} className={p.dark ? 'text-white' : 'text-emerald-600'} strokeWidth={3} />
                    </div>
                    <span className={p.dark ? 'text-slate-300' : 'text-slate-600'}>{f}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => upgrade(p.tier)} disabled={loading === p.tier}
                className={`w-full py-3.5 rounded-xl font-black text-sm transition flex items-center justify-center gap-2 disabled:opacity-60 ${p.btn}`}>
                {loading === p.tier ? <><Loader2 size={15} className="animate-spin" /> Processing...</> : 'Get Started'}
              </button>
            </div>
          )
        })}
      </div>
      <p className="text-center text-sm text-slate-400">7-day free trial · No credit card required to start · Cancel anytime</p>
    </div>
  )
}
