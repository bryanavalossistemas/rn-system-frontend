import { create } from "zustand";
import { persist } from "zustand/middleware";

const useVentasStore = create()(
  persist(
    (set, get) => ({
      detallesVenta: [],

      setDetallesVenta: (detallesVenta) => {
        set({ detallesVenta: detallesVenta });
      },

      agregarDetalleVenta: (detalleVenta) => {
        const { detallesVenta } = get();
        const detallesVentaActualizado = [...detallesVenta, detalleVenta];

        set({ detallesVenta: detallesVentaActualizado });
      },

      aumentarCantidadDetalleVenta: (id) => {
        const { detallesVenta } = get();
        const detallesVentaActualizado = detallesVenta.map((detalleVenta) => {
          return detalleVenta.id === id
            ? { ...detalleVenta, cantidad: detalleVenta.cantidad + 1 }
            : detalleVenta;
        });

        set({ detallesVenta: detallesVentaActualizado });
      },

      disminuirCantidadDetalleVenta: (id) => {
        const { detallesVenta } = get();
        const detallesVentaActualizado = detallesVenta.map((detalleVenta) => {
          return detalleVenta.id === id
            ? { ...detalleVenta, cantidad: detalleVenta.cantidad - 1 }
            : detalleVenta;
        });

        set({ detallesVenta: detallesVentaActualizado });
      },

      cambiarCantidadDetalleVenta: (id, cantidad) => {
        const { detallesVenta } = get();
        const detallesVentaActualizado = detallesVenta.map((detalleVenta) => {
          return detalleVenta.id === id
            ? { ...detalleVenta, cantidad }
            : detalleVenta;
        });

        set({ detallesVenta: detallesVentaActualizado });
      },

      cambiarPrecioVentaDetalleVenta: (id, precioVenta) => {
        const { detallesVenta } = get();
        const detallesVentaActualizado = detallesVenta.map((detalleVenta) => {
          return detalleVenta.id === id
            ? { ...detalleVenta, precioVenta }
            : detalleVenta;
        });

        set({ detallesVenta: detallesVentaActualizado });
      },

      eliminarDetalleVenta: (id) => {
        const { detallesVenta } = get();
        const detallesVentaActualizado = detallesVenta.filter(
          (detalleVenta) => detalleVenta.id !== id
        );

        set({ detallesVenta: detallesVentaActualizado });
      },

      limpiarVentasStore: () => {
        set({
          detallesVenta: [],
        });
      },
    }),

    {
      name: "rn-system-detalles-venta-store",
    }
  )
);

export default useVentasStore;
