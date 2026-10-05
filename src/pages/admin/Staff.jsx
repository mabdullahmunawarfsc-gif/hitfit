import { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { PageHeader, Modal, Field, inputCls, btnCls, ghostBtn } from '../../components/ui';

export default function Staff() {
  const { staff, addStaff, removeStaff, toggleSalary } = useGym();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', role: '', phone: '', salary: '' });
  const [errors, setErrors] = useState({});

  const save = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = 'Required';
    if (!form.role.trim()) err.role = 'Required';
    if (!/^03\d{9}$/.test(form.phone)) err.phone = 'Format 03XXXXXXXXX';
    if (!form.salary || Number(form.salary) <= 0) err.salary = 'Valid salary';
    setErrors(err);
    if (Object.keys(err).length) return;
    addStaff({ ...form, salary: Number(form.salary) });
    setForm({ name: '', role: '', phone: '', salary: '' });
    setOpen(false);
  };

  const total = staff.reduce((s, x) => s + x.salary, 0);
  const paidTotal = staff.filter((s) => s.paid).reduce((s, x) => s + x.salary, 0);

  return (
    <div>
      <PageHeader title="Trainers & Staff" subtitle={`Payroll: Rs ${paidTotal.toLocaleString()} / Rs ${total.toLocaleString()} paid`}
        action={<button onClick={() => setOpen(true)} className={btnCls}>+ Add Staff</button>} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {staff.map((s) => (
          <div key={s.id} className="bg-panel border border-line rounded-2xl p-5">
            <h3 className="font-bold">{s.name}</h3>
            <p className="text-accent text-sm">{s.role}</p>
            <p className="text-muted text-sm mt-2">📞 {s.phone}</p>
            <p className="mt-2 font-semibold">Salary: Rs {s.salary.toLocaleString()}</p>
            <div className="flex gap-2 mt-4">
              <button onClick={() => toggleSalary(s.id)} className={`flex-1 py-2 rounded-xl text-sm font-semibold ${s.paid ? 'bg-green-600/20 text-green-400' : 'bg-yellow-600/20 text-yellow-400'}`}>{s.paid ? '✓ Paid' : 'Mark Paid'}</button>
              <button onClick={() => { if (confirm('Remove?')) removeStaff(s.id); }} className="px-3 py-2 rounded-xl text-red-400 border border-line text-sm">Del</button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={open} title="Add Staff" onClose={() => setOpen(false)}>
        <form onSubmit={save} className="space-y-4">
          <Field label="Name *"><input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />{errors.name && <p className="text-red-400 text-xs">{errors.name}</p>}</Field>
          <Field label="Role *"><input className={inputCls} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />{errors.role && <p className="text-red-400 text-xs">{errors.role}</p>}</Field>
          <Field label="Phone *"><input className={inputCls} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />{errors.phone && <p className="text-red-400 text-xs">{errors.phone}</p>}</Field>
          <Field label="Salary (Rs) *"><input type="number" className={inputCls} value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} />{errors.salary && <p className="text-red-400 text-xs">{errors.salary}</p>}</Field>
          <div className="flex gap-3 justify-end">
            <button type="button" onClick={() => setOpen(false)} className={ghostBtn}>Cancel</button>
            <button className={btnCls}>Save</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
