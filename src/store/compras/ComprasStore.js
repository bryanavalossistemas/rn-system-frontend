import { create } from "zustand";
import { persist } from "zustand/middleware";

const useComprasStore = create()(
  persist(
    (set, get) => ({
      detallesCompra: [],

      setDetallesCompra: (detallesCompra) => {
        set({ detallesCompra: detallesCompra });
      },

      agregarDetalleCompra: (detalleCompra) => {
        const { detallesCompra } = get();
        const detallesCompraActualizado = [...detallesCompra, detalleCompra];

        set({ detallesCompra: detallesCompraActualizado });
      },

      eliminarDetalleCompra: (id) => {
        const { detallesCompra } = get();
        const detallesCompraActualizado = detallesCompra.filter(
          (detalleCompra) => detalleCompra.id !== id
        );

        set({ detallesCompra: detallesCompraActualizado });
      },

      actualizarDetalleCompra: (detalleCompraActualizado) => {
        const { detallesCompra } = get();
        const detallesCompraActualizado = detallesCompra.map((detalleCompra) =>
          detalleCompra.id === detalleCompraActualizado.id
            ? detalleCompraActualizado
            : detalleCompra
        );

        set({ detallesCompra: detallesCompraActualizado });
      },

      limpiarDetallesCompra: () => {
        set({ detallesCompra: [] });
      },
    }),
    { name: "rn-system-detalles-compra-store" }
  )
);

export default useComprasStore;
