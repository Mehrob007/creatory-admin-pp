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
    if (
      typeof window !== "undefined" &&
      window.localStorage &&
      typeof window.localStorage.getItem === "function"
    ) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (
        typeof window !== "undefined" &&
        window.location &&
        window.localStorage &&
        typeof window.localStorage.removeItem === "function"
      ) {
        document.location.href = "./login";
        localStorage.removeItem("token");
        console.warn("Unauthorized, redirecting to login...");
      }
    }
    return Promise.reject(error);
  },
);
