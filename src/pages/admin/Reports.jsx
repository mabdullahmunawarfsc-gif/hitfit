import { useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useGym } from '../../context/GymContext';
import { PageHeader, ghostBtn } from '../../components/ui';

function downloadCSV(rows, filename) {
  const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}

export default function Reports() {
  const { payments, attendance } = useGym();

  const revenueData = useMemo(() => {
    const months = {};
    payments.forEach((p) => { const k = p.date.slice(0, 7); months[k] = (months[k] || 0) + p.amount; });
    return Object.keys(months).sort().slice(-6).map((k) => ({ name: k.slice(5), revenue: months[k] }));
  }, [payments]);

  const attendanceData = useMemo(() => {
    const days = {};
    attendance.forEach((a) => { days[a.date] = (days[a.date] || 0) + 1; });
    return Object.keys(days).sort().slice(-7).map((k) => ({ name: k.slice(5), count: days[k] }));
  }, [attendance]);

  const exportRevenue = () => downloadCSV([['Month', 'Revenue (Rs)'], ...revenueData.map((r) => [r.name, r.revenue])], 'revenue-report.csv');
  const exportAttendance = () => downloadCSV([['Date', 'Count'], ...attendanceData.map((r) => [r.name, r.count])], 'attendance-report.csv');

  return (
    <div>
      <PageHeader title="Reports" subtitle="Revenue and attendance analytics"
        action={
          <div className="flex gap-2 flex-wrap">
            <button className={ghostBtn} onClick={exportRevenue}>⬇ Excel (Revenue)</button>
            <button className={ghostBtn} onClick={exportAttendance}>⬇ Excel (Attendance)</button>
            <button className={ghostBtn} onClick={() => window.print()}>🖨 PDF / Print</button>
          </div>
        } />

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-panel border border-line rounded-2xl p-5">
          <h3 className="font-bold mb-4">Revenue (last 6 months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#888" /><YAxis stroke="#888" />
              <Tooltip contentStyle={{ background: '#141418', border: '1px solid #333', borderRadius: 12 }} />
              <Bar dataKey="revenue" fill="#ff5a1f" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-panel border border-line rounded-2xl p-5">
          <h3 className="font-bold mb-4">Attendance (last 7 days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#888" /><YAxis stroke="#888" allowDecimals={false} />
              <Tooltip contentStyle={{ background: '#141418', border: '1px solid #333', borderRadius: 12 }} />
              <Line type="monotone" dataKey="count" stroke="#ff8a5c" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
