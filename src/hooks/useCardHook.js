import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useCardHook = create((set) => ({
  cards: [],
  setCards: (cards) => set({ cards }),

  createCard: async (card) => {
    try {
      const response = await axios.post("/create/createCard", card, {
        withCredentials: true,
      });
      set((prevState) => ({
        cards: [...prevState.cards, response.data],
      }));
      toast.success("Card created successfully");
    } catch (error) {
      toast.error("Failed to create card");
    }
  },
  getAllCards: async () => {
    try {
      const response = await axios.get("/create/getAllCards", {
        withCredentials: true,
      });
      set({ cards: response.data });
    } catch (error) {
      toast.error("Failed to fetch cards");
    }
  },

  getCardsByPage: async (page) => {
    try {
      const response = await axios.get(`/create/page/${page}`, {
        withCredentials: true,
      });
      set({ cards: response.data }); // Update the cards state with the response.data;
    } catch (error) {
      toast.error("Failed to fetch cards");
    }
  },

  uploadImage: async (fileUrl1, fileUrl2) => {
    try {
      // Ensure you pass the correct URLs for the image upload
      const response = await axios.post(
        "/upload",
        { fileUrl1, fileUrl2 },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      toast.error("Failed to upload image");
      console.error(error); // Optional: for debugging
    }
  },

  updateCard: async (cardId, updatedData) => {
    try {
      const response = await axios.put(
        `/create/update/cards/${cardId}`,
        updatedData,
        {
          withCredentials: true,
        }
      );
      toast.success("Card updated successfully:");
      return response.data;
    } catch (error) {
      toast.error("Failed to update card");
    }
  },

  deleteCard: async (cardId) => {
    try {
      await axios.delete(`/create/delete/${cardId}`, { withCredentials: true });
      set((prevState) => ({
        cards: prevState.cards.filter((card) => card._id !== cardId),
      }));
      toast.success("Card deleted successfully");
    } catch (error) {
      toast.error("Failed to delete card");
    }
  },
}));
