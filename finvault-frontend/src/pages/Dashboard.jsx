import React, { useEffect, useState } from "react";
import api from "../api/api";

import { formatCurrency } from "../utils/format";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [account, setAccount] = useState(null);
  const [tx, setTx] = useState([]);

  useEffect(() => {
    api
      .get("/account")
      .then((res) => setAccount(res.data))
      .catch(() => setAccount(null));
    api
      .get("/transactions")
      .then((res) => setTx(res.data))
      .catch(() => setTx([]));
  }, []);

  const timeline = React.useMemo(() => {
    if (!tx || tx.length === 0) return [];

    const sorted = [...tx].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    const points = [];
    let running = 0;
    sorted.forEach((t, i) => {
      const amt = Number(t.amount) || 0;
      if (t.txType === "DEPOSIT" || t.txType === "TRANSFER_IN") {
        running += amt;
      } else if (t.txType === "WITHDRAW" || t.txType === "TRANSFER_OUT") {
        running -= amt;
      } else {
        running += amt;
      }
      points.push({
        name: `T${i + 1}`,
        balance: Number(running.toFixed(2)),
      });
    });

    return points;
  }, [tx]);

  const chartData =
    timeline.length > 0
      ? timeline
      : account
      ? [{ name: "Now", balance: Number(account.balance || 0) }]
      : [];

  return (
    <div className="mt-4">
      <div className="mb-4">
        <h2 className="fw-bold mb-2">Dashboard</h2>
        <p className="text-muted-light">Overview of your financial activity</p>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="stat-card">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div style={{ flex: 1 }}>
                <p
                  className="text-muted-light mb-2"
                  style={{
                    fontSize: "0.875rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  <i className="bi bi-wallet2 me-2"></i>Current Balance
                </p>
                <h3 className="fw-bold mb-0" style={{ fontSize: "1.75rem" }}>
                  {formatCurrency(account?.balance ?? 0)}
                </h3>
              </div>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.25rem",
                  flexShrink: 0,
                }}
              >
                <i className="bi bi-wallet2"></i>
              </div>
            </div>
            <div
              className="d-flex align-items-center gap-2"
              style={{ minHeight: "28px" }}
            >
              <span className="badge badge-success">
                <i className="bi bi-arrow-up me-1"></i>Active
              </span>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="stat-card">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div style={{ flex: 1 }}>
                <p
                  className="text-muted-light mb-2"
                  style={{
                    fontSize: "0.875rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  <i className="bi bi-hash me-2"></i>Account Number
                </p>
                <h3 className="fw-bold mb-0" style={{ fontSize: "1.75rem" }}>
                  {account?.accountNumber ?? "—"}
                </h3>
              </div>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.25rem",
                  flexShrink: 0,
                }}
              >
                <i className="bi bi-hash"></i>
              </div>
            </div>
            <div
              className="d-flex align-items-center gap-2"
              style={{ minHeight: "28px" }}
            >
              <span
                className="text-muted-light"
                style={{ fontSize: "0.85rem" }}
              >
                Primary Account
              </span>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="stat-card">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div style={{ flex: 1 }}>
                <p
                  className="text-muted-light mb-2"
                  style={{
                    fontSize: "0.875rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  <i className="bi bi-receipt me-2"></i>Transactions
                </p>
                <h3 className="fw-bold mb-0" style={{ fontSize: "1.75rem" }}>
                  {tx.length}
                </h3>
              </div>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.25rem",
                  flexShrink: 0,
                }}
              >
                <i className="bi bi-receipt"></i>
              </div>
            </div>
            <div
              className="d-flex align-items-center gap-2"
              style={{ minHeight: "28px" }}
            >
              <span
                className="text-muted-light"
                style={{ fontSize: "0.85rem" }}
              >
                Total Records
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-7">
          <div className="glass p-4 h-100">
            <h5 className="mb-3 text-white">Transactional Activity</h5>

            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={chartData}>
                  <XAxis dataKey="name" stroke="#9fb5c8" />
                  <YAxis stroke="#9fb5c8" />
                  <Tooltip
                    contentStyle={{
                      background: "#0b2b45",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                    labelStyle={{ color: "#fff" }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="balance"
                    stroke="#00ffc3"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-md-5">
          <div className="glass p-4 h-100">
            <h5 className="mb-3 text-white">Recent Transactions</h5>

            <div
              className="list-group"
              style={{ maxHeight: 300, overflowY: "auto" }}
            >
              {tx.length === 0 && (
                <div className="text-white-50 p-3">No transactions yet</div>
              )}

              {tx.slice(0, 10).map((t) => {
                const isCredit =
                  t.txType === "DEPOSIT" || t.txType === "TRANSFER_IN";
                const amountClass = isCredit ? "text-success" : "text-danger";
                const sign = isCredit ? "+" : "-";
                return (
                  <div
                    key={t.id}
                    className="list-group-item bg-transparent text-white border-bottom d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <div className="fw-bold text-white">{t.txType}</div>
                      <div className="small text-white-50">{t.note || "—"}</div>
                    </div>
                    <div className={`fw-bold ${amountClass}`}>
                      {sign}
                      {formatCurrency(t.amount)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
