import axios from "axios";
import { useRouter } from "vue-router";

console.log("Axios setup va être initialisé");

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Axios request intercepted:", config);
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => {
    console.error("Axios request error:", error);
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      const router = useRouter();

      localStorage.removeItem("token");

      router.push("/connexion");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
