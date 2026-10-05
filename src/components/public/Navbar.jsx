import { useState } from 'react';
import { Link } from 'react-router-dom';

const links = [
  ['#home', 'Home'], ['#about', 'About'], ['#services', 'Services'], ['#plans', 'Plans'],
  ['#trainers', 'Trainers'], ['#bmi', 'BMI'], ['#timetable', 'Timetable'], ['#gallery', 'Gallery'], ['#contact', 'Contact'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-base/80 backdrop-blur-lg border-b border-line">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#home" className="font-black text-xl tracking-tight">HIT FIT <span className="text-accent">GYM</span></a>
        <nav className="hidden lg:flex items-center gap-5 text-sm text-muted">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="hover:text-accent transition">{label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/login" className="hidden sm:block px-4 py-2 text-sm font-semibold hover:text-accent">Admin</Link>
          <a href="#contact" className="hidden sm:block px-5 py-2.5 rounded-full bg-accent text-white text-sm font-bold hover:brightness-110 transition">Join Now</a>
          <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="menu">{open ? '✕' : '☰'}</button>
        </div>
      </div>
      {open && (
        <nav className="lg:hidden px-4 pb-4 flex flex-col gap-3 text-sm text-muted">
          {links.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
          <a href="#contact" className="px-5 py-2.5 rounded-full bg-accent text-white text-sm font-bold text-center">Join Now</a>
        </nav>
      )}
    </header>
  );
}
