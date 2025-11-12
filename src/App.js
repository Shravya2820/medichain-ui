import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRequest from "./pages/AdminRequest"; // Admin sends payment request
import PatientRequests from "./pages/PatientRequests"; // Patient sees request list
import PatientPay from "./pages/PatientPay"; // Patient pays selected request
import RefundPage from "./pages/AdminRefund"; // Refund center

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Admin: Send Payment Request */}
        <Route path="/admin-request" element={<AdminRequest />} />

        {/* Patient: View pending requests */}
        <Route path="/patient-requests" element={<PatientRequests />} />

        {/* Patient: Confirm & Pay */}
        <Route path="/pay" element={<PatientPay />} />

        {/* Admin: Refund Center */}
        <Route path="/refund" element={<RefundPage />} />

      </Routes>
    </BrowserRouter>
  );
}
