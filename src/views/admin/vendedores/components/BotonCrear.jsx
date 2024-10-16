import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { AddButton } from "./AddButton";
import { z } from "zod";
import apiVendedor from "@/api/Vendedores";
import apiAdministrador from "@/api/Administrador";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function BotonCrear({ obtenerVendedores }) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(
      z.object({
        nombre: z.string().min(1, {
          message: "El nombre del vendedor es requerido",
        }),
        usuario: z.string().min(1, {
          message: "El nombre de usuario del vendedor es requerido",
        }),
        contrasenia: z.string().min(1, {
          message: "La contraseña del vendedor es requerida",
        }),
        dni: z.coerce
          .number({
            required_error: "El DNI del vendedor es requerido",
            invalid_type_error: "El DNI del vendedor debe ser un número",
          })
          .refine(
            (val) => `${val}`.length === 8,
            "El DNI del vendedor debe tener 8 dígitos"
          ),
        telefono: z.coerce
          .number({
            required_error: "El Teléfono del vendedor es requerido",
            invalid_type_error: "El Teléfono del vendedor debe ser un número",
          })
          .refine(
            (val) => `${val}`.length === 9,
            "El Teléfono del vendedor debe tener 9 dígitos"
          ),
      })
    ),
    defaultValues: {
      nombre: "",
      usuario: "",
      contrasenia: "",
      dni: "",
      telefono: "",
    },
  });

  async function handleSubmit(datos) {
    try {
      const respuesta = await apiAdministrador.crearVendedor(datos);
      if (!respuesta.ok) {
        toast.error(respuesta.message);
        return;
      }
      toast.success("Vendedor creado correctamente");
      setOpen(false);
      obtenerVendedores();
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <AddButton onClick={() => form.reset()} />
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        <Form {...form}>
          <form
            className="flex flex-col gap-y-3 max-w-xl max-h-[98vh]"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <Card className="">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl text-center">
                  Crear Vendedor
                </CardTitle>
                <CardDescription className="text-center">
                  Agregue un vendedor aquí. Haga clic en agregar cuando haya
                  terminado.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre del vendedor</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Bryan Avalos Loa y Pardo Jesus"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="usuario"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de usuario</FormLabel>
                      <FormControl>
                        <Input placeholder="goku123" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contrasenia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña del vendedor</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="********"
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dni"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>DNI del vendedor</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="75013015"
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
                      <FormLabel>Teléfono del vendedor</FormLabel>
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
