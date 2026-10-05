import { useEffect, useState } from 'react';

const items = [
  { name: 'Hamza A.', text: 'HIT FIT changed my life. Lost 18kg in 5 months with their diet plan and trainers.' },
  { name: 'Fatima K.', text: 'Best gym in the area. The CrossFit program is no joke — I feel stronger than ever.' },
  { name: 'Usman T.', text: 'Clean facility, great equipment, and the staff actually care. Highly recommended!' },
  { name: 'Zainab S.', text: 'Yoga classes at HIT FIT helped with my back pain and flexibility in just 8 weeks.' },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 4500);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="bg-panel/50 py-20">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-black">What Members <span className="text-accent">Say</span></h2>
        <div className="bg-panel border border-line rounded-3xl p-10 mt-10 min-h-[180px] flex flex-col justify-center">
          <p className="text-lg text-muted">“{items[i].text}”</p>
          <p className="font-bold text-accent mt-4">— {items[i].name}</p>
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {items.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)} className={`w-2.5 h-2.5 rounded-full ${idx === i ? 'bg-accent' : 'bg-line'}`} aria-label="dot" />
          ))}
        </div>
      </div>
    </section>
  );
}
