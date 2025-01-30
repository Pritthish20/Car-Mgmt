# Car Management System 🚗

A robust full-stack application for managing car listings with advanced features like multi-image upload, secure authentication, and an interactive UI.

## 📌 Table of Contents
- [Demo](#demo)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Folder Structure](#folder-structure)
- [Configuration](#configuration)
- [Deployment](#deployment)

## 🌐 Demo
- Live Demo: [Live Link](https://car-mgmt-2kse.vercel.app/create-product)
- API Documentation: [Postman Docs](https://documenter.getpostman.com/view/39575061/2sAYX2N4VN)

## ✨ Features

### Authentication & Authorization
- JWT-based authentication
- Secure password hashing
- Token refresh mechanism

### Car Management
- Create, read, update, and delete car listings
- Advanced filtering and search capabilities
- Multiple image upload (up to 10 images per car)
- Image optimization and CDN delivery

### User Interface
- Responsive design for all devices
- Interactive image carousel using react-slick
- Real-time search and filtering
- Modern dashboard for administrators

<!-- ## 📸 Screenshots

### Dashboard
![Dashboard](placeholder-dashboard.png)
*Main dashboard showing car listings and statistics*

### Car Details
![Car Details](placeholder-car-details.png)
*Detailed view of a car listing with image carousel*

### Image Upload
![Image Upload](placeholder-image-upload.png)
*Multiple image upload interface* -->

## 🛠 Tech Stack

### Backend Architecture
- **Runtime Environment:** Node.js (v14+)
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (jsonwebtoken)
- **Image Storage:** Cloudinary
- **File Handling:** Multer

### Frontend Development
- **Framework:** React.js
- **State Management:** Redux + Redux Toolkit
- **Routing:** React Router v6
- **API Client:** RTK Query
- **UI Components:**
  - React-slick for carousels
  - Tailwind CSS for styling

## 🚀 Getting Started

### Prerequisites
```bash
# Required software
Node.js >= 14.0.0
MongoDB >= 4.0.0
npm >= 6.0.0 or yarn >= 1.22.0
```

### Environment Setup
```bash
# Clone the repository
git clone https://github.com/Pritthish20/Car-Mgmt.git

# Install dependencies for backend
cd backend
npm install

# Install dependencies for frontend
cd frontend
npm install
```

### Configuration
Create `.env` files in both backend and frontend directories:

```env
# Backend .env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/car_management
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend .env
VITE_APP_BASE_URL=http://localhost:5000/api
VITE_APP_PROD_URL=http://localhost:5000/api
```

### Running the Application
```bash
# Start backend server
cd backend
npm run dev

# Start frontend application
cd frontend
npm start
```

## 📝 API Documentation
- Api docs: [Documentation](https://documenter.getpostman.com/view/39575061/2sAYX2N4VN)

## 📁 Folder Structure

```
car-management/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── redux/
    └── package.json
```

## 🌟 Deployment

### Backend Deployment
```bash
# Build the application
npm run build

# Start production server
npm run backend
```

### Frontend Deployment
```bash
# Create production build
npm run build

# Deploy to hosting service
npm run dev
```