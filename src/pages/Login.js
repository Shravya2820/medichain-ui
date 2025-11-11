import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("patient");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    // ✅ Store role locally so other pages can use it (temporary until backend login)
    localStorage.setItem("userRole", role);
    localStorage.setItem("userEmail", email);

    // ✅ Redirect based on role
    if (role === "patient") {
      navigate("/pay");
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}>
      
      <h1 className="mb-4 fw-bold text-primary">MediChainPay Login</h1>

      <input
        type="email"
        className="form-control mb-3 w-50"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <select
        className="form-select mb-3 w-50"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="patient">Patient</option>
        <option value="admin">Admin</option>
      </select>

      <button className="btn btn-primary w-50" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
