const services = [
  { title: 'Weight Training', icon: '🏋️', desc: 'Strength zones with Olympic plates and machines.' },
  { title: 'Cardio', icon: '🏃', desc: 'Treadmills, bikes, rowing and conditioning decks.' },
  { title: 'CrossFit', icon: '🔥', desc: 'WOD programming for all levels, coached live.' },
  { title: 'Yoga', icon: '🧘', desc: 'Mobility, breath work and recovery flows.' },
  { title: 'Boxing', icon: '🥊', desc: 'Pad work, bags and sparring with pro coaches.' },
  { title: 'Personal Training', icon: '💪', desc: '1-on-1 plans built around your goals.' },
];

export default function Services() {
  return (
    <section id="services" className="bg-panel/50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-black text-center">Our <span className="text-accent">Services</span></h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {services.map((s) => (
            <div key={s.title} className="group bg-panel border border-line rounded-2xl p-8 hover:-translate-y-2 hover:border-accent transition duration-300">
              <div className="text-4xl">{s.icon}</div>
              <h3 className="text-xl font-bold mt-4 group-hover:text-accent transition">{s.title}</h3>
              <p className="text-muted text-sm mt-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
