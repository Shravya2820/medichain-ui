import { useState } from "react";

export default function AdminRefund() {
  const [search, setSearch] = useState("");
  const [selectedTab, setSelectedTab] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
  const [refundAmount, setRefundAmount] = useState("");

  // Mock data — replace with backend API later
  const [transactions, setTransactions] = useState([
    { id: "TXN1001", name: "John Doe", service: "Consultation", amount: 250, status: "Paid" },
    { id: "TXN1002", name: "Jane Smith", service: "Diagnostics", amount: 400, status: "Refunded" },
    { id: "TXN1003", name: "Alice Brown", service: "Surgery", amount: 1000, status: "Paid" },
    { id: "TXN1004", name: "Bob Wilson", service: "Pharmacy", amount: 120, status: "Pending" },
  ]);

  const filteredTx = transactions.filter((tx) => {
    const matchesSearch =
      tx.name.toLowerCase().includes(search.toLowerCase()) ||
      tx.id.toLowerCase().includes(search.toLowerCase());
    const matchesTab =
      selectedTab === "All" ? true : tx.status === selectedTab;
    return matchesSearch && matchesTab;
  });

  const handleRefundClick = (tx) => {
    setSelectedTx(tx);
    setRefundAmount(""); // reset field
    setShowModal(true);
  };

  const confirmRefund = () => {
    if (!selectedTx) return;

    const amountToRefund = parseFloat(refundAmount);
    if (isNaN(amountToRefund) || amountToRefund <= 0 || amountToRefund > selectedTx.amount) {
      alert("⚠️ Please enter a valid refund amount.");
      return;
    }

    let newStatus = "Refunded";
    if (amountToRefund < selectedTx.amount) newStatus = "Partially Refunded";

    const updated = transactions.map((tx) =>
      tx.id === selectedTx.id
        ? { ...tx, status: newStatus, refundedAmount: amountToRefund }
        : tx
    );
    setTransactions(updated);
    setShowModal(false);
    alert(`✅ ${newStatus} processed for ${selectedTx.name} — ₹${amountToRefund}`);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "900px" }}>
      <h2 className="fw-bold mb-4 text-primary text-center">
        Admin Refund Portal
      </h2>

      {/* Search Bar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <input
          type="text"
          className="form-control me-3"
          placeholder="🔍 Search by Patient or Transaction ID"
          style={{ maxWidth: "350px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        {["All", "Paid", "Partially Refunded", "Refunded", "Pending"].map((tab) => (
          <li className="nav-item" key={tab}>
            <button
              className={`nav-link ${selectedTab === tab ? "active fw-bold" : ""}`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>

      {/* Transactions Table */}
      <table className="table table-hover align-middle shadow-sm">
        <thead className="table-light">
          <tr>
            <th>Txn ID</th>
            <th>Patient</th>
            <th>Service</th>
            <th>Amount (₹)</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTx.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center text-muted py-4">
                No transactions found.
              </td>
            </tr>
          ) : (
            filteredTx.map((tx) => (
              <tr key={tx.id}>
                <td>{tx.id}</td>
                <td>{tx.name}</td>
                <td>{tx.service}</td>
                <td>{tx.amount}</td>
                <td>
                  <span
                    className={`badge ${
                      tx.status === "Paid"
                        ? "bg-success"
                        : tx.status === "Refunded"
                        ? "bg-info"
                        : tx.status === "Partially Refunded"
                        ? "bg-warning text-dark"
                        : "bg-secondary"
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
                <td>
                  {tx.status === "Paid" && (
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleRefundClick(tx)}
                    >
                      Refund
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Refund Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">Process Refund</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Enter refund amount for <strong>{selectedTx?.name}</strong> (
                  Total: ₹{selectedTx?.amount})
                </p>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter partial or full refund amount"
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={confirmRefund}>
                  Confirm Refund
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
