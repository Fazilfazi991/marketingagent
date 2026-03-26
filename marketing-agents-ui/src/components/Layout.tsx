import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar />
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto border-2 border-emerald-500 p-8 rounded-3xl bg-white shadow-xl">
          <h1 className="text-3xl font-black text-slate-900 mb-6 border-b pb-4">APP MOUNTED SUCCESSFULLY</h1>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
