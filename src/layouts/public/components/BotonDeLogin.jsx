import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import apiUsuario from "@/api/Usuario";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import useAutenticacionStore from "@/store/autenticacion/Autenticacion";

export default function BotonDeLogin() {
  const [open, setOpen] = useState(false);
  const authToken = useAutenticacionStore((state) => state.authToken);
  const setAuthToken = useAutenticacionStore((state) => state.setAuthToken);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(
      z.object({
        usuario: z.string().min(1, {
          message: "El nombre de usuario es requerido",
        }),
        contrasenia: z.string().min(1, {
          message: "La contraseña es requerida",
        }),
      })
    ),
    values: {
      usuario: "",
      contrasenia: "",
    },
  });

  async function verificarSesion() {
    try {
      form.reset();
      if (authToken) {
        const respuesta = await apiUsuario.obtenerUsuario(authToken);
        if (respuesta.rolId === undefined) {
          return setOpen(true);
        } else {
          if (respuesta.rolId === 1) {
            return navigate("/administrador/dashboard");
          } else {
            return navigate("/vendedor/dashboard");
          }
        }
      }
      return setOpen(true);
    } catch (error) {
      setOpen(true);
    }
  }

  async function handleSubmit(credenciales) {
    try {
      const respuesta = await apiUsuario.iniciarSesion(credenciales);
      if (!respuesta.ok) {
        toast.error("Datos no válidos");
        return;
      }
      const newToken = respuesta.token;
      setAuthToken(newToken);
      if (respuesta.rolId === 1) {
        return navigate("/administrador/dashboard");
      }
      return navigate("/vendedor/dashboard");
    } catch (error) {
      toast.error(
        "Error al conectarse al servidor. Contacte con sistemas, gracias."
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-red-400 hover:bg-red-600"
          onClick={verificarSesion}
        >
          Ingresar al Sistema
        </Button>
      </DialogTrigger>
      <DialogContent className="flex justify-center items-center">
        <Form {...form}>
          <form
            className="flex flex-col gap-y-3 text-teal-600"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <Card className="w-full max-w-md bg-white shadow-lg rounded-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl text-center text-teal-600">
                  Login
                </CardTitle>
                <CardDescription className="text-center">
                  Ingresa tus credenciales para ingresar a R&N System
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
                  name="usuario"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usuario</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre de usuario" {...field} />
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
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nombre de usuario"
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button
                  disabled={form.formState.isSubmitting}
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                >
                  Iniciar Sesión
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
