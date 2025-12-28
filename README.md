<div align="center">

# 🏦 FinVault

### Full-Stack Digital Banking Application

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://finvault-frontend-seven.vercel.app)
[![Backend](https://img.shields.io/badge/backend-railway-purple)](https://backend-production-93cc.up.railway.app)
[![React](https://img.shields.io/badge/React-19.2.0-blue)](https://react.dev/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.7-green)](https://spring.io/projects/spring-boot)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A modern, secure banking management system featuring JWT authentication, real-time transactions, and glassmorphism UI design.

[Live Demo](https://finvault-frontend-seven.vercel.app) · [Report Bug](https://github.com/Rishi-Codes-Git/FinVault/issues) · [Request Feature](https://github.com/Rishi-Codes-Git/FinVault/issues)

</div>

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Screenshots](#screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🎯 About The Project

FinVault is a full-stack digital banking application that simulates real-world banking operations. Built with enterprise-grade security and modern UI/UX principles, it provides a complete banking experience including user authentication, account management, money transfers, and transaction analytics.

### Why FinVault?

- **Security First**: JWT-based authentication with BCrypt password hashing
- **Real-time Operations**: Instant balance updates with optimistic locking
- **Modern UI**: Glassmorphism design with responsive Bootstrap 5
- **Production Ready**: Deployed on Railway (backend) and Vercel (frontend)
- **Clean Architecture**: Follows MVC pattern with proper separation of concerns

---

## 📸 Screenshots

### Landing Page

![Landing Page](screenshots/landing-page.png)
_Homepage with authentication options_

### Dashboard

![Dashboard](screenshots/dashboard.png)
_Main dashboard with balance overview and transaction charts_

### Transactions

![Transactions](screenshots/transactions.png)
_Transaction history with filtering and analytics_

### Deposit/Withdraw

![Money Operations](screenshots/money-operations.png)
_Deposit and withdrawal interfaces_

### Transfer

![Transfer](screenshots/transfer.png)
_Inter-account transfer functionality_

---

## ✨ Features

### 🔐 Authentication & Authorization

- JWT-based access and refresh tokens
- Secure user registration with email validation
- BCrypt password hashing
- Session management with automatic token refresh
- Protected routes with Spring Security

### 💰 Core Banking Operations

- **Deposit**: Add funds to account
- **Withdraw**: Remove funds with balance validation
- **Transfer**: Send money to other accounts by account number
- Real-time balance updates
- Transaction locking to prevent race conditions

### 📊 Transaction Management

- Complete transaction history
- Filter by transaction type (Deposit, Withdraw, Transfer In/Out)
- Color-coded transaction statuses
- Running balance visualization with Recharts
- Export transaction data (planned)

### 🎨 User Interface

- Glassmorphism design system
- Fully responsive (mobile, tablet, desktop)
- Dark gradient theme with smooth animations
- Bootstrap 5 components with custom styling
- Real-time balance charts and analytics

### 🛡️ Security Features

- CORS configuration for production
- SQL injection prevention with JPA/Hibernate
- Input validation on both frontend and backend
- Secure session handling
- Environment-based configuration

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: React.js 19.2.0
- **Routing**: React Router DOM 7.9.6
- **UI Library**: Bootstrap 5.3.8
- **Icons**: Bootstrap Icons 1.13.1
- **HTTP Client**: Axios 1.13.2
- **Charts**: Recharts 3.4.1
- **Styling**: Custom CSS with Glassmorphism

### Backend

- **Framework**: Spring Boot 3.5.7
- **Security**: Spring Security with JWT
- **Database**: MySQL
- **ORM**: JPA/Hibernate
- **Build Tool**: Maven
- **Java Version**: 17

### DevOps & Deployment

- **Backend Hosting**: Railway
- **Frontend Hosting**: Vercel
- **Database**: Railway MySQL
- **Version Control**: Git & GitHub
- **CI/CD**: Automatic deployment via Git push

---

## 🚀 Getting Started

### Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **Java JDK** (17 or higher)
- **Maven** (3.8 or higher)
- **MySQL** (8.0 or higher)
- **Git**

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/Rishi-Codes-Git/FinVault.git
cd FinVault
```

#### 2. Backend Setup

```bash
cd finvault-backend

# Create MySQL database
mysql -u root -p
CREATE DATABASE finvault;
EXIT;

# Update application.properties with your MySQL credentials
# Edit: src/main/resources/application.properties

# Build and run
./mvnw clean install
./mvnw spring-boot:run
```

Backend will start at `http://localhost:8080`

#### 3. Frontend Setup

```bash
cd finvault-frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend will start at `http://localhost:3000`

### Environment Variables

#### Backend (`application.properties`)

```properties
# Server
server.port=8080

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/finvault?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# JWT
jwt.secret=yoursecretkey
jwt.access.expiration-minutes=30
jwt.refresh.expiration-days=14

# CORS
spring.web.cors.allowed-origins=http://localhost:3000
```

#### Frontend (`.env`)

```env
REACT_APP_API_BASE=http://localhost:8080
```

---

## 📚 API Documentation

### Base URL

```
Local: http://localhost:8080/api/v1
Production: https://backend-production-93cc.up.railway.app/api/v1
```

### Authentication Endpoints

#### Register User

```http
POST /auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "usernameOrEmail": "johndoe",
  "password": "securePassword123"
}

Response:
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "tokenType": "Bearer",
  "expiresIn": 1800
}
```

### Account Endpoints

#### Get Account Details

```http
GET /account
Authorization: Bearer {accessToken}

Response:
{
  "id": 1,
  "accountNumber": "123456789012",
  "balance": 5000.00,
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

#### Deposit Money

```http
POST /account/deposit
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "amount": 1000.00,
  "note": "Salary deposit"
}
```

#### Withdraw Money

```http
POST /account/withdraw
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "amount": 500.00,
  "note": "ATM withdrawal"
}
```

#### Transfer Money

```http
POST /account/transfer
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "targetAccountNumber": "987654321098",
  "amount": 250.00,
  "note": "Payment to friend"
}
```

### Transaction Endpoints

#### Get Transaction History

```http
GET /transactions
Authorization: Bearer {accessToken}

Response:
[
  {
    "id": 1,
    "txType": "DEPOSIT",
    "amount": 1000.00,
    "counterparty": null,
    "note": "Salary deposit",
    "createdAt": "2025-12-28T10:30:00"
  }
]
```

---

## 📁 Project Structure

```
finvault/
├── finvault-backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/finvault/backend/
│   │   │   │   ├── config/          # Security & JWT configuration
│   │   │   │   ├── controller/      # REST API controllers
│   │   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   ├── entity/          # JPA entities
│   │   │   │   ├── exception/       # Global exception handling
│   │   │   │   ├── repository/      # JPA repositories
│   │   │   │   └── service/         # Business logic
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/                    # Unit tests
│   ├── Dockerfile
│   ├── railway.json
│   └── pom.xml
│
├── finvault-frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/                     # Axios configuration
│   │   ├── assets/                  # Images & static files
│   │   ├── components/
│   │   │   ├── Auth/                # Auth components
│   │   │   ├── layout/              # Navbar & Footer
│   │   │   └── ui/                  # Reusable UI components
│   │   ├── context/                 # React Context (Auth)
│   │   ├── pages/                   # Page components
│   │   ├── styles/                  # Custom CSS
│   │   ├── utils/                   # Helper functions
│   │   ├── App.jsx
│   │   └── index.js
│   ├── .env.production
│   ├── vercel.json
│   └── package.json
│
└── README.md
```

---

## 🌐 Deployment

### Backend (Railway)

1. Create Railway account
2. Create new project and add MySQL database
3. Connect GitHub repository
4. Set root directory to `finvault-backend`
5. Configure environment variables
6. Deploy automatically on push

### Frontend (Vercel)

1. Create Vercel account
2. Import GitHub repository
3. Set root directory to `finvault-frontend`
4. Add environment variable: `REACT_APP_API_BASE`
5. Deploy automatically on push

### Production URLs

- **Frontend**: https://finvault-frontend-seven.vercel.app
- **Backend**: https://backend-production-93cc.up.railway.app

---

## 🗺️ Roadmap

- [ ] Add email notifications for transactions
- [ ] Implement two-factor authentication (2FA)
- [ ] Add transaction export (PDF/CSV)
- [ ] Implement account statements
- [ ] Add spending analytics and insights
- [ ] Create admin dashboard
- [ ] Add multi-currency support
- [ ] Implement scheduled transfers
- [ ] Add mobile app (React Native)

See the [open issues](https://github.com/Rishi-Codes-Git/FinVault/issues) for a full list of proposed features and known issues.

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📧 Contact

**Rishi** - [@Rishi-Codes-Git](https://github.com/Rishi-Codes-Git)

Project Link: [https://github.com/Rishi-Codes-Git/FinVault](https://github.com/Rishi-Codes-Git/FinVault)

Live Demo: [https://finvault-frontend-seven.vercel.app](https://finvault-frontend-seven.vercel.app)

---

<div align="center">

### ⭐ Star this repository if you found it helpful!

Made with ❤️ by Rishi

</div>
