import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGym } from '../../context/GymContext';
import { PageHeader, Badge, Modal, Field, inputCls, btnCls, ghostBtn } from '../../components/ui';
import { isActive, todayISO } from '../../data/seed';

const empty = { name: '', phone: '', cnic: '', photo: '', gender: 'Male', age: '', plan: 'Monthly', joinDate: todayISO(), fingerprintId: '', emergency: '', expiryDate: '' };

export default function Members() {
  const { members, plans, addMember, updateMember, deleteMember } = useGym();
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');
  const [modal, setModal] = useState(null); // null | 'add' | member
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  const list = useMemo(() => members.filter((m) => {
    const match = m.name.toLowerCase().includes(q.toLowerCase()) || m.phone.includes(q) || m.fingerprintId.toLowerCase().includes(q.toLowerCase());
    if (!match) return false;
    if (filter === 'active') return isActive(m);
    if (filter === 'expired') return !isActive(m);
    return true;
  }), [members, q, filter]);

  const openAdd = () => { setForm({ ...empty, expiryDate: todayISO() }); setErrors({}); setModal('add'); };
  const openEdit = (m) => { setForm({ ...m }); setErrors({}); setModal(m); };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!/^03\d{9}$/.test(form.phone)) e.phone = 'Format 03XXXXXXXXX';
    if (!/^\d{5}-\d{7}-\d$/.test(form.cnic)) e.cnic = 'Format 42101-1234567-1';
    if (!/^FP\d{3,}$/i.test(form.fingerprintId)) e.fingerprintId = 'e.g. FP1015';
    if (!form.age || Number(form.age) < 10 || Number(form.age) > 100) e.age = 'Valid age';
    if (!form.expiryDate) e.expiryDate = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const save = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = { ...form, age: Number(form.age), photo: form.photo || `https://i.pravatar.cc/200?img=${Math.floor(Math.random() * 60) + 1}`, monthly: plans.find((p) => p.name === form.plan)?.price || 0 };
    if (modal === 'add') addMember(payload); else updateMember(modal.id, payload);
    setModal(null);
  };

  const del = (id) => { if (confirm('Delete this member?')) deleteMember(id); };

  return (
    <div>
      <PageHeader title="Members" subtitle={`${list.length} members shown`}
        action={<button onClick={openAdd} className={btnCls}>+ Add Member</button>} />

      <div className="flex flex-wrap gap-3 mb-4">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, phone, fingerprint..." className="px-4 py-2.5 rounded-xl bg-panel border border-line focus:border-accent outline-none text-sm w-full sm:w-72" />
        <div className="flex gap-2">
          {[['all', 'All'], ['active', 'Active'], ['expired', 'Expired']].map(([v, l]) => (
            <button key={v} onClick={() => setFilter(v)} className={`px-4 py-2.5 rounded-xl text-sm font-semibold ${filter === v ? 'bg-accent text-white' : 'border border-line'}`}>{l}</button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto bg-panel border border-line rounded-2xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted">
              <th className="p-4">Member</th><th className="p-4">Plan</th><th className="p-4">Fingerprint</th><th className="p-4">Expiry</th><th className="p-4">Status</th><th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((m) => (
              <tr key={m.id} className="border-t border-line hover:bg-panel2/50">
                <td className="p-4 flex items-center gap-3">
                  <img src={m.photo} alt="" className="w-9 h-9 rounded-full" />
                  <div><p className="font-semibold">{m.name}</p><p className="text-xs text-muted">{m.phone}</p></div>
                </td>
                <td className="p-4">{m.plan}</td>
                <td className="p-4 font-mono">{m.fingerprintId}</td>
                <td className="p-4">{m.expiryDate}</td>
                <td className="p-4"><Badge color={isActive(m) ? 'green' : 'red'}>{isActive(m) ? 'Active' : 'Expired'}</Badge></td>
                <td className="p-4 space-x-2 whitespace-nowrap">
                  <Link to={`/admin/members/${m.id}`} className="text-accent text-xs font-bold">View</Link>
                  <button onClick={() => openEdit(m)} className="text-yellow-400 text-xs font-bold">Edit</button>
                  <button onClick={() => del(m.id)} className="text-red-400 text-xs font-bold">Delete</button>
                </td>
              </tr>
            ))}
            {list.length === 0 && <tr><td colSpan="6" className="p-8 text-center text-muted">No members found.</td></tr>}
          </tbody>
        </table>
      </div>

      <Modal open={!!modal} title={modal === 'add' ? 'Add Member' : 'Edit Member'} onClose={() => setModal(null)} wide>
        <form onSubmit={save} className="grid grid-cols-2 gap-4">
          <Field label="Full Name *"><input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />{errors.name && <p className="text-red-400 text-xs">{errors.name}</p>}</Field>
          <Field label="Phone *"><input className={inputCls} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="03XXXXXXXXX" />{errors.phone && <p className="text-red-400 text-xs">{errors.phone}</p>}</Field>
          <Field label="CNIC *"><input className={inputCls} value={form.cnic} onChange={(e) => setForm({ ...form, cnic: e.target.value })} placeholder="42101-1234567-1" />{errors.cnic && <p className="text-red-400 text-xs">{errors.cnic}</p>}</Field>
          <Field label="Age *"><input type="number" className={inputCls} value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />{errors.age && <p className="text-red-400 text-xs">{errors.age}</p>}</Field>
          <Field label="Gender"><select className={inputCls} value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}><option>Male</option><option>Female</option></select></Field>
          <Field label="Plan"><select className={inputCls} value={form.plan} onChange={(e) => setForm({ ...form, plan: e.target.value })}>{plans.map((p) => <option key={p.id}>{p.name}</option>)}</select></Field>
          <Field label="Join Date"><input type="date" className={inputCls} value={form.joinDate} onChange={(e) => setForm({ ...form, joinDate: e.target.value })} /></Field>
          <Field label="Expiry Date *"><input type="date" className={inputCls} value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} />{errors.expiryDate && <p className="text-red-400 text-xs">{errors.expiryDate}</p>}</Field>
          <Field label="Fingerprint ID *"><input className={inputCls} value={form.fingerprintId} onChange={(e) => setForm({ ...form, fingerprintId: e.target.value })} placeholder="FP1015" />{errors.fingerprintId && <p className="text-red-400 text-xs">{errors.fingerprintId}</p>}</Field>
          <Field label="Emergency Contact"><input className={inputCls} value={form.emergency} onChange={(e) => setForm({ ...form, emergency: e.target.value })} /></Field>
          <Field label="Photo URL"><input className={inputCls} value={form.photo} onChange={(e) => setForm({ ...form, photo: e.target.value })} /></Field>
          <div className="col-span-2 flex gap-3 justify-end">
            <button type="button" onClick={() => setModal(null)} className={ghostBtn}>Cancel</button>
            <button className={btnCls}>Save</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
