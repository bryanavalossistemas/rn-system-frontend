import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AddButton } from "./AddButton";
import { z } from "zod";
import apiProveedores from "@/api/Proveedores.js";

export default function BotonCrear({ obtenerProveedores }) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(
      z.object({
        nombre: z.string().min(1, {
          message: "El nombre del proveedor es requerido",
        }),
        ruc: z.coerce.string()
          .length(11, { message: "El RUC debe tener exactamente 11 dígitos" })
          .regex(/^\d+$/, { message: "El RUC debe ser numérico" }),
        telefono: z.coerce.string()
          .length(9, { message: "El teléfono debe tener exactamente 9 dígitos" })
          .regex(/^\d+$/, { message: "El teléfono debe ser numérico" }),
        direccion: z.coerce.string().min(1, {
          message: "La direccion del proveedor es requerida",
        }),
      })
    ),
    defaultValues: {
      nombre: "",
      ruc: "",
      telefono: "",
      direccion: "",
    },
  });

  async function handleSubmit(datos) {
    await apiProveedores.crearProveedor(datos);
    toast.success("Proveedor creado correctamente");
    obtenerProveedores();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <AddButton onClick={() => form.reset()} />
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <Form {...form}>
          <form
            className="flex flex-col gap-y-3"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <Card className="w-full max-w-md bg-white shadow-lg rounded-lg border">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl text-center">
                  Crear Proveedor
                </CardTitle>
                <CardDescription className="text-center">
                  Agregue un proveedor aquí. Haga clic en agregar cuando haya
                  terminado.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre del proveedor</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Mauricio R"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ruc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RUC del proveedor</FormLabel>
                      <FormControl>
                        <Input placeholder="12345678901" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="telefono"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono del proveedor</FormLabel>
                      <FormControl>
                        <Input placeholder="999888777" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="direccion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección del proveedor</FormLabel>
                      <FormControl>
                        <Input placeholder="av. La Molina 12345" {...field} />
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
