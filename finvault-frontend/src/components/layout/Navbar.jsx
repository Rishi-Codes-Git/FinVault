import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    location.pathname === path ? "text-info fw-bold" : "text-light";

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg px-4 py-3 shadow-sm">
      <Link className="navbar-brand fs-4 fw-bold text-info" to="/">
        FinVault
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#finvaultNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="finvaultNav">
        <ul className="navbar-nav me-auto ms-4 gap-4">

          <li className="nav-item">
            <Link className={`nav-link ${isActive("/")}`} to="/">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link className={`nav-link ${isActive("/dashboard")}`} to="/dashboard">
              Dashboard
            </Link>
          </li>

          <li className="nav-item">
            <Link className={`nav-link ${isActive("/deposit")}`} to="/deposit">
              Deposit
            </Link>
          </li>

          <li className="nav-item">
            <Link className={`nav-link ${isActive("/withdraw")}`} to="/withdraw">
              Withdraw
            </Link>
          </li>

          <li className="nav-item">
            <Link className={`nav-link ${isActive("/transfer")}`} to="/transfer">
              Transfer
            </Link>
          </li>

          <li className="nav-item">
            <Link className={`nav-link ${isActive("/transactions")}`} to="/transactions">
              Transactions
            </Link>
          </li>

        </ul>

        {/* RIGHT SIDE */}
        <div className="d-flex align-items-center">

          {user ? (
            <>
              <span className="text-light me-3">
                Hi, <strong>{user.username}</strong>
              </span>

              <button
                className="btn btn-outline-light btn-sm"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-info me-2">Login</Link>
              <Link to="/register" className="btn btn-info">Register</Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}
