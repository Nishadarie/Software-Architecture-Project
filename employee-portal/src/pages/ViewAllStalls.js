import React, { useState } from "react";
import "../styles/Table.css";

function ViewAllStalls() {
    const [filter, setFilter] = useState("All");

    const stalls = [
        { id: "A1", size: "Small", status: "Available", reservedBy: "-", contact: "-"},
        { id: "A2", size: "Medium", status: "Reserved", reservedBy: "Sarasavi", contact: "info@sarasavi.lk"},
        { id: "B1", size: "Large", status: "Available", reservedBy: "-", contact: "-"},
        
    ];

    const filtered = stalls.filter((s) => filter == "All" || s.status == filter);

    return (
        <div className="table-container">
            <h2>All Stalls</h2>
            <div className="filter-bar">
                <select onChange={(e) => setFilter(e.target.value)}>
                    <option>All</option>
                    <option>Available</option>
                    <option>Reserved</option>
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Stall ID</th>
                        <th>Size</th>
                        <th>Status</th>
                        <th>Reserved By</th>
                        <th>Contact</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((s, index) => (
                        <tr key={index}>
                            <td>{s.id}</td>
                            <td>{s.size}</td>
                            <td className={s.status == "Available" ? "available" : "reserved"}>
                                {s.status}
                            </td>
                            <td>{s.reservedBy}</td>
                            <td>{s.contact}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewAllStalls;