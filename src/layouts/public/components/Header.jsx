import { useState } from "react";
import Logo from "./Logo";
import HeaderNav from "./HeaderNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="h-16 flex items-center px-8">
      <Logo />
      <HeaderNav />
      <Button
        className="bg-red-400 hover:bg-red-600"
        onClick={() => setOpen(true)}
      >
        Ingresar al Sistema
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex justify-center items-center">
          <Card className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-teal-600">Login</CardTitle>
              <CardDescription className="text-center">
                Ingresa tus credenciales para ingresar a R&N System
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-teal-700">Usuario</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="border-gray-300 rounded-md"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-teal-700">Contraseña</Label>
                <Input 
                id="password" 
                type="password" 
                placeholder="*********"
                required
                className="border-gray-300 rounded-md"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">Iniciar Sesión</Button>
            </CardFooter>
          </Card>
        </DialogContent>
      </Dialog>
    </header>
  );
}
