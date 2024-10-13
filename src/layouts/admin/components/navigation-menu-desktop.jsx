import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu as NavigationMenuWrapper,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Link, useLocation } from "react-router-dom";

export default function NavigationMenuDesktop({ className, ...props }) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className={cn("gap-x-3", className)} {...props}>
      <NavigationMenuWrapper>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/administrador/dashboard">
                <Button
                  className={cn(
                    pathname.startsWith("/administrador/dashboard") &&
                      "bg-accent text-accent-foreground"
                  )}
                  variant="ghost"
                >
                  Dashboard
                </Button>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/administrador/vendedores">
                <Button
                  className={cn(
                    pathname.startsWith("/administrador/vendedores") &&
                      "bg-accent text-accent-foreground"
                  )}
                  variant="ghost"
                >
                  Vendedores
                </Button>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/administrador/clientes">
                <Button
                  className={cn(
                    pathname.startsWith("/administrador/clientes") &&
                      "bg-accent text-accent-foreground"
                  )}
                  variant="ghost"
                >
                  Clientes
                </Button>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/administrador/proveedores">
                <Button
                  className={cn(
                    pathname.startsWith("/administrador/proveedor") &&
                      "bg-accent text-accent-foreground"
                  )}
                  variant="ghost"
                >
                  Proveedores
                </Button>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(
                (pathname.startsWith("/administrador/productos") ||
                  pathname.startsWith("/administrador/categorias") ||
                  pathname.startsWith("/administrador/marcas")) &&
                  "bg-accent text-accent-foreground"
              )}
            >
              Productos
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <NavigationMenuLink asChild>
                  <Link
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    to="/administrador/productos"
                  >
                    <div className="text-sm font-medium leading-none">
                      Productos
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Explore una amplia gama de categorías de productos, que
                      satisfacen todas las necesidades y preferencias, en
                      nuestra página intuitiva diseñada para navegar y descubrir
                      sin esfuerzo.
                    </p>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    to="/administrador/categorias"
                  >
                    <div className="text-sm font-medium leading-none">
                      Categorías
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Explore una amplia gama de categorías de productos, que
                      satisfacen todas las necesidades y preferencias, en
                      nuestra página intuitiva diseñada para navegar y descubrir
                      sin esfuerzo.
                    </p>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    to="/administrador/marcas"
                  >
                    <div className="text-sm font-medium leading-none">
                      Marcas
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Explore una amplia gama de marcas de productos, que
                      satisfacen todas las necesidades y preferencias, en
                      nuestra página intuitiva diseñada para navegar y descubrir
                      sin esfuerzo.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/administrador/compras">
                <Button
                  className={cn(
                    pathname.startsWith("/administrador/compras") &&
                      "bg-accent text-accent-foreground"
                  )}
                  variant="ghost"
                >
                  Compras
                </Button>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/administrador/ventas">
                <Button
                  className={cn(
                    pathname.startsWith("/administrador/ventas") &&
                      "bg-accent text-accent-foreground"
                  )}
                  variant="ghost"
                >
                  Ventas
                </Button>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenuWrapper>
    </div>
  );
}
