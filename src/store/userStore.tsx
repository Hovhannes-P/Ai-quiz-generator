import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  username: string | null;
  isLoggedIn: boolean;
  login: (username: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      username: null,
      isLoggedIn: false,
      login: (username) => set({ username, isLoggedIn: true }),
      logout: () => set({ username: null, isLoggedIn: false }),
    }),
    {
      name: "user-session",
    }
  )
);