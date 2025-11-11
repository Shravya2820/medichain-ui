import { useState } from "react";
import Login from "./pages/Login";
import PatientPay from "./pages/PatientPay";
import AdminRefund from "./pages/AdminRefund";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [role, setRole] = useState(null);

  if (!role) return <Login onLogin={setRole} />;

  if (role === "patient") return <PatientPay />;
  if (role === "admin")
    return (
      <>
        <AdminDashboard />
        <AdminRefund />
      </>
    );

  return null;
}

export default App;
