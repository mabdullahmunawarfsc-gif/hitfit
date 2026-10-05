import { useEffect, useRef, useState } from 'react';
import { daysBetween, todayISO } from '../data/seed';

/** Full-screen TV display (/live). Syncs with admin attendance scans instantly. */
export default function Live() {
  const [scan, setScan] = useState(null); // {status, member, time}
  const timer = useRef(null);

  useEffect(() => {
    const apply = (s) => {
      if (!s) return;
      setScan(s);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setScan(null), 5000);
    };
    let ch;
    try {
      ch = new BroadcastChannel('hitfit-attendance');
      ch.onmessage = (e) => apply(e.data);
    } catch { /* older browsers */ }
    const onStorage = (e) => {
      if (e.key === 'hitfit_last_scan' && e.newValue) {
        try { apply(JSON.parse(e.newValue)); } catch { /* ignore */ }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => { window.removeEventListener('storage', onStorage); ch?.close(); clearTimeout(timer.current); };
  }, []);

  if (!scan) {
    return (
      <div className="min-h-screen bg-base text-ink flex flex-col items-center justify-center text-center px-6">
        <div className="w-28 h-28 rounded-full border-4 border-accent flex items-center justify-center text-5xl animate-ping absolute opacity-20" />
        <div className="text-7xl mb-6">👆</div>
        <h1 className="text-5xl md:text-7xl font-black">Please scan your <span className="text-accent">fingerprint</span></h1>
        <p className="text-muted mt-4 text-xl">{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
    );
  }

  if (scan.status === 'unknown') {
    return (
      <div className="min-h-screen bg-yellow-600 text-white flex flex-col items-center justify-center text-center px-6">
        <div className="text-8xl">❓</div>
        <h1 className="text-6xl font-black mt-6">UNKNOWN FINGERPRINT</h1>
        <p className="text-2xl mt-4">Please contact reception to register.</p>
      </div>
    );
  }

  if (scan.status === 'expired') {
    return (
      <div className="min-h-screen bg-red-700 text-white flex flex-col items-center justify-center text-center px-6">
        <div className="text-8xl">🚫</div>
        <h1 className="text-6xl md:text-7xl font-black mt-6">FEE EXPIRED</h1>
        <p className="text-3xl mt-4">Please contact reception</p>
        <p className="text-xl mt-6 font-semibold">{scan.member?.name}</p>
      </div>
    );
  }

  const remaining = scan.member ? daysBetween(scan.member.expiryDate, todayISO()) : 0;
  return (
    <div className="min-h-screen bg-green-600 text-white flex flex-col items-center justify-center text-center px-6">
      <img src={scan.member?.photo} alt={scan.member?.name} className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-2xl" />
      <h2 className="text-5xl font-black mt-6">{scan.member?.name}</h2>
      <p className="text-xl mt-2">{scan.member?.plan} Plan • Checked in at {scan.time}</p>
      <p className="text-lg mt-1 opacity-90">{remaining} day(s) remaining</p>
      <h1 className="text-7xl md:text-8xl font-black tracking-widest mt-6 animate-bounce">WELCOME</h1>
    </div>
  );
}
