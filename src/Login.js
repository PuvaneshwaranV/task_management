import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SimpleButton from "./Simplebutton";
import "./Login.css";

function Login({ onLogin, teamMembers }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[a-z0-9]+@gmail\.com$/i;
    const passwordRegex = /^[1][2][3][4][5][6][7][8]$/;

    if (!emailRegex.test(email)) {
      setError("Invalid email format. Please use a Gmail account.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError("Invalid password format. Password must be exactly 8 digits (1-8).");
      return;
    }

    if (email === "admin@gmail.com" && password === "12345678") {
      setError("");
      onLogin(email);
    }

    const member = teamMembers.find(member => member.email === email && member.password === password);
    if (!member) {
      setError("Invalid email or password.");
      return;
    }

    setError("");
    onLogin(email);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <SimpleButton type="submit" label="Sign In" />
        </form>
        <div className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
