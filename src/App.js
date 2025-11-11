import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PatientPay from "./pages/PatientPay";
import AdminDashboard from "./pages/AdminDashboard";
import RefundPage from "./pages/AdminRefund";
import AdminRequest from "./pages/AdminRequest";   // ✅ renamed
import PatientRequests from "./pages/PatientRequests"; // ✅ ensure this exists

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default Login Page */}
        <Route path="/" element={<Login />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Admin sends payment request */}
        <Route path="/admin-request" element={<AdminRequest />} />   {/* ✅ updated */}

        {/* Patient views and confirms requests */}
        <Route path="/patient-requests" element={<PatientRequests />} />  {/* ✅ */}

        {/* Patient Payment Page */}
        <Route path="/pay" element={<PatientPay />} />

        {/* Refund Page */}
        <Route path="/refund" element={<RefundPage />} />

      </Routes>
    </BrowserRouter>
  );
}
