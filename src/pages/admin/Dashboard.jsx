import { useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { useGym } from '../../context/GymContext';
import { PageHeader, StatCard, Badge } from '../../components/ui';
import { todayISO, daysBetween, isActive } from '../../data/seed';

export default function Dashboard() {
  const { members, activeMembers, expiredMembers, attendance, payments, expenses } = useGym();

  const todayAtt = attendance.filter((a) => a.date === todayISO()).length;
  const monthStart = todayISO().slice(0, 7);
  const monthlyRevenue = payments.filter((p) => p.date.startsWith(monthStart)).reduce((s, p) => s + p.amount, 0);
  const newJoinings = members.filter((m) => m.joinDate.startsWith(monthStart)).length;

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

  const growthData = useMemo(() => {
    const joined = {};
    members.forEach((m) => { const k = m.joinDate.slice(0, 7); joined[k] = (joined[k] || 0) + 1; });
    let total = 0;
    return Object.keys(joined).sort().map((k) => ({ name: k.slice(5), members: (total += joined[k]) }));
  }, [members]);

  const expiringSoon = members.filter((m) => isActive(m) && daysBetween(m.expiryDate, todayISO()) <= 10)
    .sort((a, b) => a.expiryDate.localeCompare(b.expiryDate)).slice(0, 6);

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Overview of your gym at a glance" />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Total Members" value={members.length} icon="👥" />
        <StatCard label="Active" value={activeMembers.length} icon="✅" tone="green" />
        <StatCard label="Expired" value={expiredMembers.length} icon="⛔" tone="red" />
        <StatCard label="Today's Attendance" value={todayAtt} icon="🕓" />
        <StatCard label="Monthly Revenue" value={`Rs ${monthlyRevenue.toLocaleString()}`} icon="💰" tone="green" />
        <StatCard label="New Joinings" value={newJoinings} icon="✨" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mt-6">
        <div className="bg-panel border border-line rounded-2xl p-5 lg:col-span-2">
          <h3 className="font-bold mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#888" /><YAxis stroke="#888" />
              <Tooltip contentStyle={{ background: '#141418', border: '1px solid #333', borderRadius: 12 }} />
              <Bar dataKey="revenue" radius={[8, 8, 0, 0]}>{revenueData.map((_, i) => <Cell key={i} fill="#ff5a1f" />)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-panel border border-line rounded-2xl p-5">
          <h3 className="font-bold mb-4">Member Growth</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#888" /><YAxis stroke="#888" />
              <Tooltip contentStyle={{ background: '#141418', border: '1px solid #333', borderRadius: 12 }} />
              <Line type="monotone" dataKey="members" stroke="#ff5a1f" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-panel border border-line rounded-2xl p-5 lg:col-span-2">
          <h3 className="font-bold mb-4">Attendance (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#888" /><YAxis stroke="#888" allowDecimals={false} />
              <Tooltip contentStyle={{ background: '#141418', border: '1px solid #333', borderRadius: 12 }} />
              <Bar dataKey="count" fill="#ff8a5c" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-panel border border-line rounded-2xl p-5">
          <h3 className="font-bold mb-4">Expiring Soon</h3>
          <div className="space-y-3 max-h-[280px] overflow-y-auto no-scrollbar">
            {expiringSoon.length === 0 && <p className="text-muted text-sm">No memberships expiring soon.</p>}
            {expiringSoon.map((m) => (
              <div key={m.id} className="flex items-center gap-3">
                <img src={m.photo} alt="" className="w-9 h-9 rounded-full" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{m.name}</p>
                  <p className="text-xs text-muted">{m.expiryDate}</p>
                </div>
                <Badge color="yellow">{daysBetween(m.expiryDate, todayISO())}d left</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
