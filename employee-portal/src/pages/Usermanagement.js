import React, { useState, useEffect } from "react";
import "../styles/UserManagement.css";
import { getAllUsers, deactivateUser, activateUser } from "../utils/api";

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        setLoading(true);
        const userList = await getAllUsers();
        setUsers(userList);
        setLoading(false);
    };

    const handleToggleStatus = async (userId, currentStatus) => {
        const success = currentStatus === "ACTIVE" 
            ? await deactivateUser(userId)
            : await activateUser(userId);
        
        if (success) {
            loadUsers(); // Reload users after status change
        } else {
            alert("Failed to update user status");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return(
        <div>
            <h2>User Management</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Publisher Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td>{u.id.substring(0, 8)}...</td>
                            <td>{u.businessName || u.name}</td>
                            <td>{u.email}</td>
                            <td className={u.status === "ACTIVE" ? "active" : "inactive"}>
                                {u.status === "ACTIVE" ? "Active" : "Inactive"}
                            </td>
                            <td>
                                <button 
                                    onClick={() => handleToggleStatus(u.id, u.status)}
                                    className={u.status === "ACTIVE" ? "deactivate-btn" : "activate-btn"}
                                >
                                    {u.status === "ACTIVE" ? "Deactivate" : "Activate"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserManagement;