import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGym } from '../context/GymContext';

export default function Login() {
  const { login } = useGym();
  const nav = useNavigate();
  const loc = useLocation();
  const [u, setU] = useState('');
  const [p, setP] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (login(u.trim(), p)) nav(loc.state?.from || '/admin');
  };

  return (
    <div className="min-h-screen bg-base text-ink flex items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-md bg-panel border border-line rounded-3xl p-8">
        <h1 className="text-3xl font-black">HIT FIT <span className="text-accent">GYM</span></h1>
        <p className="text-muted text-sm mt-1">Admin sign in</p>
        <div className="mt-6 space-y-4">
          <input value={u} onChange={(e) => setU(e.target.value)} placeholder="Username (admin / reception)" className="w-full px-4 py-3 rounded-xl bg-panel2 border border-line focus:border-accent outline-none" />
          <input value={p} onChange={(e) => setP(e.target.value)} type="password" placeholder="Password" className="w-full px-4 py-3 rounded-xl bg-panel2 border border-line focus:border-accent outline-none" />
          <button className="w-full py-3 rounded-xl bg-accent text-white font-bold hover:brightness-110 transition">Sign In</button>
        </div>
        <p className="text-xs text-muted mt-4">Demo: <b>admin / admin123</b> · <b>reception / recep123</b></p>
      </form>
    </div>
  );
}
