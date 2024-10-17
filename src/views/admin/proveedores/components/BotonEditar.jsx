import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { UpdateButton as UpdateButtonComponent } from "./UpdateButton";
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
import { z } from "zod";
import apiProveedores from "@/api/Proveedores.js";

export default function BotonEditar({ proveedor, obtenerProveedores }) {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(
      z.object({
        nombre: z.string().min(1, {
          message: "El nombre del proveedor es requerido",
        }),
        ruc: z.coerce
          .number({
            required_error: "El RUC del proveedor es requerido",
            invalid_type_error: "El RUC del proveedor debe ser un número",
          })
          .refine(
            (val) => `${val}`.length === 11,
            "El RUC del proveedor debe tener 11 dígitos"
          ),
        telefono: z.coerce
          .number({
            required_error: "El teléfono del proveedor es requerido",
            invalid_type_error: "El teléfono del proveedor debe ser un número",
          })
          .refine(
            (val) => `${val}`.length === 7,
            "El teléfono del proveedor debe tener 7 dígitos"
          ),
        celular: z.coerce
          .number({
            required_error: "El celular del proveedor es requerido",
            invalid_type_error: "El celular del proveedor debe ser un número",
          })
          .refine(
            (val) => `${val}`.length === 9,
            "El celular del proveedor debe tener 9 dígitos"
          ),
        direccion: z.string().min(1, {
          message: "La dirección del proveedor es requerida",
        }),
      })
    ),
    values: {
      nombre: proveedor.nombre,
      ruc: proveedor.ruc,
      telefono: proveedor.telefono,
      celular: proveedor.celular,
      direccion: proveedor.direccion,
    },
  });

  async function handleSubmit(data) {
    try {
      const respuesta = await apiProveedores.actualizarProveedor(
        proveedor.id,
        data
      );
      if (!respuesta.ok) {
        toast.error(respuesta.message);
        return;
      }
      toast.success("Proveedor actualizado correctamente");
      setOpen(false);
      obtenerProveedores();
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <UpdateButtonComponent onClick={() => form.reset()} />
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        <Form {...form}>
          <form
            className="w-[98vw] h-[98vh] max-w-lg"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl text-center">
                  Editar Proveedor
                </CardTitle>
                <CardDescription className="text-center">
                  Edite un proveedor aquí. Haga clic en guardar
                  cuando haya terminado.
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
                        <Input placeholder="Mauricio R" {...field} />
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
                        <Input
                          placeholder="20600007522"
                          {...field}
                          type="number"
                        />
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
                        <Input placeholder="4746922" {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="celular"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Celular del proveedor</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="915115894"
                          {...field}
                          type="number"
                        />
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
