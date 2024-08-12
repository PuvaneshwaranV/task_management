import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SimpleButton from "./Simplebutton";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can implement your password reset logic here.
    // For now, we'll just display a message and navigate to the login page.
    setMessage("If this email is registered, you will receive a password reset link.");
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Forgot Password</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <SimpleButton type="submit" label="Reset Password" />
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
