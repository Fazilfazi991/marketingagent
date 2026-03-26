import React from 'react';
import { 
  BarChart3, 
  Download, 
  FileText, 
  ArrowRight,
  Calendar,
  Layers
} from 'lucide-react';

const Reports = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Weekly Reports</h2>
        <p className="text-slate-500">Analytics and performance summaries for all marketing channels.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition">
              <BarChart3 size={120} />
           </div>
           <h3 className="text-xl font-bold text-slate-900 mb-2">Performance Summary</h3>
           <p className="text-slate-500 text-sm mb-6 max-w-sm">
             A deep dive into your AI agents' efficiency, engagement rates across social, and blog conversion metrics.
           </p>
           <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-brand-600 transition">
             Generate New Report
             <ArrowRight size={18} />
           </button>
        </div>

        <div className="bg-brand-600 p-8 rounded-2xl shadow-xl shadow-brand-200 text-white relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
              <Layers size={120} />
           </div>
           <h3 className="text-xl font-bold mb-2">ROI Tracker</h3>
           <p className="text-brand-100 text-sm mb-6 max-w-sm">
             Track the literal cost vs. estimated value of generated units across all tiers.
           </p>
           <button className="flex items-center gap-2 px-6 py-3 bg-white text-brand-600 rounded-xl font-bold hover:bg-brand-50 transition">
             View Analytics
             <ArrowRight size={18} />
           </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
           <FileText className="text-brand-500" />
           Download History
        </h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 text-slate-400 rounded-lg flex items-center justify-center font-bold">
                  PDF
                </div>
                <div>
                   <h4 className="font-medium text-slate-900">Campaign_Report_Week_{12-i}.pdf</h4>
                   <p className="text-xs text-slate-400 font-medium">Acme Corp • 4.2MB • March {27-i}, 2026</p>
                </div>
              </div>
              <button className="p-2 text-slate-400 hover:text-brand-600 transition">
                <Download size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
