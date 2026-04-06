import axios from "axios";

/** Production API when Netlify (or other host) has no VITE_API_URL at build time */
const PRODUCTION_API_FALLBACK = "https://room-roster.onrender.com";
const LOCAL_API = "http://127.0.0.1:5000";

function resolveApiBaseURL() {
  const fromEnv = import.meta.env.VITE_API_URL?.trim();
  if (fromEnv) {
    return `${fromEnv.replace(/\/+$/, "")}/api`;
  }
  if (import.meta.env.DEV) {
    return `${LOCAL_API}/api`;
  }
  return `${PRODUCTION_API_FALLBACK}/api`;
}

const apiBaseURL = resolveApiBaseURL();

const apiClient = axios.create({
  baseURL: apiBaseURL
});

apiClient.interceptors.request.use((config) => {
  const rel = String(config.url || "");
  const isAuthCall = rel.includes("auth/login") || rel.includes("auth/register");
  if (!isAuthCall) {
    const token = localStorage.getItem("token");
    if (token && token !== "undefined" && token !== "null") {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url || "";
    const isAuthCall = url.includes("/auth/login") || url.includes("/auth/register");
    if (error.response?.status === 401 && !isAuthCall) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
