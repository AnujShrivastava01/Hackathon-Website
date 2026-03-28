# Participant-Centric Hackathon Portal

A modern, fully responsive Hackathon Event Website built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## 🚀 Features

- **Dynamic Public Site**: Sections for Hero, About, Agenda, Schedule, FAQs, and Contact.
- **Modern UI**: Dark-mode primary design with glassmorphism, smooth animations (Framer Motion), and Tailwind CSS.
- **Admin Dashboard**: Secure JWT-based portal to manage all event data:
  - Update Hackathon name, description, venue, and contact details.
  - Dynamically update the Google Form registration link.
  - CRUD operations for Day-wise Agenda phases.
  - Vertical Timeline-style Schedule management.
  - FAQ collapsible accordion management.
- **Mobile First**: Fully responsive layout using modern CSS patterns.

## 🛠 Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Framer Motion, Axios, Lucide Icons, React Hot Toast.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JSON Web Tokens (JWT), BcryptJS.
- **Design Inspiration**: Stripe, Linear, Apple.

## ⚙️ Setup Instructions

### Prerequisites
- Node.js installed on your machine.
- MongoDB instance (Local or Atlas) running.

### 1. Database Configuration
Update the `backend/.env` file with your MongoDB URI:
```env
MONGODB_URI=mongodb://localhost:27017/hackathon
JWT_SECRET=yoursecretkey
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### 2. Install Dependencies
Run from the root directory:
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

### 3. Start Development Servers
Run concurrently from the root:
```bash
npm run dev
```

- Public Site: `http://localhost:5173`
- Admin Login: `http://localhost:5173/admin/login`
- Backend API: `http://localhost:5000/api`

## 🔑 Default Admin Credentials
- **Username**: `admin`
- **Password**: `admin123`
*(Auto-seeded on first server run)*

## 📂 Project Structure
```text
├── backend/
│   ├── config/ (Database connection)
│   ├── controllers/ (Logic for Auth, Event, Agenda, etc.)
│   ├── middleware/ (Auth protection)
│   ├── models/ (Mongoose schemas)
│   ├── routes.js (API routing)
│   └── index.js (Entry point)
├── frontend/
│   ├── src/
│   │   ├── components/ (Atomic UI parts)
│   │   ├── context/ (Auth state)
│   │   ├── pages/ (Main views)
│   │   ├── api.js (Axios instance)
│   │   └── App.jsx (Routing)
│   └── index.html
```

## 📝 Planned Improvements
- [ ] Dark/Light mode toggle persistent in local storage.
- [ ] Image uploads for event logos/banners using Multer/Cloudinary.
- [ ] Role-based access for multi-admin support.
- [ ] Exporting registered participants (if internal registration added).

---
Built with passion by Antigravity.
