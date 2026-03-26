import React, { useState } from 'react';
import { 
  Users, 
  Play, 
  CheckCircle2, 
  RotateCw, 
  AlertCircle,
  Database,
  Brain,
  Megaphone,
  BarChart3,
  Search,
  PenTool,
  Mail,
  Image as ImageIcon,
  Globe
} from 'lucide-react';

const Agents = () => {
  const [activeTab, setActiveTab] = useState('pipeline');
  
  const pipelineAgents = [
    { name: 'ResearchAgent', description: 'Trend Analysis & Data Mining', icon: Search, status: 'done' },
    { name: 'StrategyAgent', description: 'GTM & Campaign Strategy', icon: Brain, status: 'done' },
    { name: 'BlogWriter', description: 'Long-form content generation', icon: PenTool, status: 'running' },
    { name: 'SocialAgent', description: 'Multi-platform social copies', icon: Megaphone, status: 'running' },
    { name: 'EmailAgent', description: 'Email sequence drafting', icon: Mail, status: 'idle' },
    { name: 'ImageBriefAgent', description: 'Visual design prompts', icon: ImageIcon, status: 'idle' },
    { name: 'SEOAgent', description: 'Search & Meta optimization', icon: Globe, status: 'idle' },
    { name: 'PublisherAgent', description: 'Content distribution', icon: Database, status: 'idle' },
  ];

  const getStatusDisplay = (status: string) => {
    switch(status) {
      case 'done': return <CheckCircle2 size={20} className="text-emerald-500" />;
      case 'running': return <RotateCw size={20} className="text-brand-500 animate-spin" />;
      case 'error': return <AlertCircle size={20} className="text-red-500" />;
      default: return <div className="w-5 h-5 rounded-full border-2 border-slate-200"></div>;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">AI Agents Pipeline</h2>
          <p className="text-slate-500">Orchestrate and monitor your autonomous marketing team.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-xl font-bold shadow-lg shadow-brand-200 hover:bg-brand-700 transition">
          <Play size={18} fill="currentColor" />
          Trigger Pipeline
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pipelineAgents.map((agent) => (
          <div key={agent.name} className={`bg-white p-6 rounded-xl border transition shadow-sm ${agent.status === 'running' ? 'border-brand-500 ring-4 ring-brand-50' : 'border-slate-200 hover:border-slate-300'}`}>
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-lg ${agent.status === 'done' ? 'bg-emerald-50 text-emerald-600' : agent.status === 'running' ? 'bg-brand-50 text-brand-600' : 'bg-slate-50 text-slate-600'}`}>
                <agent.icon size={24} />
              </div>
              {getStatusDisplay(agent.status)}
            </div>
            <div className="mt-4">
              <h3 className="font-bold text-slate-900">{agent.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{agent.description}</p>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs font-bold uppercase tracking-wider">
              <span className={`px-2 py-0.5 rounded ${agent.status === 'done' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                {agent.status}
              </span>
              <span className="text-slate-400">v1.2</span>
            </div>
          </div>
        ))}
      </div>

      {/* Live Stream Panel Placeholder */}
      <div className="bg-slate-900 rounded-xl p-6 text-slate-300 font-mono text-sm overflow-hidden h-64 shadow-2xl">
        <div className="flex items-center gap-2 mb-4 text-slate-500">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          LIVE_AGENT_LOGS: WebSocket Connection Active
        </div>
        <div className="space-y-2">
          <div className="flex gap-4"><span className="text-slate-600">19:35:12</span> <span className="text-emerald-400">[ResearchAgent]</span> Found current trend: "AI Native Marketing"</div>
          <div className="flex gap-4"><span className="text-slate-600">19:35:45</span> <span className="text-emerald-400">[StrategyAgent]</span> Generating GTM for tier: Enterprise</div>
          <div className="flex gap-4"><span className="text-slate-600">19:36:10</span> <span className="text-brand-400">[BlogWriter]</span> Writing section: The Rise of Agentic AI...</div>
          <div className="flex gap-4 animate-pulse"><span className="text-slate-600">19:36:44</span> <span className="text-brand-400">[SocialAgent]</span> Drafting Twitter (X) threads...</div>
        </div>
      </div>
    </div>
  );
};

export default Agents;
