import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center">
      <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop" alt="gym" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-base via-base/85 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 py-24">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-accent font-bold tracking-[0.3em] uppercase">No Pain No Gain</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }} className="text-5xl md:text-7xl font-black leading-tight mt-4 max-w-3xl">
          FORGE YOUR <span className="text-accent">BEST SELF</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .2 }} className="text-muted mt-5 max-w-xl text-lg">
          Premium strength, cardio, CrossFit and boxing — coached by champions, in a facility built to win.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .3 }} className="mt-8 flex flex-wrap gap-4">
          <a href="#plans" className="px-8 py-4 rounded-full bg-accent text-white font-bold hover:brightness-110 transition shadow-lg shadow-accent/30">Join Now</a>
          <a href="#services" className="px-8 py-4 rounded-full border border-ink/30 font-bold hover:bg-panel2 transition">Explore Programs</a>
        </motion.div>
      </div>
    </section>
  );
}
