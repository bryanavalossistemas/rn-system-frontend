import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import useVentasStore from "@/store/ventas/VentasStore";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { formatCurrency } from "@/utils/funciones";

export default function DetalleVenta({ detalleVenta }) {
  const [cantidad, setCantidad] = useState(detalleVenta.cantidad);
  useMemo(() => setCantidad(detalleVenta.cantidad), [detalleVenta]);

  const [precioVenta, setPrecioVenta] = useState(detalleVenta.precioVenta);
  useMemo(() => setPrecioVenta(detalleVenta.precioVenta), [detalleVenta]);

  const aumentarCantidadDetalleVenta = useVentasStore(
    (state) => state.aumentarCantidadDetalleVenta
  );
  const disminuirCantidadDetalleVenta = useVentasStore(
    (state) => state.disminuirCantidadDetalleVenta
  );
  const cambiarCantidadDetalleVenta = useVentasStore(
    (state) => state.cambiarCantidadDetalleVenta
  );

  const cambiarPrecioVentaDetalleVenta = useVentasStore(
    (state) => state.cambiarPrecioVentaDetalleVenta
  );

  const eliminarDetalleVenta = useVentasStore(
    (state) => state.eliminarDetalleVenta
  );

  function handleCambiarPrecioVentaDetalleVenta(e) {
    const precioVentaNumero = Number(e.target.value);
    setPrecioVenta(precioVentaNumero);
    if (precioVentaNumero <= 0) {
      setPrecioVenta("");
      return;
    } else {
      cambiarPrecioVentaDetalleVenta(detalleVenta.id, precioVentaNumero);
    }
  }

  function handleCambiarCantidadDetalleVenta(e) {
    const cantidadNumero = Number(e.target.value);
    setCantidad(cantidadNumero);
    if (cantidadNumero <= 0) {
      setCantidad("");
      return;
    } else {
      cambiarCantidadDetalleVenta(detalleVenta.id, cantidadNumero);
    }
  }

  return (
    <li key={detalleVenta.id}>
      <Card className="p-2">
        <div className="flex items-center justify-between gap-x-5">
          <div className="flex items-center gap-x-4">
            <Card className="max-w-32 max-h-16 flex items-center justify-center">
              <img
                src={detalleVenta.producto.imagenProducto}
                alt={detalleVenta.producto.nombre}
                className="h-16 object-contain"
              />
            </Card>
            <h5 className="text-sm font-bold line-clamp-2">
              {detalleVenta.producto.nombre}
            </h5>
          </div>
          <div className="flex flex-col gap-y-1 items-center justify-center">
            <div className="bg-primary w-6 h-6 flex items-center justify-center rounded-full text-sm">
              <span className="text-primary-foreground font-medium text-sm">
                x{detalleVenta.cantidad}
              </span>
            </div>
            <Button
              className="p-0 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-red-400"
              onClick={() => eliminarDetalleVenta(detalleVenta.id)}
            >
              <Trash className="w-4 h-4 text-primary-foreground" />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between gap-x-5 mt-3 text-sm">
          <div className="flex items-center gap-x-1">
            <span className="font-medium">Precio Unitario: S/ </span>
            <Input
              type="number"
              className="w-20 h-8 font-medium text-center"
              min={1}
              value={precioVenta}
              onChange={handleCambiarPrecioVentaDetalleVenta}
            />
          </div>
          <span className="text-muted-foreground">
            {formatCurrency(detalleVenta.precioVenta)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-x-5 mt-3">
          <div className="flex items-center gap-x-1">
            <Button
              type="button"
              disabled={detalleVenta.cantidad <= 1}
              className={cn(
                "rounded-full w-7 h-7 p-0 bg-primary/15 hover:scale-110 transition-transform"
              )}
              onClick={() => disminuirCantidadDetalleVenta(detalleVenta.id)}
            >
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <Minus className="w-5 h-5" />
              </div>
            </Button>
            <Input
              type="number"
              className="w-20 h-8 font-medium text-center"
              min={1}
              value={cantidad}
              onChange={handleCambiarCantidadDetalleVenta}
            />
            <Button
              type="button"
              className={cn(
                "rounded-full w-7 h-7 p-0 bg-primary/15 hover:scale-110 transition-transform"
              )}
              onClick={() => aumentarCantidadDetalleVenta(detalleVenta.id)}
            >
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </div>
            </Button>
          </div>
          <span className="text-lg font-bold">
            {formatCurrency(detalleVenta.precioVenta * detalleVenta.cantidad)}
          </span>
        </div>
      </Card>
    </li>
  );
}
