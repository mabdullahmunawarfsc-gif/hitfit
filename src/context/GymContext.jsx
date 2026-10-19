import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import {
  seedMembers, seedPayments, seedStaff, seedExpenses, seedAttendanceRecords,
  seedTemplates, seedAssignments, seedGym, DEFAULT_PLANS, todayISO, addDays, isActive,
} from '../data/seed';

const GymContext = createContext(null);
const LS_DATA = 'hitfit_data_v1';
const LS_AUTH = 'hitfit_auth';
const LS_THEME = 'hitfit_theme';

const load = () => {
  try { return JSON.parse(localStorage.getItem(LS_DATA)) || null; } catch { return null; }
};

export function GymProvider({ children }) {
  const saved = load();
  const [members, setMembers] = useState(saved?.members || seedMembers);
  const [payments, setPayments] = useState(saved?.payments || seedPayments);
  const [staff, setStaff] = useState(saved?.staff || seedStaff);
  const [expenses, setExpenses] = useState(saved?.expenses || seedExpenses);
  const [attendance, setAttendance] = useState(saved?.attendance || seedAttendanceRecords);
  const [templates] = useState(seedTemplates);
  const [assignments, setAssignments] = useState(saved?.assignments || seedAssignments);
  const [plans, setPlans] = useState(saved?.plans || DEFAULT_PLANS);
  const [gym, setGym] = useState(saved?.gym || seedGym);
  const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem(LS_AUTH)); } catch { return null; } });
  const [theme, setTheme] = useState(() => localStorage.getItem(LS_THEME) || 'dark');
  const [lastScan, setLastScan] = useState(null); // {status, member, time}

  useEffect(() => {
    localStorage.setItem(LS_DATA, JSON.stringify({ members, payments, staff, expenses, attendance, assignments, plans, gym }));
  }, [members, payments, staff, expenses, attendance, assignments, plans, gym]);

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem(LS_THEME, theme);
  }, [theme]);

  useEffect(() => {
    if (user) localStorage.setItem(LS_AUTH, JSON.stringify(user));
    else localStorage.removeItem(LS_AUTH);
  }, [user]);

  const activeMembers = useMemo(() => members.filter(isActive), [members]);
  const expiredMembers = useMemo(() => members.filter((m) => !isActive(m)), [members]);

  const login = (username, password) => {
    const users = [
      { username: 'admin', password: 'Abdullah22', role: 'Admin' },
      { username: 'reception', password: 'Abdullah11', role: 'Reception' },
    ];
    const u = users.find((x) => x.username === username && x.password === password);
    if (u) { setUser({ username: u.username, role: u.role }); toast.success(`Welcome, ${u.role}!`); return true; }
    toast.error('Invalid credentials'); return false;
  };
  const logout = () => { setUser(null); toast.success('Logged out'); };
  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  const addMember = (m) => { setMembers((p) => [{ ...m, id: 'M' + Date.now() }, ...p]); toast.success('Member added'); };
  const updateMember = (id, m) => { setMembers((p) => p.map((x) => (x.id === id ? { ...x, ...m } : x))); toast.success('Member updated'); };
  const deleteMember = (id) => { setMembers((p) => p.filter((x) => x.id !== id)); toast.success('Member deleted'); };

  const recordPayment = (p) => {
    const plan = plans.find((pl) => pl.name === p.plan) || plans[0];
    const expiry = addDays(todayISO(), plan.months * 30);
    const member = members.find((m) => m.id === p.memberId);
    setPayments((prev) => [{ ...p, id: 'P' + Date.now(), expiryDate: expiry }, ...prev]);
    setMembers((prev) => prev.map((m) => (m.id === p.memberId ? { ...m, plan: plan.name, expiryDate: expiry } : m)));
    toast.success('Payment recorded');
    return { payment: { ...p, expiryDate: expiry }, expiry, member };
  };

  const broadcastScan = (scan) => {
    setLastScan(scan);
    try {
      const ch = new BroadcastChannel('hitfit-attendance');
      ch.postMessage(scan);
      ch.close();
    } catch { /* older browsers */ }
    localStorage.setItem('hitfit_last_scan', JSON.stringify({ ...scan, _ts: Date.now() }));
  };

  const scanFingerprint = (fp) => {
    const id = (fp || '').trim().toUpperCase();
    const member = members.find((m) => m.fingerprintId.toUpperCase() === id);
    if (!member) {
      broadcastScan({ status: 'unknown', id, time: new Date().toLocaleTimeString() });
      return { status: 'unknown' };
    }
    if (!isActive(member)) {
      broadcastScan({ status: 'expired', member, time: new Date().toLocaleTimeString() });
      return { status: 'expired', member };
    }
    const rec = {
      id: 'A' + Date.now(), memberId: member.id, name: member.name,
      fingerprintId: member.fingerprintId, photo: member.photo,
      date: todayISO(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setAttendance((p) => [rec, ...p]);
    broadcastScan({ status: 'ok', member, time: rec.time });
    return { status: 'ok', member };
  };

  const addStaff = (s) => { setStaff((p) => [...p, { ...s, id: 'S' + Date.now(), paid: false }]); toast.success('Staff added'); };
  const removeStaff = (id) => { setStaff((p) => p.filter((s) => s.id !== id)); toast.success('Staff removed'); };
  const toggleSalary = (id) => { setStaff((p) => p.map((s) => (s.id === id ? { ...s, paid: !s.paid } : s))); };

  const addExpense = (e) => { setExpenses((p) => [{ ...e, id: 'E' + Date.now() }, ...p]); toast.success('Expense added'); };
  const deleteExpense = (id) => { setExpenses((p) => p.filter((e) => e.id !== id)); toast.success('Expense deleted'); };

  const assign = (memberId, templateId) => { setAssignments((p) => [...p, { id: 'AS' + Date.now(), memberId, templateId }]); toast.success('Plan assigned'); };
  const unassign = (id) => { setAssignments((p) => p.filter((a) => a.id !== id)); toast.success('Assignment removed'); };

  const updatePlanPrice = (id, price) => setPlans((p) => p.map((pl) => (pl.id === id ? { ...pl, price: Number(price) } : pl)));

  const resetData = () => { localStorage.removeItem(LS_DATA); location.reload(); };

  const value = {
    members, activeMembers, expiredMembers, payments, staff, expenses, attendance,
    templates, assignments, plans, gym, user, theme, lastScan,
    login, logout, toggleTheme, addMember, updateMember, deleteMember, recordPayment,
    scanFingerprint, addStaff, removeStaff, toggleSalary, addExpense, deleteExpense,
    assign, unassign, updatePlanPrice, setGym, setPlans, resetData, isActive,
  };
  return <GymContext.Provider value={value}>{children}</GymContext.Provider>;
}

export const useGym = () => useContext(GymContext);
