# 💪 HIT FIT GYM — Gym Website & Admin Dashboard

A professional, fully responsive, **frontend-only** React app for a gym — public marketing website plus a full admin dashboard. No backend required: all data is mock/dummy data in `src/data/seed.js` + React Context, persisted to `localStorage`.

## 🚀 Setup

```bash
npm install
npm run dev        # start dev server (http://localhost:5173)
npm run build      # production build
npm run preview    # preview the production build
```

## 🔑 Login Credentials

Auth is fake (localStorage) with protected `/admin/*` routes. Credentials are configured in the application context.

## 🌐 Routes

| Route           | Description                                   |
|-----------------|-----------------------------------------------|
| `/`             | Public website (hero, plans, BMI, timetable, gallery, contact...) |
| `/login`        | Admin login                                   |
| `/admin`        | Protected sidebar dashboard                   |
| `/admin/members`| Members table, search/filter, add/edit/delete, profile page |
| `/admin/fees`   | Payments, receipts (print), defaulters, WhatsApp reminders |
| `/admin/attendance` | Simulated fingerprint scan with validation |
| `/live`         | Full-screen TV check-in screen (syncs live via BroadcastChannel + storage events) |
| `/admin/alerts` | Members expiring in 3 / 7 days                |
| `/admin/staff`  | Trainers/staff with salary tracking           |
| `/admin/expenses` | Expenses + profit/loss summary              |
| `/admin/plans`  | Assign workout/diet templates to members      |
| `/admin/reports`| Revenue/attendance charts, export CSV (Excel) & Print/PDF |
| `/admin/settings` | Plans & prices, gym info, dark/light mode, reset data |

## ✨ Features

- Dark premium theme (black/charcoal + electric orange, Poppins), light mode toggle
- Sticky navbar, mobile hamburger menu, smooth scrolling, WhatsApp float, scroll-to-top
- Simulated fingerprint attendance: active → success, expired → blocked, unknown → message
- `/live` TV screen shows welcome/expired screen for 5s, updates instantly from the admin tab
- Payment flow auto-computes expiry date from the selected plan; printable receipt
- Contact form validation, toast notifications (react-hot-toast), Recharts graphs
- SEO meta tags, OG tags, Google Fonts, fully responsive, Framer Motion animations

## 🗂️ Structure

```
src/
  components/        # ui.jsx (Modal, Field, StatCard...), AdminLayout, ProtectedRoute
    public/          # Navbar, Hero, About, Services, Plans, Trainers, BMI, Timetable,
                     # Gallery, Testimonials, Contact, Footer
  context/GymContext.jsx
  data/seed.js       # all dummy data (members, payments, staff, expenses, attendance)
  pages/             # Home, Login, Live + admin/*
```

### Demo fingerprint IDs

- `FP1001` — active member ✅
- `FP1004` — expired (fee not renewed) ❌
- Anything else — unknown fingerprint ❓
