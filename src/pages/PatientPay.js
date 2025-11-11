import { useState, useEffect } from "react";

export default function PatientPay() {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [amount, setAmount] = useState("");

  // ✅ Load Razorpay Script Once
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  function makePayment() {

    if (!window.Razorpay) {
      alert("⏳ Loading payment system... Please try again in 2 seconds.");
      return;
    }

    var options = {
      key: "rzp_test_4aK7LO9bBkpeQ7", // ✅ Test key (allowed for hackathon)
      amount: Number(amount) * 100, // Razorpay requires amount in paise
      currency: "INR",
      name: "MediChainPay",
      description: service,
      handler: function (response) {
        alert("✅ Payment Successful!\n\nPayment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: name,
      },
      theme: {
        color: "#2563eb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 fw-bold">Patient Payment</h2>

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
        className="form-control mb-3"
        placeholder="Amount (₹)"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button className="btn btn-primary w-100" onClick={makePayment}>
        Pay Now 💳
      </button>
    </div>
  );
}
