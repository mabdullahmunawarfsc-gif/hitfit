import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { GymProvider } from './context/GymContext';
import ProtectedRoute from './components/ui';
import AdminLayout from './components/AdminLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Live from './pages/Live';
import Dashboard from './pages/admin/Dashboard';
import Members from './pages/admin/Members';
import MemberProfile from './pages/admin/MemberProfile';
import Fees from './pages/admin/Fees';
import Attendance from './pages/admin/Attendance';
import Alerts from './pages/admin/Alerts';
import Staff from './pages/admin/Staff';
import Expenses from './pages/admin/Expenses';
import PlansAdmin from './pages/admin/PlansAdmin';
import Reports from './pages/admin/Reports';
import Settings from './pages/admin/Settings';

export default function App() {
  return (
    <GymProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ style: { background: '#141418', color: '#f4f4f5', border: '1px solid #28282f' } }} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/live" element={<Live />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="members" element={<Members />} />
            <Route path="members/:id" element={<MemberProfile />} />
            <Route path="fees" element={<Fees />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="staff" element={<Staff />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="plans" element={<PlansAdmin />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GymProvider>
  );
}
