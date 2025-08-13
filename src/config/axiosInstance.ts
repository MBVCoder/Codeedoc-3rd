import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // from .env
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    // Add default headers used in Home.tsx
    request.headers["org-id"] = "6899b0197ff60d555b110cb5";
    request.headers["portal"] = "USER";
    return request;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle token expiration
      console.error("Unauthorized, redirecting to login...");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

