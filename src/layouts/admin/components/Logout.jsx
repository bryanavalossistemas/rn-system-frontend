import useAutenticacionStore from "@/store/autenticacion/Autenticacion.js";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const logout = useAutenticacionStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Devuelta a la página principal
  };

  return (
    <div onClick={handleLogout} role="menuitem">
      Logout
    </div>
  );
}
