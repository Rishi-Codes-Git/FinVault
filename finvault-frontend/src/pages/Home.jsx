import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="container py-5">
      {/* Hero */}
      <div className="glass p-4 p-lg-5 mb-5 position-relative overflow-hidden">
        <div className="row align-items-center g-4">
          <div className="col-lg-7 text-lg-start text-center">
            <div className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill border border-gradient mb-3">
              <i className="bi bi-shield-lock text-primary"></i>
              <span className="small text-muted-light">
                Trusted digital banking workspace
              </span>
            </div>
            <h1 className="display-5 fw-bold mb-3">
              Control every account from one secure vault.
            </h1>
            <p
              className="lead text-muted-light mb-4"
              style={{ maxWidth: "640px" }}
            >
              Manage balances, move money, and monitor risk in real time with a
              glass-smooth experience built for modern finance teams.
            </p>
            <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3">
              {user ? (
                <Link to="/dashboard" className="btn btn-primary btn-lg px-4">
                  <i className="bi bi-speedometer2 me-2"></i>
                  Open dashboard
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary btn-lg px-4">
                    <i className="bi bi-person-plus me-2"></i>
                    Create account
                  </Link>
                  <Link
                    to="/login"
                    className="btn btn-outline-primary btn-lg px-4"
                  >
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Sign in
                  </Link>
                </>
              )}
            </div>
            <div className="d-flex flex-wrap gap-4 mt-4">
              <div className="d-flex align-items-center gap-2 text-muted-light">
                <i className="bi bi-shield-lock text-primary"></i>
                <span>JWT-secured Spring Boot APIs</span>
              </div>
              <div className="d-flex align-items-center gap-2 text-muted-light">
                <i className="bi bi-hdd-network text-primary"></i>
                <span>MySQL persistence on Railway</span>
              </div>
              <div className="d-flex align-items-center gap-2 text-muted-light">
                <i className="bi bi-graph-up text-primary"></i>
                <span>Dashboard with live charts</span>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="p-4 glass h-100 shadow-sm">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted-light">
                  What ships with FinVault
                </span>
                <span
                  className="badge"
                  style={{
                    background: "rgba(14,165,233,0.15)",
                    color: "#7dd3fc",
                  }}
                >
                  Live backend
                </span>
              </div>
              <ul className="list-unstyled text-start mb-0 text-muted-light">
                <li className="d-flex align-items-start gap-3 mb-3">
                  <i className="bi bi-shield-check text-primary fs-5"></i>
                  <div>
                    <div className="fw-semibold text-white">
                      JWT-secured authentication
                    </div>
                    <div className="small">
                      Spring Security with hashed passwords and refresh tokens.
                    </div>
                  </div>
                </li>
                <li className="d-flex align-items-start gap-3 mb-3">
                  <i className="bi bi-bank text-primary fs-5"></i>
                  <div>
                    <div className="fw-semibold text-white">
                      Account + balance service
                    </div>
                    <div className="small">
                      Real account model persisted in MySQL via JPA/Hibernate.
                    </div>
                  </div>
                </li>
                <li className="d-flex align-items-start gap-3 mb-3">
                  <i className="bi bi-arrow-left-right text-primary fs-5"></i>
                  <div>
                    <div className="fw-semibold text-white">
                      Deposits, withdrawals, transfers
                    </div>
                    <div className="small">
                      Safe balance locking to prevent race conditions.
                    </div>
                  </div>
                </li>
                <li className="d-flex align-items-start gap-3">
                  <i className="bi bi-clock-history text-primary fs-5"></i>
                  <div>
                    <div className="fw-semibold text-white">
                      Transaction history + charts
                    </div>
                    <div className="small">
                      Glassmorphism UI with Recharts for running balance
                      insights.
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
