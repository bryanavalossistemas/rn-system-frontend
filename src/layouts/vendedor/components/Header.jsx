// import NavigationMenuMobile from "./navigation-menu-mobile";
import NavigationMenuDesktop from "./navigation-menu-desktop";
import HeaderGroupRight from "./header-group-right";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b backdrop-blur flex p-1 sm:p-2 items-center justify-between gap-x-4 bg-teal-400 supports-[backdrop-filter]:bg-teal-400">
      <Logo />
      <NavigationMenuDesktop className="hidden sm:flex sm:items-center " />
      {/* <NavigationMenuMobile className="sm:hidden" /> */}
      <HeaderGroupRight className="flex items-center self-end" />
    </header>
  );
}
