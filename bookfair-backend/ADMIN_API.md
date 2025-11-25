
# Admin API Documentation — BookFair System

This document describes all Admin & Reporting APIs implemented under **Dev C** scope.

---

## Base URL
```
/api/admin
```

---

# 1. Health Check
### **GET** `/api/admin/health`

Checks if the admin service is running.

#### Response
```json
"admin ok"
```

---

# 2. User Management APIs

## 2.1 Get All Users
### **GET** `/api/admin/users`

Returns all users with basic profile and status info.

#### Sample Response
```json
{
  "success": true,
  "data": [
    {
      "id": "123",
      "name": "John Doe",
      "email": "john@example.com",
      "businessName": "ABC Publishers",
      "phone": "0771234567",
      "status": "ACTIVE",
      "role": "USER"
    }
  ]
}
```

---

## 2.2 Deactivate User
### **PUT** `/api/admin/users/{id}/deactivate`

Deactivates a user account.

#### Sample Response
```json
{
  "success": true,
  "message": "User deactivated successfully"
}
```

---

## 2.3 Activate User
### **PUT** `/api/admin/users/{id}/activate`

Reactivates a previously deactivated user.

#### Sample Response
```json
{
  "success": true,
  "message": "User activated successfully"
}
```

---

# 3. Admin-Only CRUD for Employees

## 3.1 Create Employee
### **POST** `/api/admin/employees`

#### Request Body
```json
{
  "name": "Employee Name",
  "email": "emp@bookfair.lk",
  "password": "pass123",
  "phone": "0777123456"
}
```

#### Response
```json
{
  "success": true,
  "message": "Employee created",
  "employeeId": "UUID"
}
```

---

## 3.2 Promote User to Employee
### **PUT** `/api/admin/users/{id}/role/employee`

Promotes a normal user to EMPLOYEE role.

---

## 3.3 Promote Employee to Admin
### **PUT** `/api/admin/users/{id}/role/admin`

Promotes an employee to ADMIN role.

---

# 4. Reporting API Endpoints

## 4.1 Dashboard Summary
### **GET** `/api/admin/report/summary`

Returns aggregated platform metrics.

#### Response Example
```json
{
  "success": true,
  "data": {
    "totalUsers": 1200,
    "activeUsers": 1100,
    "inactiveUsers": 100,
    "employeeCount": 14,
    "businessCount": 423,
    "totalStalls": 138,
    "reservedStalls": 74,
    "pendingReservations": 20,
    "confirmedReservations": 54
  }
}
```

---

## 4.2 Reservation Breakdown
### **GET** `/api/admin/report/reservations`

#### Response Example
```json
{
  "success": true,
  "data": {
    "pending": 20,
    "confirmed": 54,
    "cancelled": 3
  }
}
```

---

## 4.3 Stall Occupancy Report
### **GET** `/api/admin/report/stalls`

#### Response Example
```json
{
  "success": true,
  "data": {
    "totalStalls": 138,
    "available": 64,
    "reserved": 74
  }
}
```

---

# 5. Audit Log APIs

## 5.1 Get All Audit Logs
### **GET** `/api/admin/audit`

#### Response
```json
{
  "success": true,
  "data": [
    {
      "id": "UUID",
      "action": "USER_LOGIN",
      "performedBy": "123",
      "timestamp": "2025-11-25T03:00:00Z",
      "details": "User logged in"
    }
  ]
}
```

---

## 5.2 Get Audit Logs by User
### **GET** `/api/admin/audit/user/{userId}`

---

## 5.3 Get Audit Logs by Action Type
### **GET** `/api/admin/audit/action/{action}`

---

# 6. Authentication Requirements

| Role | Allowed |
|------|---------|
| USER | ❌ Not allowed |
| EMPLOYEE | ✔ Reports, user list |
| ADMIN | ✔ Full access |

Admin-only endpoints:
- Employee creation
- Role promotion
- Audit logs

---

# 7. Error Response Format

```json
{
  "success": false,
  "error": "Meaningful error message"
}
```

---

# 8. Contact
For backend issues, contact the Dev C maintainer.

---

