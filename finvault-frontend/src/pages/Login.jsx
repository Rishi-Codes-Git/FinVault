import React, { useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ usernameOrEmail: "", password: "" });
  const [err, setErr] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/v1/auth/login", form);
      localStorage.setItem("accessToken", res.data.accessToken);
      const acc = await api.get("/api/v1/account");
      setUser(acc.data);
      navigate("/dashboard");
    } catch (error) {
      setErr(error.response?.data?.error || "Login failed");
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
                background: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                margin: "0 auto 1rem",
                boxShadow: "0 8px 24px rgba(14, 165, 233, 0.3)",
              }}
            >
              <i className="bi bi-box-arrow-in-right"></i>
            </div>
            <h3 className="fw-bold mb-2">Welcome Back</h3>
            <p className="text-muted-light mb-0" style={{ fontSize: "0.9rem" }}>
              Sign in to access your account
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
                Username or Email
              </label>
              <input
                className="form-control"
                value={form.usernameOrEmail}
                onChange={(e) =>
                  setForm({ ...form, usernameOrEmail: e.target.value })
                }
                placeholder="Enter your username or email"
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
                placeholder="Enter your password"
                required
              />
            </div>

            <button className="btn btn-primary w-100 mb-3" type="submit">
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Sign In
            </button>

            <div className="text-center">
              <p
                className="text-muted-light mb-0"
                style={{ fontSize: "0.9rem" }}
              >
                Don't have an account?{" "}
                <a
                  href="/register"
                  style={{
                    color: "#0ea5e9",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  Create Account
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
