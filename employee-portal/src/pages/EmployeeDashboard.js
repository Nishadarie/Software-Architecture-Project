import react from "react";
import "../styles/EmployeeDashboard.css"

function EmployeeDashboard() {
    return (
        <div className="dashboard-container">
            <h1>Welcome,Employee!</h1>
            <div className="card-grid">
                <div className="card">Manage Reservation</div>
                <div className="card">View Assigned Stalls</div>
                <div className="card">Check Performance</div>
            </div>
        </div>
    )
}

export default EmployeeDashboard;