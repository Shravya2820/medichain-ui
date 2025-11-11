import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Admin page: choose patient, pick service from dropdown (defaults amount),
 * optionally edit amount, and send request (saved to localStorage).
 */

const SERVICE_DEFAULTS = {
  Consultation: 500,
  Surgery: 25000,
  Diagnostics: 1200,
  Pharmacy: 300,
};

export default function PaymentRequest() {
  const [patientName, setPatientName] = useState("");
  const [service, setService] = useState("Consultation");
  const [amount, setAmount] = useState(SERVICE_DEFAULTS["Consultation"]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // update amount when service changes (admin can still edit)
    setAmount(SERVICE_DEFAULTS[service] ?? 0);
  }, [service]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("paymentRequests") || "[]");
    setPendingRequests(stored);
  }, []);

  const sendRequest = () => {
    if (!patientName.trim() || !service || !amount) {
      alert("Please fill patient name, service and amount.");
      return;
    }

    const newReq = {
      id: Date.now(),
      patient: patientName.trim(),
      service,
      amount: Number(amount),
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    const updated = [newReq, ...pendingRequests];
    setPendingRequests(updated);
    localStorage.setItem("paymentRequests", JSON.stringify(updated));

    setPatientName("");
    setService("Consultation");
    setAmount(SERVICE_DEFAULTS["Consultation"]);

    alert(`Payment request sent to ${newReq.patient}`);
  };

  const removeRequest = (id) => {
    if (!window.confirm("Delete this pending request?")) return;
    const updated = pendingRequests.filter((r) => r.id !== id);
    setPendingRequests(updated);
    localStorage.setItem("paymentRequests", JSON.stringify(updated));
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 720 }}>
      <h2 className="fw-bold mb-4">Admin — Send Payment Request</h2>

      <div className="card p-4 shadow-sm mb-4">
        <label className="form-label">Patient Name</label>
        <input
          className="form-control mb-3"
          placeholder="e.g., John Doe"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />

        <label className="form-label">Service</label>
        <select
          className="form-select mb-3"
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          {Object.keys(SERVICE_DEFAULTS).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <label className="form-label">Amount (₹)</label>
        <input
          className="form-control mb-3"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button className="btn btn-primary w-100" onClick={sendRequest}>
          Send Payment Request 📤
        </button>
      </div>

      <h5 className="mb-3">Pending Requests</h5>
      {pendingRequests.length === 0 ? (
        <p className="text-muted">No pending requests yet.</p>
      ) : (
        pendingRequests.map((r) => (
          <div
            key={r.id}
            className="d-flex align-items-center justify-content-between mb-2 p-3 shadow-sm rounded"
            style={{ background: "#fff" }}
          >
            <div>
              <div className="fw-semibold">{r.patient}</div>
              <div className="text-muted small">
                {r.service} • ₹{r.amount} • {new Date(r.createdAt).toLocaleString()}
              </div>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-sm btn-outline-success"
                onClick={() => navigate("/patient-requests")}
                title="Open Patient Requests"
              >
                View for Patient
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => removeRequest(r.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
