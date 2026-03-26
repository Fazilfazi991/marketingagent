import React from 'react';
import { 
  CreditCard, 
  Check, 
  Zap, 
  ShieldCheck, 
  Crown,
  AlertCircle 
} from 'lucide-react';

const Billing = () => {
  const plans = [
    { 
      name: 'Starter', 
      price: '$49', 
      features: ['2 Campaigns/mo', 'Personalized Strategy', 'Blog & Social Posts', 'Basic Support'],
      tier: 'starter',
      color: 'bg-slate-100 text-slate-600'
    },
    { 
      name: 'Growth', 
      price: '$149', 
      features: ['10 Campaigns/mo', 'AI Image Generation', 'Email Marketing', 'Priority Support'],
      tier: 'growth',
      recommended: true,
      color: 'bg-brand-600 text-white'
    },
    { 
      name: 'Agency Pro', 
      price: '$499', 
      features: ['Unlimited Campaigns', 'Full SEO Suite', 'Advanced Analytics', 'White-label Reports'],
      tier: 'agency_pro',
      color: 'bg-slate-900 text-white'
    }
  ];

  const handleUpgrade = (tier: string) => {
    console.log('Initiating Stripe Checkout for:', tier);
    // POST /billing/checkout logic here
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto py-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-black text-slate-900 leading-tight">Simple, Transparent Pricing</h2>
        <p className="text-slate-500 text-lg">Scale your marketing team with AI agents.</p>
      </div>

      {/* Current Plan Summary */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
         <div className="flex items-center gap-6">
            <div className="p-4 bg-brand-50 text-brand-600 rounded-2xl">
               <ShieldCheck size={32} />
            </div>
            <div>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Current Subscription</p>
               <h3 className="text-xl font-bold text-slate-900">Free Tier</h3>
               <p className="text-sm text-slate-500">Your account is limited to Research and Strategy agents only.</p>
            </div>
         </div>
         <div className="text-right">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Usage This Month</p>
            <div className="flex items-center gap-2">
               <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-600 w-1/2"></div>
               </div>
               <span className="text-sm font-bold text-slate-700">12/20 Runs</span>
            </div>
         </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div key={plan.name} className={`relative p-8 rounded-3xl border transition duration-500 hover:shadow-2xl hover:-translate-y-2 ${plan.recommended ? 'border-brand-500 ring-4 ring-brand-500/10' : 'border-slate-200 bg-white'}`}>
             {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-600 text-white text-[10px] font-black uppercase tracking-tighter rounded-full">
                   Recommended
                </div>
             )}
             <div className="space-y-6">
                <div>
                   <h4 className="font-bold text-slate-900 mb-2">{plan.name}</h4>
                   <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                      <span className="text-slate-400 font-medium">/mo</span>
                   </div>
                </div>

                <div className="space-y-4">
                   {plan.features.map(f => (
                      <div key={f} className="flex items-center gap-3 text-sm text-slate-600">
                         <div className="p-0.5 bg-emerald-50 text-emerald-600 rounded-full">
                            <Check size={14} strokeWidth={3} />
                         </div>
                         {f}
                      </div>
                   ))}
                </div>

                <button 
                  onClick={() => handleUpgrade(plan.tier)}
                  className={`w-full py-4 rounded-xl font-black text-sm transition ${plan.color} ${!plan.recommended ? 'hover:bg-slate-200' : 'hover:bg-brand-700 shadow-lg shadow-brand-500/20'}`}
                >
                   UPGRADE NOW
                </button>
             </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 p-6 rounded-2xl flex items-start gap-4 border border-slate-100 italic">
         <AlertCircle className="text-slate-400 shrink-0" size={20} />
         <p className="text-sm text-slate-500 leading-relaxed">
            Subscriptions are billed monthly. You can cancel at any time directly through the Stripe customer portal. All payments are secured by Stripe SSL encryption.
         </p>
      </div>
    </div>
  );
};

export default Billing;
