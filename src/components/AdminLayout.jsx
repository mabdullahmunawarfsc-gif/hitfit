import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useGym } from '../context/GymContext';

const links = [
  ['/admin', 'Dashboard', '📊'],
  ['/admin/members', 'Members', '👥'],
  ['/admin/fees', 'Fees', '💰'],
  ['/admin/attendance', 'Attendance', '🕓'],
  ['/admin/alerts', 'Expiry Alerts', '⏰'],
  ['/admin/staff', 'Staff', '🧑‍🏫'],
  ['/admin/expenses', 'Expenses', '🧾'],
  ['/admin/plans', 'Plans', '📋'],
  ['/admin/reports', 'Reports', '📈'],
  ['/admin/settings', 'Settings', '⚙️'],
];

export default function AdminLayout() {
  const { user, logout, theme, toggleTheme } = useGym();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-base text-ink">
      <aside className={`${open ? 'w-64' : 'w-16'} transition-all duration-300 bg-panel border-r border-line flex flex-col`}>
        <div className="flex items-center justify-between p-4">
          {open && <span className="font-black text-lg text-accent whitespace-nowrap">HIT FIT <span className="text-ink">ADMIN</span></span>}
          <button onClick={() => setOpen(!open)} className="p-2 rounded-lg hover:bg-panel2" aria-label="toggle">☰</button>
        </div>
        <nav className="flex-1 px-2 space-y-1 overflow-y-auto no-scrollbar">
          {links.map(([to, label, icon]) => (
            <NavLink key={to} to={to} end={to === '/admin'} title={label}
              className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${isActive ? 'bg-accent text-white' : 'text-muted hover:bg-panel2 hover:text-ink'}`}>
              <span>{icon}</span>{open && <span className="whitespace-nowrap">{label}</span>}
            </NavLink>
          ))}
          <a href="/live" target="_blank" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted hover:bg-panel2 hover:text-ink">📺 {open && <span>Live Screen</span>}</a>
        </nav>
        <div className="p-3 border-t border-line">
          {open && <div className="text-xs text-muted mb-2">Signed in as <b className="text-ink">{user?.username}</b> ({user?.role})</div>}
          <button onClick={() => { logout(); navigate('/login'); }} className="w-full text-left px-3 py-2 rounded-xl text-sm text-red-400 hover:bg-panel2">🚪 {open && 'Logout'}</button>
        </div>
      </aside>
      <main className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 flex items-center justify-between px-6 border-b border-line bg-panel/60 backdrop-blur sticky top-0 z-30">
          <h2 className="font-bold">Admin Dashboard</h2>
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="px-3 py-1.5 rounded-full border border-line text-sm hover:bg-panel2">{theme === 'dark' ? '🌙 Dark' : '☀️ Light'}</button>
            <a href="/" className="text-sm text-accent hover:underline">View Website →</a>
          </div>
        </header>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
