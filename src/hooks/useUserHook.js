import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useUserHook = create((set, get) => ({
  user: JSON.parse(localStorage.getItem("user")) || null, // ✅ Hydrate user from localStorage

  login: async (email, password) => {
    try {
      const res = await axios.post("/auth/login", { email, password });

      set({ user: res.data });
      localStorage.setItem("user", JSON.stringify(res.data)); // ✅ Store user data

      toast.success("Login successful");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      throw error;
    }
  },

  logout: async () => {
    try {
      await axios.post("/auth/logout");

      set({ user: null });
      localStorage.removeItem("user"); // ✅ Clear user data

      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      throw error;
    }
  },

  refreshToken: async () => {
    try {
      const res = await axios.post(
        "/auth/refreshToken",
        {},
        { withCredentials: true }
      );

      const updatedUser = { ...get().user, token: res.data.token }; // ✅ Update user token
      set({ user: updatedUser });
      localStorage.setItem("user", JSON.stringify(updatedUser)); // ✅ Store updated user data

      return res.data.token;
    } catch (error) {
      console.error("Token refresh failed:", error);
      toast.error("Session expired. Please log in again.");
      get().logout(); // ✅ Auto logout if refresh fails
      return null;
    }
  },

  getUser: () => get().user, // ✅ Provide direct access to user data
}));

// Axios interceptor for token refresh
// let refreshPromise = null;

// axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         if (refreshPromise) {
//           console.log("Waiting for existing refresh...");
//           await refreshPromise;
//           return axios(originalRequest);
//         }

//         console.log("Refreshing token...");
//         refreshPromise = useUserHook.getState().refreshToken();
//         await refreshPromise;
//         refreshPromise = null;

//         // Retry original request with refreshed token
//         return axios({
//           ...originalRequest,
//           headers: {
//             ...originalRequest.headers,
//             Authorization: `Bearer ${useUserHook.getState().user?.accessToken}`,
//           },
//         });
//       } catch (refreshError) {
//         refreshPromise = null;
//         console.error("Refresh failed:", refreshError);
//         useUserHook.getState().logout();
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );
