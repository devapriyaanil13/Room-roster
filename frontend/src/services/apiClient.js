import axios from "axios";

const rawApiUrl = import.meta.env.VITE_API_URL;
const normalizedApiBase = rawApiUrl ? rawApiUrl.replace(/\/+$/, "") : "";
const apiBaseURL = normalizedApiBase ? `${normalizedApiBase}/api` : "/api";

const apiClient = axios.create({
  baseURL: apiBaseURL
});
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
