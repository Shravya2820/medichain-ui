import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Patient sees pending requests (reads from localStorage).
 * Clicking Confirm & Pay navigates to /pay and sends the request object in state.
 */

export default function PatientRequests() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("paymentRequests") || "[]");
    // show only pending or failed (not paid)
    const pending = stored.filter((r) => r.status === "Pending");
    setRequests(pending);
  }, []);

  const handleConfirmAndPay = (req) => {
    // navigate to payment page with request as state
    navigate("/pay", { state: req });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 720 }}>
      <h2 className="fw-bold mb-4 text-center">My Payment Requests</h2>

      {requests.length === 0 ? (
        <div className="text-center text-muted">No pending requests.</div>
      ) : (
        requests.map((r) => (
          <div
            key={r.id}
            className="card mb-3 p-3 shadow-sm d-flex flex-row justify-content-between align-items-center"
          >
            <div>
              <div className="fw-semibold">{r.service}</div>
              <div className="text-muted small">From: {r.patient}</div>
              <div className="mt-1">Amount: ₹{r.amount}</div>
            </div>

            <div>
              <button
                className="btn btn-primary"
                onClick={() => handleConfirmAndPay(r)}
              >
                Confirm & Pay 💳
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
