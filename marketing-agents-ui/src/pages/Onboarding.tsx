import React, { useState } from 'react';
import { 
  Building2, 
  Settings, 
  Link as LinkIcon, 
  CreditCard, 
  Rocket,
  CheckCircle2,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import Billing from './Billing';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    website: '',
    niche: '',
    tone: 50,
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const steps = [
    { title: 'Company Info', icon: Building2 },
    { title: 'Brand Voice', icon: Settings },
    { title: 'Integrations', icon: LinkIcon },
    { title: 'Choose Plan', icon: CreditCard },
    { title: 'Launch', icon: Rocket },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      {/* Progress Stepper */}
      <div className="flex justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>
        {steps.map((s, i) => (
          <div key={i} className={`relative z-10 flex flex-col items-center gap-2 ${step > i ? 'text-brand-600' : 'text-slate-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 ${step > i ? 'bg-brand-600 border-brand-100 text-white' : 'bg-white border-slate-100 text-slate-400'}`}>
               {step > i + 1 ? <CheckCircle2 size={20} /> : <s.icon size={20} />}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">{s.title}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden min-h-[500px] flex flex-col">
        <div className="p-10 flex-1">
           {step === 1 && (
              <div className="space-y-6 animate-in slide-in-from-right duration-500">
                 <h2 className="text-2xl font-black text-slate-900">Tell us about your business</h2>
                 <div className="space-y-4">
                    <input 
                      type="text" placeholder="Company Name" 
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-brand-500/10 outline-none transition"
                    />
                    <input 
                      type="text" placeholder="Website URL" 
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-brand-500/10 outline-none transition"
                    />
                    <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none">
                       <option>Select Niche...</option>
                       <option>SaaS</option>
                       <option>E-commerce</option>
                       <option>Fintech</option>
                    </select>
                 </div>
              </div>
           )}

           {step === 2 && (
              <div className="space-y-8 animate-in slide-in-from-right duration-500">
                 <h2 className="text-2xl font-black text-slate-900">Define your brand's voice</h2>
                 <div className="grid grid-cols-2 gap-4">
                    {['Professional', 'Witty', 'Empathetic', 'Bold', 'Scientific', 'minimalist'].map(t => (
                       <label key={t} className="flex items-center gap-3 p-4 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition">
                          <input type="checkbox" className="w-5 h-5 rounded-md text-brand-600 focus:ring-brand-500 border-slate-300" />
                          <span className="font-bold text-slate-700">{t}</span>
                       </label>
                    ))}
                 </div>
                 <div className="space-y-4">
                    <div className="flex justify-between text-xs font-black text-slate-400 uppercase tracking-widest">
                       <span>Casual</span>
                       <span>Formal</span>
                    </div>
                    <input type="range" className="w-full accent-brand-600" />
                 </div>
              </div>
           )}

           {step === 3 && (
              <div className="space-y-8 animate-in slide-in-from-right duration-500">
                 <h2 className="text-2xl font-black text-slate-900">Connect your channels</h2>
                 <div className="space-y-4">
                    {[
                      { name: 'LinkedIn', desc: 'Post organic updates directly to your page.', color: 'text-blue-600 bg-blue-50' },
                      { name: 'Wordpress', desc: 'Auto-publish blocks and draft SEO articles.', color: 'text-indigo-600 bg-indigo-50' },
                      { name: 'Mailchimp', desc: 'Sync segmented email marketing campaigns.', color: 'text-amber-600 bg-amber-50' }
                    ].map(p => (
                       <div key={p.name} className="flex items-center justify-between p-6 border border-slate-200 rounded-2xl shadow-sm">
                          <div className="flex items-center gap-4">
                             <div className={`p-3 rounded-xl ${p.color} font-black`}>{p.name[0]}</div>
                             <div>
                                <h4 className="font-bold text-slate-900">{p.name}</h4>
                                <p className="text-xs text-slate-500">{p.desc}</p>
                             </div>
                          </div>
                          <button className="px-4 py-2 bg-slate-940 text-slate-900 border border-slate-200 rounded-lg text-xs font-black hover:bg-slate-50 transition uppercase tracking-widest">Connect</button>
                       </div>
                    ))}
                 </div>
              </div>
           )}

           {step === 4 && (
              <div className="animate-in slide-in-from-right duration-500 scale-90 -mt-10">
                 <Billing />
              </div>
           )}

           {step === 5 && (
              <div className="text-center py-12 space-y-6 animate-in zoom-in duration-500">
                 <div className="w-24 h-24 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <Rocket size={48} />
                 </div>
                 <div className="space-y-2">
                    <h2 className="text-3xl font-black text-slate-900">Ready for liftoff?</h2>
                    <p className="text-slate-500">We'll initialize your first strategy and pilot agents.</p>
                 </div>
              </div>
           )}
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center px-10">
           {step > 1 ? (
              <button onClick={prevStep} className="flex items-center gap-2 font-bold text-slate-500 hover:text-slate-900 transition text-sm">
                 <ArrowLeft size={18} /> BACK
              </button>
           ) : <div />}
           
           <button onClick={nextStep} className="flex items-center gap-2 px-8 py-3 bg-brand-600 text-white rounded-xl font-black text-sm hover:shadow-xl hover:bg-brand-700 transition shadow-lg shadow-brand-500/20 active:scale-95">
              {step === 5 ? 'LAUNCH ENGINE' : 'CONTINUE'}
              <ArrowRight size={18} />
           </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
