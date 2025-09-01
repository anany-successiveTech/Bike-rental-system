import axios from "axios";

const apiInstantce = axios.create({
  baseURL: "http://localhost:3900/api/v1", 
  withCredentials: true, // if you're using cookies for auth
});

apiInstantce.interceptors.request.use(
  (config) => {
    // If you are storing JWT in localStorage
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiInstantce;
