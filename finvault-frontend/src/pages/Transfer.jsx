import React, { useState } from "react";
import api from "../api/api";

export default function Transfer() {
  const [toAcc, setToAcc] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setErr("");
    try {
      await api.post("/account/transfer", {
        toAccountNumber: toAcc,
        amount,
        note,
      });
      setMsg("Transfer successful");
      setToAcc("");
      setAmount("");
      setNote("");
    } catch (error) {
      setErr(error.response?.data?.error || "Error");
    }
  };

  return (
    <div className="col-md-6 mx-auto mt-4">
      <div className="glass">
        <div className="d-flex align-items-center gap-3 mb-4">
          <div
            style={{
              width: "48px",
              height: "48px",
              background: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
            }}
          >
            <i className="bi bi-arrow-left-right"></i>
          </div>
          <div>
            <h3 className="mb-0">Transfer Money</h3>
            <p className="text-muted-light mb-0" style={{ fontSize: "0.9rem" }}>
              Send money to another account
            </p>
          </div>
        </div>

        {msg && (
          <div className="alert alert-success d-flex align-items-center gap-2">
            <i className="bi bi-check-circle"></i>
            <span>{msg}</span>
          </div>
        )}
        {err && (
          <div className="alert alert-danger d-flex align-items-center gap-2">
            <i className="bi bi-exclamation-circle"></i>
            <span>{err}</span>
          </div>
        )}

        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">
              <i className="bi bi-person me-2"></i>
              To Account Number
            </label>
            <input
              className="form-control"
              value={toAcc}
              onChange={(e) => setToAcc(e.target.value)}
              placeholder="Enter recipient account number"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              <i className="bi bi-currency-dollar me-2"></i>
              Amount
            </label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">
              <i className="bi bi-pencil me-2"></i>
              Note (Optional)
            </label>
            <input
              className="form-control"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a description"
            />
          </div>

          <button className="btn btn-primary w-100" type="submit">
            <i className="bi bi-arrow-left-right me-2"></i>
            Send Money
          </button>
        </form>
      </div>
    </div>
  );
}
