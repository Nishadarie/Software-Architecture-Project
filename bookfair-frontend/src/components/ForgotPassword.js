import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Login.css"; // make sure this is the dark green version

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser || savedUser.username !== username) {
      alert("Username not found!");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Update password in localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({ username, password: newPassword })
    );

    // Redirect to success page with message
    navigate("/success", {
      state: { message: "Password has been reset successfully!" },
    });
  };

  return (
    <div className="login-container">
      <h2>Reset Your Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="text"
          placeholder="Enter your Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <label style={{ color: "#d1fae5", marginTop: "8px" }}>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            style={{ marginRight: "8px" }}
          />
          Show Passwords
        </label>

        <button type="submit">Reset Password</button>

        <p style={{ marginTop: "15px", color: "#d1fae5" }}>
          Remembered your password? <a href="/login" style={{ color: "#10b981" }}>Login here</a>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
