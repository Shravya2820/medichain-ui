import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Destroy any existing chart instance before creating a new one
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const newChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Paid", "Refunded", "Pending"],
        datasets: [
          {
            label: "Transactions",
            data: [12, 5, 3],
            backgroundColor: ["#22c55e", "#3b82f6", "#facc15"],
            borderRadius: 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: "Transaction Overview",
            color: "#2563eb",
            font: { size: 18, weight: "bold" },
          },
        },
      },
    });

    chartInstanceRef.current = newChart;

    // Cleanup when the component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="container mt-5 text-center">
      <h2 className="fw-bold text-primary mb-4">Admin Dashboard</h2>

      {/* Refund Page Redirect Button */}
      <button
        className="btn btn-outline-success mb-4 px-4"
        onClick={() => navigate("/refund")}
      >
        Go to Refund Page
      </button>

      {/* Chart Section */}
      <div
        className="card p-4 shadow-lg border-0 rounded-4 mx-auto"
        style={{ maxWidth: "700px", height: "400px" }}
      >
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}
