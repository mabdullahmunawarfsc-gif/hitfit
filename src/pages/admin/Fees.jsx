import { useMemo, useState } from 'react';
import { useGym } from '../../context/GymContext';
import { PageHeader, Modal, Field, inputCls, btnCls, ghostBtn } from '../../components/ui';
import { todayISO } from '../../data/seed';

export default function Fees() {
  const { members, payments, plans, recordPayment, expiredMembers } = useGym();
  const [form, setForm] = useState({ memberId: '', amount: '', method: 'cash', date: todayISO(), plan: 'Monthly' });
  const [errors, setErrors] = useState({});
  const [receipt, setReceipt] = useState(null);
  const [filter, setFilter] = useState('all');

  const planNames = plans.map((p) => p.name);
  const history = useMemo(() => filter === 'all' ? payments : payments.filter((p) => p.method === filter), [payments, filter]);

  const save = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.memberId) err.memberId = 'Select a member';
    if (!form.amount || Number(form.amount) <= 0) err.amount = 'Valid amount';
    setErrors(err);
    if (Object.keys(err).length) return;
    const member = members.find((m) => m.id === form.memberId);
    const result = recordPayment({ ...form, amount: Number(form.amount), member: member.name });
    setReceipt({ ...result.payment, memberName: member.name, method: form.method });
    setForm({ ...form, amount: '', memberId: '' });
  };

  return (
    <div>
      <PageHeader title="Fees & Payments" subtitle="Record payments and print receipts" />

      <form onSubmit={save} className="bg-panel border border-line rounded-2xl p-6 grid sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        <Field label="Member *">
          <select className={inputCls} value={form.memberId} onChange={(e) => setForm({ ...form, memberId: e.target.value })}>
            <option value="">Select...</option>
            {members.map((m) => <option key={m.id} value={m.id}>{m.name} — {m.fingerprintId}</option>)}
          </select>
          {errors.memberId && <p className="text-red-400 text-xs">{errors.memberId}</p>}
        </Field>
        <Field label="Plan"><select className={inputCls} value={form.plan} onChange={(e) => setForm({ ...form, plan: e.target.value, amount: plans.find((p) => p.name === e.target.value)?.price || '' })}>{planNames.map((n) => <option key={n}>{n}</option>)}</select></Field>
        <Field label="Amount (Rs) *"><input type="number" className={inputCls} value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />{errors.amount && <p className="text-red-400 text-xs">{errors.amount}</p>}</Field>
        <Field label="Method"><select className={inputCls} value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })}><option value="cash">Cash</option><option value="JazzCash">JazzCash</option><option value="Easypaisa">Easypaisa</option><option value="bank">Bank</option></select></Field>
        <button className={btnCls}>Record Payment</button>
      </form>

      <h3 className="font-bold text-lg mt-8 mb-3">Payment History</h3>
      <div className="flex gap-2 mb-3 flex-wrap">
        {['all', 'cash', 'JazzCash', 'Easypaisa', 'bank'].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-sm capitalize ${filter === f ? 'bg-accent text-white' : 'border border-line'}`}>{f}</button>
        ))}
      </div>
      <div className="bg-panel border border-line rounded-2xl overflow-x-auto max-h-[420px] overflow-y-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-left text-muted"><th className="p-4">Member</th><th className="p-4">Amount</th><th className="p-4">Method</th><th className="p-4">Date</th><th className="p-4">Expiry</th></tr></thead>
          <tbody>
            {history.slice(0, 50).map((p) => (
              <tr key={p.id} className="border-t border-line"><td className="p-4">{p.member}</td><td className="p-4">Rs {p.amount.toLocaleString()}</td><td className="p-4 capitalize">{p.method}</td><td className="p-4">{p.date}</td><td className="p-4">{p.expiryDate}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="font-bold text-lg mt-8 mb-3">Defaulters ({expiredMembers.length})</h3>
      <div className="bg-panel border border-line rounded-2xl divide-y divide-line">
        {expiredMembers.map((m) => (
          <div key={m.id} className="p-4 flex items-center gap-4 flex-wrap">
            <img src={m.photo} alt="" className="w-10 h-10 rounded-full" />
            <div className="flex-1 min-w-[140px]"><p className="font-semibold">{m.name}</p><p className="text-xs text-muted">Expired: {m.expiryDate}</p></div>
            <a target="_blank" rel="noreferrer" href={`https://wa.me/92${m.phone.slice(1)}?text=${encodeURIComponent(`Hi ${m.name}, your HIT FIT GYM membership expired on ${m.expiryDate}. Please renew to continue training. 💪`)}`}
              className="px-4 py-2 rounded-xl bg-green-600 text-white text-sm font-semibold">Send WhatsApp Reminder</a>
          </div>
        ))}
        {expiredMembers.length === 0 && <p className="p-6 text-muted text-sm">No defaulters 🎉</p>}
      </div>

      <Modal open={!!receipt} title="Receipt" onClose={() => setReceipt(null)}>
        {receipt && (
          <div>
            <div className="print-area text-sm space-y-1 border border-dashed border-line rounded-xl p-5">
              <p className="text-xl font-black text-center">HIT FIT GYM</p>
              <p className="text-center text-muted text-xs mb-3">Payment Receipt</p>
              <p><b>Member:</b> {receipt.memberName}</p>
              <p><b>Plan:</b> {receipt.plan}</p>
              <p><b>Amount:</b> Rs {Number(receipt.amount).toLocaleString()}</p>
              <p><b>Method:</b> {receipt.method}</p>
              <p><b>Date:</b> {receipt.date}</p>
              <p><b>New Expiry:</b> {receipt.expiryDate}</p>
              <p className="text-center text-muted text-xs mt-3">Thank you for training with us!</p>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => window.print()} className={btnCls}>🖨 Print</button>
              <button onClick={() => setReceipt(null)} className={ghostBtn}>Close</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
