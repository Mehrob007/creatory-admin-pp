import axios from "axios";

const BUSE_URL =
  // "https://primeparking.ru/"
  process.env.NEXT_PUBLIC_API_URL || "http://109.172.38.63:3010/";

export const apiClient = axios.create({
  baseURL: BUSE_URL,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      document.location.href = "./login";
      localStorage.removeItem("token");
      console.warn("Unauthorized, redirecting to login...");
    }
    return Promise.reject(error);
  },
);
