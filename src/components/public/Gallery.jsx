const imgs = [
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=800&auto=format&fit=crop',
];

export default function Gallery() {
  return (
    <section id="gallery" className="max-w-7xl mx-auto px-4 py-20">
      <h2 className="text-4xl font-black text-center">Inside <span className="text-accent">HIT FIT</span></h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
        {imgs.map((src, i) => (
          <img key={i} src={src} alt="gallery" loading="lazy" className="rounded-2xl h-48 md:h-64 w-full object-cover hover:scale-[1.02] transition" />
        ))}
      </div>
      <h3 className="text-2xl font-black text-center mt-16">Before / After <span className="text-accent">Transformations</span></h3>
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {[['https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=900&auto=format&fit=crop', 'Ali Raza — 12 Weeks'], ['https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=900&auto=format&fit=crop', 'Sara Khan — 16 Weeks']].map(([src, cap]) => (
          <figure key={cap} className="bg-panel border border-line rounded-3xl overflow-hidden">
            <img src={src} alt={cap} className="h-72 w-full object-cover" />
            <figcaption className="p-4 font-bold text-center">{cap}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
