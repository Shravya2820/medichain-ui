import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function AdminDashboard() {
  const [filter, setFilter] = useState("All");
  const [transactions, setTransactions] = useState([]);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    // Mock data for demo
    setTransactions([
      { id: 1, name: "John Doe", type: "Payment", amount: 200, status: "Paid" },
      { id: 2, name: "Jane Smith", type: "Refund", amount: 50, status: "Refunded" },
      { id: 3, name: "Alice Brown", type: "Payment", amount: 400, status: "Pending" },
    ]);
  }, []);

  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter((t) => t.status === filter);

  const chartData = {
    labels: ["Paid", "Refunded", "Pending"],
    datasets: [
      {
        label: "Transaction Count",
        data: [
          transactions.filter((t) => t.status === "Paid").length,
          transactions.filter((t) => t.status === "Refunded").length,
          transactions.filter((t) => t.status === "Pending").length,
        ],
        backgroundColor: ["#22c55e", "#3b82f6", "#eab308"],
      },
    ],
  };

  return (
    <div className="container mt-4">
      {/* Navbar with Status Tabs */}
      <nav className="navbar navbar-light bg-white shadow-sm mb-4 rounded p-3 justify-content-center">
        <div className="btn-group" role="group">
          <button
            className={`btn ${filter === "All" ? "btn-dark" : "btn-outline-dark"}`}
            onClick={() => setFilter("All")}
          >
            All
          </button>
          <button
            className={`btn ${filter === "Paid" ? "btn-success" : "btn-outline-success"}`}
            onClick={() => setFilter("Paid")}
          >
            Paid
          </button>
          <button
            className={`btn ${filter === "Refunded" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setFilter("Refunded")}
          >
            Refunded
          </button>
          <button
            className={`btn ${filter === "Pending" ? "btn-warning" : "btn-outline-warning"}`}
            onClick={() => setFilter("Pending")}
          >
            Pending
          </button>
        </div>
      </nav>

      {/* Transactions Table */}
      <div className="card shadow-sm p-3 mb-4">
        <h5 className="fw-bold mb-3">{filter} Transactions</h5>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient Name</th>
              <th>Type</th>
              <th>Amount (₹)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.name}</td>
                <td>{t.type}</td>
                <td>{t.amount}</td>
                <td>{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Analytics Button */}
      <div className="text-center">
        <button
          className="btn btn-outline-primary"
          onClick={() => setShowChart(!showChart)}
        >
          {showChart ? "Hide Analytics" : "View Analytics"}
        </button>
      </div>

      {/* Chart (Visible only when toggled) */}
      {showChart && (
        <div className="card shadow-sm p-3 mt-4">
          <h5 className="fw-bold mb-3">Transaction Analytics</h5>
          <Bar data={chartData} />
        </div>
      )}
    </div>
  );
}
