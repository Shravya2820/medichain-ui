import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function PatientPay() {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [amount, setAmount] = useState("");

  // Load Razorpay only once
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  function makePayment() {
    if (!window.Razorpay) {
      alert("⏳ Razorpay is loading... Please try again.");
      return;
    }

    if (!name || !service || !amount) {
      alert("⚠️ Please fill all fields.");
      return;
    }

    var options = {
      key: "rzp_test_4aK7LO9bBkpeQ7", // Test Key
      amount: Number(amount) * 100,
      currency: "INR",
      name: "MediChainPay",
      description: service,
      handler: function (response) {
        alert("✅ Payment Successful!\nPayment ID: " + response.razorpay_payment_id);
      },
      prefill: { name },
      theme: { color: "#2563eb" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <>
      <Navbar />

      <div className="d-flex justify-content-center" style={{ marginTop: "60px" }}>
        <div className="card" style={{ width: "420px", padding: "25px", borderRadius: "12px", boxShadow: "0 4px 14px rgba(0,0,0,0.1)" }}>
          <h2 className="fw-bold mb-4 text-center">Patient Payment</h2>

          <input
            className="form-control mb-3"
            placeholder="Patient Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="form-control mb-3"
            placeholder="Service (e.g., Consultation)"
            value={service}
            onChange={(e) => setService(e.target.value)}
          />

          <input
            type="number"
            className="form-control mb-3"
            placeholder="Amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button className="btn btn-primary w-100" onClick={makePayment}>
            Pay Now 💳
          </button>

          <div className="text-center mt-3">
            <a href="/admin" style={{ fontSize: "14px", textDecoration: "none" }}>
              Switch to Admin →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
