import { Button } from "@/components/ui/button";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
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
import { useState } from "react";

export default function BotonSeleccionarProveedor({
  proveedor,
  proveedores,
  setProveedor,
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex-1"
        >
          {proveedor
            ? proveedores.find(
                (proveedorPivote) => proveedorPivote.id === proveedor.id
              )?.nombre
            : "Seleccionar proveedor"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Command>
          <CommandInput placeholder="Buscar proveedores..." className="h-9" />
          <CommandList>
            <CommandEmpty>No se encontraron proveedores.</CommandEmpty>
            <CommandGroup>
              {proveedores.map((proveedorPivote) => (
                <CommandItem
                  key={proveedorPivote.id}
                  value={proveedorPivote}
                  onSelect={(nombreProveedor) => {
                    setProveedor(
                      nombreProveedor === proveedorPivote.nombre
                        ? proveedorPivote
                        : ""
                    );
                    setOpen(false);
                  }}
                >
                  {proveedorPivote.nombre}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      proveedor.nombre === proveedorPivote.nombre
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
  );
}
