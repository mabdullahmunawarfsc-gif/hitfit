import { useState } from 'react';

export default function BMI() {
  const [h, setH] = useState('');
  const [w, setW] = useState('');
  const [result, setResult] = useState(null);
  const calc = () => {
    const hm = Number(h) / 100;
    const bmi = Number(w) / (hm * hm);
    if (!hm || !w || isNaN(bmi)) { setResult({ error: 'Enter valid height (cm) and weight (kg)' }); return; }
    const cat = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese';
    setResult({ bmi: bmi.toFixed(1), cat });
  };
  return (
    <section id="bmi" className="max-w-4xl mx-auto px-4 py-20">
      <h2 className="text-4xl font-black text-center">BMI <span className="text-accent">Calculator</span></h2>
      <div className="bg-panel border border-line rounded-3xl p-8 mt-10 grid sm:grid-cols-2 gap-4">
        <input value={h} onChange={(e) => setH(e.target.value)} placeholder="Height (cm)" className="px-4 py-3 rounded-xl bg-panel2 border border-line focus:border-accent outline-none" />
        <input value={w} onChange={(e) => setW(e.target.value)} placeholder="Weight (kg)" className="px-4 py-3 rounded-xl bg-panel2 border border-line focus:border-accent outline-none" />
        <button onClick={calc} className="sm:col-span-2 py-3 rounded-xl bg-accent text-white font-bold hover:brightness-110 transition">Calculate</button>
        {result && (
          <div className="sm:col-span-2 text-center text-lg font-bold">
            {result.error ? <span className="text-red-400">{result.error}</span> : <>Your BMI is <span className="text-accent">{result.bmi}</span> — {result.cat}</>}
          </div>
        )}
      </div>
    </section>
  );
}
