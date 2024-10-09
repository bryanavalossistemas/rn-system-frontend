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
        <DialogContent>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Ingresa tus credenciales para ingresar a R&N System
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Usuario</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Iniciar Sesión</Button>
            </CardFooter>
          </Card>
        </DialogContent>
      </Dialog>
    </header>
  );
}
