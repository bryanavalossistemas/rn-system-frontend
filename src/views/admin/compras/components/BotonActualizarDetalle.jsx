import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useComprasStore from "@/store/compras/ComprasStore";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function BotonActualizarDetalle({ productos, detalleCompra }) {
  const [open, setOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const actualizarDetalleCompra = useComprasStore(
    (state) => state.actualizarDetalleCompra
  );
  const form = useForm({
    resolver: zodResolver(
      z.object({
        id: z.coerce.string(),
        precioCosto: z.coerce.number().min(1, {
          message: "El costo del detalle de compra es requerido",
        }),
        cantidad: z.coerce.number().min(1, {
          message: "La cantidad del detalle de compra es requerido",
        }),
        producto: z.object({
          id: z.number().min(1, {
            message: "Debe elegir un producto",
          }),
          nombre: z.string(),
          precioCosto: z.number(),
          precioVenta: z.number(),
          stock: z.number(),
          categoriaId: z.number(),
          marcaId: z.number(),
        }),
      })
    ),
    values: {
      id: detalleCompra.id,
      precioCosto: detalleCompra.precioCosto,
      cantidad: detalleCompra.cantidad,
      producto: {
        id: detalleCompra.producto.id,
        nombre: detalleCompra.producto.nombre,
        precioCosto: detalleCompra.producto.precioCosto,
        precioVenta: detalleCompra.producto.precioVenta,
        stock: detalleCompra.producto.stock,
        categoriaId: detalleCompra.producto.categoriaId,
        marcaId: detalleCompra.producto.marcaId,
      },
    },
  });

  function handleSubmit(datos) {
    actualizarDetalleCompra({
      ...datos,
      id: detalleCompra.id,
    });
    setOpen(false);
    toast.success("Detalle de compra actualizado correctamente");
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-x-1" onClick={() => form.reset()}>
          <Pen className="w-5 h-5" />
          <span>Editar</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-y-3"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <Card className="w-full max-w-md bg-white shadow-lg rounded-lg border">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl text-center">
                  Editar Detalle de Compra
                </CardTitle>
                <CardDescription className="text-center">
                  Realice cambios en el detalle de la compra aquí. Haga clic en
                  guardar cuando haya terminado.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
                  name="producto"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel onClick={(e) => e.preventDefault()}>
                        Producto
                      </FormLabel>
                      <Popover open={openPopover} onOpenChange={setOpenPopover}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-between font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? productos.find(
                                    (producto) => producto.id === field.value.id
                                  )?.nombre
                                : "Seleccionar producto"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-screen">
                          <Command>
                            <CommandInput
                              placeholder="Buscar producto..."
                              className="h-9"
                            />
                            <CommandEmpty>
                              No se encontró ningún producto
                            </CommandEmpty>
                            <CommandGroup className="overflow-auto h-40">
                              {productos.map((producto) => (
                                <CommandItem
                                  key={producto.id}
                                  onSelect={() => {
                                    form.setValue("producto", producto);
                                    setOpenPopover(false);
                                  }}
                                >
                                  {producto.nombre}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      producto.id === field.value.id
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cantidad"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unidades del producto</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="3" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="precioCosto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio costo del producto</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="100" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-end">
                <div className="flex gap-x-3">
                  <Button
                    onClick={() => setOpen(false)}
                    variant="outline"
                    type="button"
                  >
                    Cancelar
                  </Button>
                  <Button disabled={form.formState.isSubmitting} type="submit">
                    Guardar
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
