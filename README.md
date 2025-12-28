# 🏦 FinVault

### Full-Stack Digital Banking Application

## 🎯 About The Project

FinVault is a full-stack digital banking application that simulates real-world banking operations. Built with enterprise-grade security and modern UI/UX principles, it provides a complete banking experience including user authentication, account management, money transfers, and transaction analytics.

## 📸 Screenshots

<img width="1825" height="858" alt="landing-page" src="https://github.com/user-attachments/assets/ba0b1b6e-160c-40cd-98fe-725bbd99b794" /> <br/>
<img width="841" height="593" alt="Untitled2" src="https://github.com/user-attachments/assets/5c1e9a14-5fa4-437b-a93b-f8674478aa57" /> <br/>
<img width="1530" height="855" alt="dashboard" src="https://github.com/user-attachments/assets/46ff77aa-0861-4849-8372-54df0e4f3474" /> <br/>
<img width="1349" height="444" alt="withdraw deposit" src="https://github.com/user-attachments/assets/be944169-12b3-489a-bce9-9b7dd694e263" /> <br/>
<img width="1367" height="812" alt="transhistory" src="https://github.com/user-attachments/assets/da81ba59-1d71-4b53-aae9-f10eaee119af" /> <br/>

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

Made with ❤️ by Rishi
