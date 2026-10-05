import { useGym } from '../../context/GymContext';

export default function PlansSection() {
  const { plans } = useGym();
  return (
    <section id="plans" className="max-w-7xl mx-auto px-4 py-20">
      <h2 className="text-4xl font-black text-center">Membership <span className="text-accent">Plans</span></h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {plans.map((p) => (
          <div key={p.id} className={`relative bg-panel border rounded-3xl p-8 flex flex-col ${p.popular ? 'border-accent shadow-xl shadow-accent/20 scale-[1.03]' : 'border-line'}`}>
            {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-bold px-4 py-1 rounded-full">MOST POPULAR</span>}
            <h3 className="text-xl font-bold">{p.name}</h3>
            <p className="text-4xl font-black mt-4">Rs {p.price.toLocaleString()}<span className="text-sm text-muted font-normal"> /{p.months === 1 ? 'mo' : p.months + ' mo'}</span></p>
            <ul className="mt-6 space-y-2 text-sm text-muted flex-1">
              {p.features?.map((f) => <li key={f}>✓ {f}</li>)}
            </ul>
            <a href="#contact" className={`mt-8 text-center py-3 rounded-full font-bold transition ${p.popular ? 'bg-accent text-white hover:brightness-110' : 'border border-line hover:bg-panel2'}`}>Choose Plan</a>
          </div>
        ))}
      </div>
    </section>
  );
}
