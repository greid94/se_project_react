import { BASE_HEADERS, baseUrl, getAuthHeaders } from "./api.js";
import { request } from "./api.js";

// Function to check if the response is ok
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// Register new user
const signup = (name, avatar, email, password) => {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers: BASE_HEADERS,
    body: JSON.stringify({ name, avatar, email, password }),
  });
};

// Login user
const signin = (email, password) => {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: BASE_HEADERS,
    body: JSON.stringify({ email, password }),
  });
};

// Check token
const checkToken = () => {
  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
};

export { signup, signin, checkToken };
