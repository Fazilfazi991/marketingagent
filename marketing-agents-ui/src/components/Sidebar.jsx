import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Bot, FileText, Megaphone, BarChart2, FileBarChart, CreditCard, Zap } from 'lucide-react'

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/agents', label: 'Agents', icon: Bot },
  { to: '/content', label: 'Content', icon: FileText },
  { to: '/campaigns', label: 'Campaigns', icon: Megaphone },
  { to: '/analytics', label: 'Analytics', icon: BarChart2 },
  { to: '/reports', label: 'Reports', icon: FileBarChart },
  { to: '/billing', label: 'Billing', icon: CreditCard },
]

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-slate-100 border-r border-slate-200 sticky top-0 flex flex-col p-5 gap-1">
      <div className="flex items-center gap-2.5 px-3 py-4 mb-4">
        <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
          <Zap size={16} className="text-white" />
        </div>
        <div>
          <p className="font-black text-slate-900 text-sm leading-tight">MarketingAI</p>
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Agent System</p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
            }
          >
            <Icon size={17} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="pt-4 border-t border-slate-200">
        <div className="px-3 py-2 bg-brand-50 rounded-xl">
          <p className="text-[10px] font-black text-brand-600 uppercase tracking-widest mb-0.5">Free Plan</p>
          <div className="h-1.5 bg-brand-100 rounded-full"><div className="h-full bg-brand-500 rounded-full w-1/3" /></div>
          <p className="text-[10px] text-slate-400 mt-1">12 / 20 runs used</p>
        </div>
      </div>
    </div>
  )
}
