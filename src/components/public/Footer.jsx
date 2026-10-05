import { useEffect, useState } from 'react';
import { useGym } from '../../context/GymContext';

export default function Footer() {
  const { gym } = useGym();
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const h = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <>
      <footer className="bg-panel border-t border-line py-12 mt-10">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-sm text-muted">
          <div>
            <p className="font-black text-xl text-ink">HIT FIT <span className="text-accent">GYM</span></p>
            <p className="mt-3">Train hard. Get fit. Live strong.</p>
          </div>
          <div>
            <p className="font-bold text-ink mb-2">Quick Links</p>
            <a href="#home" className="block hover:text-accent">Home</a>
            <a href="#plans" className="block hover:text-accent">Plans</a>
            <a href="#contact" className="block hover:text-accent">Contact</a>
          </div>
          <div>
            <p className="font-bold text-ink mb-2">Follow Us</p>
            <a href="#" className="hover:text-accent">Instagram · </a>
            <a href="#" className="hover:text-accent">Facebook · </a>
            <a href="#" className="hover:text-accent">YouTube</a>
            <p className="mt-4">© 2026 {gym.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a href={`https://wa.me/${gym.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"
        className="fixed bottom-20 right-5 z-40 w-14 h-14 rounded-full bg-green-500 text-white text-2xl flex items-center justify-center shadow-lg hover:scale-110 transition">💬</a>

      {/* Scroll to top */}
      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="top"
          className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-accent text-white text-xl shadow-lg hover:scale-110 transition">↑</button>
      )}
    </>
  );
}
