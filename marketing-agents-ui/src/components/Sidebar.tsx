import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/agents', label: 'Agents' },
    { to: '/content', label: 'Content' },
    { to: '/campaigns', label: 'Campaigns' },
    { to: '/analytics', label: 'Analytics' },
    { to: '/reports', label: 'Reports' },
    { to: '/billing', label: 'Billing' },
  ];

  return (
    <div className="w-72 h-screen bg-slate-100 border-r border-slate-200 sticky top-0 flex flex-col p-6 font-sans">
      <div className="mb-10 px-2">
        <h1 className="text-xl font-bold text-slate-900 uppercase tracking-tight">MarketingAI</h1>
      </div>

      <nav className="flex-1 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                isActive ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:bg-white/50'
              }`
            }
          >
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="pt-6 border-t border-slate-200">
        <button className="w-full text-left px-4 py-3 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-all">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
