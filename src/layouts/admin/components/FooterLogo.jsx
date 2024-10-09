import { Link } from "react-router-dom";

export default function FooterLogo() {
  return (
    <div>
      <div className="space-y-1">
        <Link to={"/"} className="text-2xl font-bold">
          LA TIENDITA DEL ABUELO
        </Link>
        <p>&copy; 2010 - {new Date().getFullYear()}</p>
        <p>Privacy - Terms</p>
      </div>
    </div>
  );
}
