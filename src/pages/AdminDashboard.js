import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [paidTransactions, setPaidTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load pending list
    const reqList = JSON.parse(localStorage.getItem("paymentRequests") || "[]");
    setPendingRequests(reqList);

    // Load completed list
    const paidList = JSON.parse(localStorage.getItem("paidPayments") || "[]");
    setPaidTransactions(paidList);
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

      {/* ===== PENDING PAYMENT REQUESTS ===== */}
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
                  ₹{r.amount} • {new Date(r.createdAt).toLocaleString()}
                </div>
              </div>

              <button
                className="btn btn-sm btn-outline-success"
                onClick={() => {
                  localStorage.setItem("activePaymentRequest", JSON.stringify(r));
                  navigate("/pay");
                }}
              >
                Pay Page →
              </button>
            </div>
          ))
        )}
      </div>

      {/* ===== COMPLETED PAYMENTS SECTION ===== */}
      <div className="card p-4 shadow-sm">
        <h4 className="mb-3">✅ Completed Payments</h4>

        {paidTransactions.length === 0 ? (
          <p className="text-muted">No payments made yet.</p>
        ) : (
          paidTransactions.map((p) => (
            <div
              key={p.id}
              className="p-3 mb-2 border rounded"
              style={{ background: "#f8fff9" }}
            >
              <strong>{p.patient}</strong> paid for {p.service}
              <div className="text-muted small">
                Amount: ₹{p.totalAmount.toFixed(2)} (Fee: ₹{p.feeAmount.toFixed(2)}) <br />
                Payment ID: {p.paymentId} <br />
                Paid: {new Date(p.paidAt).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
