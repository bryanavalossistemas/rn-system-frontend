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
import apiCategorias from "@/api/categorias";

export default function BotonCrear({ obtenerCategorias }) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(
      z.object({
        nombre: z.string().min(1, {
          message: "El nombre de la categoria es requerido",
        }),
      })
    ),
    defaultValues: {
      nombre: "",
    },
  });

  async function handleSubmit(datos) {
    await apiCategorias.crearCategoria(datos);
    toast.success("Categoria creada correctamente");
    obtenerCategorias();
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
                  Crear Categeria
                </CardTitle>
                <CardDescription className="text-center">
                  Agregue un Categoria aquí. Haga clic en agregar cuando haya
                  terminado.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de la Categoria</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Categoria"
                          {...field}
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
