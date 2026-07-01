# 🎓 ScholarMart — Nigerian University Student Marketplace

[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)

**ScholarMart** is a specialized, trusted campus marketplace tailored specifically for Nigerian university students. It empowers students across campuses (such as UNIZIK, COOU, UNILAG, UNN, etc.) to securely buy, sell, and trade textbooks, electronics, dorm essentials, fashion, and services within verified campus communities.

---

## ✨ Key Features

### 🛍️ Jumia-Inspired Modern Product Cards
- **High-Scannability Layout**: Clean pricing displays, verified seller badges, condition indicators (New, Gently Used, Refurbished), and instant discount tags.
- **Campus-Specific Filtering**: Browse items specifically listed within your campus or hostel vicinity.

### 🔐 Secure Student Verification & Authentication
- **Supabase Auth & JWT**: Secure full-stack sign-up and login flow backed by Supabase PostgreSQL and Node.js backend services.
- **Reputation & Review System**: User profile scores featuring `deals_completed`, average star ratings, and community feedback to eliminate campus scam risks.

### ⚡ Vercel & Serverless Ready
- **Hybrid Deployment**: Optimized frontend SPA built with React 19 + Vite, coupled with Express serverless API endpoints.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React 19, Vite 8, Lucide React Icons, Axios |
| **Backend API** | Node.js, Express.js, JSON Web Tokens (JWT), Cors, Multer |
| **Database & Auth** | Supabase, PostgreSQL connection poolers (`pg`) |
| **Deployment** | Vercel Serverless Functions / Netlify configuration |

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: v18+ 
- **npm** or **pnpm**

### 1. Install Backend Dependencies
```bash
cd ScholarMart
npm install
```

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 3. Environment Variables (`.env`)
Create a `.env` file in the root directory:
```env
PORT=5000
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_key
JWT_SECRET=your_jwt_secret
```

### 4. Start Development Servers
In terminal 1 (Backend API):
```bash
npm run start
```
In terminal 2 (Frontend SPA):
```bash
cd frontend
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 📄 License

Proprietary campus e-commerce platform built for Nigerian universities. All rights reserved.
