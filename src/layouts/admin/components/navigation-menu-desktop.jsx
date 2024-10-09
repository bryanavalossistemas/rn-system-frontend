import { Package2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu as NavigationMenuWrapper,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link, useLocation } from "react-router-dom";

export default function NavigationMenuDesktop({ className, ...props }) {
  const pathname = "clients";

  return (
    <div className={cn("gap-x-3", className)} {...props}>
      <Link
        href="#"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <Package2 className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <NavigationMenuWrapper>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/admin/dashboard">
                <Button
                  className={cn(
                    pathname.startsWith("/admin/dashboard") &&
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
            <NavigationMenuTrigger
              className={cn(
                (pathname.startsWith("/admin/products") ||
                  pathname.startsWith("/admin/categories") ||
                  pathname.startsWith("/admin/purchases")) &&
                  "bg-accent text-accent-foreground"
              )}
            >
              Inventario
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <NavigationMenuLink asChild>
                  <Link
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/admin/products"
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
                    href="/admin/categories"
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
                    href="/admin/purchases"
                  >
                    <div className="text-sm font-medium leading-none">
                      Compras
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
                    href="/admin/categories"
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
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/admin/customers">
                <Button
                  className={cn(
                    pathname.startsWith("/admin/customers") &&
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
              <Link href="/admin/sales">
                <Button
                  className={cn(
                    pathname.startsWith("/admin/sales") &&
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
