import axios from "axios";

console.log("API URL:", import.meta.env.VITE_API_URL);

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api"
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
