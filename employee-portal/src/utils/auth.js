// export const isAuthenticated = () => {
//   return !!localStorage.getItem("employeeToken");
// };

// Check if the user is authenticated
export const isAuthenticated = () => {
  // Check if the access token exists in localStorage
  return !!localStorage.getItem("employeeAccessToken");
};