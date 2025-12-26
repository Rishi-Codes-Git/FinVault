import React, { useEffect, useState } from "react";
import api from "../api/api";
import { formatCurrency, formatDate } from "../utils/format";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    api.get("/api/v1/transactions").then((res) => setTransactions(res.data));
  }, []);

  const getTypeConfig = (type) => {
    const configs = {
      DEPOSIT: {
        label: "DEPOSIT",
        color: "#10b981",
        bg: "rgba(16, 185, 129, 0.15)",
      },
      WITHDRAW: {
        label: "WITHDRAW",
        color: "#ef4444",
        bg: "rgba(239, 68, 68, 0.15)",
      },
      TRANSFER_IN: {
        label: "TRANSFER_IN",
        color: "#06b6d4",
        bg: "rgba(6, 182, 212, 0.15)",
      },
      TRANSFER_OUT: {
        label: "TRANSFER_OUT",
        color: "#f59e0b",
        bg: "rgba(245, 158, 11, 0.15)",
      },
    };
    return (
      configs[type] || {
        label: type,
        color: "#94a3b8",
        bg: "rgba(148, 163, 184, 0.15)",
      }
    );
  };

  const filteredTransactions =
    filter === "ALL"
      ? transactions
      : transactions.filter((t) => t.txType === filter);

  const isCredit = (type) => type === "DEPOSIT" || type === "TRANSFER_IN";

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="mb-4">
        <h2
          className="fw-bold"
          style={{ fontSize: "2rem", marginBottom: "0.5rem" }}
        >
          Transaction History
        </h2>
        <p className="text-muted-light" style={{ fontSize: "0.95rem" }}>
          <i className="bi bi-receipt me-2"></i>
          {transactions.length} total transaction
          {transactions.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="glass p-3 mb-4" style={{ borderRadius: "16px" }}>
        <div className="d-flex gap-2 flex-wrap">
          {["ALL", "DEPOSIT", "WITHDRAW", "TRANSFER_IN", "TRANSFER_OUT"].map(
            (type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`btn ${
                  filter === type ? "btn-primary" : "btn-outline-primary"
                }`}
                style={{
                  borderRadius: "10px",
                  padding: "0.6rem 1.2rem",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  transition: "all 0.3s ease",
                }}
              >
                {type === "ALL"
                  ? "All Transactions"
                  : getTypeConfig(type).label}
              </button>
            )
          )}
        </div>
      </div>

      {/* Transactions Table */}
      <div
        className="glass"
        style={{ borderRadius: "16px", overflow: "hidden" }}
      >
        {filteredTransactions.length === 0 ? (
          <div className="p-5 text-center">
            <div
              style={{
                width: "80px",
                height: "80px",
                background: "rgba(148, 163, 184, 0.1)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
                fontSize: "2.5rem",
                color: "#94a3b8",
              }}
            >
              <i className="bi bi-inbox"></i>
            </div>
            <h5 className="mb-2">No transactions found</h5>
            <p className="text-muted-light mb-0">
              {filter === "ALL"
                ? "Start making transactions to see them here"
                : `No ${getTypeConfig(
                    filter
                  ).label.toLowerCase()} transactions yet`}
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table
              className="table mb-0"
              style={{ borderCollapse: "collapse" }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <th
                    style={{
                      padding: "1.2rem 1.5rem",
                      border: "none",
                      color: "#f8fafc",
                      fontSize: "0.9rem",
                      fontWeight: "700",
                      textTransform: "capitalize",
                      background: "transparent",
                    }}
                  >
                    Type
                  </th>
                  <th
                    style={{
                      padding: "1.2rem 1.5rem",
                      border: "none",
                      color: "#f8fafc",
                      fontSize: "0.9rem",
                      fontWeight: "700",
                      textTransform: "capitalize",
                      background: "transparent",
                    }}
                  >
                    Amount
                  </th>
                  <th
                    style={{
                      padding: "1.2rem 1.5rem",
                      border: "none",
                      color: "#f8fafc",
                      fontSize: "0.9rem",
                      fontWeight: "700",
                      textTransform: "capitalize",
                      background: "transparent",
                    }}
                  >
                    Counterparty
                  </th>
                  <th
                    style={{
                      padding: "1.2rem 1.5rem",
                      border: "none",
                      color: "#f8fafc",
                      fontSize: "0.9rem",
                      fontWeight: "700",
                      textTransform: "capitalize",
                      background: "transparent",
                    }}
                  >
                    Date
                  </th>
                  <th
                    style={{
                      padding: "1.2rem 1.5rem",
                      border: "none",
                      color: "#f8fafc",
                      fontSize: "0.9rem",
                      fontWeight: "700",
                      textTransform: "capitalize",
                      background: "transparent",
                    }}
                  >
                    Note
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction, index) => {
                  const config = getTypeConfig(transaction.txType);
                  const credit = isCredit(transaction.txType);

                  return (
                    <tr
                      key={transaction.id}
                      style={{
                        borderBottom:
                          index === filteredTransactions.length - 1
                            ? "none"
                            : "1px solid rgba(255, 255, 255, 0.05)",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(255, 255, 255, 0.03)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <td
                        style={{
                          padding: "1.2rem 1.5rem",
                          border: "none",
                          background: "transparent",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            padding: "0.5rem 1rem",
                            borderRadius: "8px",
                            background: config.bg,
                            color: config.color,
                            fontSize: "0.85rem",
                            fontWeight: "600",
                            textTransform: "uppercase",
                            letterSpacing: "0.03em",
                          }}
                        >
                          {config.label}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "1.2rem 1.5rem",
                          border: "none",
                          background: "transparent",
                          verticalAlign: "middle",
                          fontSize: "1rem",
                          fontWeight: "700",
                          color: credit ? "#10b981" : "#ef4444",
                        }}
                      >
                        {credit ? "+ " : "- "}
                        {formatCurrency(transaction.amount)}
                      </td>
                      <td
                        style={{
                          padding: "1.2rem 1.5rem",
                          border: "none",
                          background: "transparent",
                          verticalAlign: "middle",
                          color: "#cbd5e1",
                          fontSize: "0.95rem",
                        }}
                      >
                        {transaction.counterpartyAccountNumber || "—"}
                      </td>
                      <td
                        style={{
                          padding: "1.2rem 1.5rem",
                          border: "none",
                          background: "transparent",
                          verticalAlign: "middle",
                          color: "#cbd5e1",
                          fontSize: "0.95rem",
                        }}
                      >
                        {formatDate(transaction.createdAt)}
                      </td>
                      <td
                        style={{
                          padding: "1.2rem 1.5rem",
                          border: "none",
                          background: "transparent",
                          verticalAlign: "middle",
                          color: "#cbd5e1",
                          fontSize: "0.95rem",
                        }}
                      >
                        {transaction.note || "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
