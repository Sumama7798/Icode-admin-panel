import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useAdminHook = create((set, get) => ({
  users: [],
  setUsers: (users) => set({ users }),

  // Fetch all users and set state
  getAllUsers: async () => {
    try {
      const res = await axios.get("/super/getAllUsers");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching users");
      throw error;
    }
  },

  // Create an admin and add to users list
  createAdmin: async (name, email, password, role) => {
    try {
      const res = await axios.post("/super/createAdmin", {
        name,
        email,
        password,
        role,
      });

      // Add new admin to the users list
      set((state) => ({ users: [...state.users, res.data] }));

      toast.success("Admin created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating admin");
      throw error;
    }
  },

  // Update user role and modify state accordingly
  updateUserRole: async (userId, role) => {
    try {
      const res = await axios.put(`/super/updateUserRole/${userId}`, { role });

      set((state) => ({
        users: state.users.map((user) =>
          user._id === userId ? { ...user, role: res.data.role } : user
        ),
      }));

      toast.success("User role updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating user role");
      throw error;
    }
  },

  // Delete a user and remove from state
  deleteUser: async (userId) => {
    try {
      await axios.delete(`/super/deleteUser/${userId}`);

      // Filter out deleted user
      set((state) => ({
        users: state.users.filter((user) => user._id !== userId),
      }));

      toast.success("User deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting user");
      throw error;
    }
  },
}));
