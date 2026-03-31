import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import apiClient from "../services/apiClient";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      
      if (res.data.isNewProfile) {
        navigate("/profile?tab=preferences");
      } else {
        navigate("/home");
      }

    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Invalid login";
      alert(errorMsg);
    }
  };

  return (
    <div className="auth-container" style={{ flexDirection: 'column' }}>
      <h1 style={{ 
        fontFamily: "'DM Sans', sans-serif", 
        fontSize: '3.5rem', 
        color: '#ff7b72', 
        marginBottom: '1.5rem', 
        zIndex: 1,
        letterSpacing: '0.05em'
      }}>
        RoomRoster
      </h1>
      <form className="auth-box" onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div style={{ position: 'relative', width: '100%', marginBottom: '1rem' }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', marginBottom: 0 }}
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              color: '#888',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        </div>

        <button type="submit" style={{ marginTop: '0.5rem' }}>Login</button>

        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
