import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import useVentasStore from "@/store/ventas/VentasStore";

export default function BotonAgregarDetalleVenta({ producto }) {
  const agregarDetalleVenta = useVentasStore(
    (state) => state.agregarDetalleVenta
  );

  return (
    <Button
      onClick={() => {
        agregarDetalleVenta({
          id: uuidv4(),
          precioVenta: producto.precioVenta,
          cantidad: 1,
          producto: producto,
        });
        toast.success("Detalle de venta agregado correctamente");
      }}
      type="button"
      className="rounded-full w-8 h-8 p-0 bg-primary/15 hover:scale-110 transition-transform"
    >
      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
        <Plus className="w-6 h-6" />
      </div>
    </Button>
  );
}
