# BizSense AI

BizSense AI is an AI-powered business intelligence and operations platform designed for small and medium-sized businesses.

The platform helps businesses manage inventory, track sales, manage customer relationships, monitor business performance, and generate intelligent business insights through analytics.

---

## Live Demo

### Frontend

https://biz-sense-ai.vercel.app

### Backend API

https://bizsense-ai-production.up.railway.app

---

## Deployment

### Frontend

* Vercel

### Backend

* Railway

### Database

* MongoDB Atlas

---

## Features

### Authentication & Security

* User Registration
* User Login
* JWT Authentication
* Protected API Routes
* User-Specific Data Isolation

---

### Inventory Management

* Add Products
* View Products
* Update Products
* Delete Products
* Low Stock Monitoring
* Inventory Statistics
* Category-Based Inventory Analysis
* Inventory Value Tracking

---

### Customer Management

* Add Customers
* View Customers
* Update Customers
* Delete Customers
* Customer Purchase Tracking
* Customer-Sales Linking

---

### Sales Management

* Record Sales
* Automatic Inventory Deduction
* Sales History
* Sales Statistics
* Top Selling Products
* Profit Tracking

---

### Business Intelligence & Analytics

#### Dashboard Summary

* Total Products
* Low Stock Products
* Total Sales
* Total Revenue
* Inventory Value

#### Revenue Analytics

* Monthly Revenue Analytics
* Sales Trend Analytics

#### Inventory Analytics

* Inventory Value Analytics
* Category Performance Analytics

#### Customer Analytics

* Top Customers Analytics
* Customer Lifetime Value Analytics

#### Business Performance

* Business Health Score
* Profit Analytics
* Recent Activity Feed

#### AI-Powered Insights

* AI Business Insights
* Smart Business Recommendations

---

## Technology Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router DOM
* Recharts
* Lucide React

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JSON Web Tokens (JWT)
* bcryptjs

### API Testing

* Postman

### Deployment

* Vercel
* Railway

---

## Project Structure

```text
backend/
│
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── customerController.js
│   ├── saleController.js
│   └── dashboardController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Customer.js
│   └── Sale.js
│
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── customerRoutes.js
│   ├── saleRoutes.js
│   └── dashboardRoutes.js
│
├── server.js
└── .env

frontend/
│
├── src/
│   ├── pages/
│   ├── components/
│   ├── routes/
│   ├── context/
│   └── layouts/
│
├── App.jsx
├── main.jsx
└── .env
```

---

## API Endpoints

### Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |

### Products

| Method | Endpoint          |
| ------ | ----------------- |
| POST   | /api/products     |
| GET    | /api/products     |
| PUT    | /api/products/:id |
| DELETE | /api/products/:id |

### Customers

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/customers     |
| GET    | /api/customers     |
| GET    | /api/customers/:id |
| PUT    | /api/customers/:id |
| DELETE | /api/customers/:id |

### Sales

| Method | Endpoint                |
| ------ | ----------------------- |
| POST   | /api/sales              |
| GET    | /api/sales              |
| GET    | /api/sales/stats        |
| GET    | /api/sales/top-products |

### Dashboard Analytics

| Method | Endpoint                               |
| ------ | -------------------------------------- |
| GET    | /api/dashboard/summary                 |
| GET    | /api/dashboard/monthly-revenue         |
| GET    | /api/dashboard/sales-trends            |
| GET    | /api/dashboard/inventory-value         |
| GET    | /api/dashboard/business-health         |
| GET    | /api/dashboard/ai-insights             |
| GET    | /api/dashboard/recommendations         |
| GET    | /api/dashboard/category-performance    |
| GET    | /api/dashboard/top-customers           |
| GET    | /api/dashboard/profit-analytics        |
| GET    | /api/dashboard/customer-lifetime-value |
| GET    | /api/dashboard/activity-feed           |

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Chamethya-dev/BizSense-AI.git
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run Backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Run Frontend:

```bash
npm run dev
```

---

## Project Status

### Completed Modules

✅ Authentication Module

✅ Product Management Module

✅ Inventory Intelligence Module

✅ Customer Management Module

✅ Sales Management Module

✅ Dashboard Analytics Module

✅ Business Intelligence Module

✅ AI Insights Module

✅ Profit Analytics Module

✅ Customer Analytics Module

✅ Activity Tracking Module

✅ React Frontend Dashboard

✅ Railway Backend Deployment

✅ Vercel Frontend Deployment

✅ MongoDB Atlas Integration

---

### Current State

The application is fully functional and deployed.

Users can:

* Register and login
* Manage inventory
* Manage customers
* Record sales
* Track revenue and profit
* View analytics dashboards
* Receive AI-generated business insights
* Monitor business health

---

## Screenshots

### Dashboard

![Dashboard](screenshots/dashboard.png)

### Products Module

![Products](screenshots/products.png)

### Customers Module

![Customers](screenshots/customers.png)

### Sales Module

![Sales](screenshots/sales.png)

### Analytics Dashboard

![Analytics](screenshots/analytics.png)

### AI Insights

![AI Insights](screenshots/ai-insights.png)

---

## Future Enhancements

* Role-Based Access Control
* Multi-Business Support
* Email Notifications
* Forecasting & Demand Prediction
* PDF Report Generation
* Export Analytics (CSV/PDF)
* OpenAI/Gemini Integration
* Inventory Forecasting
* AI Sales Prediction
* Supplier Management Module
* Invoice Generation

---

## Author

Chamethya Palliyaguru

BSc (Hons) Data Science Undergraduate

SLIIT – Sri Lanka Institute of Information Technology

GitHub:
https://github.com/Chamethya-dev

---

## License

This project was developed for educational and portfolio purposes.
