import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useStore = create()(
  devtools(
    persist(
      (set, get) => ({
        authToken: null,

        setAuthToken: (token) => {
          set(() => ({
            authToken: token,
          }));
        },

        logout: () => {
          set(() => ({
            authToken: null,
          }));
        },
      }),
      { name: "rn-system-storage" }
    )
  )
);
