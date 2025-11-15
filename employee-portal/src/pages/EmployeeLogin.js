import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EmployeeLogin.css";
import { loginEmployee } from "../utils/api";

function EmployeeLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await loginEmployee(email, password);
        if (success) {
            navigate("/dashboard");
        } else{
            alert("Invalid Credentials");
        }
    }


    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Employee Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                    <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                    <button type="submit">Login</button>


                </form>
            </div>
        </div>

    );
}

export default EmployeeLogin;
