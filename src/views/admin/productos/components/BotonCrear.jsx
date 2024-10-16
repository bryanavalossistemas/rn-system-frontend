import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AddButton } from "./AddButton";
import { z } from "zod";
import apiProductos from "@/api/Productos";
import ContenedorImagen from "./ContenedorImagen";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function BotonCrear({ obtenerProductos, categorias, marcas }) {
  const [open, setOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [openPopover2, setOpenPopover2] = useState(false);
  const [file, setFile] = useState();
  const [urlImagen, setUrlImagen] = useState("");

  const form = useForm({
    resolver: zodResolver(
      z.object({
        nombre: z.string().min(1, {
          message: "El nombre del producto es requerido",
        }),
        precioCosto: z.coerce
          .number({
            required_error: "El precio de costo del producto es requerido",
            invalid_type_error:
              "El precio de costo del producto debe ser un número",
          })
          .positive({
            message: "El precio de costo debe ser mayor a 0",
          }),
        precioVenta: z.coerce
          .number({
            required_error: "El precio de venta del producto es requerido",
            invalid_type_error:
              "El precio de venta del producto debe ser un número",
          })
          .positive({
            message: "El precio de venta debe ser mayor a 0",
          }),
        stock: z.coerce
          .number({
            required_error: "El stock del producto es requerido",
            invalid_type_error: "El stock del producto debe ser un número",
          })
          .int({
            message: "El precio de venta debe ser un numero entero",
          })
          .positive({
            message: "El precio de venta debe ser mayor a 0",
          }),
        categoriaId: z.coerce.number().min(1, {
          message: "La categoría del producto es requerida",
        }),
        marcaId: z.coerce.number().min(1, {
          message: "La marca del producto es requerida",
        }),
      })
    ),
    defaultValues: {
      nombre: "",
      precioCosto: "",
      precioVenta: "",
      stock: "",
      categoriaId: "",
      marcaId: "",
    },
  });

  async function handleSubmit(datos) {
    if (!file) {
      toast.error("La imagen del producto es obligatoria");
      return;
    }
    const formData = new FormData();
    formData.append("nombre", datos.nombre);
    formData.append("precioCosto", datos.precioCosto.toString());
    formData.append("precioVenta", datos.precioVenta.toString());
    formData.append("stock", datos.stock.toString());
    formData.append("categoriaId", datos.categoriaId.toString());
    formData.append("marcaId", datos.marcaId.toString());
    formData.append("image", file);
    await apiProductos.crearProducto(formData);
    setFile();
    toast.success("Producto creado correctamente");
    setOpen(false);
    obtenerProductos();
  }

  function onSelectFile(e) {
    if (!e.target.files || e.target.files.length === 0) {
      setFile();
      return;
    }
    setFile(e.target.files[0]);
  }

  useEffect(() => {
    if (!file) {
      setUrlImagen("");
      return;
    }
    const urlObjeto = URL.createObjectURL(file);
    setUrlImagen(urlObjeto);
    return () => URL.revokeObjectURL(urlObjeto);
  }, [file]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <AddButton onClick={() => form.reset()} />
      </DialogTrigger>
      <DialogContent className="min-w-[65vw]">
        <Form {...form}>
          <form
            className="flex flex-col gap-y-3"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl text-center">
                  Crear Producto
                </CardTitle>
                <CardDescription className="text-center">
                  Agregue un producto aquí. Haga clic en agregar cuando haya
                  terminado.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-x-6">
                  <div className="flex-1 flex flex-col gap-y-1">
                    <FormField
                      control={form.control}
                      name="nombre"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre del producto</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Harina anita x 50 kg"
                              {...field}
                            />
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
                          <FormLabel>Precio de costo</FormLabel>
                          <FormControl>
                            <Input placeholder="123" {...field} type="number" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="precioVenta"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Precio Venta</FormLabel>
                          <FormControl>
                            <Input placeholder="150" {...field} type="number" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock del producto</FormLabel>
                          <FormControl>
                            <Input placeholder="100" {...field} type="number" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="categoriaId"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <FormLabel>Categoría del producto</FormLabel>
                          <Popover
                            open={openPopover}
                            onOpenChange={setOpenPopover}
                            modal
                          >
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
                                    ? categorias.find(
                                        (categoria) =>
                                          categoria.id === field.value
                                      )?.nombre
                                    : "Seleccionar categoría"}
                                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[526px] p-0">
                              <Command>
                                <CommandInput
                                  placeholder="Buscar categoría..."
                                  className="h-9"
                                />
                                <CommandEmpty>
                                  No se encontró ninguna categoría
                                </CommandEmpty>
                                <CommandGroup className="overflow-auto h-[232px]">
                                  {categorias.map((categoria) => (
                                    <CommandItem
                                      key={categoria.id}
                                      defaultValue={categoria.id}
                                      onSelect={() => {
                                        form.setValue(
                                          "categoriaId",
                                          categoria.id
                                        );
                                        setOpenPopover(false);
                                      }}
                                    >
                                      {categoria.nombre}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          categoria.id === field.value
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
                      name="marcaId"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <FormLabel>Marca del producto</FormLabel>
                          <Popover
                            open={openPopover2}
                            onOpenChange={setOpenPopover2}
                            modal
                          >
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
                                    ? marcas.find(
                                        (marca) => marca.id === field.value
                                      )?.nombre
                                    : "Seleccionar marca"}
                                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[526px] p-0">
                              <Command>
                                <CommandInput
                                  placeholder="Buscar marca..."
                                  className="h-9"
                                />
                                <CommandEmpty>
                                  No se encontró ninguna marca
                                </CommandEmpty>
                                <CommandGroup className="overflow-auto h-[232px]">
                                  {marcas.map((marca) => (
                                    <CommandItem
                                      key={marca.id}
                                      defaultValue={marca.id}
                                      onSelect={() => {
                                        form.setValue("marcaId", marca.id);
                                        setOpenPopover2(false);
                                      }}
                                    >
                                      {marca.nombre}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          marca.id === field.value
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
                  </div>
                  <ContenedorImagen
                    className="flex-1"
                    src={urlImagen || ""}
                    onSelectFile={onSelectFile}
                  />
                </div>
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
