import { useEffect, useState } from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useGym } from '../context/GymContext';

export default function ProtectedRoute({ children }) {
  const { user } = useGym();
  const loc = useLocation();
  if (!user) return <Navigate to="/login" state={{ from: loc.pathname }} replace />;
  return children;
}

export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-black">{title}</h1>
        {subtitle && <p className="text-muted text-sm">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({ label, value, icon, tone = 'accent' }) {
  return (
    <div className="bg-panel border border-line rounded-2xl p-5 hover:-translate-y-1 hover:border-accent/50 transition duration-300">
      <div className="flex items-center justify-between">
        <p className="text-muted text-sm font-medium">{label}</p>
        <span className={`text-xl ${tone === 'red' ? 'text-red-400' : tone === 'green' ? 'text-green-400' : 'text-accent'}`}>{icon}</span>
      </div>
      <p className="text-3xl font-black mt-2">{value}</p>
    </div>
  );
}

export function Badge({ children, color = 'green' }) {
  const c = color === 'green' ? 'bg-green-500/15 text-green-400' : color === 'red' ? 'bg-red-500/15 text-red-400' : 'bg-yellow-500/15 text-yellow-400';
  return <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${c}`}>{children}</span>;
}

export function Modal({ open, title, onClose, children, wide }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className={`bg-panel border border-line rounded-2xl w-full ${wide ? 'max-w-2xl' : 'max-w-md'} max-h-[90vh] overflow-y-auto p-6`} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">{title}</h3>
          <button onClick={onClose} className="text-muted hover:text-ink text-xl leading-none">×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Field({ label, children }) {
  return (
    <label className="block text-sm">
      <span className="text-muted font-medium">{label}</span>
      {children}
    </label>
  );
}

export const inputCls = 'w-full mt-1 px-3 py-2.5 rounded-xl bg-panel2 border border-line focus:border-accent outline-none text-sm';
export const btnCls = 'px-4 py-2.5 rounded-xl bg-accent text-white font-semibold hover:brightness-110 transition active:scale-95 disabled:opacity-50';
export const ghostBtn = 'px-4 py-2.5 rounded-xl border border-line font-semibold hover:bg-panel2 transition text-sm';

/** Counting-up number used on the public About section */
export function Counter({ to, suffix = '', duration = 1500 }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf; const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setN(Math.floor(p * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <span>{n.toLocaleString()}{suffix}</span>;
}

export function Skeleton({ h = 'h-24' }) {
  return <div className={`${h} rounded-2xl bg-panel2 animate-pulse`} />;
}

export { Link };
