import { useMemo, useState } from 'react';
import { useGym } from '../../context/GymContext';
import { PageHeader, Field, inputCls, btnCls, StatCard } from '../../components/ui';
import { todayISO } from '../../data/seed';

export default function Expenses() {
  const { expenses, payments, addExpense, deleteExpense } = useGym();
  const [form, setForm] = useState({ title: '', amount: '', category: 'Rent', date: todayISO() });
  const [errors, setErrors] = useState({});

  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const totalRevenue = payments.reduce((s, p) => s + p.amount, 0);
  const profit = totalRevenue - totalExpenses;

  const save = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.title.trim()) err.title = 'Required';
    if (!form.amount || Number(form.amount) <= 0) err.amount = 'Valid amount';
    setErrors(err);
    if (Object.keys(err).length) return;
    addExpense({ ...form, amount: Number(form.amount) });
    setForm({ ...form, title: '', amount: '' });
  };

  return (
    <div>
      <PageHeader title="Expenses" subtitle="Track spending and profit/loss" />
      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Revenue" value={`Rs ${totalRevenue.toLocaleString()}`} icon="📈" tone="green" />
        <StatCard label="Total Expenses" value={`Rs ${totalExpenses.toLocaleString()}`} icon="🧾" tone="red" />
        <StatCard label={profit >= 0 ? 'Profit' : 'Loss'} value={`Rs ${Math.abs(profit).toLocaleString()}`} icon={profit >= 0 ? '💰' : '📉'} tone={profit >= 0 ? 'green' : 'red'} />
      </div>

      <form onSubmit={save} className="bg-panel border border-line rounded-2xl p-6 grid sm:grid-cols-4 gap-4 items-end">
        <Field label="Title *"><input className={inputCls} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />{errors.title && <p className="text-red-400 text-xs">{errors.title}</p>}</Field>
        <Field label="Amount *"><input type="number" className={inputCls} value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />{errors.amount && <p className="text-red-400 text-xs">{errors.amount}</p>}</Field>
        <Field label="Category"><select className={inputCls} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}><option>Rent</option><option>Utilities</option><option>Supplies</option><option>Marketing</option><option>Maintenance</option><option>Other</option></select></Field>
        <button className={btnCls}>+ Add</button>
      </form>

      <div className="bg-panel border border-line rounded-2xl overflow-x-auto mt-6">
        <table className="w-full text-sm">
          <thead><tr className="text-left text-muted"><th className="p-4">Title</th><th className="p-4">Category</th><th className="p-4">Amount</th><th className="p-4">Date</th><th className="p-4"></th></tr></thead>
          <tbody>
            {expenses.map((e) => (
              <tr key={e.id} className="border-t border-line">
                <td className="p-4">{e.title}</td><td className="p-4">{e.category}</td><td className="p-4">Rs {e.amount.toLocaleString()}</td><td className="p-4">{e.date}</td>
                <td className="p-4"><button onClick={() => deleteExpense(e.id)} className="text-red-400 text-xs font-bold">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
