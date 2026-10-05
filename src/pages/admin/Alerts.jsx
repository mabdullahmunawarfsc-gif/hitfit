import { useGym } from '../../context/GymContext';
import { PageHeader, Badge } from '../../components/ui';
import { isActive, daysBetween, todayISO } from '../../data/seed';

export default function Alerts() {
  const { members } = useGym();
  const inDays = (n) => members.filter((m) => isActive(m) && daysBetween(m.expiryDate, todayISO()) <= n)
    .sort((a, b) => a.expiryDate.localeCompare(b.expiryDate));
  const exp3 = inDays(3).filter((m) => daysBetween(m.expiryDate, todayISO()) <= 3);
  const exp7 = inDays(7).filter((m) => daysBetween(m.expiryDate, todayISO()) > 3);

  const Section = ({ title, list, color }) => (
    <>
      <h3 className="font-bold text-lg mt-8 mb-3">{title} ({list.length})</h3>
      <div className="bg-panel border border-line rounded-2xl divide-y divide-line">
        {list.map((m) => (
          <div key={m.id} className="p-4 flex items-center gap-4 flex-wrap">
            <img src={m.photo} alt="" className="w-10 h-10 rounded-full" />
            <div className="flex-1 min-w-[140px]"><p className="font-semibold">{m.name}</p><p className="text-xs text-muted">{m.phone} • {m.plan}</p></div>
            <Badge color={color}>{daysBetween(m.expiryDate, todayISO())} day(s) left</Badge>
            <a target="_blank" rel="noreferrer" href={`https://wa.me/92${m.phone.slice(1)}?text=${encodeURIComponent(`Hi ${m.name}, your HIT FIT GYM membership expires on ${m.expiryDate}. Renew now to keep your streak! 💪`)}`}
              className="px-4 py-2 rounded-xl bg-green-600 text-white text-sm font-semibold">WhatsApp</a>
          </div>
        ))}
        {list.length === 0 && <p className="p-6 text-muted text-sm">None.</p>}
      </div>
    </>
  );

  return (
    <div>
      <PageHeader title="Expiry Alerts" subtitle="Members expiring within 3 or 7 days" />
      <Section title="Expiring in 3 days" list={exp3} color="red" />
      <Section title="Expiring in 4–7 days" list={exp7} color="yellow" />
    </div>
  );
}
