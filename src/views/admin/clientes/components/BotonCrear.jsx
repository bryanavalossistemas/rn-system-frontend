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
import apiClientes from "@/api/Clientes";

export default function BotonCrear({ obtenerClientes }) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(
      z.object({
        nombre: z.string().min(1, {
          message: "El nombre del cliente es requerido",
        }),
        celular: z.coerce
          .number({
            required_error: "El celular del cliente es requerido",
            invalid_type_error: "El celular del cliente debe ser un número",
          })
          .refine(
            (val) => `${val}`.length === 9,
            "El celular del cliente debe tener 9 dígitos"
          ),
        ruc: z.coerce
          .number({
            required_error: "El RUC del cliente es requerido",
            invalid_type_error: "El RUC del cliente debe ser un número",
          })
          .refine(
            (val) => `${val}`.length === 11,
            "El RUC del cliente debe tener 11 dígitos"
          ),
      })
    ),
    defaultValues: {
      nombre: "",
      telefono: "",
      celular: "",
      ruc: "",
    },
  });

  async function handleSubmit(datos) {
    try {
      const respuesta = await apiClientes.crearCliente(datos);
      if (!respuesta.ok) {
        toast.error(respuesta.message);
        return;
      }
      toast.success("Cliente creado correctamente");
      setOpen(false);
      obtenerClientes();
    } catch (error) {
      toast.error(error.message);
    }
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
                  Crear Cliente
                </CardTitle>
                <CardDescription className="text-center">
                  Agregue un cliente aquí. Haga clic en agregar cuando haya
                  terminado.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre del cliente</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Representaciones Nataly S.A.C"
                          {...field}
                        />
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
                      <FormLabel>Celular del cliente</FormLabel>
                      <FormControl>
                        <Input placeholder="915115894" {...field} type="number" />
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
                      <FormLabel>RUC del cliente</FormLabel>
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
