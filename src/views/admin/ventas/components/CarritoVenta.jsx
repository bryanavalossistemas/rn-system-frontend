import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/funciones";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { useMemo, useState } from "react";
import DetalleVenta from "./DetalleVenta";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import useVentasStore from "@/store/ventas/VentasStore";
import BotonCrearVenta from "./BotonCrearVenta";

export default function CarritoVenta({ clientes }) {
  const [open, setOpen] = useState(false);
  const [cliente, setCliente] = useState("");
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const detallesVenta = useVentasStore((state) => state.detallesVenta);
  const limpiarVentasStore = useVentasStore(
    (state) => state.limpiarVentasStore
  );

  const total = useMemo(
    () =>
      detallesVenta.reduce(
        (total, detalleVenta) =>
          total + detalleVenta.precioVenta * detalleVenta.cantidad,
        0
      ),
    [detallesVenta]
  );

  const subtotal = useMemo(() => total / 1.18, [detallesVenta]);

  const igv = useMemo(() => subtotal * 0.18, [detallesVenta]);

  async function handleClick() {
    if (detallesVenta.length === 0) {
      toast.error("Debe agregar a lo menos un detalle de venta");
      return;
    }
    if (cliente.id <= 0) {
      toast.error("Debe seleccionar un cliente");
      return;
    }
    const response = await createSale(detallesVenta, cliente);
    if (!response?.error) {
      limpiarVentasStore();
      toast.success("Venta creada correctamente");
    } else {
      toast.error(response.error.message);
    }
  }

  return (
    <>
      <div
        className={cn(
          "fixed sm:static right-0 flex flex-col h-full z-50 w-[90%] transition-all sm:w-full",
          mostrarCarrito ? "top-0 delay-300" : "-top-full"
        )}
      >
        <Card className="flex flex-col gap-y-2 h-full p-2 bg-background rounded-none sm:rounded-md">
          <Popover open={open} onOpenChange={setOpen} modal>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className=""
              >
                {cliente
                  ? clientes.find(
                      (clientePivote) => clientePivote.id === cliente.id
                    )?.nombre
                  : "Seleccionar cliente"}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Command>
                <CommandInput
                  placeholder="Buscar clientes..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No se encontraron clientes.</CommandEmpty>
                  <CommandGroup>
                    {clientes.map((clientePivote) => (
                      <CommandItem
                        key={clientePivote.id}
                        value={clientePivote}
                        onSelect={(clienteNombre) => {
                          setCliente(
                            clienteNombre === clientePivote.nombre
                              ? clientePivote
                              : ""
                          );
                          setOpen(false);
                        }}
                      >
                        {clientePivote.nombre}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            cliente.nombre === clientePivote.nombre
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <ul className="overflow-y-auto flex flex-col gap-y-2 pr-2">
            {detallesVenta.map((detalleVenta) => (
              <DetalleVenta key={detalleVenta.id} detalleVenta={detalleVenta} />
            ))}
          </ul>
          <div className="flex flex-col gap-y-2 pr-2 mt-auto text-sm">
            <ul className="flex flex-col gap-y-2">
              <li className="flex items-center justify-between">
                <p className="text-muted-foreground">Subtotal</p>
                <h3 className="font-bold">{formatCurrency(subtotal)}</h3>
              </li>
              <li className="flex items-center justify-between">
                <p className="text-muted-foreground">IGV (18%)</p>
                <h3 className="font-bold">{formatCurrency(igv)}</h3>
              </li>
              <li className="flex items-center justify-between">
                <p className="text-muted-foreground">Total</p>
                <h3 className="font-bold">{formatCurrency(total)}</h3>
              </li>
            </ul>
            <BotonCrearVenta cliente={cliente} setCliente={setCliente} />
          </div>
        </Card>
      </div>
    </>
  );
}
