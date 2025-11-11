export const isAuthenticated = () => {
  return !!localStorage.getItem("employeeToken");
};
