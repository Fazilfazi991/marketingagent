import React, { useState } from 'react';
import { 
  X, 
  Send, 
  RefreshCcw, 
  History, 
  CheckCircle,
  FileEdit,
  ChevronDown
} from 'lucide-react';

interface ContentModalProps {
  content: any;
  isOpen: boolean;
  onClose: () => void;
  onRegenerate: (feedback: string) => void;
  onApprove: (published: boolean) => void;
}

const ContentModal: React.FC<ContentModalProps> = ({ 
  content, 
  isOpen, 
  onClose, 
  onRegenerate,
  onApprove 
}) => {
  const [feedback, setFeedback] = useState('');
  const [editBody, setEditBody] = useState(content?.text_content || '');
  const [showHistory, setShowHistory] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-brand-100 text-brand-600 rounded-lg">
                <FileEdit size={20} />
             </div>
             <div>
                <h3 className="font-bold text-slate-900">{content.title}</h3>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{content.type} • Version 1.2</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 flex gap-6">
          {/* Main Editor */}
          <div className="flex-1 space-y-4">
             <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Content Body</label>
                <button onClick={() => setShowHistory(!showHistory)} className="flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700">
                   <History size={14} /> {showHistory ? 'Hide History' : 'View History'}
                </button>
             </div>
             {showHistory ? (
                <div className="bg-slate-50 rounded-xl border border-slate-100 p-4 space-y-3">
                   {[1, 2].map(v => (
                      <div key={v} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100 hover:border-brand-200 cursor-pointer shadow-sm transition">
                         <div>
                            <p className="text-sm font-bold text-slate-700">Version 1.{v}</p>
                            <p className="text-xs text-slate-400">Restored on Mar {25-v}, 2026</p>
                         </div>
                         <button className="text-xs font-bold text-brand-600 hover:underline">RESTORE</button>
                      </div>
                   ))}
                </div>
             ) : (
                <textarea 
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                  className="w-full h-[400px] p-6 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition text-slate-700 leading-relaxed font-serif text-lg"
                />
             )}
          </div>

          {/* Feedback & Actions */}
          <div className="w-80 space-y-6">
             <div className="bg-brand-50 rounded-2xl p-5 border border-brand-100">
                <h4 className="text-sm font-bold text-brand-900 mb-3 flex items-center gap-2">
                   <RefreshCcw size={16} className="text-brand-600" />
                   AI Regeneration
                </h4>
                <textarea 
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Need changes? Tell the AI what to fix (e.g., Make it more witty, or add a section about pricing)..."
                  className="w-full h-32 p-3 text-sm bg-white border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none placeholder:text-brand-300 resize-none mb-3"
                />
                <button 
                  onClick={() => onRegenerate(feedback)}
                  disabled={!feedback}
                  className="w-full py-2.5 bg-brand-600 text-white rounded-lg font-bold text-sm hover:bg-brand-700 disabled:opacity-50 transition flex items-center justify-center gap-2"
                >
                   <Send size={16} /> REGENERATE
                </button>
             </div>

             <div className="space-y-3">
                <button 
                  onClick={() => onApprove(false)}
                  className="w-full py-3 border-2 border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition flex items-center justify-center gap-2"
                >
                   SAVE AS DRAFT
                </button>
                <button 
                  onClick={() => onApprove(true)}
                  className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition flex items-center justify-center gap-2"
                >
                   <CheckCircle size={18} /> APPROVE & PUBLISH
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentModal;
