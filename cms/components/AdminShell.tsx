'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Swords,
  BookOpenText,
  Landmark,
  HandHeart,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

const links = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/lessons', label: 'Lessons', icon: BookOpen },
  { href: '/challenges', label: 'Challenges', icon: Swords },
  { href: '/surahs', label: 'Surahs', icon: BookOpenText },
  { href: '/salah-steps', label: 'Salah Steps', icon: Landmark },
  { href: '/duas', label: 'Duas', icon: HandHeart },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  const sidebar = (
    <>
      <div className="h-16 flex items-center px-6 border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-xl">
        <div>
          <h1 className="text-lg font-bold text-white tracking-tight font-heading">Asaan Arabic</h1>
          <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">Content Manager</p>
        </div>
      </div>
      
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const active = isActive(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setSidebarOpen(false)}
              className={`group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                active
                  ? 'bg-teal-500/10 text-teal-400 shadow-[0_0_0_1px_rgba(45,212,191,0.2)]'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`h-4 w-4 transition-colors ${active ? 'text-teal-400' : 'text-slate-500 group-hover:text-slate-400'}`} />
                {link.label}
              </div>
              {active && <ChevronRight className="h-3 w-3 text-teal-500/50" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800/50 bg-slate-950/30">
        <form action="/api/auth" method="POST">
          <input type="hidden" name="_method" value="DELETE" />
          <button
            type="submit"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-red-500/10 hover:shadow-[0_0_0_1px_rgba(239,68,68,0.2)] transition-all w-full group"
          >
            <LogOut className="h-4 w-4 text-slate-500 group-hover:text-red-400 transition-colors" />
            Logout
          </button>
        </form>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 bg-slate-950 flex-col shrink-0 fixed inset-y-0 left-0 z-30 border-r border-slate-900 shadow-xl shadow-slate-900/20">
        {sidebar}
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-slate-950 flex flex-col z-50 transform transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1) lg:hidden shadow-2xl ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        {sidebar}
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Mobile top bar */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200/50 px-4 py-3 flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="text-sm font-bold text-gray-900 font-heading">Asaan Arabic CMS</span>
        </div>
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
