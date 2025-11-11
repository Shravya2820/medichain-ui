import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PatientPay from "./pages/PatientPay";
import AdminDashboard from "./pages/AdminDashboard";
import RefundPage from "./pages/AdminRefund";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default Login Page */}
        <Route path="/" element={<Login />} />

        {/* Patient Payment Page */}
        <Route path="/pay" element={<PatientPay />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Refund Page */}
        <Route path="/refund" element={<RefundPage />} />

      </Routes>
    </BrowserRouter>
  );
}
