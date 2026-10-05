import { useParams, Link } from 'react-router-dom';
import { useGym } from '../../context/GymContext';
import { Badge } from '../../components/ui';
import { isActive, daysBetween, todayISO } from '../../data/seed';

export default function MemberProfile() {
  const { id } = useParams();
  const { members, payments, attendance } = useGym();
  const m = members.find((x) => x.id === id);
  if (!m) return <p>Member not found. <Link to="/admin/members" className="text-accent">Back</Link></p>;

  const history = payments.filter((p) => p.memberId === m.id).slice(0, 10);
  const visits = attendance.filter((a) => a.memberId === m.id).slice(0, 10);

  return (
    <div>
      <Link to="/admin/members" className="text-accent text-sm">← Back to Members</Link>
      <div className="bg-panel border border-line rounded-3xl p-8 mt-4 flex flex-col md:flex-row gap-8">
        <img src={m.photo} alt={m.name} className="w-32 h-32 rounded-full object-cover" />
        <div className="flex-1">
          <h1 className="text-3xl font-black">{m.name}</h1>
          <p className="text-muted">{m.plan} Plan • <Badge color={isActive(m) ? 'green' : 'red'}>{isActive(m) ? 'Active' : 'Expired'}</Badge></p>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 mt-6 text-sm">
            <p><b>Phone:</b> {m.phone}</p>
            <p><b>CNIC:</b> {m.cnic}</p>
            <p><b>Gender/Age:</b> {m.gender}, {m.age}</p>
            <p><b>Fingerprint:</b> <span className="font-mono">{m.fingerprintId}</span></p>
            <p><b>Joined:</b> {m.joinDate}</p>
            <p><b>Expires:</b> {m.expiryDate} ({isActive(m) ? `${daysBetween(m.expiryDate, todayISO())} days left` : 'expired'})</p>
            <p><b>Emergency:</b> {m.emergency}</p>
          </div>
        </div>
      </div>

      <h3 className="font-bold text-lg mt-8 mb-3">Payment History</h3>
      <div className="bg-panel border border-line rounded-2xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-left text-muted"><th className="p-4">Date</th><th className="p-4">Amount</th><th className="p-4">Method</th><th className="p-4">Plan</th></tr></thead>
          <tbody>
            {history.map((p) => <tr key={p.id} className="border-t border-line"><td className="p-4">{p.date}</td><td className="p-4">Rs {p.amount.toLocaleString()}</td><td className="p-4 capitalize">{p.method}</td><td className="p-4">{p.plan}</td></tr>)}
            {history.length === 0 && <tr><td colSpan="4" className="p-6 text-center text-muted">No payments.</td></tr>}
          </tbody>
        </table>
      </div>

      <h3 className="font-bold text-lg mt-8 mb-3">Recent Visits</h3>
      <div className="bg-panel border border-line rounded-2xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-left text-muted"><th className="p-4">Date</th><th className="p-4">Time</th></tr></thead>
          <tbody>
            {visits.map((a) => <tr key={a.id} className="border-t border-line"><td className="p-4">{a.date}</td><td className="p-4">{a.time}</td></tr>)}
            {visits.length === 0 && <tr><td colSpan="2" className="p-6 text-center text-muted">No visits yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
