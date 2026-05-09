# study-abroad-platform
This project is a full‑stack MERN study‑abroad platform with a secure JWT‑based backend in Express and Mongoose and a React‑with‑JSX and Tailwind frontend. The API includes authentication, filtering, pagination, sorting, a MongoDB‑aggregation recommendation engine, application lifecycle with status transitions and history, caching, rate limiting.
# Waygood Study Abroad Platform

**MERN-stack study abroad application platform built with React, Express, MongoDB. Features student/counselor dashboards, application tracking, program discovery, and recommendation system.**

## Features
**Student Dashboard:**
- Program discovery & search
- University comparisons
- Application tracking with timeline
- Support ticket system
- Personalized recommendations
- Profile management

**Counselor Dashboard:**
- Manage student applications
- Update application status & feedback
- View support requests
- Application analytics

**Core Features:**
- JWT authentication (Student/Counselor roles)
- Real-time application status updates
- Responsive design (mobile-first)
- Password strength validation
- Secure API with CORS protection
- MongoDB with Mongoose ORM

## Live Demo
- **Frontend**: [https://study-abroad-platform-seven.vercel.app](https://study-abroad-platform-seven.vercel.app)
- **Backend API**: [https://study-abroad-platform-mm2h.onrender.com/api/health](https://study-abroad-platform-mm2h.onrender.com/api/health)

**Demo Credentials:**
```
Student:
Email: aarav@example.com
Password: Candidate123!

Counselor:
Email: priya@example.com  
Password: Candidate123!
```

## Tech Stack
```
Frontend: React 18 + Vite + Tailwind CSS + React Router + Lucide Icons
Backend: Node.js + Express.js + MongoDB + Mongoose + JWT
Deployment: Vercel (Frontend) + Render (Backend) + MongoDB Atlas
Auth: JWT tokens with role-based access control
Styling: Tailwind CSS (fully responsive)
```

## Project Structure
```
waygood-study-abroad/
├── frontend/                 # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── api/
│   ├── vercel.json
│   └── tailwind.config.js
├── backend/                  # Express + MongoDB
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   ├── models/
│   ├── app.js
│   └── server.js
└── README.md
```
## Setup & Run Instructions

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier)
- GitHub account

### 1. Clone & Install
```bash
git clone <your-github-repo-url>
cd waygood-study-abroad

# Frontend
cd frontend
npm install
cd ../

# Backend
cd backend
npm install
cd ..
```

### 2. Environment Variables
#### Backend `.env`
```env
PORT=4000
MONGODB_URI=your_Own_Url
JWT_SECRET=your-super-secret-jwt-key-here-min32chars
JWT_EXPIRES_IN=7d
CLIENT_URL=Frontend_Url
```

#### Frontend `.env` (optional for local)
```env
VITE_API_URL=Backend_Url
```

### 3. Run Locally
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```
**Local URLs:**
- Frontend: http://localhost:5173
- Backend: http://localhost:4000

### 4. MongoDB Setup
1. Create free cluster on [MongoDB Atlas](https://mongodb.com/atlas)
2. Create database `waygood`
3. Whitelist your IP (0.0.0.0/0 for testing)
4. Copy connection string to `MONGODB_URI`

## Deployment
### Frontend (Vercel)
1. Push `frontend/` to GitHub
2. Import to [Vercel](https://vercel.com)
3. Add `vercel.json` for SPA routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
### Backend (Render)
1. Push `backend/` to GitHub
2. Create [Render Web Service](https://render.com)
3. Settings:
   - Build: `npm install`
   - Start: `node server.js`
   - Env vars: Copy from `.env`

## Responsive Design
 **Mobile-first approach** (phones, tablets, laptops, desktop)
    Tailwind responsive utilities (`sm:`, `md:`, `lg:`, `xl:`)
    Flexible cards & layouts
    Touch-friendly buttons & forms
    Proper text wrapping & spacing

## Authentication
- **Student** & **Counselor** role-based access
- JWT tokens (7-day expiry)
- Protected routes (`/dashboard`, `/applications`)
- Secure password requirements

## Troubleshooting
**CORS Error:**
```
CLIENT_URL=https://your-vercel-app.vercel.app
```
Add to backend `.env` and redeploy.

**MongoDB Connection:**
- Check Atlas Network Access (allow all IPs for testing)
- Verify `MONGODB_URI` format

**Vercel 404 on refresh:**
- `vercel.json` rewrite rule required for SPA routing

**Registration/Login fails:**
- Check backend logs on Render dashboard
- Verify `/api/auth/register` & `/api/auth/login` endpoints

##  API Endpoints
```
Auth:
POST /api/auth/register
POST /api/auth/login

Applications:
GET /api/applications
POST /api/applications
PUT /api/applications/:id
DELETE /api/applications/:id

Universities:
GET /api/universities

Support:
POST /api/support
GET /api/support
```

## UI Components
All components are **fully responsive**:
- `ApplicationCard`
- `ProgramCard` 
- `UniversityCard`
- `RecommendationCard`
- `SupportRequestCard`
- Login/Register pages

##  Future Enhancements
- [ ] File upload (documents, transcripts)
- [ ] Email notifications
- [ ] Real-time chat
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Payment integration

##  Contributing
1. Fork repository
2. Create feature branch
3. Commit changes
4. Push & create Pull Request

##  License
**Built with Love for study abroad students & counselors**

**GitHub:** https://github.com/Abhinash02/study-abroad-platform.git 
**Live:** https://study-abroad-platform-seven.vercel.app/login
