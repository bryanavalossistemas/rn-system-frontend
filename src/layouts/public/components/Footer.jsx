import { Link } from "react-router-dom";
import FooterLogo from "./FooterLogo";

export default function Footer() {
  const copyright = new Date();
  const update = copyright.getFullYear();

  return (
    <footer className="h-14 flex justify-center">
      <div className="flex items-center justify-center text-sm">
        &copy; Todos los derechos reservados Ing. Software II - {update}
      </div>
    </footer>
  );
}
