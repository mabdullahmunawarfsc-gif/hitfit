// Mock data for HIT FIT GYM (no backend — everything lives in localStorage/state)

export const todayISO = () => new Date().toISOString().slice(0, 10);
export const isoFrom = (d) => new Date(d).toISOString().slice(0, 10);
export const addDays = (iso, n) => {
  const d = new Date(iso || Date.now());
  d.setDate(d.getDate() + n);
  return isoFrom(d);
};
export const daysBetween = (a, b) => Math.ceil((new Date(a) - new Date(b)) / 86400000);

/** true when a member's plan is still valid today */
export const isActive = (m) => m.expiryDate >= todayISO();
export const expiryStatus = (m) => (isActive(m) ? 'active' : 'expired');

export const DEFAULT_PLANS = [
  { id: 'monthly', name: 'Monthly', price: 3000, months: 1, features: ['Full gym access', 'Locker facility', 'Free parking', '1 group class / week'] },
  { id: 'quarterly', name: 'Quarterly', price: 8000, months: 3, features: ['Full gym access', 'Locker facility', 'Free parking', '3 group classes / week', '1 PT session'] },
  { id: 'halfyear', name: 'Half-Yearly', price: 15000, months: 6, popular: true, features: ['Full gym access', 'Locker + towel', 'Free parking', 'Unlimited classes', '4 PT sessions', 'Diet plan'] },
  { id: 'yearly', name: 'Yearly', price: 28000, months: 12, features: ['Everything in Half-Yearly', 'Priority booking', 'Guest passes (x6)', 'Customized workout plan', 'Merchandise kit'] },
];

const t = (n) => addDays(null, n);
const payScroll = (members) => {
  const methods = ['cash', 'JazzCash', 'Easypaisa', 'bank'];
  const out = [];
  let id = 1;
  for (let monthAgo = 5; monthAgo >= 0; monthAgo--) {
    const d0 = new Date(); d0.setMonth(d0.getMonth() - monthAgo);
    const count = 7 + ((monthAgo * 3) % 6);
    for (let i = 0; i < count; i++) {
      const d = new Date(d0); d.setDate(2 + ((i * 7) % 26));
      const m = members[(id + i) % members.length];
      out.push({
        id: 'P' + id, memberId: m.id, member: m.name, amount: 3000 + ((id % 3) * 2000),
        method: methods[id % 4], date: isoFrom(d), plan: m.plan, expiryDate: addDays(isoFrom(d), 30),
      });
      id++;
    }
  }
  return out;
};

export const seedMembers = [
  { id: 'M1', name: 'Ahmed Raza', phone: '03001234501', cnic: '42101-1234567-1', gender: 'Male', age: 26, fingerprintId: 'FP1001', plan: 'Yearly', monthly: 28000, joinDate: t(-210), expiryDate: t(155), emergency: '03005551001', photo: 'https://i.pravatar.cc/200?img=12' },
  { id: 'M2', name: 'Sara Khan', phone: '03001234502', cnic: '42101-2345678-2', gender: 'Female', age: 29, fingerprintId: 'FP1002', plan: 'Half-Yearly', monthly: 15000, joinDate: t(-160), expiryDate: t(20), emergency: '03005551002', photo: 'https://i.pravatar.cc/200?img=47' },
  { id: 'M3', name: 'Bilal Hussain', phone: '03001234503', cnic: '42101-3456789-3', gender: 'Male', age: 34, fingerprintId: 'FP1003', plan: 'Monthly', monthly: 3000, joinDate: t(-25), expiryDate: t(5), emergency: '03005551003', photo: 'https://i.pravatar.cc/200?img=15' },
  { id: 'M4', name: 'Usman Tariq', phone: '03001234504', cnic: '42101-4567890-4', gender: 'Male', age: 41, fingerprintId: 'FP1004', plan: 'Monthly', monthly: 3000, joinDate: t(-40), expiryDate: t(-10), emergency: '03005551004', photo: 'https://i.pravatar.cc/200?img=22' },
  { id: 'M5', name: 'Ayesha Malik', phone: '03001234505', cnic: '42101-5678901-5', gender: 'Female', age: 24, fingerprintId: 'FP1005', plan: 'Quarterly', monthly: 8000, joinDate: t(-87), expiryDate: t(3), emergency: '03005551005', photo: 'https://i.pravatar.cc/200?img=32' },
  { id: 'M6', name: 'Hamza Ali', phone: '03001234506', cnic: '42101-6789012-6', gender: 'Male', age: 31, fingerprintId: 'FP1006', plan: 'Quarterly', monthly: 8000, joinDate: t(-83), expiryDate: t(7), emergency: '03005551006', photo: 'https://i.pravatar.cc/200?img=56' },
  { id: 'M7', name: 'Fatima Noor', phone: '03001234507', cnic: '42101-7890123-7', gender: 'Female', age: 27, fingerprintId: 'FP1007', plan: 'Monthly', monthly: 3000, joinDate: t(-32), expiryDate: t(-2), emergency: '03005551007', photo: 'https://i.pravatar.cc/200?img=44' },
  { id: 'M8', name: 'Ali Raza', phone: '03001234508', cnic: '42101-8901234-8', gender: 'Male', age: 38, fingerprintId: 'FP1008', plan: 'Half-Yearly', monthly: 15000, joinDate: t(-135), expiryDate: t(45), emergency: '03005551008', photo: 'https://i.pravatar.cc/200?img=33' },
  { id: 'M9', name: 'Zainab Shah', phone: '03001234509', cnic: '42101-9012345-9', gender: 'Female', age: 22, fingerprintId: 'FP1009', plan: 'Monthly', monthly: 3000, joinDate: t(-18), expiryDate: t(12), emergency: '03005551009', photo: 'https://i.pravatar.cc/200?img=48' },
  { id: 'M10', name: 'Omar Farooq', phone: '03001234510', cnic: '42101-0123456-1', gender: 'Male', age: 45, fingerprintId: 'FP1010', plan: 'Monthly', monthly: 3000, joinDate: t(-28), expiryDate: t(2), emergency: '03005551010', photo: 'https://i.pravatar.cc/200?img=59' },
  { id: 'M11', name: 'Kiran Iqbal', phone: '03001234511', cnic: '42101-1234067-1', gender: 'Female', age: 30, fingerprintId: 'FP1011', plan: 'Quarterly', monthly: 8000, joinDate: t(-120), expiryDate: t(-30), emergency: '03005551011', photo: 'https://i.pravatar.cc/200?img=26' },
  { id: 'M12', name: 'Danish Mehmood', phone: '03001234512', cnic: '42101-2345068-2', gender: 'Male', age: 36, fingerprintId: 'FP1012', plan: 'Yearly', monthly: 28000, joinDate: t(-275), expiryDate: t(90), emergency: '03005551012', photo: 'https://i.pravatar.cc/200?img=60' },
];
export const seedPayments = payScroll(seedMembers);

export const seedStaff = [
  { id: 'S1', name: 'Coach Imran', role: 'Head Trainer', phone: '03211112221', salary: 60000, paid: true },
  { id: 'S2', name: 'Sara Youzafzai', role: 'Yoga Instructor', phone: '03211112222', salary: 45000, paid: true },
  { id: 'S3', name: 'Adeel Sheikh', role: 'Boxing Coach', phone: '03211112223', salary: 50000, paid: false },
  { id: 'S4', name: 'Nadia Ali', role: 'CrossFit Coach', phone: '03211112224', salary: 55000, paid: true },
  { id: 'S5', name: 'Rehan Qureshi', role: 'Receptionist', phone: '03211112225', salary: 30000, paid: true },
  { id: 'S6', name: 'Babar Kosar', role: 'Trainer', phone: '03211112226', salary: 40000, paid: false },
];

export const seedExpenses = [
  { id: 'E1', title: 'Rent', amount: 80000, date: t(-2), category: 'Rent' },
  { id: 'E2', title: 'Electricity Bill', amount: 18000, date: t(-5), category: 'Utilities' },
  { id: 'E3', title: 'Monthly Supplements Stock', amount: 25000, date: t(-8), category: 'Supplies' },
  { id: 'E4', title: 'Facebook Ads', amount: 12000, date: t(-12), category: 'Marketing' },
  { id: 'E5', title: 'Equipment Maintenance', amount: 9000, date: t(-15), category: 'Maintenance' },
  { id: 'E6', title: 'Water Filter Service', amount: 3500, date: t(-18), category: 'Maintenance' },
];

const seedAttendance = [];
let aId = 1;
for (let dAgo = 6; dAgo >= 0; dAgo--) {
  const count = 6 + (dAgo % 5);
  for (let i = 0; i < count; i++) {
    const m = seedMembers[(aId + i) % seedMembers.length];
    seedAttendance.push({
      id: 'A' + aId, memberId: m.id, name: m.name, fingerprintId: m.fingerprintId,
      photo: m.photo, date: t(-dAgo), time: `${6 + ((aId + i) % 14)}:${(aId * 13) % 60 < 10 ? '0' : ''}${(aId * 13) % 60}`,
    });
    aId++;
  }
}
export const seedAttendanceRecords = seedAttendance;

export const seedTemplates = [
  { id: 'W1', type: 'workout', title: 'Beginner Full Body — 3 Days', desc: 'Squats, bench press, rows, plank • 3 sets of 12' },
  { id: 'W2', type: 'workout', title: 'Push Pull Legs — 6 Days', desc: 'PPL split, progressive overload, log weights' },
  { id: 'W3', type: 'workout', title: 'Fat Loss HIIT — 4 Days', desc: '20 min intervals + core, 1 rest day between' },
  { id: 'D1', type: 'diet', title: 'High Protein — Muscle Gain', desc: '2.2g protein/kg, eggs, chicken, whey, oats' },
  { id: 'D2', type: 'diet', title: 'Calorie Deficit — Fat Loss', desc: '-500 kcal/day, high veg, lean protein, no sugary drinks' },
];

export const seedAssignments = [
  { id: 'AS1', memberId: 'M1', templateId: 'W2' },
  { id: 'AS2', memberId: 'M1', templateId: 'D1' },
  { id: 'AS3', memberId: 'M2', templateId: 'W3' },
  { id: 'AS4', memberId: 'M2', templateId: 'D2' },
  { id: 'AS5', memberId: 'M8', templateId: 'W1' },
];

export const seedGym = {
  name: 'HIT FIT GYM', phone: '+92 300 1234567', whatsapp: '923001234567',
  email: 'hello@hitfitgym.pk', address: 'Main GT Road, Gujranwala, Punjab, Pakistan',
  hours: 'Mon–Sat: 6:00 AM – 11:00 PM\nSun: 8:00 AM – 8:00 PM',
  mapEmbed: 'https://www.google.com/maps?q=Gujranwala&output=embed',
};
