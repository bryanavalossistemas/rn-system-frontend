import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function PublicLayout() {
  return (
    <div className="h-lvh flex flex-col bg-teal-400">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
