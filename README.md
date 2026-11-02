AI-Based Wastewater Quality Assessment & Treatment Recommendation System

An AI-powered web application designed to assess wastewater quality and provide preliminary treatment recommendations using chemical parameters and visual sample analysis.

The platform combines machine learning architecture with a full-stack web application to support wastewater monitoring, quality assessment, and environmental decision-making.

🌊 Project Overview

Wastewater contamination is a major environmental challenge. Traditional wastewater quality assessment often requires laboratory testing, manual sampling, and expert interpretation, which can be time-consuming.

This project aims to simplify the initial assessment process through an intelligent digital platform.

Users can:

- Analyze wastewater using chemical parameters such as pH and Total Dissolved Solids (TDS).
- Upload wastewater images for visual sample analysis.
- View quality assessment results and treatment recommendations.
- Track previous analyses through a dashboard.
- Access historical data and analytical insights.

Note: This is an academic prototype and its recommendations should not replace laboratory testing or professional environmental assessment.

✨ Key Features

1. AI-Based Wastewater Assessment

- Evaluates wastewater parameters.
- Uses a Random Forest-based prediction architecture.
- Generates preliminary quality classifications.
- Provides treatment advisory information.

2. Parameter-Based Analysis

- Accepts wastewater chemical parameter inputs.
- Analyzes pH and TDS values.
- Displays assessment results.
- Provides preliminary treatment guidance.

3. Image-Based Analysis

- Upload wastewater sample images.
- Drag-and-drop image upload support.
- Secure server-side image storage.
- Image preview and upload history.

4. User Authentication

- User registration and login.
- JWT-based authentication.
- Password hashing using bcrypt.
- Protected application routes.
- User profile management.

5. Dashboard & Analytics

- Analysis statistics.
- Wastewater quality distribution.
- Parameter trend visualization.
- Analysis history.
- Searchable and paginated records.

6. Admin Management

- View registered users.
- Search user records.
- Activate or deactivate user accounts.
- Monitor system-wide analytics.

🛠️ Technology Stack

Category| Technologies
Frontend| React.js 18, Vite
Styling| Tailwind CSS 3
Routing| React Router DOM
HTTP Requests| Axios
Charts| Recharts
Icons| Lucide React
Backend| Node.js, Express.js
Database| MongoDB
ODM| Mongoose
Authentication| JWT
Password Security| bcryptjs
File Upload| Multer
Security| Helmet, CORS, Express Rate Limit, Zod
Machine Learning| Random Forest Classifier
Version Control| Git, GitHub

📂 Project Structure

Ai-wastewater-Recommendation/
│
├── client/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # Authentication context
│   │   ├── layouts/          # Application layouts
│   │   ├── pages/            # Application pages
│   │   ├── services/         # API service configuration
│   │   ├── App.jsx           # Application routes
│   │   ├── main.jsx          # React entry point
│   │   └── index.css         # Global styles
│   │
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── server/
│   ├── controllers/          # Request controllers
│   ├── middleware/           # Authentication and validation
│   ├── models/               # Mongoose schemas
│   ├── routes/               # REST API routes
│   ├── services/             # Prediction and recommendation services
│   ├── scripts/              # Database seed scripts
│   ├── uploads/              # Uploaded images
│   ├── app.js                # Express application
│   ├── server.js             # Server entry point
│   ├── .env.example          # Environment configuration template
│   └── package.json
│
├── README.md
├── package.json
└── package-lock.json

⚙️ Installation & Setup

Prerequisites

Install the following software:

- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB or MongoDB Atlas
- Git
- Visual Studio Code (recommended)

Step 1: Clone the Repository

git clone https://github.com/Ganesh-Machale/Ai-wastewater-Recommendation.git

Step 2: Navigate to the Project

cd Ai-wastewater-Recommendation

Step 3: Backend Setup

Open a terminal:

cd server
npm install

Step 4: Configure Environment Variables

Create a ".env" file inside the "server" directory.

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/wastewater_db
JWT_SECRET=replace_with_a_secure_random_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development

Replace the MongoDB connection string and JWT secret with your own configuration.

Step 5: Initialize the Database (Optional)

npm run seed

This command initializes sample database records if the seed script is configured.

Step 6: Start the Backend Server

npm run dev

Backend server:

http://localhost:5000

Step 7: Frontend Setup

Open another terminal:

cd client
npm install
npm run dev

Frontend application:

http://localhost:5173

Open the frontend URL in your browser to access the application.

📡 API Documentation

Authentication APIs

Method| Endpoint| Description
POST| "/api/auth/register"| Register a new user
POST| "/api/auth/login"| Authenticate user
GET| "/api/auth/me"| Get logged-in user
PUT| "/api/auth/profile"| Update user profile
PUT| "/api/auth/change-password"| Change password

Wastewater Analysis APIs

Method| Endpoint| Description
POST| "/api/analysis/parameters"| Submit pH and TDS
GET| "/api/analysis/parameters"| Get parameter analysis history
POST| "/api/analysis/image"| Upload wastewater image
GET| "/api/analysis/images"| Get image analysis history
GET| "/api/analysis/history"| Get combined analysis history

Dashboard APIs

Method| Endpoint| Description
GET| "/api/dashboard/stats"| Retrieve dashboard statistics

Admin APIs

Method| Endpoint| Description
GET| "/api/admin/users"| View registered users
PATCH| "/api/admin/users/:id/status"| Update user account status
GET| "/api/admin/stats"| Retrieve system analytics

🔐 Security Features

- JWT-based authentication.
- Password hashing using bcryptjs.
- Helmet security headers.
- CORS configuration.
- API rate limiting.
- Input validation and sanitization.
- Secure file upload validation.
- File type and size restrictions.
- Randomized filenames for uploaded images.
- Centralized error handling.

🧠 AI & Machine Learning Architecture

The project is designed around a decoupled prediction and recommendation service architecture.

The planned machine learning integration uses a Random Forest model for wastewater parameter assessment.

The architecture separates:

- Input parameter processing.
- Prediction services.
- Treatment recommendation services.
- Frontend presentation.

This separation allows a dedicated Python-based machine learning service to be integrated in a future development phase without requiring major changes to the React frontend.

🔮 Future Enhancements

- Integration of a fully deployed Python ML microservice.
- Real-time wastewater monitoring using IoT sensors.
- Support for additional water quality parameters.
- Advanced machine learning models.
- Improved image-based wastewater classification.
- Interactive water quality reports.
- Downloadable PDF analysis reports.
- Cloud-based deployment.
- More comprehensive treatment recommendations.
- Integration with environmental monitoring systems.

🎯 Project Objectives

1. Simplify preliminary wastewater quality assessment.
2. Develop an AI-assisted treatment recommendation platform.
3. Provide a centralized dashboard for wastewater analysis.
4. Reduce the time required for initial assessment.
5. Promote awareness of wastewater management and environmental sustainability.

🌱 Impact

The project explores how artificial intelligence and web technologies can support more accessible wastewater assessment.

It aims to contribute to:

- Sustainable water management.
- Environmental protection.
- Efficient wastewater monitoring.
- Data-driven decision-making.
- Awareness of water pollution and treatment.

👨‍💻 Developer

Ganesh Machale

B.Tech – Computer Science & Engineering
MIT Art, Design and Technology University, Pune

GitHub: "Ganesh-Machale" (https://github.com/Ganesh-Machale)

📌 Repository

"AI-Based Wastewater Quality Assessment & Treatment Recommendation System" (https://github.com/Ganesh-Machale/Ai-wastewater-Recommendation)

⭐ Support

If you find this project interesting, consider giving the repository a star.

Your feedback and suggestions are always welcome.

---

Built with React, Node.js, Express, MongoDB, and AI for a more sustainable future.
