<div align="center">

<img src="frontend/public/logo.png" alt="HackOcean logo" width="120" height="120" />

# HackOcean

**Participant-centric hackathon portal** — a full-stack event site with a secure admin dashboard.

<img src="https://readme-typing-svg.demolab.com?font=DM+Sans&weight=600&size=24&duration=3000&pause=1200&color=06B6D4&center=true&vCenter=true&width=700&lines=Welcome+to+HackOcean+%F0%9F%8C%8A;Dynamic+tracks%2C+prizes+%26+schedule;Admin-powered%2C+API-driven+content;Shipped+with+React+%2B+Vite+%2B+Express" alt="Animated tagline" />

<br />

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

<br />

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:06b6d4,100:0891b2&height=100&section=footer&animation=twinkling" alt="Wave decoration" width="100%" />

</div>

---

## What is HackOcean?

**HackOcean** is the public-facing name and brand for this project: a hackathon website where **everything important is editable from the admin panel** and **nothing is stuck in the code**. MongoDB stores event data; the React SPA loads it from a REST API. The UI leans **neo-brutalist / bold** with **Framer Motion** for smooth in-page motion (hero, sections, and interactions).

---

## Features

### Public site

| Area | What you get |
|------|----------------|
| **Hero** | Eye-catching header with **image carousel** (URLs from the API), event name, dates, venue, and a **registration CTA** that uses your configured link everywhere it matters. |
| **About** | **Tracks** with icons and descriptions, **prize tiers / prize pool**, and narrative content powered by backend seeds when collections are empty so the site never looks broken on first run. |
| **Agenda** | Day-wise phases; data comes from the API — **no hardcoded fallbacks** on the public page. |
| **Schedule** | Timeline-style schedule; same API-first approach. |
| **FAQs** | Accordion-style questions and answers from the API. |
| **Contact** | Ways to reach the team, aligned with event details from the dashboard. |
| **Responsive UX** | **Mobile-first** layout, toast, notifications, and **navigation** that surfaces registration where appropriate. |

### Registration links

- Admin can set and update a **Google Form (or docs) registration URL**.
- The frontend **normalizes and resolves** pasted links so truncated or messy URLs still work in nav, hero, and contact.

### Admin dashboard

| Capability | Details |
|------------|---------|
| **Auth** | **JWT**-protected routes; bcrypt-hashed admin user (seeded on first backend run). |
| **Event** | Edit hackathon **name**, **description**, **venue**, **contact**, **hero carousel** images, and **registration URL** (including multi-line paste-friendly field). |
| **Agenda** | **Add**, **edit (PUT)**, and **delete** day-wise entries — with **confirm** on destructive actions. |
| **Schedule** | Full **CRUD** with confirmation on delete. |
| **FAQs** | Manage accordion items with add / edit / delete. |
| **Tracks** | **Inline edit**, add, and delete for track cards shown on About. |

### Backend & deployment

- **Express 5** + **Mongoose** REST API, CORS, cookie parsing where needed.
- **Serverless-friendly**: Vercel entry (`backend/api`) and **Mongo connection reuse** for cold starts.
- **Root `GET /`** on the API so the deployed backend doesn’t return “Cannot GET /” on the base URL.

---

## Tech stack

- **Frontend:** React 19, Vite 8, Tailwind CSS, Framer Motion, Axios, Lucide & React Icons, React Hot Toast, React Router.
- **Backend:** Node.js (≥18), Express, MongoDB, JWT, bcryptjs.
- **Hosting:** Frontend and API can be deployed separately (e.g. **Vercel** with SPA rewrites for deep links like `/admin/login`).

---

## Prerequisites

- **Node.js** ≥ 18  
- **MongoDB** (local or Atlas)

---

## Setup

### 1. Environment

Copy examples and fill in values:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

`backend/.env` (minimal):

```env
MONGODB_URI=mongodb://localhost:27017/hackathon
JWT_SECRET=your-strong-secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
PORT=5000
```

Set `VITE_API_URL` in `frontend/.env` to your API base (**must end with `/api`**, e.g. `http://localhost:5000/api`).

### 2. Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 3. Run locally

**Terminal 1 — API**

```bash
cd backend
npm run dev
```

**Terminal 2 — SPA**

```bash
cd frontend
npm run dev
```

| URL | Purpose |
|-----|---------|
| `http://localhost:5173` | Public HackOcean site |
| `http://localhost:5173/admin/login` | Admin login |
| `http://localhost:5000/api` | REST API base |

---

## Default admin (first run)

| Field | Value |
|-------|--------|
| Username | `admin` |
| Password | `admin123` |

Change these in production and use a strong `JWT_SECRET`.

---

## Project structure (high level)

```text
backend/
  api/index.js          # Serverless entry (e.g. Vercel)
  app.js                # Express app + routes mounting
  config/               # DB connection (with caching for serverless)
  controllers/          # Event, auth, agenda, schedule, FAQ, tracks, …
  models/               # Mongoose schemas
  routes.js             # API routing
  index.js              # Local Node server entry

frontend/
  public/               # Static assets (e.g. logo)
  src/
    components/         # Layout, Hero, About, Footer, Admin UI, …
    pages/              # Routes / views
    context/            # Auth state
    api.js              # Axios instance
    constants.js        # Shared defaults / registration helpers
```

---

## Roadmap ideas

- [ ] Persistent light/dark toggle  
- [ ] Image uploads (e.g. Multer + Cloudinary) for branding assets  
- [ ] Multi-admin roles  
- [ ] First-party registration & exports  

---

## Conclusion

HackOcean turns hackathon operations into something you can **run from a browser**: one admin surface keeps the program, schedule, FAQs, tracks, and registration link in sync, while visitors get a **fast, coherent story** on every device. The stack is deliberately boring where it matters—**MongoDB, Express, and a Vite + React SPA**—so you can grow traffic, add features, and deploy without fighting the foundation. The goal is simple: **less time wrangling content, more time on the event itself.**

---

<div align="center">

**Made with ❤️ by [Anuj Shrivastava](https://www.linkedin.com/in/anujshrivastava1/)**

<br />

<sub>README animations use embed-friendly SVG (typing + capsule wave) so they render on GitHub.</sub>

</div>
