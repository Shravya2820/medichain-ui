import { useState } from "react";
import Navbar from "../components/Navbar";

export default function AdminRefund() {
  const [paymentId, setPaymentId] = useState("");
  const [refundAmount, setRefundAmount] = useState("");
  const [reason, setReason] = useState("");

  const handleRefund = () => {
    if (!paymentId || !refundAmount || !reason) {
      alert("⚠️ Please fill all fields.");
      return;
    }

    // ✅ Placeholder for backend + blockchain call
    alert(
      `✅ Refund Request Sent!\n\nPayment ID: ${paymentId}\nRefund Amount: ₹${refundAmount}\nReason: ${reason}`
    );

    // Here later:
    // fetch("/api/refund", { method: "POST", body: JSON.stringify({...}) })
  };

  return (
    <>
      <Navbar />

      <div className="d-flex justify-content-center" style={{ marginTop: "60px" }}>
        <div
          className="card"
          style={{
            width: "450px",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
          }}
        >
          <h2 className="fw-bold mb-4 text-center">Admin Refund Panel</h2>

          <input
            className="form-control mb-3"
            placeholder="Enter Payment ID"
            value={paymentId}
            onChange={(e) => setPaymentId(e.target.value)}
          />

          <input
            className="form-control mb-3"
            placeholder="Refund Amount (₹)"
            type="number"
            value={refundAmount}
            onChange={(e) => setRefundAmount(e.target.value)}
          />

          <textarea
            className="form-control mb-3"
            placeholder="Reason for Refund"
            rows="3"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          ></textarea>

          <button className="btn btn-danger w-100" onClick={handleRefund}>
            Issue Refund 🔁
          </button>

          <div className="text-center mt-3">
            <a href="/dashboard" style={{ fontSize: "14px", textDecoration: "none" }}>
              View Analytics →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
