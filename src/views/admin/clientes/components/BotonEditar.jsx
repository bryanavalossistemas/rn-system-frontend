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
import apiClientes from "@/api/Clientes";

export default function BotonEditar({ cliente, obtenerClientes }) {
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
    values: {
      nombre: cliente.nombre,
      celular: cliente.celular,
      ruc: cliente.ruc,
    },
  });

  async function handleSubmit(data) {
    try {
      const respuesta = await await apiClientes.actualizarCliente(
        cliente.id,
        data
      );
      if (!respuesta.ok) {
        toast.error(respuesta.message);
        return;
      }
      toast.success("Cliente actualizado correctamente");
      setOpen(false);
      obtenerClientes();
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <UpdateButtonComponent onClick={() => form.reset()} />
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <Form {...form}>
          <form
            className="flex flex-col gap-y-3"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <Card className="w-full max-w-md bg-white shadow-lg rounded-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl text-center">
                  Editar cliente
                </CardTitle>
                <CardDescription className="text-center">
                  Realice cambios del cliente aquí. Haga clic en guardar cuando
                  haya terminado.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
                  name="nombre"
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
                  name="celular"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Celular del cliente</FormLabel>
                      <FormControl>
                        <Input placeholder="915115894" {...field} />
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
                        <Input placeholder="20512345678" {...field} />
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
