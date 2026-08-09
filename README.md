# AI-Based Wastewater Quality Assessment and Treatment Recommendation System

> **IMPORTANT PROJECT NOTICE:**  
> The current prototype does **NOT** contain trained machine learning models. The prediction layer currently uses demonstration logic and is designed to be replaced by trained ML models in Phase 2.

---

## 🌊 Project Overview
This project is a college PBL (Project-Based Learning) prototype for an **AI-Based Wastewater Quality Assessment and Treatment Recommendation System**. 

The system provides a digital decision-support tool designed for plant operators and environmental researchers. It features **two independent analysis channels**:
1. **Parameter-Based Wastewater Analysis**: Evaluates chemical parameters (pH and Total Dissolved Solids - TDS) to provide preliminary quality scoring and treatment guidelines.
2. **Image-Based Wastewater Analysis**: Supports drag-and-drop uploading of local wastewater imagery with safe server-side storage and preview of future computer vision classification outputs.

---

## 🚨 Problem Statement
Wastewater quality assessment normally requires laboratory testing, manual sampling, and expert interpretation. This often leads to delays in identifying toxic effluent discharge and prescribing appropriate treatment protocols.

### 💡 Proposed Solution
A full-stack digital decision-support system that synthesizes chemical parameter metrics and visual sample analysis. It generates preliminary quality assessments and potential treatment recommendations instantly while maintaining a decoupled architecture for future AI microservices.

---

## 🛠️ Technology Stack

### Frontend (`/client`)
- **Core Framework**: React.js 18 + Vite
- **Styling**: Tailwind CSS (v3) + Custom Environmental Design System
- **Routing**: React Router DOM (v6)
- **HTTP Client**: Axios (with Bearer Token Interceptors)
- **Data Visualizations**: Recharts (Pie & Trend Line Charts)
- **Icons**: Lucide React

### Backend (`/server`)
- **Runtime**: Node.js
- **Web Framework**: Express.js
- **Database**: MongoDB + Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT) + bcryptjs Password Hashing
- **File Upload**: Multer (Local disk storage, extensible to Cloudinary/S3)
- **Security**: Helmet, CORS, Express Rate Limit, Zod Input Sanitization

---

## 📁 Folder Structure
```
Wastewater/
├── client/                      # React Vite Frontend Application
│   ├── src/
│   │   ├── components/          # Reusable UI components (Navbar, Footer, Badges, Guards)
│   │   ├── context/             # AuthContext provider
│   │   ├── layouts/             # MainLayout wrapper
│   │   ├── pages/               # 13 Application Pages (Landing, Dashboard, Forms, History...)
│   │   ├── services/            # Axios API service configuration
│   │   ├── App.jsx              # React Router route registry
│   │   ├── main.jsx             # React DOM entry point
│   │   └── index.css            # Tailwind directives and utility classes
│   ├── vite.config.js           # Vite dev server proxy configuration
│   ├── tailwind.config.js       # Custom color palette and font extensions
│   └── package.json
│
├── server/                      # Express.js REST API Backend
│   ├── controllers/             # Request handlers (auth, analysis, dashboard, admin)
│   ├── middleware/              # Auth, role check, upload validation, error handler
│   ├── models/                  # Mongoose Schemas (User, ParameterAnalysis, ImageAnalysis)
│   ├── routes/                  # API Routers (/api/auth, /api/analysis, /api/dashboard, /api/admin)
│   ├── services/                # Decoupled predictionService & recommendationService
│   ├── scripts/                 # seed.js (Database seed generator)
│   ├── uploads/                 # Safe server image storage
│   ├── app.js                   # Express application setup
│   ├── server.js                # Server startup & MongoDB connection
│   ├── .env.example             # Environment variable template
│   └── package.json
│
└── README.md                    # Project documentation (this file)
```

---

## ⚙️ Installation & Running Locally

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **MongoDB** running locally on port 27017 (or MongoDB Atlas connection string)

### 1. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory (or copy `.env.example`):
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/wastewater_db
JWT_SECRET=super_secret_jwt_key_wastewater_quality_pbl_2026
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Run the database seed script to populate sample accounts & analysis records:
```bash
npm run seed
```

Start the backend server:
```bash
npm run dev
# Server running at http://localhost:5000
```

### 2. Frontend Setup
In a new terminal window:
```bash
cd client
npm install
npm run dev
# Frontend running at http://localhost:5173
```

---

## 🔑 Demo Login Credentials (Seeded)

| Role | Email | Password |
|------|-------|----------|
| **Standard User** | `user@example.com` | `user123` |
| **System Admin** | `admin@example.com` | `admin123` |
| **Researcher** | `researcher@example.com` | `researcher123` |

---

## 📡 API Documentation Summary

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Create a new user account
- `POST /api/auth/login` - Authenticate user & return JWT
- `GET /api/auth/me` - Get current logged-in user profile
- `PUT /api/auth/profile` - Update user name
- `PUT /api/auth/change-password` - Change user password

### Analysis (`/api/analysis`)
- `POST /api/analysis/parameters` - Submit pH & TDS for prototype parameter analysis
- `GET /api/analysis/parameters` - Get user's parameter analyses history
- `POST /api/analysis/image` - Upload wastewater image (Max 5MB, JPG/PNG/WEBP)
- `GET /api/analysis/images` - Get user's image upload history
- `GET /api/analysis/history` - Get combined, paginated, and searchable analysis history

### Dashboard & Analytics (`/api/dashboard`)
- `GET /api/dashboard/stats` - Fetch real user metrics, quality distribution, and parameter trend data

### Admin Management (`/api/admin`)
- `GET /api/admin/users` - Search & view registered users list
- `PATCH /api/admin/users/:id/status` - Activate or deactivate user access
- `GET /api/admin/stats` - System-wide global usage analytics

---

## 🔒 Security Measures
- **Helmet HTTP Headers**: Protection against XSS, clickjacking, and MIME sniffing.
- **CORS Protection**: Restricted to `CLIENT_URL` origin.
- **Rate Limiting**: Applied to upload endpoints (20 uploads / 15 minutes) to prevent abuse.
- **Password Protection**: Passwords hashed using `bcryptjs` with salt factor 10. Passwords are never returned in JSON outputs.
- **File Upload Security**:
  - Validates file extensions and MIME types.
  - Rejects executables, scripts, and SVG uploads.
  - Generates safe random filenames using `crypto.randomBytes`.
  - Max file size strictly enforced at 5MB.
- **Central Error Handler**: Stack traces suppressed in production.

---

## 🔮 Future ML Integration Architecture
The backend is architected with a **decoupled service layer** (`server/services/predictionService.js`). 

In Phase 2, the mock functions inside `predictionService.js` can be updated to dispatch HTTP requests to a Python ML microservice (e.g. FastAPI/Flask):

```javascript
// Future ML Integration in server/services/predictionService.js
const axios = require('axios');

async function predictParameters(pH, tds) {
  // Call Python ML API running Random Forest model
  const response = await axios.post('http://localhost:8000/predict/parameters', { pH, tds });
  return response.data;
}
```
The React frontend will require **zero code changes** when real AI models are introduced.
