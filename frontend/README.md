<<<<<<< HEAD
# EdTech-Learning-Platform-Production-Backend-System-
Full-stack EdTech platform for Banking &amp; SSC preparation featuring daily study roadmap, progress tracking, and secure JWT-based authentication. Built with React, Node.js, Express, PostgreSQL, and Redis. Includes modular backend architecture, role-based access control, and payment integration with order validation and webhook handling.

# 🚀 EdTech Learning Platform (Banking & SSC)

A production-ready full-stack EdTech platform that delivers a **daily study roadmap**, **progress tracking**, and a **fully integrated Razorpay payment flow** for Banking & SSC aspirants. Built with a modular backend (Node.js + Express) and a clean React (Vite) frontend.

---

## 🧭 What This Project Does

* 🔐 **Secure Authentication** - JWT-based signup/login with protected routes
* 📅 **Daily Study Roadmap** - Structured day-wise preparation plan
* ✅ **Progress Tracking** - Mark tasks completed, track your journey
* 💳 **Live Payment Integration** - Complete Razorpay payment flow with order creation & verification
* 📊 **Real-time Updates** - Instant progress reflection after task completion
* 🏗️ **Production Architecture** - Modular, scalable, and maintainable codebase

---

## 🏗️ Architecture Overview

### Frontend (React + Vite)
- **Pages**: Landing, Signup, Login, Dashboard
- **Services**: Auth service, API client, Payment integration
- **Routing**: Protected routes with token validation
- **State Management**: React hooks + localStorage persistence

### Backend (Node.js + Express)
- **Modular Structure**: Feature-based modules (auth, tests, payment)
- **Service Layer**: Business logic separated from controllers
- **Middleware**: Auth verification, request validation, error handling
- **Payment Integration**: Razorpay with webhook support

### Data Layer
- **PostgreSQL** - User data, course progress, payment records
- **Redis** - Session management, rate limiting, payment order caching
- **Production Ready** - Connection pooling, transactions, error handling

---

## 📁 Folder Structure

```
SSC-MOCK-PLATFORM/
│
├── frontend/
│   ├── public/
│   │   └── (static assets)
│   │
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.js           # Axios configuration with interceptors
│   │   │   ├── auth.js            # Auth API calls
│   │   │   ├── payment.js          # Payment API calls
│   │   │   └── questions.js        # Questions/tests API calls
│   │   │
│   │   ├── assets/
│   │   │   └── (images, svg files)
│   │   │
│   │   ├── components/
│   │   │   ├── AppLayout.jsx       # Main layout wrapper
│   │   │   ├── Navbar.jsx          # Navigation bar
│   │   │   ├── Sidebar.jsx         # Side menu
│   │   │   ├── Topbar.jsx          # Top header bar
│   │   │   ├── Footer.jsx          # Page footer
│   │   │   └── ProtectedRoute.jsx  # Route protection HOC
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx           # Login page
│   │   │   ├── Signup.jsx          # Registration page
│   │   │   ├── Dashboard.jsx       # Main dashboard
│   │   │   ├── Tests.jsx           # Tests listing
│   │   │   ├── Payment.jsx         # Payment page
│   │   │   └── Profile.jsx         # User profile
│   │   │
│   │   ├── App.css
│   │   ├── App.jsx                 # Main app component with routes
│   │   ├── index.css
│   │   └── main.jsx                # Entry point
│   │
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js         # Database connection
│   │   │   ├── redis.js            # Redis configuration
│   │   │   └── razorpay.js         # Razorpay integration
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js  # JWT authentication
│   │   │   ├── admin.middleware.js # Admin role verification
│   │   │   ├── error.middleware.js # Error handling
│   │   │   └── rateLimiter.js      # Rate limiting
│   │   │
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── auth.controller.js
│   │   │   │   ├── auth.routes.js
│   │   │   │   └── auth.service.js
│   │   │   │
│   │   │   ├── payment/
│   │   │   │   ├── payment.controller.js
│   │   │   │   ├── payment.routes.js
│   │   │   │   └── payment.service.js
│   │   │   │
│   │   │   └── questions/
│   │   │       ├── tests/
│   │   │       │   ├── tests.controller.js
│   │   │       │   ├── tests.routes.js
│   │   │       │   └── tests.service.js
│   │   │       └── questions.controller.js
│   │   │
│   │   └── utils/
│   │       ├── logger.js           # Winston logger
│   │       ├── helpers.js          # Utility functions
│   │       └── constants.js        # App constants
│   │
│   ├── .env
│   ├── server.js                    # Entry point
│   ├── package-lock.json
│   └── package.json
│

```

---

## 🔐 Authentication Flow

1. User registers/logs in via `/api/auth/signup` or `/api/auth/login`
2. Backend validates credentials and issues JWT token
3. Frontend stores token in localStorage
4. Protected routes validate token before rendering
5. Automatic redirect to dashboard on successful login

---

## 📅 Daily Task Flow

1. Dashboard loads → calls `GET /api/tests/today`
2. Backend returns current day's task and progress:
   ```json
   {
     "day": 7,
     "task": "Quant - Time & Work",
     "completed_days": 6,
     "total_days": 90
   }
   ```
3. User clicks "Mark Complete" → `POST /api/tests/complete`
4. Backend updates progress in database
5. Dashboard refreshes with updated progress

---

## 💳 Payment Flow (Razorpay Live Integration)

### Complete Payment Journey:

1. **User clicks "Buy Course"** on dashboard
2. **Frontend** calls `POST /api/payment/create-order`
3. **Backend**:
   - Creates order in Razorpay
   - Stores order in database
   - Returns order details + Razorpay key
4. **Razorpay Checkout** opens in browser
5. **User completes payment** (UPI/Card/NetBanking)
6. **Razorpay** redirects to success page with payment details
7. **Frontend** calls `POST /api/payment/verify` with signature
8. **Backend**:
   - Verifies payment signature cryptographically
   - Updates order status in database
   - Creates user enrollment
   - Sends confirmation email
9. **Dashboard** instantly reflects course access

### Webhook Support (Async):
- Razorpay sends webhook events (`payment.captured`, `payment.failed`)
- Backend verifies webhook signature
- Updates payment status even if user closes browser
- Handles refunds, failed payments automatically

---

## ⚙️ API Endpoints

### Auth Module
```
POST   /api/auth/signup        # Register new user
POST   /api/auth/login         # Login existing user
GET    /api/auth/me            # Get current user (protected)
```

### Tests Module
```
GET    /api/tests/today        # Get today's task
POST   /api/tests/complete     # Mark task as completed
GET    /api/tests/progress     # Get overall progress
```

### Payment Module
```
POST   /api/payment/create-order     # Create Razorpay order
POST   /api/payment/verify           # Verify payment signature
POST   /api/payment/webhook          # Razorpay webhook endpoint
GET    /api/payment/history          # Get user payment history
POST   /api/payment/refund/:id       # Process refund (admin)
```

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool & dev server
- **React Router v6** - Navigation
- **Axios** - API client
- **Razorpay SDK** - Payment integration

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **PostgreSQL** - Primary database
- **Redis** - Caching & rate limiting
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Winston** - Logging
- **Jest** - Testing

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Local development
- **Git** - Version control

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- PostgreSQL v15+
- Redis v7+
- Razorpay Merchant Account

---

## 🧪 Testing the Application

### Manual Testing Flow
1. **Signup** - Create a new account
2. **Login** - Access your dashboard
3. **Daily Task** - View and complete tasks
4. **Progress Tracking** - Watch your progress bar fill
5. **Course Purchase** - Test complete payment flow
   - Use test UPI ID: `success@razorpay`
   - Or test card: `4111 1111 1111 1111`


## 🔒 Security Features

- **JWT tokens** with expiration
- **Password hashing** using bcrypt
- **Rate limiting** on auth endpoints
- **CORS** properly configured
- **SQL injection** protection
- **XSS** prevention
- **Payment signature** verification
- **Webhook signature** validation
- **Helmet.js** security headers
- **Input validation** on all endpoints

---

## 📈 Performance Optimizations

- **Redis caching** for frequently accessed data
- **Database indexing** on frequently queried fields
- **Connection pooling** for PostgreSQL
- **Compression** middleware
- **Lazy loading** in frontend
- **Code splitting** with Vite
- **Image optimization**

---

## 🚧 Production Deployment

### Backend (Render/Heroku/AWS)
```bash
# Build for production
npm run build

# Start production server
npm start
```

### Frontend (Vercel/Netlify)
```bash
# Build static files
npm run build

# Deploy to hosting platform
```

### Database (Production)
- Use managed PostgreSQL (AWS RDS, Supabase, Render)
- Enable automated backups
- Set up read replicas for scaling

---

## 📊 Monitoring & Logging

- **Winston** for structured logging
- **Error tracking** with Sentry (optional)
- **Performance monitoring** with New Relic (optional)
- **Payment analytics** via Razorpay dashboard
- **User analytics** with custom events

---

## 🎯 Key Design Decisions

| Decision | Why |
|----------|-----|
| **Modular architecture** | Easy to scale, maintain, and test |
| **Service layer pattern** | Business logic separated from controllers |
| **PostgreSQL + Redis** | ACID compliance + high performance caching |
| **JWT authentication** | Stateless, scalable authentication |
| **Razorpay integration** | Industry standard, secure, feature-rich |
| **Docker support** | Consistent development environment |
| **API-first design** | Frontend/backend can scale independently |

---

## 🗺️ Roadmap

### Phase 1 (✅ Completed)
- [x] User authentication
- [x] Daily task system
- [x] Progress tracking
- [x] Razorpay payment integration

### Phase 2 (🚧 In Progress)
- [ ] Admin dashboard
- [ ] Course content delivery
- [ ] Quiz system
- [ ] Performance analytics

### Phase 3 (🎯 Planned)
- [ ] Mobile app (React Native)
- [ ] Live classes integration
- [ ] Community features
- [ ] AI-powered recommendations

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

---

## 👨‍💻 Author

**Abhishek**
Backend & Full Stack Developer
---

## 🙏 Acknowledgments

- Razorpay for excellent payment APIs
- PostgreSQL community
- React and Node.js ecosystems
- All contributors and testers

---

**⭐ Star this repo if you found it helpful!**

---

=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
>>>>>>> 8aabdb8 (Added frontend (React + Vite))
