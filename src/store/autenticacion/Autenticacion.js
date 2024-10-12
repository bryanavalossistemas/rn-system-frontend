import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAutenticacionStore = create()(
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
    { name: "rn-system-autenticacion-store" }
  )
);

export default useAutenticacionStore;
