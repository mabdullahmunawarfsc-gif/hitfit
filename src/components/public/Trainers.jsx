const trainers = [
  { name: 'Coach Imran', role: 'Head Trainer', img: 'https://i.pravatar.cc/300?img=12' },
  { name: 'Sara Youzafzai', role: 'Yoga Instructor', img: 'https://i.pravatar.cc/300?img=47' },
  { name: 'Adeel Sheikh', role: 'Boxing Coach', img: 'https://i.pravatar.cc/300?img=15' },
  { name: 'Nadia Ali', role: 'CrossFit Coach', img: 'https://i.pravatar.cc/300?img=44' },
];

export default function Trainers() {
  return (
    <section id="trainers" className="bg-panel/50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-black text-center">Meet Our <span className="text-accent">Trainers</span></h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {trainers.map((t) => (
            <div key={t.name} className="bg-panel border border-line rounded-3xl overflow-hidden hover:-translate-y-2 transition duration-300 text-center">
              <img src={t.img} alt={t.name} className="w-full h-56 object-cover object-top" />
              <div className="p-5">
                <h3 className="font-bold">{t.name}</h3>
                <p className="text-accent text-sm">{t.role}</p>
                <div className="flex justify-center gap-4 mt-3 text-muted">
                  <a href="#" aria-label="ig">IG</a><a href="#" aria-label="fb">FB</a><a href="#" aria-label="yt">YT</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
