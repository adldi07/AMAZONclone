# Amazon Clone

A full-stack e-commerce application built with the PERN stack (PostgreSQL, Express, React, Node.js). This project mimics key features of a modern e-commerce platform, including product browsing, cart management, wishlists, order processing, and email notifications.

## 🚀 Features

### **User Experience (Frontend)**
- **Responsive Design**: Mobile-friendly interface with a modern, clean aesthetic.
- **Product Discovery**:
    - Homepage with hero banners and category listings.
    - Search functionality with efficient results display.
    - Detailed product pages with image galleries, specifications, and related offers.
- **Shopping Cart**:
    - Add/remove items.
    - Real-time total calculation.
    - Persistent cart state for logged-in users.
- **Wishlist**:
    - Save items for later.
    - Move items directly from wishlist to cart.
- **Checkout & Orders**:
    - Seamless checkout flow.
    - Order confirmation page with summary.
    - **Order History**: View past orders and their status.
- **Authentication**:
    - Secure Signup/Login/Logout.
    - Guest browsing support.
    - **Dummy User Mode**: Automatic "Guest/Dummy" login for easy development testing.

### **Backend & API**
- **RESTful API**: Structured endpoints for resources (Products, Users, Orders, Cart, Wishlist).
- **Database**: PostgreSQL with Sequelize ORM for schematic data modeling.
- **Authentication**: HTTP-only Cookie-based JWT authentication.
- **Security**: Protected routes via middleware (`authMiddleware`).
- **Email Service**:
    - Automated email confirmations upon order placement.
    - **Development Mode**: Logs emails to console if SMTP is not configured.
    - **Production Mode**: Supports SMTP (e.g., Gmail) for real delivery.

## 🛠️ Technology Stack

**Frontend:**
- React.js
- React Router DOM (Navigation)
- Axios (API Communication)
- CSS3 (Vanilla & Modules)

**Backend:**
- Node.js & Express.js
- PostgreSQL (Database)
- Sequelize (ORM)
- JSON Web Tokens (JWT) (Auth)
- Nodemailer (Email Service)
- Dotenv (Environment Variables)

## 📂 Project Structure

```
AMAZON-clone/
├── backend/                # API Server & Database Logic
│   ├── config/             # DB Configuration
│   ├── controllers/        # Request Handlers
│   ├── middleware/         # Auth & Validation
│   ├── models/             # Sequelize Schemas (User, Product, Order, etc.)
│   ├── routes/             # API Route Definitions
│   ├── utils/              # Helpers (EmailService)
│   ├── .env                # Backend Environment Variables
│   └── index.js            # Entry Point
│
├── frontend/               # React Client Application
│   ├── src/
│   │   ├── components/     # Reusable UI Components (Header, Footer, Card...)
│   │   ├── pages/          # Full Page Views (Home, ProductDetail, Orders...)
│   │   ├── services/       # API Helper Functions
│   │   └── App.js          # Main Component & Routing
│   └── package.json
│
└── README.md               # Project Documentation
```

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14+)
- [PostgreSQL](https://www.postgresql.org/) (Running locally or via cloud like Neon/Supabase)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/amazon-clone.git
cd amazon-clone
```

### 2. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   - Rename/Create a `.env` file in the `backend` folder.
   - Add the following configurations:
     ```env
     PORT=5000
     # Database Connection URL (PostgreSQL)
     POSTGRES_URL=postgresql://user:password@localhost:5432/amazon_clone
     
     # Authentication Secret
     JWT_SECRET=your_super_secret_jwt_key
     
     # Frontend URL for CORS
     FRONTEND_URL=http://localhost:3000
     
     # Email Service (Optional - defaults to Mock/Console logs if empty)
     SMTP_HOST=smtp.gmail.com
     SMTP_PORT=587
     SMTP_USER=your_email@gmail.com
     SMTP_PASS=your_app_password
     ```
4. Start the Server:
   ```bash
   npm run dev
   ```
   *The server will automatically sync the database models on first run.*

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React App:
   ```bash
   npm start
   ```
4. Access the app at `http://localhost:3000`.

## 🧪 Development Notes

- **Dummy User**: By default, if you do not log in, the backend's `authMiddleware` assigns a "Dummy User" (ID: 1) to your session to allow testing User APIs (Cart, Orders, Wishlist) without constant re-authentication.
- **Syncing DB**: In development mode (`NODE_ENV!=production`), Sequelize is set to `alter: true`, meaning it will automatically update tables to match your models.

## 📧 Email Configuration
To enable real email sending for Order Confirmations:
1. Use a service like Gmail.
2. Enable "2-Step Verification" on your Google Account.
3. Generate an **App Password** (Search "App passwords" in Google Security settings).
4. Update `backend/.env` with your email and the generated App Password.

---
Built with ❤️ by [Your Name]
