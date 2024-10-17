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
              <Link to="/vendedor/ventas">
                <Button
                  className={cn(
                    pathname.startsWith("/vendedor/ventas") &&
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
