# BizSense AI

BizSense AI is an AI-powered business intelligence and operations platform for small businesses.

It helps businesses manage inventory, track sales, manage customers, view analytics, and receive AI-powered business insights.

## Current Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes

### Inventory Management
- Add Products
- View Products
- Update Products
- Delete Products
- Low Stock Alerts
- Inventory Statistics
- Category Analytics
- Recent Products Tracking

### Sales Management
- Record Sales
- Automatic Inventory Deduction
- Sales History
- Sales Statistics
- Top Selling Products

## API Endpoints

### Authentication
POST /api/auth/register
POST /api/auth/login

### Products
POST /api/products
GET /api/products
PUT /api/products/:id
DELETE /api/products/:id

### Sales
POST /api/sales
GET /api/sales
GET /api/sales/stats
GET /api/sales/top-products

## Technology Stack

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Authentication
- JWT
- bcryptjs

## Current Status

✅ Authentication Module Complete

✅ Product Management Module Complete

✅ Inventory Intelligence Module Complete

✅ Sales Management Module Complete

🚀 Next Phase: Dashboard Analytics & Business Intelligence