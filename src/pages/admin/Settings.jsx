import { useState } from 'react';
import toast from 'react-hot-toast';
import { useGym } from '../../context/GymContext';
import { PageHeader, Field, inputCls, btnCls, ghostBtn } from '../../components/ui';

export default function Settings() {
  const { plans, updatePlanPrice, gym, setGym, theme, toggleTheme, resetData } = useGym();
  const [draftGym, setDraftGym] = useState({ ...gym });

  return (
    <div>
      <PageHeader title="Settings" subtitle="Gym info, plans and appearance" />

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-panel border border-line rounded-2xl p-6">
          <h3 className="font-bold mb-4">Membership Plans & Prices</h3>
          <div className="space-y-3">
            {plans.map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="w-28 font-semibold">{p.name}</span>
                <input type="number" defaultValue={p.price} onBlur={(e) => updatePlanPrice(p.id, e.target.value)} className={inputCls} />
                <span className="text-muted text-sm">Rs</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted mt-3">Changes apply instantly across the website and admin.</p>
        </div>

        <div className="bg-panel border border-line rounded-2xl p-6">
          <h3 className="font-bold mb-4">Gym Information</h3>
          <div className="space-y-3">
            {['name', 'phone', 'email', 'address', 'hours'].map((k) => (
              <Field key={k} label={k[0].toUpperCase() + k.slice(1)}>
                <input className={inputCls} value={draftGym[k]} onChange={(e) => setDraftGym({ ...draftGym, [k]: e.target.value })} />
              </Field>
            ))}
            <button className={btnCls} onClick={() => { setGym(draftGym); toast.success('Gym info saved'); }}>Save</button>
          </div>
        </div>

        <div className="bg-panel border border-line rounded-2xl p-6">
          <h3 className="font-bold mb-4">Appearance</h3>
          <p className="text-muted text-sm">Current theme: <b className="text-ink">{theme}</b></p>
          <button className={ghostBtn + ' mt-3'} onClick={toggleTheme}>{theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}</button>
        </div>

        <div className="bg-panel border border-line rounded-2xl p-6">
          <h3 className="font-bold mb-4">Data</h3>
          <p className="text-muted text-sm mb-3">Reset all mock data stored in your browser.</p>
          <button className="px-4 py-2.5 rounded-xl bg-red-600 text-white font-semibold text-sm" onClick={() => { if (confirm('Reset all data?')) resetData(); }}>Reset Data</button>
        </div>
      </div>
    </div>
  );
}
