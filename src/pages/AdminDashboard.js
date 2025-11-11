import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [paidTransactions, setPaidTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const pending = JSON.parse(localStorage.getItem("paymentRequests") || "[]");
    const paid = JSON.parse(localStorage.getItem("paidPayments") || "[]");

    setPendingRequests(pending);
    setPaidTransactions(paid);
  }, []);

  return (
    <div className="container mt-5" style={{ maxWidth: 900 }}>
      <h2 className="fw-bold mb-4 text-center">Admin Dashboard</h2>

      {/* ===== ACTION BUTTONS ===== */}
      <div className="d-flex justify-content-center gap-3 mb-4">
        <button className="btn btn-primary" onClick={() => navigate("/admin-request")}>
          + Send Payment Request
        </button>

        <button className="btn btn-secondary" onClick={() => navigate("/refund")}>
          Refund Center
        </button>
      </div>

      {/* ===== PENDING REQUESTS ===== */}
      <div className="card p-4 shadow-sm mb-5">
        <h4 className="mb-3">⏳ Pending Payment Requests</h4>

        {pendingRequests.length === 0 ? (
          <p className="text-muted">No pending requests.</p>
        ) : (
          pendingRequests.map((r) => (
            <div
              key={r.id}
              className="d-flex justify-content-between align-items-center p-3 mb-2 border rounded"
            >
              <div>
                <strong>{r.patient}</strong> — {r.service}
                <div className="text-muted small">
                  Amount: ₹{r.amount} • {new Date(r.createdAt).toLocaleString()}
                </div>
              </div>

              {/* Open Patient Payment Page */}
              <button
                className="btn btn-sm btn-outline-success"
                onClick={() => navigate("/pay")}
              >
                Request Awaiting Payment →
              </button>
            </div>
          ))
        )}
      </div>

      {/* ===== PAID TRANSACTIONS ===== */}
      <div className="card p-4 shadow-sm">
        <h4 className="mb-3">✅ Completed Payments</h4>

        {paidTransactions.length === 0 ? (
          <p className="text-muted">No payments completed yet.</p>
        ) : (
          paidTransactions.map((r) => (
            <div
              key={r.id}
              className="p-3 mb-2 border rounded"
              style={{ background: "#f3fff4" }}
            >
              <div>
                <strong>{r.patient}</strong> paid for {r.service}
              </div>
              <div className="text-muted small">
                Base Amount: ₹{r.amount}
                {r.feeAmount && <> • Fee: ₹{r.feeAmount.toFixed(2)}</>}
                <br />
                <strong>Total Paid: ₹{r.totalAmount?.toFixed?.(2) ?? r.amount}</strong>
                <br />
                Payment ID: {r.paymentId || "N/A"}
                <br />
                Paid on: {new Date(r.paidAt).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
