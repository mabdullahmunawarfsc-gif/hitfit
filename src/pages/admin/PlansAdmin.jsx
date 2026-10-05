import { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { PageHeader, Modal, Field, inputCls, btnCls } from '../../components/ui';

export default function PlansAdmin() {
  const { members, templates, assignments, assign, unassign } = useGym();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ memberId: '', templateId: '' });

  const save = (e) => {
    e.preventDefault();
    if (!form.memberId || !form.templateId) return;
    assign(form.memberId, form.templateId);
    setOpen(false);
  };

  return (
    <div>
      <PageHeader title="Workout & Diet Plans" subtitle="Assign plans to members"
        action={<button onClick={() => setOpen(true)} className={btnCls}>+ Assign</button>} />

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-bold mb-3">Templates</h3>
          <div className="space-y-3">
            {templates.map((t) => (
              <div key={t.id} className="bg-panel border border-line rounded-2xl p-5">
                <p className="text-xs uppercase tracking-widest text-accent font-bold">{t.type}</p>
                <h4 className="font-bold mt-1">{t.title}</h4>
                <p className="text-muted text-sm mt-1">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-3">Assignments</h3>
          <div className="bg-panel border border-line rounded-2xl divide-y divide-line">
            {assignments.map((a) => {
              const m = members.find((x) => x.id === a.memberId);
              const t = templates.find((x) => x.id === a.templateId);
              return (
                <div key={a.id} className="p-4 flex items-center gap-3">
                  <div className="flex-1"><p className="font-semibold">{m?.name || 'Unknown'}</p><p className="text-xs text-muted">{t?.title}</p></div>
                  <button onClick={() => unassign(a.id)} className="text-red-400 text-xs font-bold">Remove</button>
                </div>
              );
            })}
            {assignments.length === 0 && <p className="p-6 text-muted text-sm">No assignments yet.</p>}
          </div>
        </div>
      </div>

      <Modal open={open} title="Assign Plan" onClose={() => setOpen(false)}>
        <form onSubmit={save} className="space-y-4">
          <Field label="Member"><select className={inputCls} value={form.memberId} onChange={(e) => setForm({ ...form, memberId: e.target.value })}><option value="">Select...</option>{members.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}</select></Field>
          <Field label="Plan Template"><select className={inputCls} value={form.templateId} onChange={(e) => setForm({ ...form, templateId: e.target.value })}><option value="">Select...</option>{templates.map((t) => <option key={t.id} value={t.id}>[{t.type}] {t.title}</option>)}</select></Field>
          <button className={btnCls}>Assign</button>
        </form>
      </Modal>
    </div>
  );
}
