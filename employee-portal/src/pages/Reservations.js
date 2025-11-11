import React from "react";
import "../styles/Reservations.css";

function Reservations() {
    const Reservations =[
        { id: 1, stall:"A2", vendor: "Sarasavi", date: "2025-11-01"},
        { id: 2, stall: "B1", vendor: "Lake House", date: "2025-11-02" },

    ];

    const handleReport =() => {
        alert("Reservation Report Generated!");
    };

    return (
        <div>
            <h2>Reservations</h2>
            <button onClick={handleReport} className="generate-btn">
                Generate Report
            </button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Stall</th>
                        <th>Vendor</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {Reservations.map((r) => (
                        <tr key={r.id}>
                            <td>{r.id}</td>
                            <td>{r.stall}</td>
                            <td>{r.vendor}</td>
                            <td>{r.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Reservations;