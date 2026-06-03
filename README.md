# BizSense AI

BizSense AI is an AI-powered business intelligence and operations platform designed for small and medium-sized businesses.

The platform helps businesses manage inventory, track sales, manage customer relationships, monitor business performance, and generate intelligent business insights through analytics.

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
```

---

## API Endpoints

### Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |

---

### Products

| Method | Endpoint          |
| ------ | ----------------- |
| POST   | /api/products     |
| GET    | /api/products     |
| PUT    | /api/products/:id |
| DELETE | /api/products/:id |

---

### Customers

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/customers     |
| GET    | /api/customers     |
| GET    | /api/customers/:id |
| PUT    | /api/customers/:id |
| DELETE | /api/customers/:id |

---

### Sales

| Method | Endpoint                |
| ------ | ----------------------- |
| POST   | /api/sales              |
| GET    | /api/sales              |
| GET    | /api/sales/stats        |
| GET    | /api/sales/top-products |

---

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
git clone <repository-url>
```

### Navigate to Backend

```bash
cd backend
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

### Start Development Server

```bash
npm run dev
```

### Start Production Server

```bash
npm start
```

---

## Current Development Status

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

---

## Upcoming Features

### Frontend Development

* React Dashboard
* Inventory Management UI
* Sales Management UI
* Customer Management UI
* Analytics Dashboard
* Business Intelligence Dashboard

### Future SaaS Enhancements

* Role-Based Access Control
* Multi-Business Support
* Email Notifications
* Forecasting & Demand Prediction
* PDF Report Generation
* Export Analytics (CSV/PDF)
* Real AI Integration (OpenAI/Gemini)
* Cloud Deployment

---

## Author

Chamethya Palliyaguru

BSc (Hons) Data Science Undergraduate

SLIIT – Sri Lanka Institute of Information Technology
