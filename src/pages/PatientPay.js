import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FEE_RULES = {
  Consultation: 0.029,
  Surgery: 0.035,
  Diagnostics: 0.02,
  Pharmacy: 0.015,
};

export default function PatientPay() {
  const [request, setRequest] = useState(null);
  const navigate = useNavigate();

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Fetch first pending request
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("paymentRequests") || "[]");
    const pending = stored.find((r) => r.status === "Pending");

    if (!pending) {
      alert("No Pending Payment Request Found.");
      navigate("/admin");
      return;
    }

    setRequest(pending);
  }, [navigate]);

  if (!request) return null;

  const feeRate = FEE_RULES[request.service] || 0;
  const feeAmount = request.amount * feeRate;
  const total = request.amount + feeAmount;

  const handlePayment = () => {
    if (!window.Razorpay) {
      alert("Payment system still loading. Try again.");
      return;
    }

    const options = {
      key: "rzp_test_ReYhanjVOtg6dn",
      amount: Math.round(total * 100),
      currency: "INR",
      name: "MediChainPay",
      description: request.service,
      prefill: { name: request.patient },
      theme: { color: "#2563eb" },

      handler: function (res) {
        // REMOVE from pending list
        let pendingList = JSON.parse(localStorage.getItem("paymentRequests") || "[]");
        pendingList = pendingList.filter((r) => r.id !== request.id);
        localStorage.setItem("paymentRequests", JSON.stringify(pendingList));

        // ADD into paid list
        const paidRecord = {
          ...request,
          status: "Paid",
          paidAt: new Date().toISOString(),
          feeAmount,
          totalAmount: total,
          paymentId: res.razorpay_payment_id,
        };

        let paidList = JSON.parse(localStorage.getItem("paidPayments") || "[]");
        paidList.unshift(paidRecord);
        localStorage.setItem("paidPayments", JSON.stringify(paidList));

        alert(
          `✅ Payment Successful!\nPayment ID: ${res.razorpay_payment_id}\nTotal: ₹${total.toFixed(2)}`
        );

        navigate("/admin");
      },
    };

    new window.Razorpay(options).open();
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 500 }}>
      <h2 className="fw-bold mb-4">Confirm Your Payment</h2>
      <div className="card shadow-sm p-4">
        <p><strong>Patient:</strong> {request.patient}</p>
        <p><strong>Service:</strong> {request.service}</p>
        <p><strong>Amount:</strong> ₹{request.amount}</p>
        <p><strong>Fee:</strong> ₹{feeAmount.toFixed(2)}</p>
        <hr />
        <h4>Total: ₹{total.toFixed(2)}</h4>

        <button className="btn btn-primary w-100 mt-3" onClick={handlePayment}>
          Pay Now 💳
        </button>
      </div>
    </div>
  );
}