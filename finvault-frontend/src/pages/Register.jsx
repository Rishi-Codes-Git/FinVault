import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/v1/auth/register", form);
      navigate("/login");
    } catch (error) {
      setErr(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "75vh" }}
    >
      <div className="col-md-5 col-lg-4">
        <div className="glass">
          <div className="text-center mb-4">
            <div
              style={{
                width: "64px",
                height: "64px",
                background: "linear-gradient(135deg, #10b981, #059669)",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                margin: "0 auto 1rem",
                boxShadow: "0 8px 24px rgba(16, 185, 129, 0.3)",
              }}
            >
              <i className="bi bi-person-plus"></i>
            </div>
            <h3 className="fw-bold mb-2">Create Account</h3>
            <p className="text-muted-light mb-0" style={{ fontSize: "0.9rem" }}>
              Join FinVault and start banking securely
            </p>
          </div>

          {err && (
            <div
              className="alert alert-danger d-flex align-items-center gap-2"
              role="alert"
            >
              <i className="bi bi-exclamation-circle"></i>
              <span>{err}</span>
            </div>
          )}

          <form onSubmit={submit}>
            <div className="mb-3">
              <label className="form-label">
                <i className="bi bi-person me-2"></i>
                Username
              </label>
              <input
                className="form-control"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="Choose a username"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                <i className="bi bi-envelope me-2"></i>
                Email
              </label>
              <input
                type="email"
                className="form-control"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">
                <i className="bi bi-lock me-2"></i>
                Password
              </label>
              <input
                type="password"
                className="form-control"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Create a strong password"
                required
              />
            </div>

            <button className="btn btn-primary w-100 mb-3" type="submit">
              <i className="bi bi-person-plus me-2"></i>
              Create Account
            </button>

            <div className="text-center">
              <p
                className="text-muted-light mb-0"
                style={{ fontSize: "0.9rem" }}
              >
                Already have an account?{" "}
                <a
                  href="/login"
                  style={{
                    color: "#0ea5e9",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  Sign In
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
