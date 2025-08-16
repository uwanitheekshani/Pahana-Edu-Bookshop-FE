// src/utils/auth.js
export const logout = () => {
  localStorage.removeItem("user"); // remove stored user info
  // Optionally remove auth token if you are using one
  localStorage.removeItem("token");
};
