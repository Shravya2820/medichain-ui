import { useState } from "react";
import Login from "./pages/Login";
import PatientPay from "./pages/PatientPay";

function App() {
  const [role, setRole] = useState(null);

  if (!role) return <Login onLogin={setRole} />;

  if (role === "patient") return <PatientPay />;
  if (role === "admin") return <div className="container mt-5"><h2>Admin Portal Coming...</h2></div>;
}

export default App;
