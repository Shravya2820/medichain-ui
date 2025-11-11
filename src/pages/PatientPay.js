import { useState, useEffect } from "react";

export default function PatientPay() {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);

  // Load Razorpay Script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const serviceFees = {
    Consultation: 2.9,
    Surgery: 3.5,
    Diagnostics: 2.0,
    Pharmacy: 1.5,
  };

  const handlePayment = () => {
    if (!window.Razorpay) {
      alert("⏳ Razorpay loading... Try again shortly!");
      return;
    }

    const feePercent = serviceFees[service] || 2.9;
    const totalAmount = Number(amount) + (Number(amount) * feePercent) / 100;

    const options = {
      key: "rzp_test_4aK7LO9bBkpeQ7",
      amount: totalAmount * 100,
      currency: "INR",
      name: "MediChainPay",
      description: service,
      handler: function (response) {
        alert(`✅ Payment Successful!\nID: ${response.razorpay_payment_id}`);

        const newTransaction = {
          id: response.razorpay_payment_id,
          name,
          service,
          amount: totalAmount.toFixed(2),
          status: "Paid",
          date: new Date().toLocaleString(),
        };

        setTransactions([newTransaction, ...transactions]);
      },
      prefill: { name },
      theme: { color: "#2563eb" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card p-4 shadow-lg border-0 rounded-4">
        <h2 className="fw-bold text-center mb-4 text-primary">Patient Payment</h2>

        <input
          className="form-control mb-3"
          placeholder="Patient Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="form-select mb-3"
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <option value="">Select Service</option>
          <option value="Consultation">Consultation</option>
          <option value="Surgery">Surgery</option>
          <option value="Diagnostics">Diagnostics</option>
          <option value="Pharmacy">Pharmacy</option>
        </select>

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {service && amount && (
          <div className="alert alert-info p-2">
            <strong>Fee:</strong> {serviceFees[service]}% |{" "}
            <strong>Total:</strong> ₹
            {(Number(amount) + (Number(amount) * serviceFees[service]) / 100).toFixed(2)}
          </div>
        )}

        <button className="btn btn-primary w-100 mt-2" onClick={handlePayment}>
          Pay Now 💳
        </button>
      </div>

      {/* Transaction History Section */}
      <div className="mt-5">
        <h4 className="fw-bold text-secondary">Recent Transactions</h4>
        {transactions.length === 0 ? (
          <p className="text-muted mt-3">No transactions yet.</p>
        ) : (
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Service</th>
                <th>Amount (₹)</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{tx.id}</td>
                  <td>{tx.service}</td>
                  <td>{tx.amount}</td>
                  <td>
                    <span className="badge bg-success">{tx.status}</span>
                  </td>
                  <td>{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

