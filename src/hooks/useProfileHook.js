import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProfileHook = create((set, get) => ({
  user: null,

  setUser: (user) => set({ user }),

  getUserProfile: async (userId) => {
    try {
      const response = await axios.get(`/create/profile/${userId}`);
      if (!response.data) {
        toast.error("User not found");
        return null;
      }
      set({ user: response.data });
      return response.data; // ✅ Return the data for further use
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch user profile"
      );
      return null;
    }
  },

  updateProfile: async (userId, data) => {
    try {
      const response = await axios.put(`/create/updateProfile/${userId}`, data);
      if (response.status === 200) {
        set({ user: response.data });
        toast.success("Profile updated successfully");
        return response.data; // ✅ Return updated data
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
      return null;
    }
  },

  updatePassword: async (userId, data) => {
    try {
      const response = await axios.put(`/create/updatePassword/${userId}`, {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      if (response.status === 200) {
        toast.success("Password updated successfully");
        return true; // ✅ Return success state
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error(error.response?.data?.message || "Failed to update password");
      return false; // ✅ Return failure state
    }
  },
}));
