import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";
import "../styles/Login.css";

function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await apiClient.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Account created!");
      navigate("/login");

    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Signup failed";
      alert(errorMsg);
    }
  };

  return (
    <div className="auth-container">

      <form className="auth-box" onSubmit={handleSignup}>

        <h2>Sign Up</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button type="submit">Sign Up</button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </form>

    </div>
  );
}

export default Signup;
