import Logo from "./Logo";
import HeaderNav from "./HeaderNav";
import BotonDeLogin from "./BotonDeLogin";

export default function Header() {
  return (
    <header className="h-16 flex items-center px-8">
      <Logo />
      <HeaderNav />
      <BotonDeLogin />
    </header>
  );
}
