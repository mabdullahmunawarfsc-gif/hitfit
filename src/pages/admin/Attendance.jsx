import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useGym } from '../../context/GymContext';
import { PageHeader, btnCls } from '../../components/ui';
import { todayISO } from '../../data/seed';

export default function Attendance() {
  const { attendance, scanFingerprint } = useGym();
  const [fp, setFp] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const scan = (e) => {
    e.preventDefault();
    if (!fp.trim()) return toast.error('Enter a fingerprint ID');
    const r = scanFingerprint(fp);
    if (r.status === 'ok') toast.success(`Welcome, ${r.member.name}! ✅`);
    else if (r.status === 'expired') toast.error(`${r.member.name}'s fee is EXPIRED ❌`);
    else toast('Unknown fingerprint ❓', { icon: '⚠️' });
    setFp('');
  };

  const rows = useMemo(() => filterDate ? attendance.filter((a) => a.date === filterDate) : attendance, [attendance, filterDate]);

  return (
    <div>
      <PageHeader title="Attendance" subtitle="Fingerprint check-in (simulated)" />

      <form onSubmit={scan} className="bg-panel border border-line rounded-2xl p-6 max-w-xl">
        <h3 className="font-bold text-lg">🖐 Simulate Fingerprint Scan</h3>
        <p className="text-muted text-sm">Enter a fingerprint ID (e.g. <b>FP1001</b> active, <b>FP1004</b> expired), then press Scan.</p>
        <div className="flex gap-3 mt-4">
          <input value={fp} onChange={(e) => setFp(e.target.value)} placeholder="FP1001" className="flex-1 px-4 py-3 rounded-xl bg-panel2 border border-line focus:border-accent outline-none font-mono" />
          <button className={btnCls}>Scan</button>
        </div>
        <p className="text-xs text-muted mt-3">Tip: open <a href="/live" target="_blank" className="text-accent underline">/live</a> in another tab to see the TV screen update instantly.</p>
      </form>

      <h3 className="font-bold text-lg mt-8 mb-3">Attendance History</h3>
      <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="mb-3 px-4 py-2.5 rounded-xl bg-panel border border-line focus:border-accent outline-none text-sm" />
      <div className="bg-panel border border-line rounded-2xl overflow-x-auto max-h-[460px] overflow-y-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-left text-muted"><th className="p-4">Member</th><th className="p-4">Fingerprint</th><th className="p-4">Date</th><th className="p-4">Time</th></tr></thead>
          <tbody>
            {rows.slice(0, 60).map((a) => (
              <tr key={a.id} className="border-t border-line">
                <td className="p-4 flex items-center gap-3"><img src={a.photo} alt="" className="w-8 h-8 rounded-full" />{a.name}</td>
                <td className="p-4 font-mono">{a.fingerprintId}</td><td className="p-4">{a.date}</td><td className="p-4">{a.time}</td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan="4" className="p-8 text-center text-muted">No records for this date.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
