# 🏦 FinVault – Secure Banking Management System

FinVault is a full-stack banking application built to simulate real-world digital banking operations. It supports secure authentication, money transfers, deposits, withdrawals, transaction history, and account management — all backed by JWT security and a modern UI.

---

## 🔧 Tech Stack

### **Frontend**
- React.js (Vite or CRA)
- Bootstrap 5 + Custom UI
- Axios (JWT Interceptors)
- Recharts (Analytics Graphs)

### **Backend**
- Spring Boot 3
- Spring Security (JWT Authentication)
- MySQL (Persistent Storage)
- JPA / Hibernate

---

## ⭐ Key Features

### 🔐 **Authentication**
- JWT-based login & session management  
- Secure registration & password hashing  
- Private routes for authenticated users only  

### 🧾 **Account Management**
- View account details  
- Real-time balance updates  
- Clean banking dashboard with charts  

### 💰 **Transactions**
- Deposit money  
- Withdraw money  
- Transfer funds to another account  
- View full transaction history  
- Transaction timeline analytics  

### 📊 **Dashboard**
- Weekly activity graph  
- Running balance chart  
- Recent transactions panel  
- Account statistics cards  

### ⚙️ **Backend Architecture**
- Layered architecture (Controller → Service → Repository)
- DTOs for request/response validation  
- Global exception handling  
- Clean routing under `/api/v1/`  

---

## 📚 Available Endpoints (Short)

- `POST /api/v1/auth/register`  
- `POST /api/v1/auth/login`  
- `GET /api/v1/account`  
- `POST /api/v1/account/deposit`  
- `POST /api/v1/account/withdraw`  
- `POST /api/v1/account/transfer`  
- `GET /api/v1/transactions`  

---

## 🎯 Purpose

Built as a real-world simulation of modern digital banking — ideal for learning backend security, frontend integration, and full-stack architecture.


