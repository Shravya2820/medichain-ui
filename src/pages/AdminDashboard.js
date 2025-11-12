import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function AdminDashboard() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [paidPayments, setPaidPayments] = useState([]);
  const [chainInfo, setChainInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const requests = JSON.parse(localStorage.getItem("paymentRequests") || "[]");
    const paid = JSON.parse(localStorage.getItem("paidPayments") || "[]");

    setPendingRequests(requests.filter((r) => r.status === "Pending"));
    setPaidPayments(paid);
  }, []);

  // 🔹 Fetch blockchain info from backend
  useEffect(() => {
    fetch("http://127.0.0.1:5000/")
      .then((res) => res.json())
      .then((data) => setChainInfo(data))
      .catch((err) => console.error("Blockchain info fetch error:", err));
  }, []);

  // KPI calculations
  const totalRevenue = paidPayments.reduce((sum, p) => sum + p.totalAmount, 0);
  const totalFee = paidPayments.reduce((sum, p) => sum + p.feeAmount, 0);
  const totalPayments = paidPayments.length;

  // Charts
  const serviceCounts = paidPayments.reduce((acc, p) => {
    acc[p.service] = (acc[p.service] || 0) + 1;
    return acc;
  }, {});
  const barColors = ["#4f46e5", "#0ea5e9", "#22c55e", "#f59e0b", "#ef4444", "#a855f7"];

  const barData = {
    labels: Object.keys(serviceCounts),
    datasets: [
      {
        label: "Payments Count",
        data: Object.values(serviceCounts),
        backgroundColor: Object.keys(serviceCounts).map(
          (_, index) => barColors[index % barColors.length]
        ),
      },
    ],
  };

  const serviceRevenue = paidPayments.reduce((acc, p) => {
    acc[p.service] = (acc[p.service] || 0) + p.totalAmount;
    return acc;
  }, {});
  const pieData = {
    labels: Object.keys(serviceRevenue),
    datasets: [
      {
        data: Object.values(serviceRevenue),
        backgroundColor: barColors,
      },
    ],
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 1100 }}>
      <h2 className="fw-bold text-center mb-4">Admin Dashboard</h2>

      {/* Buttons */}
      <div className="d-flex justify-content-center gap-3 mb-4">
        <button className="btn btn-primary" onClick={() => navigate("/admin-request")}>
          + Send Payment Request
        </button>
        <button className="btn btn-secondary" onClick={() => navigate("/refund")}>
          Refund Center
        </button>
      </div>

      {/* Blockchain Analytics */}
      <div className="card shadow-sm p-4 mb-4 border-success">
        <h4 className="text-center text-success mb-3">🔗 Blockchain Analytics</h4>
        {chainInfo ? (
          <div className="text-center">
            <p><strong>Status:</strong> {chainInfo.blockchain_status}</p>
            <p><strong>Latest Block:</strong> {chainInfo.latest_block}</p>
            <p><strong>Contract Address:</strong> {chainInfo.contract_address}</p>
            <p className="text-muted small">Last Updated: {new Date(chainInfo.server_time_utc).toLocaleString()}</p>
          </div>
        ) : (
          <p className="text-center text-muted">Fetching blockchain data...</p>
        )}
      </div>

      {/* KPIs */}
      <div className="row text-center mb-4">
        <div className="col card shadow-sm p-3 mx-2">
          <h5>Total Revenue</h5>
          <h3 className="text-success">₹{totalRevenue.toFixed(2)}</h3>
        </div>
        <div className="col card shadow-sm p-3 mx-2">
          <h5>Total Payments</h5>
          <h3 className="text-primary">{totalPayments}</h3>
        </div>
        <div className="col card shadow-sm p-3 mx-2">
          <h5>Processing Fee Earned</h5>
          <h3 className="text-warning">₹{totalFee.toFixed(2)}</h3>
        </div>
      </div>

      {/* Charts */}
      <div className="card shadow-sm p-4 mb-4">
        <h4 className="text-center mb-4">📊 Analytics Overview</h4>
        <div className="row">
          <div className="col-md-6">
            <h6 className="text-center">Payments per Service</h6>
            <Bar data={barData} />
          </div>
          <div className="col-md-6">
            <h6 className="text-center">Revenue Distribution</h6>
            <Pie data={pieData} />
          </div>
        </div>
      </div>

      {/* Completed Payments */}
      <div className="card p-4 shadow-sm">
        <h4 className="mb-3">✅ Completed Payments</h4>
        {paidPayments.length === 0 ? (
          <p className="text-muted">No payments made yet.</p>
        ) : (
          paidPayments.map((p) => (
            <div key={p.id} className="p-2 border rounded mb-2 bg-light">
              <strong>{p.patient}</strong> paid for {p.service}
              <div className="text-muted small">
                Amount: ₹{p.totalAmount.toFixed(2)} (Fee: ₹{p.feeAmount.toFixed(2)})<br />
                Payment ID: {p.paymentId}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
