# GearGuard Maintenance Hub

A comprehensive equipment maintenance management system built with React (Frontend) and Node.js/Express (Backend).

## Overview

GearGuard Maintenance Hub is a full-stack application designed to help organizations manage their equipment maintenance operations efficiently. It provides features for tracking equipment, scheduling maintenance, managing teams, and generating reports.

## Project Structure

```
├── Backend/                 # Node.js/Express API server
│   ├── config/             # Configuration files
│   ├── controller/         # Route controllers
│   ├── DB/                 # Database connection
│   ├── middleware/         # Express middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   └── util/               # Utility functions
│
├── Frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility libraries
│   │   └── data/           # Mock data
│   └── ...
```

##  Features

- **Equipment Management**: Track and manage all equipment with details like serial numbers, categories, departments, and warranty information
- **Maintenance Requests**: Create and track corrective and preventive maintenance requests
- **Kanban Board**: Visual workflow management for maintenance tasks
- **Calendar View**: Schedule and view maintenance activities
- **Team Management**: Organize maintenance teams and assign tasks
- **Reports & Analytics**: Generate insights on maintenance operations
- **User Authentication**: Secure login with JWT and OTP verification

##  Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js v5
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken), bcrypt
- **Email**: Nodemailer

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **State Management**: TanStack React Query
- **Routing**: React Router DOM
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts

##  Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB instance
- npm or bun package manager

### Backend Setup

1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_password
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Data Models

### Equipment
- Name, Serial Number, Category (machine/vehicle/IT)
- Department, Location
- Assigned Employee, Maintenance Team
- Purchase Date, Warranty Expiry
- Scrap Status

### Maintenance Request
- Subject, Type (corrective/preventive)
- Equipment Reference
- Maintenance Team & Assigned User
- Status (new/in_progress/repaired/scrap)
- Scheduled Date, Duration


### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-otp` - OTP verification

### Equipment
- `GET /api/equipment` - List all equipment
- `POST /api/equipment` - Create new equipment
- `GET /api/equipment/:id` - Get equipment details
- `PUT /api/equipment/:id` - Update equipment
- `DELETE /api/equipment/:id` - Delete equipment

### Maintenance
- `GET /api/maintenance` - List maintenance requests
- `POST /api/maintenance` - Create maintenance request
- `PUT /api/maintenance/:id` - Update maintenance request

##  Frontend Pages

- **Dashboard** (`/`) - Overview and statistics
- **Equipment** (`/equipment`) - Equipment list and management
- **Maintenance** (`/maintenance`) - Maintenance requests with Kanban board
- **Calendar** (`/calendar`) - Maintenance schedule calendar
- **Reports** (`/reports`) - Analytics and reports
- **Settings** (`/settings`) - User profile settings



##  Team

**Deki DUO** - Odoo Hackathon Project
