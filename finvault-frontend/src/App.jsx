import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import Transfer from './pages/Transfer';
import Transactions from './pages/Transactions';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PrivateRoute from './components/Auth/PrivateRoute';


export default function App() {
return (
<AuthProvider>
<BrowserRouter>
<Navbar />
<main className="container my-4">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
<Route path="/deposit" element={<PrivateRoute><Deposit /></PrivateRoute>} />
<Route path="/withdraw" element={<PrivateRoute><Withdraw /></PrivateRoute>} />
<Route path="/transfer" element={<PrivateRoute><Transfer /></PrivateRoute>} />
<Route path="/transactions" element={<PrivateRoute><Transactions /></PrivateRoute>} />
</Routes>
</main>
<Footer />
</BrowserRouter>
</AuthProvider>
);
}