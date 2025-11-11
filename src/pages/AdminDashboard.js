import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [payments, setPayments] = useState([]);

  // 🔥 TEMP MOCK DATA — Will replace with backend API later
  useEffect(() => {
    setPayments([
      { id: "PAY001", patient: "Riya Sharma", service: "Consultation", amount: 300, status: "Paid", txHash: "0xabc123..." },
      { id: "PAY002", patient: "Arjun Mehta", service: "X-Ray", amount: 600, status: "Refunded", txHash: "0xdef456..." }
    ]);
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-4">Admin Dashboard</h2>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Payment ID</th>
            <th>Patient</th>
            <th>Service</th>
            <th>Amount (₹)</th>
            <th>Status</th>
            <th>Blockchain Tx</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.patient}</td>
              <td>{p.service}</td>
              <td>{p.amount}</td>
              <td>{p.status}</td>
              <td>
                <a
                  href={`https://sepolia.etherscan.io/tx/${p.txHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary"
                >
                  View Tx ↗
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <a href="/refund" className="btn btn-primary w-100 mt-3">
        Process Refunds ↩
      </a>
    </div>
  );
}
