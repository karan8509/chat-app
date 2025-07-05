import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";
export const useBearStore = create((set, get) => ({
  user: null,
  loding: false,

  Singup: async ({ name, email, password }) => {
    set({loding : true})
    try {
      const data = await axios.post(
        "http://localhost:8000/api/auth/signup",
        { name, email, password },
        { withCredentials: true }
      );
      const { success, message , user } = data.data;
      if (!success) {
        return toast.error(message);
      }
      toast.success(message)
      console.log("---> " , user)
      set({ user , loding : false });
    } catch (error) {
      console.log("error in Singup Routes in Frontend", error.message);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },
}));
