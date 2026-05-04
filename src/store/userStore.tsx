import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  email: string | null;
  name: string | null;
  isLoggedIn: boolean;
  login: (profile: { name: string; email?: string | null }) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      email: null,
      name: null,
      isLoggedIn: false,
      login: ({ name, email = null }) =>
        set({
          email,
          name: name.trim(),
          isLoggedIn: true,
        }),
      logout: () => {
        set({ email: null, name: null, isLoggedIn: false });
      },
    }),
    {
      name: "user-session",
      version: 2,
      migrate: (persistedState: unknown) => {
        const state = persistedState as
          | {
              email?: string | null;
              name?: string | null;
              username?: string | null;
              isLoggedIn?: boolean;
            }
          | undefined;

        if (!state) {
          return {
            email: null,
            name: null,
            isLoggedIn: false,
          };
        }

        return {
          email: state.email ?? null,
          name: state.name ?? state.username ?? null,
          isLoggedIn: state.isLoggedIn ?? false,
        };
      },
    }
  )
);
