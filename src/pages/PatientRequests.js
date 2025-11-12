import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FEE_RULES = {
  Consultation: 0.029,
  Surgery: 0.035,
  Diagnostics: 0.02,
  Pharmacy: 0.015,
};

export default function PatientPay() {
  const location = useLocation();
  const navigate = useNavigate();
  const request = location.state || null; // ✅ Receiving selected request

  // ✅ Load Razorpay JS Script Once
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  if (!request) {
    return (
      <div className="container mt-5 text-center">
        <h3>No payment request selected.</h3>
        <a href="/patient-requests" className="btn btn-primary mt-3">
          Go Back
        </a>
      </div>
    );
  }

  const feeRate = FEE_RULES[request.service] || 0;
  const feeAmount = request.amount * feeRate;
  const totalAmount = request.amount + feeAmount;

  const handlePayment = () => {
    if (!window.Razorpay) {
      alert("Payment system is loading. Please wait 2 seconds and try again.");
      return;
    }

    const options = {
      key: "rzp_test_ReYhanjVOtg6dn",
      amount: Math.round(totalAmount * 100),
      currency: "INR",
      name: "MediChainPay",
      description: request.service,
      prefill: { name: request.patient },
      theme: { color: "#2563eb" },

      handler: function (response) {
        // ✅ Remove from pending list
        let pendingList = JSON.parse(localStorage.getItem("paymentRequests") || "[]");
        pendingList = pendingList.filter((r) => r.id !== request.id);
        localStorage.setItem("paymentRequests", JSON.stringify(pendingList));

        // ✅ Add to Paid list
        const paidRecord = {
          ...request,
          status: "Paid",
          paidAt: new Date().toISOString(),
          paymentId: response.razorpay_payment_id,
          totalAmount,
          feeAmount,
        };

        let paidList = JSON.parse(localStorage.getItem("paidPayments") || "[]");
        paidList.unshift(paidRecord);
        localStorage.setItem("paidPayments", JSON.stringify(paidList));

        alert(`✅ Payment Successful!
Payment ID: ${response.razorpay_payment_id}
Amount Paid: ₹${totalAmount.toFixed(2)}`);

        navigate("/patient-requests");
      },
    };

    new window.Razorpay(options).open();
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 500 }}>
      <h2 className="fw-bold mb-4 text-center">Confirm Payment</h2>

      <div className="card shadow-sm p-4">
        <p><strong>Patient:</strong> {request.patient}</p>
        <p><strong>Service:</strong> {request.service}</p>
        <p><strong>Base Amount:</strong> ₹{request.amount}</p>
        <p><strong>Processing Fee:</strong> ₹{feeAmount.toFixed(2)}</p>

        <hr />
        <h4>Total Payable: ₹{totalAmount.toFixed(2)}</h4>

        <button className="btn btn-primary w-100 mt-3" onClick={handlePayment}>
          Pay Now 💳
        </button>
      </div>
    </div>
  );
}
