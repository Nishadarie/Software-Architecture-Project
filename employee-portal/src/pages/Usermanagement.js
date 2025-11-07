import React from "react";
import "../styles/UserManagement.css";

function UserManagement() {
    const users = [
        { id: 1, name: "Sarasavi Publishers", status: "Active" },
        { id: 2, name: "MD Gunasena", status: "Active" },
        { id: 3, name: "Lake House", status: "Inactive" },
    ];

    return(
        <div>
            <h2>User Management</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Publisher Name</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.name}</td>
                            <td>{u.status}</td>
                            <td>
                                <button>Deactivate</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserManagement;