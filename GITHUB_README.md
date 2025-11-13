# Happy Tails Pet Adoption Platform

A full-stack web application for pet adoption with user authentication, pet browsing, adoption forms, and vaccine care information.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Docker & Docker Compose (optional, for containerized deployment)

### Local Development Setup

1. **Install frontend dependencies:**
   ```bash
   npm install
   ```

2. **Install backend dependencies:**
   ```bash
   cd server
   npm install
   cd ..
   ```

3. **Start the backend server:**
   ```bash
   cd server
   node server.js
   ```
   Backend runs on `http://localhost:5000`

4. **Start the frontend (in a new terminal):**
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

### Docker Deployment

Build and run the entire stack with Docker Compose:

```bash
docker-compose up --build
```

- Frontend: `http://localhost`
- Backend API: `http://localhost:5000` or via Nginx proxy at `http://localhost/api`

## 📁 Project Structure

```
windsurf-project-2/
├── src/
│   ├── components/        # React components
│   ├── contexts/          # Auth context
│   ├── data/              # Static data
│   ├── pages/             # Page components
│   ├── App.jsx            # Main app router
│   ├── index.css          # Global styles
│   └── main.jsx           # Entry point
├── server/                # Node.js/Express backend
│   ├── server.js          # Main server file
│   ├── Dockerfile         # Backend container config
│   └── package.json       # Server dependencies
├── Dockerfile-frontend    # Frontend multi-stage build
├── docker-compose.yml     # Container orchestration
├── nginx.conf             # Nginx configuration
├── tailwind.config.js     # Tailwind CSS config
├── vite.config.js         # Vite build config
└── package.json           # Frontend dependencies
```

## 🔐 Authentication

- **Signup:** Register with name, email, and password
- **Login:** Authenticate with email and password
- **Token Storage:** JWT tokens stored in localStorage
- **Protected Routes:** Auth context protects authenticated-only pages

### Available Routes

**Public Routes:**
- `/login` - Login page
- `/signup` - Signup page

**Protected Routes (Authentication Required):**
- `/` - Home page with pet listing
- `/pet/:id` - Pet details page
- `/adoption-form/:id` - Adoption application form
- `/vaccine-care` - Vaccine care information
- `/care` - General pet care guide

## 🛠️ Tech Stack

**Frontend:**
- React 18
- React Router v6
- Tailwind CSS
- Vite

**Backend:**
- Node.js
- Express.js
- CORS enabled

**Containerization:**
- Docker
- Docker Compose
- Nginx

## 📝 Environment Variables

Create `.env` file in root directory:
```
VITE_API_URL=http://localhost:5000/api
```

## 🐳 Docker Configuration

The project includes multi-container setup:
- **Backend Service:** Node.js/Express running on port 5000
- **Frontend Service:** React app served via Nginx on port 80
- **Network:** Services communicate via `happy-tails-network`

## 📚 API Endpoints

**Authentication:**
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

**Health:**
- `GET /api/health` - Server health check

## 🧪 Testing Credentials

Use the following for testing:
- Email: `test@example.com`
- Password: `password123`

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!
