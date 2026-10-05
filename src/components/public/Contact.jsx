import { useState } from 'react';
import toast from 'react-hot-toast';
import { useGym } from '../../context/GymContext';

export default function Contact() {
  const { gym } = useGym();
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = 'Name is required';
    if (!/^03\d{9}$/.test(form.phone)) err.phone = 'Enter a valid phone (03XXXXXXXXX)';
    if (form.message.trim().length < 10) err.message = 'Message must be at least 10 characters';
    setErrors(err);
    if (Object.keys(err).length === 0) {
      toast.success('Thanks! We will contact you soon 💪');
      setForm({ name: '', phone: '', message: '' });
    }
  };
  return (
    <section id="contact" className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12">
      <div>
        <h2 className="text-4xl font-black">Get In <span className="text-accent">Touch</span></h2>
        <p className="text-muted mt-3">Questions about plans, classes or tours? Reach out anytime.</p>
        <div className="mt-6 space-y-2 text-muted">
          <p>📞 <span className="text-ink">{gym.phone}</span></p>
          <p>📍 <span className="text-ink">{gym.address}</span></p>
          <p>🕒 <span className="text-ink whitespace-pre-line">{gym.hours}</span></p>
        </div>
        <iframe title="map" src={gym.mapEmbed} className="rounded-2xl mt-6 w-full h-56 border border-line" loading="lazy" />
      </div>
      <form onSubmit={submit} className="bg-panel border border-line rounded-3xl p-8 space-y-4">
        <h3 className="text-2xl font-bold">Enquiry Form</h3>
        <div>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full Name" className="w-full px-4 py-3 rounded-xl bg-panel2 border border-line focus:border-accent outline-none" />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone (03XXXXXXXXX)" className="w-full px-4 py-3 rounded-xl bg-panel2 border border-line focus:border-accent outline-none" />
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
        </div>
        <div>
          <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Your message" rows={5} className="w-full px-4 py-3 rounded-xl bg-panel2 border border-line focus:border-accent outline-none" />
          {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
        </div>
        <button className="w-full py-3 rounded-xl bg-accent text-white font-bold hover:brightness-110 transition">Send Enquiry</button>
      </form>
    </section>
  );
}
