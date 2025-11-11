import { useState } from "react";

export default function RefundPage() {
  const [paymentId, setPaymentId] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  const handleRefund = () => {
    if (!paymentId || !amount) {
      alert("Please fill required fields.");
      return;
    }

    // 🔥 TEMP MOCK SUCCESS (This will call backend later)
    alert(`✅ Refund Request Submitted\n\nPayment ID: ${paymentId}\nAmount: ₹${amount}\nReason: ${reason}`);

    // Clear form
    setPaymentId("");
    setAmount("");
    setReason("");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="fw-bold mb-4">Process Refund</h2>

      <input
        className="form-control mb-3"
        placeholder="Payment ID"
        value={paymentId}
        onChange={(e) => setPaymentId(e.target.value)}
      />

      <input
        className="form-control mb-3"
        placeholder="Refund Amount (₹)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <textarea
        className="form-control mb-3"
        placeholder="Reason (optional)"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />

      <button className="btn btn-danger w-100" onClick={handleRefund}>
        Issue Refund ↩
      </button>

      <a href="/admin" className="btn btn-secondary w-100 mt-3">
        Back to Dashboard
      </a>
    </div>
  );
}
