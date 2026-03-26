import React from 'react';
import { 
  Search, 
  Filter, 
  FileText, 
  Eye, 
  MoreHorizontal,
  Mail,
  Mail as LinkedinIcon,
  Twitter,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

const Content = () => {
  const content = [
    { id: 1, title: 'The Future of AI Marketing', platform: 'Blog', client: 'Acme Corp', date: 'Mar 24', status: 'Approved', type: 'blog' },
    { id: 2, title: 'New Feature Announcement', platform: 'Twitter', client: 'Globex', date: 'Mar 23', status: 'Draft', type: 'email' },
    { id: 3, title: 'Q1 Performance Review', platform: 'LinkedIn', client: 'Soylent Corp', date: 'Mar 22', status: 'Approved', type: 'social' },
    { id: 4, title: 'Growth Strategies 2026', platform: 'Blog', client: 'Umbrella', date: 'Mar 21', status: 'Review', type: 'blog' },
  ];

  const getPlatformIcon = (type: string) => {
    switch (type) {
      case 'blog': return <FileText className="text-brand-600" />;
      case 'email': return <Mail className="text-amber-600" />;
      case 'social': return <LinkedinIcon className="text-blue-600" />;
      default: return <Twitter className="text-sky-600" />;
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Content Library</h2>
          <p className="text-slate-500 font-medium">Manage and distribute your generated agent assets.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search content..." 
              className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-brand-500/10 outline-none transition-all w-72"
            />
          </div>
          <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:text-brand-600 hover:border-brand-200 transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {content.map((item) => (
          <div key={item.id} className="glass-card group p-2 rounded-[2rem] overflow-hidden flex flex-col md:flex-row hover:scale-[1.01] transition-all duration-500">
            <div className="md:w-48 h-48 bg-slate-100 rounded-[1.75rem] flex items-center justify-center relative overflow-hidden m-2">
               <div className="absolute inset-0 bg-gradient-to-br from-brand-600/5 to-transparent"></div>
               {getPlatformIcon(item.type)}
               <div className="absolute top-4 left-4">
                  <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest shadow-sm ${
                    item.status === 'Approved' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                  }`}>
                    {item.status}
                  </span>
               </div>
            </div>
            
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{item.platform}</p>
                  <button className="text-slate-300 hover:text-slate-600 transition-colors">
                    <MoreHorizontal size={20} />
                  </button>
                </div>
                <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-brand-600 transition-colors">{item.title}</h3>
                <p className="text-xs font-bold text-slate-400 mt-2 flex items-center gap-2">
                   {item.client} <span className="w-1 h-1 rounded-full bg-slate-200"></span> {item.date}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black hover:bg-brand-600 transition-all group-hover:shadow-lg group-hover:shadow-brand-500/20">
                  <Eye size={14} /> VIEW PREVIEW
                </button>
                <button className="p-2.5 bg-slate-50 text-slate-500 rounded-xl hover:text-brand-600 hover:bg-brand-50 transition-all">
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;
