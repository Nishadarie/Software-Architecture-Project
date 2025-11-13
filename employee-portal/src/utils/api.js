// export const loginEmployee = async (email, password) => {
//   try {
//     const res = await fetch("http://localhost:8080/api/employee/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     if (res.ok) {
//       const data = await res.json();
//       localStorage.setItem("employeeToken", data.token);
//       return true;
//     }
//   } catch (err) {
//     console.error(err);
//   }
//   return false;
// };

// Login function
export const loginEmployee = async (email, password) => {
  try {
    const res = await fetch("http://localhost:8083/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      // Store tokens and token type in localStorage
      localStorage.setItem("employeeAccessToken", data.accessToken);
      localStorage.setItem("employeeRefreshToken", data.refreshToken);
      localStorage.setItem("employeeTokenType", data.tokenType);
      return true;
    } else {
      // Backend returned an error
      const errorData = await res.json();
      console.error("Login failed:", errorData.message);
    }
  } catch (err) {
    console.error("Login error:", err);
  }
  return false;
};

// Optional: Logout function to clear stored tokens
export const logoutEmployee = () => {
  localStorage.removeItem("employeeAccessToken");
  localStorage.removeItem("employeeRefreshToken");
  localStorage.removeItem("employeeTokenType");
};