import axios from "axios";
import { useUserHook } from "../hooks/useUserHook";
import { toast } from "react-hot-toast";

const instance = axios.create({
  baseURL: `http://localhost:5000/api/admin`,
  withCredentials: true,
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        // Access refreshToken function from Zustand store
        const { refreshToken } = useUserHook.getState();
        await refreshToken();
        // Retry the original request
        return axios.request(error.config);
      } catch (refreshError) {
        console.error("Failed to refresh token, logging out...");
        // Access the logout function and clear user state
        const { logout } = useUserHook.getState();
        await logout();
        toast.error("Session expired. Please log in again.");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
