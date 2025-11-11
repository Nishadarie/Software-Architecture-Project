export const loginEmployee = async (email, password) => {
  try {
    const res = await fetch("http://localhost:8080/api/employee/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("employeeToken", data.token);
      return true;
    }
  } catch (err) {
    console.error(err);
  }
  return false;
};
