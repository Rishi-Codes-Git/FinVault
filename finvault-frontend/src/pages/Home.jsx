import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="mt-4">
      {/* Hero Section */}
      <div className="hero text-center mb-5">
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="mb-4">
            <span
              className="badge"
              style={{
                background: "rgba(14, 165, 233, 0.2)",
                color: "#7dd3fc",
                padding: "0.5rem 1.5rem",
                fontSize: "0.875rem",
                borderRadius: "50px",
              }}
            >
              🔒 Bank-Grade Security
            </span>
          </div>
          <h1 className="display-4 fw-bold mb-4">
            Welcome to <span className="text-gradient">FinVault</span>
          </h1>
          <p
            className="lead mb-4"
            style={{
              color: "#94a3b8",
              fontSize: "1.25rem",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Your secure digital banking vault built with enterprise-grade
            technology. Experience seamless banking at your fingertips.
          </p>
          <div className="d-flex gap-3 justify-content-center mt-5">
            {user ? (
              <Link to="/dashboard" className="btn btn-primary btn-lg px-5">
                <i className="bi bi-speedometer2 me-2"></i>
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary btn-lg px-4">
                  <i className="bi bi-person-plus me-2"></i>
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="btn btn-outline-primary btn-lg px-4"
                >
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="bi bi-shield-check"></i>
            </div>
            <h5 className="fw-bold mb-3">Secure & Protected</h5>
            <p className="text-muted-light" style={{ fontSize: "0.95rem" }}>
              Bank-grade encryption and multi-layer security protecting your
              assets 24/7
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="bi bi-lightning-charge"></i>
            </div>
            <h5 className="fw-bold mb-3">Instant Transfers</h5>
            <p className="text-muted-light" style={{ fontSize: "0.95rem" }}>
              Lightning-fast transactions with real-time processing and
              notifications
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="bi bi-graph-up"></i>
            </div>
            <h5 className="fw-bold mb-3">Smart Analytics</h5>
            <p className="text-muted-light" style={{ fontSize: "0.95rem" }}>
              Comprehensive insights and visualizations of your financial
              activity
            </p>
          </div>
        </div>
      </div>

      {/* Banking Services */}
      <div className="row g-4 mb-5">
        <div className="col-md-6">
          <div className="banking-card h-100">
            <div className="d-flex align-items-start gap-3">
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                }}
              >
                <i className="bi bi-wallet2"></i>
              </div>
              <div>
                <h5 className="fw-bold mb-2">Digital Wallet</h5>
                <p
                  className="text-muted-light mb-0"
                  style={{ fontSize: "0.9rem" }}
                >
                  Manage your funds with ease. Deposit, withdraw, and transfer
                  money instantly with just a few clicks.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="banking-card h-100">
            <div className="d-flex align-items-start gap-3">
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                }}
              >
                <i className="bi bi-clock-history"></i>
              </div>
              <div>
                <h5 className="fw-bold mb-2">Transaction History</h5>
                <p
                  className="text-muted-light mb-0"
                  style={{ fontSize: "0.9rem" }}
                >
                  Complete transparency with detailed transaction logs and
                  real-time balance tracking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="glass text-center p-5">
        <h6
          className="text-muted-light text-uppercase mb-4"
          style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}
        >
          Powered By
        </h6>
        <div className="row align-items-center justify-content-center g-4">
          <div className="col-auto">
            <div className="d-flex align-items-center gap-2">
              <i
                className="bi bi-server"
                style={{ fontSize: "1.5rem", color: "#10b981" }}
              ></i>
              <span className="fw-semibold">Spring Boot</span>
            </div>
          </div>
          <div className="col-auto">
            <span className="text-muted-light">•</span>
          </div>
          <div className="col-auto">
            <div className="d-flex align-items-center gap-2">
              <i
                className="bi bi-filetype-jsx"
                style={{ fontSize: "1.5rem", color: "#06b6d4" }}
              ></i>
              <span className="fw-semibold">React</span>
            </div>
          </div>
          <div className="col-auto">
            <span className="text-muted-light">•</span>
          </div>
          <div className="col-auto">
            <div className="d-flex align-items-center gap-2">
              <i
                className="bi bi-database"
                style={{ fontSize: "1.5rem", color: "#f59e0b" }}
              ></i>
              <span className="fw-semibold">MySQL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
