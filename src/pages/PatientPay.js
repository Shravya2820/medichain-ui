import { useState } from "react";

export default function PatientPay() {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [amount, setAmount] = useState("");

  function handlePay() {
    alert("Payment popup will open here (Razorpay coming next)");
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Patient Payment</h2>

      <input
        className="form-control mb-3"
        placeholder="Patient Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        className="form-control mb-3"
        placeholder="Service (e.g., Consultation)"
        value={service}
        onChange={e => setService(e.target.value)}
      />

      <input
        className="form-control mb-3"
        placeholder="Amount (₹)"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />

      <button className="btn btn-primary" onClick={handlePay}>
        Pay Now
      </button>
    </div>
  );
}
