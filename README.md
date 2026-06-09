# 🌿 Organic Universe Consultancy — Full Stack Website v3

## Project Structure
```
organic-universe/          ← Frontend (React + Vite)
organic-universe-backend/  ← Backend (Node.js + Express + MongoDB)
```

## Quick Start

### Step 1: Start Backend
```bash
cd organic-universe-backend
npm install
# Edit .env — set your MONGODB_URI
npm start
```

### Step 2: Start Frontend
```bash
cd organic-universe
npm install
# .env already set to: VITE_API_URL=http://localhost:5000/api
npm run dev
```

### Step 3: Open
- **Website**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin
- **Login**: `admin` / `organic2024`

## Features
- ✅ Real logo used throughout (Navbar, Footer, Admin)
- ✅ Contact form saves to MongoDB
- ✅ Admin panel shows real leads from DB
- ✅ Lead status management (New → Contacted → Converted)
- ✅ Admin notes on each lead
- ✅ One-click Call / Email / WhatsApp from admin
- ✅ Services CRUD in admin
- ✅ Dashboard stats pulled live from MongoDB
- ✅ JWT authentication for admin
- ✅ Email notification on new form submission (optional)
- ✅ Smooth page transitions + parallax + particle effects
- ✅ Custom cursor + WhatsApp floating button

## Deploy to Production

### Frontend (Netlify/Vercel)
```bash
cd organic-universe
# Set env var: VITE_API_URL=https://your-backend.com/api
npm run build
# Upload dist/ to Netlify or push to Vercel
```

### Backend (Railway/Render/VPS)
```bash
cd organic-universe-backend
# Set all .env vars in your platform dashboard
npm start
```

### MongoDB
Use MongoDB Atlas free tier: https://cloud.mongodb.com
